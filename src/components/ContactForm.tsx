"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Field, FormSuccess, Honeypot, fieldProps } from "./FormBits";
import { formToObject, useFormSubmit } from "./useFormSubmit";

const interests = ["Color", "Highlights / Lowlights", "Cut", "Brazilian Straightening", "Wedding", "Other"];

export function validateContact(d: Record<string, string | string[]>) {
  const e: Record<string, string> = {};
  if (!String(d.name ?? "").trim()) e.name = "Please enter your name.";
  const phone = String(d.phone ?? "").replace(/\D/g, "");
  const email = String(d.email ?? "").trim();
  if (!phone && !email) e.phone = "Please add a phone number (preferred) or an email.";
  if (phone && phone.length < 10) e.phone = "Please enter a full phone number.";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Please check your email address.";
  return e;
}

export function ContactForm() {
  const { status, error, submit } = useFormSubmit("Consultation request");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  if (status === "success") {
    return <FormSuccess>Thank you! Jennifer will reach out soon to set up your consultation.</FormSuccess>;
  }

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = formToObject(ev.currentTarget);
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    await submit(data);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <div className="sm:col-span-2">
        <Field id="name" label="Name" error={errors.name}>
          <input className="field" type="text" autoComplete="name" required {...fieldProps("name", errors)} />
        </Field>
      </div>
      <Field id="phone" label="Phone" hint="Preferred. Jennifer usually texts." error={errors.phone}>
        <input className="field" type="tel" autoComplete="tel" inputMode="tel" {...fieldProps("phone", errors, true)} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input className="field" type="email" autoComplete="email" {...fieldProps("email", errors)} />
      </Field>
      <Field id="interest" label="I'm interested in">
        <select className="field" {...fieldProps("interest", errors)} defaultValue="Color">
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </Field>
      <fieldset>
        <legend className="label">New or returning?</legend>
        <div className="flex min-h-12 items-center gap-6">
          {["New client", "Returning client"].map((v, i) => (
            <label key={v} className="inline-flex items-center gap-2 text-[15px] text-ink">
              <input type="radio" name="clientType" value={v} defaultChecked={i === 0} className="h-4 w-4 accent-[var(--accent)]" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <Field id="availability" label="Preferred days / times" optional>
          <input className="field" type="text" placeholder="e.g. Tuesday or Thursday mornings" {...fieldProps("availability", errors)} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="message" label="Message" optional>
          <textarea className="field min-h-[128px]" rows={4} {...fieldProps("message", errors)} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="inspiration" label="Photo link or inspiration" optional hint="A Pinterest or Instagram link is perfect.">
          <input className="field" type="url" inputMode="url" placeholder="https://" {...fieldProps("inspiration", errors, true)} />
        </Field>
      </div>

      <div className="sm:col-span-2" aria-live="assertive">
        {Object.keys(errors).length > 0 && (
          <p className="text-[14px] font-medium text-accent">Please fix the highlighted fields.</p>
        )}
        {status === "error" && <p className="text-[14px] font-medium text-accent">{error}</p>}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a Consultation"}
          <ArrowRight aria-hidden size={18} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
