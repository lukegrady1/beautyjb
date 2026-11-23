# Beauty JB — beautyjb.com

Marketing site for hair designer Jennifer Bauduin. Built from `design.md` (the full spec).
Next.js 16 (App Router, static export) · Tailwind 4 · TypeScript · lucide-react. Agency: Grady Digital.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to out/
npm run start    # serve out/ locally
```

## Where things live

| What | File |
|---|---|
| Every client fact (name, phone, address, hours, socials, reviews, press, booking, showPrices) | `src/content/site.config.ts` |
| Services + service-page copy + FAQs | `src/content/services.ts` |
| Wedding services, packages, gallery | `src/content/weddings.ts` |
| Experience / Services / Wedding FAQs | `src/content/faq.ts` |
| Gallery images | `src/content/gallery.ts` |
| Named page photos (hero, portrait, studio…) | `src/content/photos.ts` |
| Colors | `src/app/globals.css` (`:root` tokens) + `src/content/theme.ts` (OG/manifest copy) |
| Logo | `src/components/Logo.tsx` |

`grep -rn TODO src/content` lists every open item.

## Rules baked in

- **No invented facts.** Anything `"TODO"` or empty is hidden on the page and left out of the JSON-LD.
  Reviews, press, hours, prices, phone, address and the map all appear on their own once filled in.
- FAQ items marked `draft: true` stay hidden until the answer is confirmed.
- Prices show only when `showPrices: true`.
- Once `address.city` is set, the city appears in H1s, titles, meta descriptions and intro copy everywhere.
- Never use the word "collection" for wedding packages.
- Backup palette: add `data-theme="blue"` to `<html>` in `src/app/layout.tsx`.

## Photos

Leave `src: ""` and a labelled grey placeholder renders. To add real photos, save them to
`public/images/{hero,about,studio,before-after,weddings}/` with descriptive names
(e.g. `bridal-updo-curls-01.jpg`), export them as WebP/AVIF at about 2x display width (static
export skips the image optimizer), then fill in `src`, `width` and `height`.

## Forms

The Contact and Wedding inquiry forms are GoHighLevel forms embedded as iframes
(`src/components/GhlForm.tsx`, Beauty JB sub-account `rtOQGxd4Ox0VqGZuT8gC`): "Website Contact
Form" and "Website Wedding Inquiry Form". Fields, required rules, the thank-you message and the
styling (Advanced > Custom CSS) are edited in GHL, not here. Submissions land as GHL contacts.
Email notifications and a forms.beautyjb.com branded domain are not set up yet.
To use an external booking tool instead, set `booking: { type: "external", url }` and every Book button switches to it.

## Deploy (Vercel)

Import the repo and set the env vars. Make `beautyjb.com` the primary domain and redirect
`www.beautyjb.com` to it (Vercel > Domains). DNS lives at GoDaddy.
