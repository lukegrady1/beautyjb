import { delay } from "@/lib/reveal";

export const steps = [
  {
    n: "01",
    title: "Consultation",
    short: "We get to know you, your routine and your goals.",
    long: "What you do for work, your morning routine, what you love and don't love about your hair, your future goals, and any photo or event you're working toward.",
  },
  {
    n: "02",
    title: "The Plan",
    short: "A clear path to the hair you want.",
    long: "How we'll get there, or honestly, how close we can get to your reference photo with your hair.",
  },
  {
    n: "03",
    title: "The Dry Cut",
    short: "Cut dry, so it falls right.",
    long: "Jennifer cuts hair dry, so she sees how your hair actually falls, moves and lives day to day. What you see in the chair is what you get at home.",
    feature: true,
  },
  {
    n: "04",
    title: "The Finish",
    short: "Shampoo, blow-dry, and you're on your way.",
    long: "A shampoo and blow-dry to finish, and you're on your way. No wasted time.",
  },
];

/** Compact four-column version for dark sections (Home preview). */
export function ProcessStepsCompact() {
  return (
    <ol className="grid gap-px overflow-hidden border-y border-silver/30 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.n} className="py-8 sm:pr-8 lg:border-l lg:border-silver/30 lg:px-8 lg:first:border-l-0 lg:first:pl-0" data-reveal style={delay(i)}>
          <span className="font-display text-[44px] italic leading-none text-gold-soft">{s.n}</span>
          <h3 className="h3 mt-4">{s.title}</h3>
          <p className="mt-2 text-[15px]">{s.short}</p>
        </li>
      ))}
    </ol>
  );
}
