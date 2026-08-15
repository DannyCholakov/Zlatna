export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 56"
      role="img"
      aria-label="Zlatna"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="42"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        Zlatna
      </text>
    </svg>
  );
}
