/**
 * Custom category icons drawn for Carthage (24x24, 1.5px stroke).
 * Same keyed API as before so the admin icon picker and stored
 * category data keep working.
 */

type IconProps = { className?: string }

function Svg({ className, children, label }: IconProps & { children: React.ReactNode; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {children}
    </svg>
  )
}

/** Pigment bottle with a drop — PMU pigments */
function PigmentIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 3h4" />
      <path d="M10.5 3v3.2L8.6 8.6A2 2 0 0 0 8 10v8a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-8a2 2 0 0 0-.6-1.4l-1.9-2.4V3" />
      <path d="M12 12.2s-1.8 2-1.8 3.3a1.8 1.8 0 0 0 3.6 0c0-1.3-1.8-3.3-1.8-3.3Z" />
    </Svg>
  )
}

/** Cartridge needle / PMU pen */
function NeedleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m17.5 2.5 4 4-3 3-4-4 3-3Z" />
      <path d="m14.5 5.5-9.8 9.8a2.5 2.5 0 0 0-.7 1.4l-.5 3.9a.6.6 0 0 0 .7.7l3.9-.5a2.5 2.5 0 0 0 1.4-.7l9.8-9.8" />
      <path d="m5 15.5 3.5 3.5" />
    </Svg>
  )
}

/** Cream jar with a sparkle — skincare & cosmetics */
function SkincareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 10h12v7a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-7Z" />
      <path d="M7 10V8.5A1.5 1.5 0 0 1 8.5 7h7A1.5 1.5 0 0 1 17 8.5V10" />
      <path d="M18.5 2.5v3M17 4h3" />
    </Svg>
  )
}

/** Mortarboard with tassel — academy */
function AcademyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 4 10 4.5L12 13 2 8.5 12 4Z" />
      <path d="M6.5 10.8V15c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.2" />
      <path d="M22 8.5V14" />
    </Svg>
  )
}

/** Sheet of paper with a leaf — stone paper */
function StonePaperIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 2.8h7.5L19 7.3V19a2.2 2.2 0 0 1-2.2 2.2H7A2.2 2.2 0 0 1 4.8 19V5A2.2 2.2 0 0 1 7 2.8Z" />
      <path d="M14.2 3v4.6H19" />
      <path d="M12 16.8c-2.6 0-3.8-1.9-3.8-3.9 2.9-.4 5.6.3 5.9 3.2-.6.4-1.3.7-2.1.7Z" />
      <path d="M8.6 17.9c1-1.6 2.2-2.7 4-3.3" />
    </Svg>
  )
}

/** Makeup brush */
function BrushIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m20.5 3.5-8.7 8.7" />
      <path d="M11.8 12.2 8.6 15.4a3 3 0 0 1-4.2 0l-.8-.8 8.2-8.2 2.4 2.4-2.4 3.4Z" />
      <path d="M3.6 14.6c-.8 1.7-1 3.4-.6 5.4 2 .4 3.7.2 5.4-.6" />
    </Svg>
  )
}

/** Palette */
function PaletteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.6.7.2 2.7-2.5 2.7Z" />
      <circle cx="7.8" cy="10.5" r="0.9" />
      <circle cx="12" cy="7.8" r="0.9" />
      <circle cx="16.2" cy="10.5" r="0.9" />
    </Svg>
  )
}

/** Syringe */
function SyringeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 9.7 18.3a2 2 0 0 1-1.4.6H5.5A1.5 1.5 0 0 1 4 17.4v-2.8a2 2 0 0 1 .6-1.4L14 4" />
      <path d="m2 22 3-3" />
      <path d="m10.5 10.5 2 2" />
    </Svg>
  )
}

/** Heart */
function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20.5S3.5 15.4 3.5 9.4a4.6 4.6 0 0 1 8.5-2.5 4.6 4.6 0 0 1 8.5 2.5c0 6-8.5 11.1-8.5 11.1Z" />
    </Svg>
  )
}

/** Star */
function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.4l-5.1 2.7 1-5.6-4.1-4 5.7-.8L12 3.5Z" />
    </Svg>
  )
}

/** Package box */
function PackageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="m4 7 8 4 8-4" />
      <path d="M12 11v10" />
    </Svg>
  )
}

/** Shield with check */
function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.8 19.5 5.5v6c0 4.6-3.2 8-7.5 9.7-4.3-1.7-7.5-5.1-7.5-9.7v-6L12 2.8Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.2" />
    </Svg>
  )
}

const CUSTOM_ICONS: Record<string, (props: IconProps) => React.ReactNode> = {
  droplet: PigmentIcon,
  "pen-tool": NeedleIcon,
  sparkles: SkincareIcon,
  "graduation-cap": AcademyIcon,
  leaf: StonePaperIcon,
  brush: BrushIcon,
  palette: PaletteIcon,
  syringe: SyringeIcon,
  heart: HeartIcon,
  star: StarIcon,
  package: PackageIcon,
  shield: ShieldIcon,
}

export const CATEGORY_ICON_KEYS = Object.keys(CUSTOM_ICONS)

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = CUSTOM_ICONS[icon] ?? PackageIcon
  return <Icon className={className} />
}
