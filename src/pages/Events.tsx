import { useMemo, useState } from 'react'
import { Leaf, Search, SlidersHorizontal } from 'lucide-react'
import { EventCard } from '../components/EventCard'
import { TicketIllustration } from '../components/Illustrations'
import { Button, Eyebrow, Input, Select, categoryMeta } from '../components/ui'
import { events, type Category } from '../data'
import { cn } from '../lib/cn'

const categories: Array<'Semua' | Category> = ['Semua', 'Seminar', 'Workshop', 'Pelatihan', 'Webinar']

export function Events() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<(typeof categories)[number]>('Semua')
  const [mode, setMode] = useState('Semua')
  const [sort, setSort] = useState('terdekat')

  const list = useMemo(() => {
    let r = events.filter(
      (e) =>
        (cat === 'Semua' || e.category === cat) &&
        (mode === 'Semua' || e.mode === mode) &&
        (q === '' || `${e.title} ${e.organizer} ${e.location}`.toLowerCase().includes(q.toLowerCase())),
    )
    if (sort === 'populer') r = [...r].sort((a, b) => b.registered / b.quota - a.registered / a.quota)
    if (sort === 'sisa') r = [...r].sort((a, b) => b.quota - b.registered - (a.quota - a.registered))
    return r
  }, [q, cat, mode, sort])

  return (
    <div>
      <section className="border-b border-slate-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Eyebrow>Jelajahi acara</Eyebrow>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Acara kampus semester ini</h1>
              <p className="mt-2 max-w-xl text-slate-600">
                Seminar, workshop, pelatihan, dan webinar dari organisasi mahasiswa. Semua tiket dan sertifikat 100% digital.
              </p>
            </div>
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 lg:self-auto">
              <Leaf className="size-3.5" aria-hidden /> {events.length} acara paperless tersedia
            </p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <label htmlFor="cari" className="sr-only">Cari acara</label>
              <Input id="cari" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari judul, penyelenggara, atau lokasi…" className="pl-10" />
            </div>
            <div>
              <label htmlFor="mode" className="sr-only">Mode acara</label>
              <Select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="Semua">Semua mode</option>
                <option value="Luring">Luring</option>
                <option value="Daring">Daring</option>
              </Select>
            </div>
            <div>
              <label htmlFor="urut" className="sr-only">Urutkan</label>
              <Select id="urut" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="terdekat">Tanggal terdekat</option>
                <option value="populer">Paling diminati</option>
                <option value="sisa">Kuota tersisa terbanyak</option>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter kategori">
            {categories.map((c) => {
              const Icon = c === 'Semua' ? SlidersHorizontal : categoryMeta[c].icon
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    cat === c ? 'bg-emerald-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-slate-500" aria-live="polite">
          Menampilkan <span className="font-semibold text-slate-800">{list.length}</span> acara
        </p>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <TicketIllustration className="w-48" />
            <p className="mt-4 font-semibold text-slate-900">Belum ada acara yang cocok</p>
            <p className="mt-1 text-sm text-slate-500">Coba kata kunci lain atau hapus filter.</p>
            <Button
              variant="secondary"
              className="mt-5"
              onClick={() => {
                setQ('')
                setCat('Semua')
                setMode('Semua')
              }}
            >
              Reset filter
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
