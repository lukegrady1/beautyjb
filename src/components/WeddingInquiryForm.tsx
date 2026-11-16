"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { weddingServiceOptions } from "@/content/weddings";
import { validateContact } from "./ContactForm";
import { Field, FormSuccess, Honeypot, fieldProps } from "./FormBits";
import { formToObject, useFormSubmit } from "./useFormSubmit";

export function WeddingInquiryForm() {
  const { status, error, submit } = useFormSubmit("Wedding inquiry");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  if (status === "success") {
    return <FormSuccess>Thank you, and congratulations! Jennifer will be in touch soon about your wedding day.</FormSuccess>;
  }

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = formToObject(ev.currentTarget);
    const errs = validateContact(data);
    if (!String(data.weddingDate ?? "").trim()) errs.weddingDate = "Please add your wedding date (an estimate is fine).";
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
          <input className="field" type="text" autoComplete="name" {...fieldProps("name", errors)} />
        </Field>
      </div>
      <Field id="phone" label="Phone" hint="Preferred. Jennifer usually texts." error={errors.phone}>
        <input className="field" type="tel" autoComplete="tel" inputMode="tel" {...fieldProps("phone", errors, true)} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input className="field" type="email" autoComplete="email" {...fieldProps("email", errors)} />
      </Field>
      <Field id="weddingDate" label="Wedding date" error={errors.weddingDate}>
        <input className="field" type="date" {...fieldProps("weddingDate", errors)} />
      </Field>
      <Field id="partySize" label="Party size" optional hint="Including the bride.">
        <input className="field" type="number" min={1} inputMode="numeric" {...fieldProps("partySize", errors, true)} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="venue" label="Venue / location" optional>
          <input className="field" type="text" {...fieldProps("venue", errors)} />
        </Field>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="label">Where would you like to get ready?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {["In the studio", "On-site at the venue", "Not sure yet"].map((v, i) => (
            <label key={v} className="inline-flex min-h-11 items-center gap-2 text-[15px] text-ink">
              <input type="radio" name="location" value={v} defaultChecked={i === 2} className="h-4 w-4 accent-[var(--accent)]" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="sm:col-span-2">
        <legend className="label">Services wanted</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {weddingServiceOptions.map((v) => (
            <label key={v} className="inline-flex min-h-11 items-center gap-2 text-[15px] text-ink">
              <input type="checkbox" name="services" value={v} className="h-4 w-4 accent-[var(--accent)]" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <Field id="notes" label="Notes" optional hint="Your vision, timeline, inspiration links: anything that helps.">
          <textarea className="field min-h-[128px]" rows={4} {...fieldProps("notes", errors, true)} />
        </Field>
      </div>
      <div className="sm:col-span-2" aria-live="assertive">
        {Object.keys(errors).length > 0 && <p className="text-[14px] font-medium text-accent">Please fix the highlighted fields.</p>}
        {status === "error" && <p className="text-[14px] font-medium text-accent">{error}</p>}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Wedding Inquiry"}
          <ArrowRight aria-hidden size={18} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
