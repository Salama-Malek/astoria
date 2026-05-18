export default function Logo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* printer body */}
      <rect x="9" y="16" width="22" height="14" rx="2" stroke="#1a1814" strokeWidth="1.6" fill="white" />
      <rect x="13" y="22" width="14" height="6" rx="1" stroke="#1a1814" strokeWidth="1.4" fill="white" />
      {/* CMYK ink swirls */}
      <path d="M14 14 Q18 6 22 12" stroke="#e6296b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M18 14 Q22 6 26 12" stroke="#2db4d8" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M22 14 Q26 6 30 12" stroke="#f0b020" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
