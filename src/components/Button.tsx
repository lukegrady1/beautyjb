import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bookHref, bookingIsExternal } from "@/lib/site";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Button({ href, children, variant = "primary", arrow = false, className = "", icon }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight aria-hidden size={18} strokeWidth={1.5} />}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function BookButton({
  label = "Book a Consultation",
  variant = "primary",
  className = "",
  arrow = true,
}: {
  label?: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Button href={bookHref} variant={variant} arrow={arrow} className={className}>
      {label}
      {bookingIsExternal && <span className="sr-only"> (opens booking site)</span>}
    </Button>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
    </Link>
  );
}
