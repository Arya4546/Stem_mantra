/** Sends the contact / book-a-demo forms to the website API (saved + emailed to the sales team). */
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

export class FormError extends Error {
  constructor(
    message: string,
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

export async function submitForm(payload: FormPayload): Promise<string> {
  let res: Response;
  try {
    res = await fetch("/api/public/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ ...payload, sourcePath: window.location.pathname.slice(0, 300) }),
    });
  } catch {
    throw new FormError("Network error. Please check your connection and try again.");
  }

  let body: { success?: boolean; message?: string; meta?: { errors?: Record<string, string> } } = {};
  try {
    body = await res.json();
  } catch {
    /* non-JSON response */
  }

  if (res.status === 429) {
    throw new FormError(body.message || "Too many submissions. Please wait a few minutes or reach us on WhatsApp.");
  }
  if (!res.ok || !body.success) {
    const fieldErrors = body.meta?.errors ?? {};
    const first = Object.values(fieldErrors)[0];
    throw new FormError(first || body.message || "Something went wrong. Please try again or contact us on WhatsApp.", fieldErrors);
  }
  return body.message || "Thank you! We'll get back to you within 24 hours.";
}
