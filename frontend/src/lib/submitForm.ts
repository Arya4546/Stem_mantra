/**
 * Posts a form to the PHP mailer (public/send-mail.php) that ships with the static export.
 * Override with NEXT_PUBLIC_FORM_ENDPOINT if the mailer lives elsewhere (e.g. local testing).
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/send-mail.php";

export interface FormPayload {
  type: "contact" | "demo";
  name: string;
  email: string;
  phone?: string;
  school?: string;
  interest?: string;
  message?: string;
  /** Honeypot – must stay empty */
  hp_trap?: string;
}

export async function submitForm(payload: FormPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  let data: { ok?: boolean; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON response (e.g. PHP not available) */
  }

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Something went wrong. Please try again or contact us on WhatsApp.");
  }
}
