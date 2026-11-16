/*
  FAQs. Items with `draft: true` are hidden (page + schema) until confirmed.
*/
import type { FaqItem } from "./services";

export const experienceFaq: FaqItem[] = [
  {
    q: "What happens at the consultation?",
    a: "We talk about you: what you do for work, your morning routine, what you love and don't love about your hair, your future goals and any photo or event you're working toward. Then we make a plan together.",
  },
  {
    q: "Why does Jennifer cut hair dry?",
    a: "Cutting dry shows exactly how your hair falls, moves and lives day to day. What you see in the chair is what you get at home.",
  },
  {
    q: "How long will my appointment take?",
    a: "Color, highlights and a cut take about 1 hour 45 minutes. A cut on its own is shorter. Your time is yours, and we treat it that way.",
  },
  {
    q: "When does the shampoo happen?",
    a: "At the end. Jennifer cuts dry first, then finishes with a shampoo and blow-dry so you walk out ready.",
  },
  {
    q: "Can I bring inspiration photos?",
    a: "Please do. We'll talk honestly about how to get there, or how close we can get with your hair.",
  },
  {
    q: "Can I book with David?",
    a: "Jennifer's partner David flies in every two weeks to work in the studio. Ask about his schedule when you get in touch.",
  },
];

export const servicesFaq: FaqItem[] = [
  {
    q: "Do you list prices?",
    a: "Every head of hair is different, so pricing is discussed at your consultation once we know exactly what you need.",
  },
  {
    q: "What if I don't see the service I want?",
    a: "Ask. The menu focuses on what Jennifer does best, and anything else can be talked through at your consultation.",
  },
  {
    q: "I'm a new client. Where do I start?",
    a: "With a consultation. Send a request through the contact form and Jennifer will reach out to set it up.",
  },
];

export const weddingFaq: FaqItem[] = [
  {
    q: "Do you travel to the venue?",
    a: "Yes. We come to the church or venue, or you can get ready in the studio. A travel fee applies for venue visits.",
  },
  {
    q: "Can you do hair for the whole bridal party?",
    a: "Yes. Updos, blowouts and makeup for the bride and her party, all on the same day.",
  },
  {
    q: "How far ahead should we book?",
    a: "TODO: confirm booking lead time with Jennifer.",
    draft: true,
  },
  {
    q: "Do you offer trials?",
    a: "TODO: confirm trial policy and pricing.",
    draft: true,
  },
  {
    q: "Is a deposit required?",
    a: "TODO: confirm deposit policy.",
    draft: true,
  },
];

export const published = (items: FaqItem[] = []) => items.filter((i) => !i.draft);
