import { useState, type ReactNode } from 'react'
import { LayoutDashboard, Leaf, Menu, X } from 'lucide-react'
import { Logo } from './Illustrations'
import { ButtonLink } from './ui'
import { cn } from '../lib/cn'
import { currentUser } from '../data'

const nav = [
  { to: '/', label: 'Beranda' },
  { to: '/acara', label: 'Jelajahi Acara' },
  { to: '/tiket', label: 'Tiket Saya' },
  { to: '/sertifikat', label: 'Riwayat & Sertifikat' },
]

function isActive(path: string, to: string) {
  return to === '/' ? path === '/' : path.startsWith(to)
}

export function PublicLayout({ path, children }: { path: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <a href="#/" aria-label="nirkertas, beranda">
            <Logo />
          </a>
          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.to}
                href={`#${n.to}`}
                aria-current={isActive(path, n.to) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(path, n.to) ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900',
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink to="/panel" variant="secondary" size="sm">
              <LayoutDashboard className="size-4" aria-hidden />
              Panel Penyelenggara
            </ButtonLink>
            <a href="#/tiket" className="flex items-center gap-2 rounded-full p-0.5 pr-1" aria-label={`Akun ${currentUser.name}`}>
              <span className="grid size-9 place-items-center rounded-full bg-emerald-950 text-xs font-bold text-lime-300">
                {currentUser.initials}
              </span>
            </a>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav aria-label="Navigasi seluler" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            {nav.map((n) => (
              <a
                key={n.to}
                href={`#${n.to}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm font-medium',
                  isActive(path, n.to) ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700',
                )}
              >
                {n.label}
              </a>
            ))}
            <a href="#/panel" onClick={() => setOpen(false)} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-emerald-700">
              <LayoutDashboard className="size-4" aria-hidden /> Panel Penyelenggara
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              E-ticketing dan manajemen acara paperless untuk kegiatan kampus yang lebih rapi dan lebih hijau.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <Leaf className="size-3.5" aria-hidden /> 18.590 lembar kertas dihemat tahun ini
            </p>
          </div>
          {[
            { title: 'Peserta', links: [['Jelajahi Acara', '/acara'], ['Tiket Saya', '/tiket'], ['Sertifikat', '/sertifikat']] },
            { title: 'Penyelenggara', links: [['Dashboard', '/panel'], ['Kelola Acara', '/panel/acara'], ['Pindai QR', '/panel/pindai']] },
            { title: 'Keberlanjutan', links: [['Dampak Lingkungan', '/panel/dampak'], ['Metodologi', '/panel/dampak'], ['Panduan Acara Hijau', '/']] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-900">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <a href={`#${to}`} className="text-sm text-slate-500 hover:text-emerald-700">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100">
          <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-400 sm:px-6 lg:px-8">
            © 2026 nirkertas · Dikembangkan untuk organisasi mahasiswa Universitas Nusantara
          </p>
        </div>
      </footer>
    </div>
  )
}
