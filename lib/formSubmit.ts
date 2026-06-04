export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  message: string;
}

export async function submitLead(data: LeadFormData): Promise<{ ok: boolean; error?: string }> {
  try {
    // Replace with your actual endpoint (Resend, Formspree, custom API route, etc.)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Server error");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
