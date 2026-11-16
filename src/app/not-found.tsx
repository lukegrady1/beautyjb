import type { Metadata } from "next";
import { BookButton, Button } from "@/components/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x mx-auto max-w-[820px] text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="h1 mt-5">
          Oops, this page got a little <em>too</em> much off the top.
        </h1>
        <p className="lead mx-auto mt-6 max-w-[520px]">The page you&rsquo;re looking for has moved or doesn&rsquo;t exist.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
          <BookButton />
        </div>
      </div>
    </section>
  );
}
