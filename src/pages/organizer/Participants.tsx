import { useMemo, useState } from 'react'
import { Award, CircleCheck, Clock, Download, Search, Send, UserCheck, Users, UserX } from 'lucide-react'
import { Avatar, Badge, Button, Card, Input, PageHeader, Select, StatCard } from '../../components/ui'
import { managedEvents, participants, type Participant } from '../../data'
import { cn } from '../../lib/cn'

const statusTone = { Hadir: 'emerald', Terdaftar: 'slate', Batal: 'rose' } as const

export function Participants() {
  const [eventId, setEventId] = useState('dies-natalis')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'Semua' | Participant['status']>('Semua')
  const [picked, setPicked] = useState<Set<string>>(new Set())

  const list = useMemo(
    () =>
      participants.filter(
        (p) =>
          (status === 'Semua' || p.status === status) &&
          `${p.name} ${p.nim} ${p.prodi}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, status],
  )

  const allPicked = list.length > 0 && list.every((p) => picked.has(p.id))
  const toggleAll = () => setPicked(allPicked ? new Set() : new Set(list.map((p) => p.id)))
  const toggle = (id: string) =>
    setPicked((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daftar peserta"
        description="Pantau pendaftaran dan kehadiran secara real-time. Tidak ada lagi rekap daftar hadir manual."
        actions={
          <>
            <Button variant="secondary">
              <Download className="size-4" aria-hidden /> Ekspor CSV
            </Button>
            <Button>
              <Send className="size-4" aria-hidden /> Kirim e-sertifikat
            </Button>
          </>
        }
      />

      <div className="max-w-md">
        <label htmlFor="pilih-acara" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase">Acara</label>
        <Select id="pilih-acara" value={eventId} onChange={(e) => setEventId(e.target.value)}>
          {managedEvents.filter((e) => e.status !== 'Draf').map((e) => (
            <option key={e.id} value={e.id}>
              {e.title} · {e.date}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Terdaftar" value="286" hint="Kuota 300 peserta" />
        <StatCard icon={UserCheck} label="Sudah hadir" value="214" hint="75% dari pendaftar" accent="lime" />
        <StatCard icon={Clock} label="Belum hadir" value="64" hint="Check-in ditutup 09.30" accent="slate" />
        <StatCard icon={Award} label="Sertifikat terkirim" value="2" hint="212 menunggu pengiriman" accent="teal" />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <label htmlFor="cari-peserta" className="sr-only">Cari peserta</label>
            <Input id="cari-peserta" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari nama, NIM, atau prodi…" className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            {picked.size > 0 && <span className="text-sm text-slate-600">{picked.size} dipilih</span>}
            <label htmlFor="status" className="sr-only">Status</label>
            <Select id="status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-40">
              <option value="Semua">Semua status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terdaftar">Terdaftar</option>
              <option value="Batal">Batal</option>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="w-10 px-4 py-3">
                  <input type="checkbox" checked={allPicked} onChange={toggleAll} aria-label="Pilih semua peserta" className="size-4 accent-emerald-600" />
                </th>
                <th scope="col" className="px-4 py-3">Peserta</th>
                <th scope="col" className="px-4 py-3">NIM</th>
                <th scope="col" className="px-4 py-3">Program studi</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Check-in</th>
                <th scope="col" className="px-4 py-3">Sertifikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((p) => (
                <tr key={p.id} className={cn('transition-colors hover:bg-slate-50/70', picked.has(p.id) && 'bg-emerald-50/50')}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={picked.has(p.id)} onChange={() => toggle(p.id)} aria-label={`Pilih ${p.name}`} className="size-4 accent-emerald-600" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.name} />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900">{p.name}</p>
                        <p className="truncate text-xs text-slate-500">{p.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{p.nim}</td>
                  <td className="px-4 py-3 text-slate-600">{p.prodi}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[p.status]}>
                      {p.status === 'Hadir' ? <CircleCheck className="size-3.5" aria-hidden /> : p.status === 'Batal' ? <UserX className="size-3.5" aria-hidden /> : null}
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.checkIn ? `${p.checkIn} WIB` : '—'}</td>
                  <td className="px-4 py-3">
                    {p.certificate === 'Terkirim' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <CircleCheck className="size-4" aria-hidden /> Terkirim
                      </span>
                    ) : p.certificate === 'Belum' ? (
                      <button type="button" className="text-xs font-semibold text-emerald-700 hover:underline">Kirim</button>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                    Tidak ada peserta yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>Menampilkan {list.length} dari 286 peserta</span>
          <div className="flex gap-1">
            {[1, 2, 3, '…', 21].map((n, i) => (
              <button
                key={i}
                type="button"
                className={cn('grid size-8 place-items-center rounded-lg', n === 1 ? 'bg-emerald-950 font-semibold text-white' : 'hover:bg-slate-100')}
                aria-current={n === 1 ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
