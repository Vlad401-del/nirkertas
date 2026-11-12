import { useMemo, useState, type FormEvent } from 'react'
import {
  Award,
  CalendarDays,
  CirclePlus,
  Copy,
  Image as ImageIcon,
  Leaf,
  MapPin,
  PencilLine,
  QrCode,
  ScanLine,
  Search,
  Users,
  X,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CategoryBadge,
  Input,
  Label,
  PageHeader,
  Progress,
  Segmented,
  Select,
  Toggle,
  statusTone,
} from '../../components/ui'
import { managedEvents, type ManagedEvent } from '../../data'
import { nf } from '../../lib/cn'

const tabs = ['Semua', 'Aktif', 'Draf', 'Selesai'] as const

function CreateEventPanel({ onClose, onCreate }: { onClose: () => void; onCreate: (e: ManagedEvent) => void }) {
  const [qr, setQr] = useState(true)
  const [cert, setCert] = useState(true)
  const [reminder, setReminder] = useState(true)

  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    onCreate({
      id: `new-${Date.now()}`,
      title: String(f.get('judul') || 'Acara baru'),
      category: (f.get('kategori') as ManagedEvent['category']) || 'Seminar',
      date: String(f.get('tanggal') || 'Belum dijadwalkan'),
      location: String(f.get('lokasi') || '—'),
      registered: 0,
      quota: Number(f.get('kuota') || 100),
      attended: 0,
      status: 'Draf',
    })
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="create-title">
      <button type="button" className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" onClick={onClose} aria-label="Tutup" />
      <form onSubmit={submit} className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 id="create-title" className="text-lg font-semibold text-slate-900">Buat acara baru</h2>
            <p className="text-sm text-slate-500">Acara disimpan sebagai draf sampai dipublikasikan.</p>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Tutup">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <button type="button" className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-8 text-sm text-slate-500 hover:border-emerald-400 hover:bg-emerald-50/50">
            <ImageIcon className="size-6 text-slate-400" aria-hidden />
            <span className="mt-2 font-medium text-slate-700">Unggah e-poster</span>
            <span className="text-xs">PNG atau JPG, maks. 2 MB, rasio 16:9</span>
          </button>

          <div>
            <Label htmlFor="judul">Judul acara</Label>
            <Input id="judul" name="judul" placeholder="cth. Seminar Nasional Energi Bersih 2027" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="kategori">Kategori</Label>
              <Select id="kategori" name="kategori" defaultValue="Seminar">
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Pelatihan</option>
                <option>Webinar</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="mode-acara">Mode</Label>
              <Select id="mode-acara" name="mode" defaultValue="Luring">
                <option>Luring</option>
                <option>Daring</option>
                <option>Hibrida</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input id="tanggal" name="tanggal" type="date" />
            </div>
            <div>
              <Label htmlFor="kuota">Kuota peserta</Label>
              <Input id="kuota" name="kuota" type="number" min={1} defaultValue={100} />
            </div>
          </div>
          <div>
            <Label htmlFor="lokasi">Lokasi atau tautan</Label>
            <Input id="lokasi" name="lokasi" placeholder="cth. Auditorium Utama atau tautan Zoom" />
          </div>
          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <textarea
              id="deskripsi"
              rows={4}
              placeholder="Jelaskan tujuan, sasaran peserta, dan manfaat acara…"
              className="block w-full rounded-xl border-0 px-3.5 py-3 text-sm ring-1 ring-slate-200 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <fieldset className="rounded-2xl border border-slate-200 p-4">
            <legend className="px-1 text-sm font-semibold text-slate-900">Otomatisasi paperless</legend>
            <div className="space-y-4">
              {[
                { icon: QrCode, t: 'E-tiket QR Code otomatis', d: 'Dikirim ke email peserta setelah mendaftar', v: qr, s: setQr },
                { icon: Award, t: 'E-sertifikat setelah presensi', d: 'Terbit otomatis untuk peserta yang hadir', v: cert, s: setCert },
                { icon: CalendarDays, t: 'Pengingat H-1 via email', d: 'Mengurangi peserta yang tidak hadir', v: reminder, s: setReminder },
              ].map(({ icon: Icon, t, d, v, s }) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{t}</p>
                    <p className="text-xs text-slate-500">{d}</p>
                  </div>
                  <Toggle checked={v} onChange={s} label={t} />
                </div>
              ))}
            </div>
          </fieldset>

          <p className="flex items-start gap-2 rounded-xl bg-lime-50 p-3 text-xs leading-relaxed text-lime-900 ring-1 ring-lime-200">
            <Leaf className="mt-0.5 size-4 shrink-0" aria-hidden />
            Dengan 100 peserta, acara ini diperkirakan menghemat ± 330 lembar kertas dan 1,5 kg CO2e dibanding proses konvensional.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <Button variant="secondary" onClick={onClose}>Batal</Button>
          <Button type="submit">Simpan sebagai draf</Button>
        </div>
      </form>
    </div>
  )
}

export function ManageEvents() {
  const [items, setItems] = useState(managedEvents)
  const [tab, setTab] = useState<(typeof tabs)[number]>('Semua')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)

  const list = useMemo(
    () =>
      items.filter((e) => {
        const t =
          tab === 'Semua' ||
          (tab === 'Aktif' && ['Pendaftaran Dibuka', 'Kuota Penuh', 'Berlangsung'].includes(e.status)) ||
          (tab === 'Draf' && e.status === 'Draf') ||
          (tab === 'Selesai' && e.status === 'Selesai')
        return t && e.title.toLowerCase().includes(q.toLowerCase())
      }),
    [items, tab, q],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola acara"
        description="Buat, sunting, dan pantau seluruh acara organisasimu."
        actions={
          <Button onClick={() => setOpen(true)}>
            <CirclePlus className="size-4" aria-hidden /> Buat acara
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Segmented options={tabs} value={tab} onChange={setTab} label="Filter status acara" className="overflow-x-auto" />
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <label htmlFor="cari-acara" className="sr-only">Cari acara</label>
          <Input id="cari-acara" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari acara…" className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((e) => (
          <Card key={e.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <CategoryBadge category={e.category} />
              <Badge tone={statusTone[e.status]}>{e.status}</Badge>
            </div>
            <h3 className="mt-3 line-clamp-2 font-semibold text-slate-900">{e.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-slate-500">
              <p className="flex items-center gap-2"><CalendarDays className="size-4 text-slate-400" aria-hidden /> {e.date}</p>
              <p className="flex items-center gap-2"><MapPin className="size-4 text-slate-400" aria-hidden /> {e.location}</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center">
              <div>
                <p className="text-sm font-bold text-slate-900">{nf.format(e.registered)}</p>
                <p className="text-[11px] text-slate-500">Pendaftar</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{nf.format(e.attended)}</p>
                <p className="text-[11px] text-slate-500">Hadir</p>
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-700">{nf.format(e.registered * 3)}</p>
                <p className="text-[11px] text-slate-500">Lembar hemat</p>
              </div>
            </div>
            <Progress value={e.registered} max={e.quota} className="mt-4" tone={e.registered >= e.quota ? 'amber' : 'emerald'} />
            <p className="mt-1.5 text-xs text-slate-500">Kuota {nf.format(e.quota)} peserta</p>

            <div className="mt-auto flex gap-2 pt-5">
              <Button size="sm" variant="secondary" className="flex-1">
                <PencilLine className="size-4" aria-hidden /> Sunting
              </Button>
              <a href="#/panel/peserta" className="grid size-9 place-items-center rounded-lg text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50" aria-label={`Peserta ${e.title}`}>
                <Users className="size-4" />
              </a>
              <a href="#/panel/pindai" className="grid size-9 place-items-center rounded-lg text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50" aria-label={`Pindai presensi ${e.title}`}>
                <ScanLine className="size-4" />
              </a>
              <button type="button" className="grid size-9 place-items-center rounded-lg text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50" aria-label={`Duplikat ${e.title}`}>
                <Copy className="size-4" />
              </button>
            </div>
          </Card>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 transition hover:border-emerald-400 hover:bg-emerald-50/40 hover:text-emerald-700"
        >
          <CirclePlus className="size-8" aria-hidden />
          <span className="mt-2 text-sm font-semibold">Buat acara baru</span>
          <span className="text-xs">Mulai dari templat atau kosong</span>
        </button>
      </div>

      {open && (
        <CreateEventPanel
          onClose={() => setOpen(false)}
          onCreate={(e) => {
            setItems((xs) => [e, ...xs])
            setOpen(false)
            setTab('Semua')
          }}
        />
      )}
    </div>
  )
}
