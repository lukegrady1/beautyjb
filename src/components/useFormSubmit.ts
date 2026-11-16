"use client";

import { useState } from "react";

export type FormStatus = "idle" | "sending" | "success" | "error";

/*
  Posts form data as JSON to NEXT_PUBLIC_FORM_ENDPOINT (Formspree, a
  GoHighLevel webhook, etc.). The honeypot field "_gotcha" must stay empty;
  if a bot fills it we pretend success and send nothing.
*/
export function useFormSubmit(formName: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function submit(data: Record<string, unknown>) {
    if (data._gotcha) {
      setStatus("success");
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      setError("Online requests aren't switched on yet. Please call or email the studio instead.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const { _gotcha, ...payload } = data;
      void _gotcha;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form: formName, ...payload }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong sending your request. Please try again, or call or email the studio.");
    }
  }

  return { status, error, submit };
}

/** Collects a <form> into a plain object; repeated names (checkboxes) become arrays. */
export function formToObject(form: HTMLFormElement) {
  const out: Record<string, string | string[]> = {};
  new FormData(form).forEach((v, k) => {
    const val = String(v);
    if (k in out) out[k] = ([] as string[]).concat(out[k], val);
    else out[k] = val;
  });
  return out;
}
