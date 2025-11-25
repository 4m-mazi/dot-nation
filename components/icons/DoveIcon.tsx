export function DoveIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      role="img"
      aria-label="鳩のアイコン"
    >
      <title>鳩</title>
      {/* 鳩のドット絵 */}
      <rect x="16" y="8" width="4" height="4" fill="#E5E7EB" />
      <rect x="12" y="12" width="4" height="4" fill="#E5E7EB" />
      <rect x="16" y="12" width="4" height="4" fill="#F3F4F6" />
      <rect x="20" y="12" width="4" height="4" fill="#E5E7EB" />
      <rect x="8" y="16" width="4" height="4" fill="#E5E7EB" />
      <rect x="12" y="16" width="4" height="4" fill="#F3F4F6" />
      <rect x="16" y="16" width="4" height="4" fill="#FFFFFF" />
      <rect x="20" y="16" width="4" height="4" fill="#F3F4F6" />
      <rect x="24" y="16" width="4" height="4" fill="#E5E7EB" />
      {/* くちばし */}
      <rect x="28" y="16" width="4" height="4" fill="#FCD34D" />
      {/* 体 */}
      <rect x="4" y="20" width="4" height="4" fill="#E5E7EB" />
      <rect x="8" y="20" width="4" height="4" fill="#F3F4F6" />
      <rect x="12" y="20" width="4" height="4" fill="#FFFFFF" />
      <rect x="16" y="20" width="4" height="4" fill="#F3F4F6" />
      <rect x="20" y="20" width="4" height="4" fill="#E5E7EB" />
      <rect x="8" y="24" width="4" height="4" fill="#E5E7EB" />
      <rect x="12" y="24" width="4" height="4" fill="#F3F4F6" />
      <rect x="16" y="24" width="4" height="4" fill="#E5E7EB" />
    </svg>
  );
}
