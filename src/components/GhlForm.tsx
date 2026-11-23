"use client";

import Script from "next/script";

/*
  The Contact and Wedding inquiry forms are GoHighLevel forms in the Beauty JB
  sub-account (location rtOQGxd4Ox0VqGZuT8gC). Fields, required rules, spam
  protection, the thank-you message and the styling (Advanced > Custom CSS,
  matching .field / .label / .btn-primary in globals.css) all live in GHL.
  This component only renders the iframe and loads GHL's form_embed.js, which
  resizes the iframe to fit the form (and the thank-you message) as it changes.

  Served from the agency's white-label host for now. Once beautyjb.com's DNS is
  available, connect forms.beautyjb.com as the sub-account's branded domain and
  switch FORM_HOST to it.

  minHeight sits just under the form's shortest (desktop) height so the card
  doesn't collapse while the resize script loads, without leaving a gap under
  the button once it has.
*/
const FORM_HOST = "https://api.fynnd.co";
const EMBED_SCRIPT = `${FORM_HOST}/js/form_embed.js`;

export const GHL_FORMS = {
  // /contact: Name, Phone, Email, interest, new/returning, days/times, message, inspiration link
  contact: { id: "Ed4EHEy0rnT2HmrESRVz", name: "Website Contact Form", height: 900 },
  // /weddings: Name, Phone, Email, date, party size, venue, getting ready, services, notes
  wedding: { id: "j4kmnsyV63C8DRfTwsYI", name: "Website Wedding Inquiry Form", height: 1000 },
} as const;

export function GhlForm({ form }: { form: keyof typeof GHL_FORMS }) {
  const { id, name, height } = GHL_FORMS[form];
  const iframeId = `inline-${id}`;

  return (
    <>
      <iframe
        src={`${FORM_HOST}/widget/form/${id}`}
        id={iframeId}
        title={name}
        style={{
          width: "100%",
          minHeight: height,
          border: "none",
          display: "block",
          background: "transparent",
          colorScheme: "normal",
        }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={name}
        data-height={String(height)}
        data-layout-iframe-id={iframeId}
        data-form-id={id}
      />
      <Script src={EMBED_SCRIPT} />
    </>
  );
}
