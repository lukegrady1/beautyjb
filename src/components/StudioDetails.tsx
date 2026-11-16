import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site.config";
import { addressLines, directionsUrl, email, formatTime, mapQuery, phone, telHref } from "@/lib/site";
import { Button } from "./Button";
import { MapFacade } from "./MapFacade";

/*
  Address / hours / phone / email / map. Each piece only renders when its
  data is real; with nothing set it shows a single neutral line.
*/
export function StudioDetails({ showMap = true }: { showMap?: boolean }) {
  const any = addressLines.length || site.hours.length || phone || email;
  return (
    <div className="space-y-8">
      {addressLines.length > 0 && (
        <div className="flex gap-4">
          <MapPin aria-hidden size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
          <div>
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink">Studio</h3>
            <address className="mt-2 not-italic">
              {addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>
      )}
      {site.hours.length > 0 && (
        <div className="flex gap-4">
          <Clock aria-hidden size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink">Hours</h3>
            <dl className="mt-2 max-w-[320px] space-y-1">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6">
                  <dt>{h.day}</dt>
                  <dd className="text-ink">
                    {formatTime(h.open)} – {formatTime(h.close)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
      {phone && (
        <div className="flex gap-4">
          <Phone aria-hidden size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
          <div>
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink">Call or text</h3>
            <a href={telHref(phone)} className="prose-link mt-2 inline-block">
              {phone}
            </a>
          </div>
        </div>
      )}
      {email && (
        <div className="flex gap-4">
          <Mail aria-hidden size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" />
          <div>
            <h3 className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink">Email</h3>
            <a href={`mailto:${email}`} className="prose-link mt-2 inline-block break-all">
              {email}
            </a>
          </div>
        </div>
      )}
      {!any && <p>Studio address, hours and phone are coming soon. In the meantime, send a request and Jennifer will reach out.</p>}
      {showMap && <MapFacade query={mapQuery} />}
      {directionsUrl && (
        <Button href={directionsUrl} variant="secondary" arrow>
          Get Directions
        </Button>
      )}
    </div>
  );
}

export const hasStudioDetails = () => addressLines.length > 0 || site.hours.length > 0;
