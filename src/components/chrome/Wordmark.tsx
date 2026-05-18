interface Props {
  size?: number;
  className?: string;
}

export default function Wordmark({ size = 28, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Astoria">
      <svg
        width={size * 0.86}
        height={size}
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wm-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5d566" />
            <stop offset="1" stopColor="#a47a1a" />
          </linearGradient>
        </defs>
        {/* CMYK swoosh above printer */}
        <path d="M3 6 Q9 1 19 5" stroke="#e6296b" strokeWidth="1.2" fill="none" opacity="0.9" />
        <path d="M3 8 Q10 3 21 7" stroke="#2db4d8" strokeWidth="1.2" fill="none" opacity="0.9" />
        <path d="M5 10 Q12 6 22 9" stroke="#f0b020" strokeWidth="1.2" fill="none" opacity="0.9" />
        {/* printer */}
        <rect x="4" y="12" width="16" height="9" rx="1.5" stroke="url(#wm-gold)" strokeWidth="1.4" fill="none" />
        <rect x="7" y="15" width="10" height="3" rx="0.5" fill="url(#wm-gold)" opacity="0.6" />
        <rect x="6.5" y="21" width="11" height="3.5" rx="0.5" stroke="url(#wm-gold)" strokeWidth="1.2" fill="none" />
      </svg>
      <span
        className="font-serif italic font-medium tracking-tight"
        style={{
          fontSize: `${size * 0.82}px`,
          background: 'linear-gradient(180deg, #f5d566 0%, #c9a227 60%, #8a6a1f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Astoria
      </span>
    </div>
  );
}
