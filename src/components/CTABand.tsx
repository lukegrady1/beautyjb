import { BookButton, Button } from "./Button";

/** "Your chair is waiting." Above the footer on every page except Contact. */
export function CTABand() {
  return (
    <section aria-labelledby="cta-heading" className="section bg-bg">
      <div className="container-x text-center" data-reveal>
        <span className="gold-rule" aria-hidden />
        <h2 id="cta-heading" className="h2 mt-10">
          Your chair is <em>waiting.</em>
        </h2>
        <p className="lead mx-auto mt-5 max-w-[540px]">
          New clients start with a consultation, so we know your hair before you sit down.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookButton />
          <Button href="/weddings/" variant="secondary">
            Wedding Hair
          </Button>
        </div>
      </div>
    </section>
  );
}
