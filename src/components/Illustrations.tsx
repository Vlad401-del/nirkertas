import { cn } from '../lib/cn'

/** Logo mark: a leaf folded into a ticket stub. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="#047857" />
      <path d="M9 22.5C9 14 15 8.5 24 8.5c0 8.5-5.5 14.5-14 14.5" fill="#a3e635" />
      <path d="M9.5 22.5 19 13" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-8" />
      <span className={cn('text-[17px] font-extrabold tracking-tight', inverted ? 'text-white' : 'text-slate-900')}>
        nirkertas<span className="text-lime-500">.</span>
      </span>
    </span>
  )
}

/** Phone with a ticket and leaves — used in empty/onboarding states. */
export function TicketIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 180" className={className} fill="none" aria-hidden>
      <circle cx="120" cy="96" r="72" fill="#ecfdf5" />
      <path d="M44 150c10-34 36-46 52-44-6 22-26 40-52 44Z" fill="#a7f3d0" />
      <path d="M196 140c-12-26-34-34-48-30 8 18 28 30 48 30Z" fill="#d9f99d" />
      <rect x="86" y="30" width="68" height="124" rx="14" fill="#fff" stroke="#047857" strokeWidth="2" />
      <rect x="110" y="37" width="20" height="4" rx="2" fill="#a7f3d0" />
      <rect x="96" y="52" width="48" height="58" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <g fill="#047857">
        <rect x="104" y="60" width="10" height="10" rx="1.5" />
        <rect x="126" y="60" width="10" height="10" rx="1.5" />
        <rect x="104" y="82" width="10" height="10" rx="1.5" />
        <rect x="118" y="74" width="4" height="4" />
        <rect x="126" y="84" width="4" height="4" />
        <rect x="132" y="90" width="4" height="4" />
        <rect x="120" y="94" width="4" height="4" />
      </g>
      <rect x="96" y="118" width="48" height="6" rx="3" fill="#d1fae5" />
      <rect x="96" y="130" width="30" height="6" rx="3" fill="#d1fae5" />
      <path d="M150 64c14-14 32-14 40-10-4 16-22 24-40 10Z" fill="#84cc16" />
      <path d="M152 63c10-4 20-6 30-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Certificate with ribbon and leaf. */
export function CertificateIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none" aria-hidden>
      <circle cx="100" cy="78" r="62" fill="#ecfdf5" />
      <rect x="38" y="36" width="124" height="84" rx="10" fill="#fff" stroke="#047857" strokeWidth="2" />
      <rect x="48" y="46" width="104" height="64" rx="6" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="70" y="56" width="60" height="6" rx="3" fill="#10b981" />
      <rect x="62" y="70" width="76" height="4" rx="2" fill="#d1fae5" />
      <rect x="76" y="80" width="48" height="4" rx="2" fill="#d1fae5" />
      <circle cx="138" cy="104" r="14" fill="#a3e635" />
      <path d="m132 104 4 4 8-8" stroke="#022c22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 128c8-22 26-28 36-26-4 14-18 24-36 26Z" fill="#6ee7b7" />
    </svg>
  )
}

/** Stack of paper fading into a leaf — impact hero. */
export function PaperToLeafIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 140" className={className} fill="none" aria-hidden>
      <g opacity="0.9">
        <rect x="14" y="40" width="64" height="82" rx="6" fill="#fff" fillOpacity=".12" stroke="#fff" strokeOpacity=".35" />
        <rect x="22" y="32" width="64" height="82" rx="6" fill="#fff" fillOpacity=".16" stroke="#fff" strokeOpacity=".45" />
        <rect x="30" y="24" width="64" height="82" rx="6" fill="#fff" fillOpacity=".22" stroke="#fff" strokeOpacity=".6" />
        <rect x="40" y="38" width="40" height="4" rx="2" fill="#fff" fillOpacity=".6" />
        <rect x="40" y="48" width="30" height="4" rx="2" fill="#fff" fillOpacity=".4" />
      </g>
      <path d="M104 72h28" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 6" />
      <path d="m128 66 6 6-6 6" stroke="#bef264" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 116c0-48 22-80 58-84 2 46-20 80-58 84Z" fill="#a3e635" />
      <path d="M152 114c12-24 26-44 46-64" stroke="#022c22" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
