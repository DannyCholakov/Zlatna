import { Wordmark } from "@/components/Wordmark";

/** Standalone logo mark for favicon / share — exported as SVG in public too */
export function LogoMark({ className = "" }: { className?: string }) {
  return <Wordmark className={className} showText={false} />;
}
