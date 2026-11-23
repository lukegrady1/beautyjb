import { Phone } from "lucide-react";
import { phone, telHref } from "@/lib/site";
import { BookButton, Button } from "./Button";

/* Closing call to action above the footer (Stevie's CtaBand). */
export function CTABand() {
  return (
    <section aria-labelledby="cta-heading" className="bg-accent-tint py-14 text-ink sm:py-20">
      <div className="container-x flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
        <div>
          <h2 id="cta-heading" className="h2">
            Your chair is waiting.
          </h2>
          <p className="mt-2 max-w-md">New clients start with a consultation, so we know your hair before you sit down.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <BookButton />
          {phone ? (
            <a href={telHref(phone)} className="btn btn-secondary">
              <Phone aria-hidden size={20} strokeWidth={2} />
              Call {phone}
            </a>
          ) : (
            <Button href="/weddings/" variant="secondary">
              Wedding Hair
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
