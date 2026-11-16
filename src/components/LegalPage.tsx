import { PageHero } from "./PageHero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} title={title} lead={`Last updated ${updated}`} />
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="max-w-[720px] space-y-5 [&_a]:prose-link [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
