import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CircleCheck,
  Clock,
  Leaf,
  MapPin,
  MonitorPlay,
  QrCode,
  Share2,
  Ticket,
  Users,
} from 'lucide-react'
import { Avatar, Badge, Button, ButtonLink, Card, CategoryBadge, Input, Label, Progress, Select } from '../components/ui'
import { currentUser, getEvent, img } from '../data'
import { nf } from '../lib/cn'

export function EventDetail({ id }: { id: string }) {
  const event = getEvent(id)
  const [done, setDone] = useState(false)
  const [agree, setAgree] = useState(true)

  if (!event) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-lg font-semibold">Acara tidak ditemukan</p>
        <ButtonLink to="/acara" variant="secondary" className="mt-6">
          Kembali ke daftar acara
        </ButtonLink>
      </div>
    )
  }

  const full = event.registered >= event.quota
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <div>
      {/* Banner */}
      <section className="relative h-64 overflow-hidden bg-emerald-950 sm:h-80">
        <img src={img(event.image, 1600)} alt={event.imageAlt} className="absolute inset-0 size-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-6 sm:px-6 lg:px-8">
          <a href="#/acara" className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20">
            <ArrowLeft className="size-4" aria-hidden /> Semua acara
          </a>
          <div className="max-w-3xl pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={event.category} />
              <Badge tone="lime" className="bg-lime-300 text-emerald-950 ring-0">
                <Leaf className="size-3.5" aria-hidden /> Acara paperless
              </Badge>
            </div>
            <h1 className="mt-3 text-2xl leading-tight font-bold tracking-tight text-white sm:text-4xl">{event.title}</h1>
            <p className="mt-2 text-sm text-emerald-100/85">Diselenggarakan oleh {event.organizer}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8">
        {/* Main */}
        <div className="space-y-8">
          <Card className="grid gap-px overflow-hidden bg-slate-200/70 sm:grid-cols-3">
            {[
              { icon: CalendarDays, l: 'Tanggal', v: event.date },
              { icon: Clock, l: 'Waktu', v: event.time },
              { icon: event.mode === 'Daring' ? MonitorPlay : MapPin, l: event.mode === 'Daring' ? 'Platform' : 'Lokasi', v: event.location },
            ].map(({ icon: Icon, l, v }) => (
              <div key={l} className="flex gap-3 bg-white p-5">
                <Icon className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
                <div>
                  <p className="text-xs text-slate-500">{l}</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">{v}</p>
                </div>
              </div>
            ))}
          </Card>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Tentang acara</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{event.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {event.benefits.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200">
                  <CircleCheck className="size-4 text-emerald-600" aria-hidden /> {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Pembicara</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <Card key={s.name} className="flex items-center gap-3 p-4">
                  <Avatar name={s.name.replace(/^(Dr\.|Prof\.|Drs\.)\s*(Dr\.)?\s*(Ir\.)?\s*/, '')} className="size-11" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{s.name}</p>
                    <p className="truncate text-xs text-slate-500">{s.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Rundown</h2>
            <Card className="mt-4 p-2">
              <ol>
                {event.agenda.map((a, i) => (
                  <li key={i} className="flex gap-4 rounded-xl px-4 py-3 odd:bg-slate-50/70">
                    <span className="w-14 shrink-0 font-mono text-sm font-semibold text-emerald-700">{a.time}</span>
                    <span className="text-sm text-slate-700">{a.title}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          <section className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 ring-1 ring-emerald-100">
                <Leaf className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold text-emerald-950">Komitmen acara tanpa kertas</h2>
                <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">
                  Tiket, presensi, materi, dan sertifikat acara ini sepenuhnya digital. Dengan {nf.format(event.quota)} kuota peserta,
                  acara ini berpotensi menghemat ± {nf.format(event.quota * 3)} lembar kertas.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Registration */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            {done ? (
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CircleCheck className="size-7" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">Pendaftaran berhasil</h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  E-tiket dengan QR Code sudah dikirim ke <span className="font-medium text-slate-700">{currentUser.email}</span> dan tersimpan di akunmu.
                </p>
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm">
                  <p className="text-xs text-slate-500">Kode tiket</p>
                  <p className="font-mono font-semibold text-slate-900">NKT-{event.id.slice(0, 4).toUpperCase()}-{String(event.registered + 1).padStart(4, '0')}</p>
                </div>
                <ButtonLink to="/tiket" className="mt-5 w-full">
                  <Ticket className="size-4" aria-hidden /> Lihat E-Tiket
                </ButtonLink>
                <button type="button" onClick={() => setDone(false)} className="mt-3 text-sm font-medium text-slate-500 hover:text-slate-800">
                  Kembali ke formulir
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Daftar acara</h2>
                  <Badge tone={full ? 'amber' : 'emerald'}>{full ? 'Kuota penuh' : 'Gratis'}</Badge>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <Users className="size-3.5" aria-hidden /> {nf.format(event.registered)} terdaftar
                    </span>
                    <span className="font-semibold text-slate-700">Kuota {nf.format(event.quota)}</span>
                  </div>
                  <Progress value={event.registered} max={event.quota} tone={full ? 'amber' : 'emerald'} />
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="nama">Nama lengkap</Label>
                    <Input id="nama" defaultValue={currentUser.name} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="nim">NIM</Label>
                      <Input id="nim" defaultValue={currentUser.nim} inputMode="numeric" required />
                    </div>
                    <div>
                      <Label htmlFor="angkatan">Angkatan</Label>
                      <Select id="angkatan" defaultValue="2022">
                        {['2020', '2021', '2022', '2023', '2024', '2025'].map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email kampus</Label>
                    <Input id="email" type="email" defaultValue={currentUser.email} required />
                  </div>
                  <div>
                    <Label htmlFor="prodi">Program studi</Label>
                    <Input id="prodi" defaultValue={currentUser.prodi} required />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-slate-300 accent-emerald-600"
                    />
                    Saya bersedia hadir dan menerima e-tiket serta e-sertifikat melalui email kampus.
                  </label>
                  <Button type="submit" size="lg" className="w-full" disabled={full || !agree}>
                    <QrCode className="size-4" aria-hidden /> {full ? 'Kuota sudah penuh' : 'Daftar dan dapatkan e-tiket'}
                  </Button>
                </form>

                <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                    <Ticket className="size-4 text-emerald-600" aria-hidden /> E-tiket QR Code dikirim instan
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="size-4 text-emerald-600" aria-hidden /> E-sertifikat tersedia setelah presensi
                  </li>
                </ul>
              </>
            )}
          </Card>
          <Button variant="ghost" className="mt-3 w-full" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
            <Share2 className="size-4" aria-hidden /> Salin tautan acara
          </Button>
        </aside>
      </div>
    </div>
  )
}
