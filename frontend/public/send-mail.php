<?php
/**
 * STEMmantra form mailer (static site on Hostinger).
 * Receives JSON from the Contact and Book-a-Demo forms and emails the team via Brevo SMTP.
 *
 * Secrets live OUTSIDE the web root, in ../stemmantra-mail-config.php (see mail-config.sample.php).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** Append a line to a log file kept OUTSIDE the web root (stemmantra-mail.log). */
function mail_log(string $line): void {
    $file = dirname($_SERVER['DOCUMENT_ROOT']) . '/stemmantra-mail.log';
    @file_put_contents($file, '[' . date('Y-m-d H:i:s') . '] ' . $line . "\n", FILE_APPEND | LOCK_EX);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Same-origin only
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
    $norm = fn($h) => preg_replace('/^www\./', '', strtolower((string)$h));
    if ($norm($originHost) !== $norm($host)) {
        respond(403, ['ok' => false, 'error' => 'Forbidden']);
    }
}

$configPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/stemmantra-mail-config.php';
if (!is_file($configPath)) {
    error_log('send-mail.php: config not found at ' . $configPath);
    respond(500, ['ok' => false, 'error' => 'Mail service is not configured.']);
}
$config = require $configPath;

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request']);
}

// Honeypot: bots fill this hidden field. Pretend success.
if (!empty($in['hp_trap'])) {
    mail_log('HONEYPOT triggered - message dropped (ip ' . ($_SERVER['REMOTE_ADDR'] ?? '?') . ')');
    respond(200, ['ok' => true]);
}

// Simple per-IP rate limit: 5 submissions / 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/stm_rl_' . md5($ip);
$now = time();
$hits = is_file($rlFile) ? array_filter(array_map('intval', explode(',', (string)file_get_contents($rlFile))), fn($t) => $now - $t < 600) : [];
if (count($hits) >= 5) {
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again in a few minutes.']);
}

$clean = fn($v, int $max) => trim(mb_substr(strip_tags((string)($v ?? '')), 0, $max));
$name    = $clean($in['name'] ?? '', 100);
$email   = $clean($in['email'] ?? '', 150);
$phone   = $clean($in['phone'] ?? '', 30);
$school  = $clean($in['school'] ?? '', 200);
$interest = $clean($in['interest'] ?? '', 100);
$message = $clean($in['message'] ?? '', 3000);
$type    = ($in['type'] ?? 'contact') === 'demo' ? 'demo' : 'contact';

if (mb_strlen($name) < 2) {
    respond(422, ['ok' => false, 'error' => 'Please enter your name.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
if ($phone !== '' && !preg_match('/^[0-9+()\-\s]{7,20}$/', $phone)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid phone number.']);
}
if ($type === 'contact' && mb_strlen($message) < 5) {
    respond(422, ['ok' => false, 'error' => 'Please enter your message.']);
}

$e = fn($s) => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$label = $type === 'demo' ? 'Demo request' : 'Contact enquiry';
$subject = $label . ' - ' . ($school !== '' ? $school : $name);

$rows = [
    'Type' => $label,
    'Name' => $name,
    'Email' => $email,
    'Phone' => $phone,
    'School / Organization' => $school,
    'Interested in' => $interest,
];
$html = '<div style="font-family:Arial,sans-serif;max-width:600px">'
      . '<h2 style="color:#ea580c;margin:0 0 16px">New ' . $e($label) . ' from stemmantra.com</h2>'
      . '<table style="border-collapse:collapse;width:100%">';
foreach ($rows as $k => $v) {
    if ($v === '') continue;
    $html .= '<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;width:180px">' . $e($k)
           . '</td><td style="padding:8px;border-bottom:1px solid #eee"><b>' . $e($v) . '</b></td></tr>';
}
$html .= '</table>';
if ($message !== '') {
    $html .= '<h3 style="margin:20px 0 8px">Message</h3><p style="white-space:pre-wrap;line-height:1.5">' . $e($message) . '</p>';
}
$html .= '<p style="color:#999;font-size:12px;margin-top:24px">Reply to this email to respond directly to the sender.</p></div>';

/** Minimal SMTP client (STARTTLS + AUTH LOGIN) so no libraries are needed on shared hosting. */
function smtp_send(array $c, string $toList, string $replyName, string $replyEmail, string $subject, string $html): string {
    $accepted = '';
    $errno = 0; $errstr = '';
    $fp = @stream_socket_client('tcp://' . $c['smtp_host'] . ':' . $c['smtp_port'], $errno, $errstr, 15);
    if (!$fp) throw new RuntimeException("SMTP connect failed: $errstr ($errno)");
    stream_set_timeout($fp, 15);

    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $out;
    };
    $cmd = function (string $line, string $expect) use ($fp, $read): string {
        fwrite($fp, $line . "\r\n");
        $resp = $read();
        if (strpos($resp, $expect) !== 0) throw new RuntimeException("SMTP unexpected reply to '" . preg_replace('/^(AUTH LOGIN|[A-Za-z0-9+\/=]{20,}).*/', '$1', $line) . "': $resp");
        return $resp;
    };

    try {
        $greet = $read();
        if (strpos($greet, '220') !== 0) throw new RuntimeException("SMTP greeting: $greet");
        $cmd('EHLO stemmantra.com', '250');
        $cmd('STARTTLS', '220');
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT)) {
            throw new RuntimeException('SMTP TLS handshake failed');
        }
        $cmd('EHLO stemmantra.com', '250');
        $cmd('AUTH LOGIN', '334');
        $cmd(base64_encode($c['smtp_user']), '334');
        $cmd(base64_encode($c['smtp_pass']), '235');
        $cmd('MAIL FROM:<' . $c['sender_email'] . '>', '250');
        foreach ((array)$c['to'] as $rcpt) $cmd('RCPT TO:<' . $rcpt . '>', '250');
        $cmd('DATA', '354');

        $enc = fn($t) => '=?UTF-8?B?' . base64_encode($t) . '?=';
        $safe = fn($t) => str_replace(["\r", "\n"], ' ', $t);
        $headers = [
            'Date: ' . date('r'),
            'From: ' . $enc($c['sender_name']) . ' <' . $c['sender_email'] . '>',
            'To: ' . implode(', ', array_map(fn($a) => '<' . $a . '>', (array)$c['to'])),
            'Reply-To: ' . $enc($safe($replyName)) . ' <' . $replyEmail . '>',
            'Subject: ' . $enc($safe($subject)),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@stemmantra.com>',
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        $body = chunk_split(base64_encode($html), 76, "\r\n");
        fwrite($fp, implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n");
        $resp = $read();
        if (strpos($resp, '250') !== 0) throw new RuntimeException("SMTP DATA rejected: $resp");
        $accepted = trim($resp);
        @fwrite($fp, "QUIT\r\n");
    } finally {
        @fclose($fp);
    }
    return $accepted;
}

try {
    $reply = smtp_send($config, '', $name, $email, $subject, $html);
    mail_log('SENT type=' . $type . ' from=' . $email . ' to=' . implode(',', (array)$config['to']) . ' | brevo: ' . $reply);
} catch (Throwable $ex) {
    mail_log('FAILED type=' . $type . ' from=' . $email . ' | ' . str_replace(["\r", "\n"], ' ', $ex->getMessage()));
    error_log('send-mail.php: ' . $ex->getMessage());
    respond(502, ['ok' => false, 'error' => 'We could not send your message right now. Please try WhatsApp or call us.']);
}

$hits[] = $now;
@file_put_contents($rlFile, implode(',', $hits));
respond(200, ['ok' => true]);
