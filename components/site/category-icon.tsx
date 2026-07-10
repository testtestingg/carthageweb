import {
  Droplet,
  PenTool,
  Sparkles,
  GraduationCap,
  Palette,
  Syringe,
  Heart,
  Star,
  Package,
  Brush,
  Shield,
  Leaf,
  type LucideIcon,
} from "lucide-react"

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  droplet: Droplet,
  "pen-tool": PenTool,
  sparkles: Sparkles,
  "graduation-cap": GraduationCap,
  palette: Palette,
  syringe: Syringe,
  heart: Heart,
  star: Star,
  package: Package,
  brush: Brush,
  shield: Shield,
  leaf: Leaf,
}

export function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = CATEGORY_ICONS[icon] ?? Package
  return <Icon className={className} aria-hidden="true" />
}
