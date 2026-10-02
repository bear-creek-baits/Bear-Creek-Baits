/** Small inline icon set (stroke icons, 24px grid). Avoids an icon-library dependency. */
type IconName =
  | 'cart'
  | 'search'
  | 'menu'
  | 'close'
  | 'plus'
  | 'minus'
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-right'
  | 'trash'
  | 'facebook'
  | 'check'
  | 'filter'
  | 'box'
  | 'fish'
  | 'lock'
  | 'camera';

const paths: Record<IconName, React.ReactNode> = {
  cart: (
    <>
      <path d="M3 4h2.2l2.1 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.1" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  trash: <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 12.5h9L17.5 7M10 11v5M14 11v5" />,
  facebook: <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8.8v3h2.6V21" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  box: (
    <>
      <path d="M3.5 8 12 4l8.5 4v8L12 20l-8.5-4z" />
      <path d="M3.5 8 12 12l8.5-4M12 12v8" />
    </>
  ),
  fish: (
    <>
      <path d="M3 12c3-4.5 7-6 11-5 2.3.6 4.3 2.4 5.5 5-1.2 2.6-3.2 4.4-5.5 5-4 1-8-.5-11-5Z" />
      <path d="M3 12 1.5 8.5M3 12l-1.5 3.5" />
      <circle cx="15.5" cy="11" r=".9" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
};

export function Icon({ name, size = 24, className, strokeWidth = 2 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
