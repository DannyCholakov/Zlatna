/** TradeVision mark — eye aperture + ascending chart path */
export function Wordmark({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-z-gold ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-[1.15em] w-[1.15em] shrink-0"
        role="img"
        aria-hidden={!showText}
        aria-label={showText ? undefined : "TradeVision"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tvGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" />
            <stop offset="45%" stopColor="#c4a35a" />
            <stop offset="100%" stopColor="#8a6a2e" />
          </linearGradient>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="url(#tvGold)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="11"
          ry="7"
          fill="none"
          stroke="url(#tvGold)"
          strokeWidth="1.25"
        />
        <circle cx="20" cy="20" r="3.2" fill="url(#tvGold)" />
        <path
          d="M8 26 L14 22 L19 24 L26 15 L32 17"
          fill="none"
          stroke="url(#tvGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText ? (
        <span
          className="font-display text-[1.35em] font-medium leading-none tracking-[0.04em]"
          style={{ color: "inherit" }}
        >
          TradeVision
        </span>
      ) : null}
    </span>
  );
}
