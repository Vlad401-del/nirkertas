import { useState } from 'react'
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  Download,
  Info,
  Leaf,
  MapPin,
  MonitorPlay,
  ShieldCheck,
  Sun,
} from 'lucide-react'
import { Badge, Button, Card, CategoryBadge, PageHeader } from '../components/ui'
import { QRCode } from '../components/QRCode'
import { currentUser, getEvent, img, myTickets } from '../data'
import { cn } from '../lib/cn'

export function MyTicket() {
  const [selected, setSelected] = useState(myTickets[0].code)
  const ticket = myTickets.find((t) => t.code === selected)!
  const event = getEvent(ticket.eventId)!

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Tiket saya"
        title="E-tiket acara"
        description="Tunjukkan QR Code kepada panitia saat registrasi ulang. Tidak perlu mencetak tiket."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Ticket list */}
        <div>
          <p className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">Akan datang · {myTickets.length}</p>
          <ul className="space-y-3" role="listbox" aria-label="Pilih tiket">
            {myTickets.map((t) => {
              const e = getEvent(t.eventId)!
              const active = t.code === selected
              return (
                <li key={t.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setSelected(t.code)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left transition',
                      active ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-200 hover:border-slate-300',
                    )}
                  >
                    <img src={img(e.image, 200)} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm leading-snug font-semibold text-slate-900">{e.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {e.day} {e.month} · {e.mode}
                      </p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <Leaf className="size-4" aria-hidden /> Kontribusimu
            </p>
            <p className="mt-1 text-sm text-emerald-900/75">
              3 e-tiket ini menggantikan 3 lembar tiket cetak, setara ± 13,8 g CO2e yang tidak diemisikan.
            </p>
          </div>
        </div>

        {/* Ticket */}
        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-slate-200/80">
            <div className="relative bg-emerald-950 p-6 text-white sm:p-8">
              <img src={img(event.image, 1080)} alt="" className="absolute inset-0 size-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-950/85 to-teal-900/70" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold tracking-[0.2em] text-lime-300 uppercase">E-Tiket · nirkertas</p>
                  <Badge tone="lime" className="bg-lime-300 text-emerald-950 ring-0">
                    <ShieldCheck className="size-3.5" aria-hidden /> {ticket.status}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl leading-snug font-bold sm:text-2xl">{event.title}</h2>
                <p className="mt-1 text-sm text-emerald-100/80">{event.organizer}</p>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                {[
                  { icon: CalendarDays, l: 'Tanggal', v: event.date },
                  { icon: Clock, l: 'Waktu', v: event.time },
                  { icon: event.mode === 'Daring' ? MonitorPlay : MapPin, l: 'Lokasi', v: event.location },
                  { icon: Info, l: 'Tempat duduk', v: ticket.seat },
                ].map(({ icon: Icon, l, v }) => (
                  <div key={l}>
                    <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Icon className="size-3.5" aria-hidden /> {l}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">{v}</dd>
                  </div>
                ))}
                <div className="col-span-2 border-t border-slate-100 pt-5">
                  <dt className="text-xs text-slate-500">Nama peserta</dt>
                  <dd className="mt-1 font-semibold text-slate-900">{currentUser.name}</dd>
                  <dd className="text-xs text-slate-500">
                    {currentUser.nim} · {currentUser.prodi}
                  </dd>
                </div>
              </dl>
              <div className="hidden sm:block">
                <CategoryBadge category={event.category} />
              </div>
            </div>

            {/* Perforation */}
            <div className="relative flex items-center">
              <span className="absolute -left-4 size-8 rounded-full bg-slate-50 ring-1 ring-slate-200/80" aria-hidden />
              <div className="perforation mx-6 h-1 flex-1" aria-hidden />
              <span className="absolute -right-4 size-8 rounded-full bg-slate-50 ring-1 ring-slate-200/80" aria-hidden />
            </div>

            <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
              <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                <QRCode value={ticket.code} className="size-44 sm:size-48" label={`QR Code tiket ${ticket.code}`} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-500">Kode tiket</p>
                <p className="font-mono text-xl font-bold tracking-wider text-slate-900">{ticket.code}</p>
                <p className="mt-1 text-xs text-slate-500">Diterbitkan {ticket.issuedAt}</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                  <Sun className="size-3.5" aria-hidden /> Naikkan kecerahan layar saat dipindai
                </p>
              </div>
            </div>
          </div>

          {/* Side actions */}
          <div className="space-y-4">
            <Card className="p-5">
              <p className="text-sm font-semibold text-slate-900">Simpan tiket</p>
              <div className="mt-4 space-y-2">
                <Button className="w-full">
                  <Download className="size-4" aria-hidden /> Unduh PDF
                </Button>
                <Button variant="secondary" className="w-full">
                  <CalendarPlus className="size-4" aria-hidden /> Tambah ke kalender
                </Button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">PDF disarankan disimpan di ponsel, bukan dicetak.</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-semibold text-slate-900">Petunjuk masuk</p>
              <ol className="mt-3 space-y-3 text-sm text-slate-600">
                {['Datang 15–30 menit sebelum acara dimulai.', 'Buka halaman ini dan tampilkan QR Code.', 'Panitia memindai, presensi tercatat otomatis.', 'E-sertifikat terbit setelah acara selesai.'].map(
                  (s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">{i + 1}</span>
                      {s}
                    </li>
                  ),
                )}
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
