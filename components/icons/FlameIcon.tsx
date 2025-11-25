export function FlameIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      role="img"
      aria-label="炎のアイコン"
    >
      <title>炎</title>
      {/* 炎のドット絵 */}
      <rect x="12" y="4" width="4" height="4" fill="#FDE68A" />
      <rect x="16" y="4" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="8" width="4" height="4" fill="#FDE68A" />
      <rect x="12" y="8" width="4" height="4" fill="#FCD34D" />
      <rect x="16" y="8" width="4" height="4" fill="#FCA5A5" />
      <rect x="20" y="8" width="4" height="4" fill="#FCD34D" />
      <rect x="4" y="12" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="12" width="4" height="4" fill="#FCA5A5" />
      <rect x="12" y="12" width="4" height="4" fill="#F87171" />
      <rect x="16" y="12" width="4" height="4" fill="#EF4444" />
      <rect x="20" y="12" width="4" height="4" fill="#FCA5A5" />
      <rect x="24" y="12" width="4" height="4" fill="#FCD34D" />
      <rect x="4" y="16" width="4" height="4" fill="#FCA5A5" />
      <rect x="8" y="16" width="4" height="4" fill="#F87171" />
      <rect x="12" y="16" width="4" height="4" fill="#EF4444" />
      <rect x="16" y="16" width="4" height="4" fill="#DC2626" />
      <rect x="20" y="16" width="4" height="4" fill="#F87171" />
      <rect x="24" y="16" width="4" height="4" fill="#FCA5A5" />
      <rect x="8" y="20" width="4" height="4" fill="#F87171" />
      <rect x="12" y="20" width="4" height="4" fill="#EF4444" />
      <rect x="16" y="20" width="4" height="4" fill="#F87171" />
      <rect x="20" y="20" width="4" height="4" fill="#FCA5A5" />
      <rect x="12" y="24" width="4" height="4" fill="#FCA5A5" />
      <rect x="16" y="24" width="4" height="4" fill="#FCA5A5" />
    </svg>
  );
}
