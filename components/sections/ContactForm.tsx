"use client";
import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/formSubmit";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    website: "",
    location: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitLead(form);
    setStatus(result.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-10 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-display text-2xl text-white mb-2">We will be in touch!</h3>
        <p className="text-white/55">Usually within one business day. Keep an eye on your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-sm text-white/40 mb-1">Tell us about your business and we will take it from there.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name" name="name" label="Your name" placeholder="Jane Smith"
          required value={form.name} onChange={handleChange}
        />
        <Input
          id="email" name="email" type="email" label="Email address"
          placeholder="jane@example.com" required value={form.email} onChange={handleChange}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="phone" name="phone" label="Phone number" placeholder="+44 7700 000000"
          value={form.phone} onChange={handleChange}
        />
        <Input
          id="business" name="business" label="Business name" placeholder="Jane's Plumbing Ltd"
          required value={form.business} onChange={handleChange}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="website" name="website" label="Your website (if you have one)" placeholder="www.yourbusiness.com"
          value={form.website} onChange={handleChange}
        />
        <Input
          id="location" name="location" label="Your location" placeholder="Manchester, UK"
          required value={form.location} onChange={handleChange}
        />
      </div>
      <Textarea
        id="message" name="message" label="Anything else we should know?"
        placeholder="Tell us a bit about your business and what you are hoping to achieve online..."
        value={form.message} onChange={handleChange}
      />
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again or reach out to us directly.</p>
      )}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Get my free audit"}
      </Button>
      <p className="text-xs text-white/30 text-center">Free, no obligation and no hard sell. Ever.</p>
    </form>
  );
}
