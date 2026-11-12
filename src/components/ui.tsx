import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { GraduationCap, Lightbulb, MonitorPlay, Presentation, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import type { Category, EventStatus } from '../data'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'lime' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-900/10',
  secondary: 'bg-white text-slate-800 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300',
  ghost: 'text-slate-700 hover:bg-slate-100',
  dark: 'bg-emerald-950 text-white hover:bg-emerald-900',
  lime: 'bg-lime-300 text-emerald-950 hover:bg-lime-200',
  danger: 'bg-white text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-50',
}
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra?: string) {
  return cn(
    'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    extra,
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...rest} />
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}) {
  return (
    <a href={`#${to}`} className={buttonClass(variant, size, className)}>
      {children}
    </a>
  )
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-slate-200/80 bg-white shadow-soft', className)}>{children}</div>
  )
}

type Tone = 'emerald' | 'lime' | 'teal' | 'amber' | 'rose' | 'slate' | 'sky'
const tones: Record<Tone, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  lime: 'bg-lime-100 text-lime-800 ring-lime-600/20',
  teal: 'bg-teal-50 text-teal-700 ring-teal-600/15',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  rose: 'bg-rose-50 text-rose-700 ring-rose-600/15',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/15',
  sky: 'bg-sky-50 text-sky-700 ring-sky-600/15',
}

export function Badge({ tone = 'emerald', className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export const statusTone: Record<EventStatus, Tone> = {
  'Pendaftaran Dibuka': 'emerald',
  'Kuota Penuh': 'amber',
  Draf: 'slate',
  Berlangsung: 'teal',
  Selesai: 'sky',
}

export const categoryMeta: Record<Category, { icon: LucideIcon; tone: Tone }> = {
  Seminar: { icon: Presentation, tone: 'emerald' },
  Workshop: { icon: Lightbulb, tone: 'lime' },
  Pelatihan: { icon: GraduationCap, tone: 'teal' },
  Webinar: { icon: MonitorPlay, tone: 'sky' },
}

export function CategoryBadge({ category, className }: { category: Category; className?: string }) {
  const { icon: Icon, tone } = categoryMeta[category]
  return (
    <Badge tone={tone} className={className}>
      <Icon className="size-3.5" aria-hidden />
      {category}
    </Badge>
  )
}

export function Progress({ value, max, className, tone = 'emerald' }: { value: number; max: number; className?: string; tone?: 'emerald' | 'amber' | 'lime' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const color = tone === 'amber' ? 'bg-amber-500' : tone === 'lime' ? 'bg-lime-400' : 'bg-emerald-500'
  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-slate-100', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn('h-full rounded-full', color)} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-emerald-700 uppercase', className)}>
      <span className="h-px w-5 bg-emerald-500" aria-hidden />
      {children}
    </p>
  )
}

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  hint,
  trend,
  accent = 'emerald',
}: {
  icon: LucideIcon
  label: string
  value: string
  unit?: string
  hint?: string
  trend?: string
  accent?: 'emerald' | 'lime' | 'teal' | 'slate'
}) {
  const iconBg = {
    emerald: 'bg-emerald-50 text-emerald-700',
    lime: 'bg-lime-100 text-lime-800',
    teal: 'bg-teal-50 text-teal-700',
    slate: 'bg-slate-100 text-slate-700',
  }[accent]
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid size-10 place-items-center rounded-xl', iconBg)}>
          <Icon className="size-5" aria-hidden />
        </span>
        {trend && <Badge tone="emerald">{trend}</Badge>}
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
        {unit && <span className="ml-1 text-sm font-semibold text-slate-500">{unit}</span>}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </Card>
  )
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string
  description?: string
  actions?: ReactNode
  eyebrow?: string
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
      {children}
    </label>
  )
}

const fieldBase =
  'block w-full rounded-xl border-0 bg-white px-3.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none'

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, 'h-11', className)} {...rest} />
}

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, 'h-11 pr-9', className)} {...rest}>
      {children}
    </select>
  )
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
  const palette = ['bg-emerald-100 text-emerald-800', 'bg-teal-100 text-teal-800', 'bg-lime-100 text-lime-800', 'bg-slate-200 text-slate-700']
  const idx = name.length % palette.length
  return (
    <span className={cn('grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold', palette[idx], className)} aria-hidden>
      {initials}
    </span>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn('relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors', checked ? 'bg-emerald-600' : 'bg-slate-300')}
    >
      <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', checked ? 'left-[22px]' : 'left-0.5')} />
    </button>
  )
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  label: string
  className?: string
}) {
  return (
    <div role="tablist" aria-label={label} className={cn('inline-flex rounded-xl bg-slate-100 p-1', className)}>
      {options.map((o) => (
        <button
          key={o}
          role="tab"
          type="button"
          aria-selected={value === o}
          onClick={() => onChange(o)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
            value === o ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
