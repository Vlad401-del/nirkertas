import { useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  Bell,
  CalendarRange,
  LayoutDashboard,
  Leaf,
  Menu,
  ScanLine,
  Sprout,
  Users,
  X,
} from 'lucide-react'
import { Logo } from './Illustrations'
import { cn } from '../lib/cn'
import { organizer } from '../data'

const nav = [
  { to: '/panel', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/panel/acara', label: 'Kelola Acara', icon: CalendarRange },
  { to: '/panel/peserta', label: 'Daftar Peserta', icon: Users },
  { to: '/panel/pindai', label: 'Pindai QR Presensi', icon: ScanLine },
  { to: '/panel/dampak', label: 'Dampak Lingkungan', icon: Sprout },
]

function isActive(path: string, to: string) {
  return to === '/panel' ? path === '/panel' : path.startsWith(to)
}

function SidebarContent({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-5">
        <a href="#/" aria-label="nirkertas, beranda">
          <Logo inverted />
        </a>
      </div>
      <div className="mx-4 mt-6 flex items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
        <span className="grid size-9 place-items-center rounded-lg bg-lime-300 text-xs font-extrabold text-emerald-950">BEM</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{organizer.name}</p>
          <p className="text-xs text-emerald-200/70">Penyelenggara terverifikasi</p>
        </div>
      </div>
      <nav aria-label="Navigasi penyelenggara" className="mt-6 flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = isActive(path, to)
          return (
            <a
              key={to}
              href={`#${to}`}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-emerald-500/15 text-white ring-1 ring-emerald-400/25' : 'text-emerald-100/70 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon className={cn('size-[18px]', active && 'text-lime-300')} aria-hidden />
              {label}
            </a>
          )
        })}
      </nav>
      <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/10 p-4 ring-1 ring-emerald-400/20">
        <Leaf className="size-5 text-lime-300" aria-hidden />
        <p className="mt-2 text-sm font-semibold text-white">1.842 lembar dihemat</p>
        <p className="mt-0.5 text-xs leading-relaxed text-emerald-100/70">Bulan ini, setara 8,5 kg CO2e tidak terlepas ke atmosfer.</p>
        <a href="#/panel/dampak" onClick={onNavigate} className="mt-3 inline-block text-xs font-semibold text-lime-300 hover:text-lime-200">
          Lihat laporan dampak →
        </a>
      </div>
      <a href="#/" className="mx-4 mb-5 flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-emerald-100/60 hover:text-white">
        <ArrowLeft className="size-4" aria-hidden /> Kembali ke situs peserta
      </a>
    </div>
  )
}

export function OrganizerLayout({ path, children }: { path: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-emerald-950 lg:block">
        <SidebarContent path={path} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu penyelenggara">
          <button type="button" className="absolute inset-0 bg-slate-950/50" onClick={() => setOpen(false)} aria-label="Tutup menu" />
          <aside className="absolute inset-y-0 left-0 w-72 bg-emerald-950">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-3 grid size-9 place-items-center rounded-lg text-emerald-100 hover:bg-white/10"
              aria-label="Tutup menu"
            >
              <X className="size-5" />
            </button>
            <SidebarContent path={path} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/85 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <Menu className="size-5" />
          </button>
          <p className="hidden text-sm text-slate-500 sm:block">
            Semester Ganjil 2026/2027 · <span className="font-medium text-slate-700">{organizer.name}</span>
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="relative grid size-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Notifikasi, 3 baru">
              <Bell className="size-5" />
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-lime-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 ring-1 ring-slate-200">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{organizer.initials}</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-slate-800">{organizer.admin}</p>
                <p className="text-[11px] text-slate-500">{organizer.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
