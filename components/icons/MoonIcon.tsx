export function MoonIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      role="img"
      aria-label="月のアイコン"
    >
      <title>月</title>
      {/* 月のドット絵 */}
      <rect x="12" y="4" width="4" height="4" fill="#FCD34D" />
      <rect x="16" y="4" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="8" width="4" height="4" fill="#FCD34D" />
      <rect x="12" y="8" width="4" height="4" fill="#FDE68A" />
      <rect x="16" y="8" width="4" height="4" fill="#FDE68A" />
      <rect x="20" y="8" width="4" height="4" fill="#FCD34D" />
      <rect x="4" y="12" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="12" width="4" height="4" fill="#FDE68A" />
      <rect x="12" y="12" width="4" height="4" fill="#FEF3C7" />
      <rect x="16" y="12" width="4" height="4" fill="#FDE68A" />
      <rect x="20" y="12" width="4" height="4" fill="#FCD34D" />
      <rect x="4" y="16" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="16" width="4" height="4" fill="#FDE68A" />
      <rect x="12" y="16" width="4" height="4" fill="#FCD34D" />
      <rect x="16" y="16" width="4" height="4" fill="#FDE68A" />
      <rect x="20" y="16" width="4" height="4" fill="#FCD34D" />
      <rect x="24" y="16" width="4" height="4" fill="#FCD34D" />
      <rect x="8" y="20" width="4" height="4" fill="#FCD34D" />
      <rect x="12" y="20" width="4" height="4" fill="#FDE68A" />
      <rect x="16" y="20" width="4" height="4" fill="#FDE68A" />
      <rect x="20" y="20" width="4" height="4" fill="#FCD34D" />
      <rect x="12" y="24" width="4" height="4" fill="#FCD34D" />
      <rect x="16" y="24" width="4" height="4" fill="#FCD34D" />
    </svg>
  );
}
