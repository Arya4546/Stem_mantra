<?php
/**
 * Copy to ONE LEVEL ABOVE public_html on Hostinger and rename to:
 *   stemmantra-mail-config.php
 * (the folder that contains public_html — NOT inside it). Never commit the real file.
 */
return [
    'smtp_host'    => 'smtp-relay.brevo.com',
    'smtp_port'    => 587,
    'smtp_user'    => '9a28c3001@smtp-brevo.com',       // Brevo > SMTP & API > SMTP login
    'smtp_pass'    => 'PASTE_BREVO_SMTP_KEY_HERE',
    'sender_email' => 'noreply@stemmantra.com',         // verified sender/domain in Brevo
    'sender_name'  => 'STEMmantra Website',
    'to'           => ['sales@stemmantra.com'],         // who receives the enquiries
];
