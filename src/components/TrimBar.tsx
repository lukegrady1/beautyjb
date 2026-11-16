/** The Red Trim: a 4px accent bar at the very top of every page and the footer. */
export function TrimBar({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-1 w-full bg-accent ${className}`} />;
}
