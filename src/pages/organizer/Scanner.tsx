import { useState, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, CircleX, Flashlight, Keyboard, RefreshCw, ScanLine, SwitchCamera } from 'lucide-react'
import { Avatar, Button, Card, Input, PageHeader, Select } from '../../components/ui'
import { managedEvents } from '../../data'
import { cn } from '../../lib/cn'

type Result =
  | { kind: 'ok'; name: string; nim: string; prodi: string; code: string; time: string }
  | { kind: 'dup'; name: string; code: string; time: string }
  | { kind: 'invalid'; code: string }

const queue: Result[] = [
  { kind: 'ok', name: 'Anisa Rahmawati', nim: '2203141088', prodi: 'Teknik Lingkungan', code: 'NKT-DN45-0213', time: '08.15' },
  { kind: 'ok', name: 'Putri Ayu Lestari', nim: '2305011030', prodi: 'Akuntansi', code: 'NKT-DN45-0187', time: '08.16' },
  { kind: 'dup', name: 'Bagas Prakoso', code: 'NKT-DN45-0102', time: '08.02' },
  { kind: 'ok', name: 'Galih Saputra', nim: '2104071015', prodi: 'Fisika', code: 'NKT-DN45-0241', time: '08.17' },
  { kind: 'invalid', code: 'NKT-WI26-0698' },
]

const initialLog = [
  { name: 'Intan Permatasari', time: '08.07', ok: true },
  { name: 'Bagas Prakoso', time: '08.02', ok: true },
  { name: 'Dewi Kartika Sari', time: '07.58', ok: true },
  { name: 'Siti Nurhaliza Putri', time: '07.51', ok: true },
]

export function Scanner() {
  const [i, setI] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [count, setCount] = useState(214)
  const [log, setLog] = useState(initialLog)
  const [manual, setManual] = useState('')

  const scan = () => {
    const r = queue[i % queue.length]
    setI((n) => n + 1)
    setResult(r)
    if (r.kind === 'ok') {
      setCount((c) => c + 1)
      setLog((l) => [{ name: r.name, time: r.time, ok: true }, ...l].slice(0, 6))
    }
  }

  const onManual = (e: FormEvent) => {
    e.preventDefault()
    if (!manual.trim()) return
    setResult({ kind: 'invalid', code: manual.trim().toUpperCase() })
    setManual('')
  }

  const frame =
    result?.kind === 'ok' ? 'border-lime-300' : result?.kind === 'dup' ? 'border-amber-300' : result?.kind === 'invalid' ? 'border-rose-400' : 'border-white'

  return (
    <div className="space-y-6">
      <PageHeader title="Pindai QR presensi" description="Arahkan kamera ke QR Code pada e-tiket peserta. Presensi tercatat otomatis dalam ± 3 detik." />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="mb-4 max-w-md">
            <label htmlFor="acara-pindai" className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-500 uppercase">Acara</label>
            <Select id="acara-pindai" defaultValue="dies-natalis">
              {managedEvents.filter((e) => e.status !== 'Draf' && e.status !== 'Selesai').map((e) => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </Select>
          </div>

          {/* Viewfinder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 shadow-lift">
            <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <span className="size-2 rounded-full bg-rose-500 motion-safe:animate-pulse" /> Kamera aktif
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button type="button" className="grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60" aria-label="Senter">
                <Flashlight className="size-4" />
              </button>
              <button type="button" className="grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60" aria-label="Ganti kamera">
                <SwitchCamera className="size-4" />
              </button>
            </div>

            <div className="absolute inset-0 grid place-items-center">
              <div className="relative size-48 sm:size-60">
                {['top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl', 'top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl', 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl', 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl'].map((c) => (
                  <span key={c} className={cn('absolute size-10 transition-colors', frame, c)} aria-hidden />
                ))}
                {!result && <span className="absolute inset-x-3 h-0.5 rounded-full bg-lime-300 shadow-[0_0_16px_4px_rgba(190,242,100,0.6)] motion-safe:animate-scan" aria-hidden />}
                {result && (
                  <div className="absolute inset-0 grid place-items-center">
                    {result.kind === 'ok' && <CircleCheck className="size-20 text-lime-300" aria-hidden />}
                    {result.kind === 'dup' && <CircleAlert className="size-20 text-amber-300" aria-hidden />}
                    {result.kind === 'invalid' && <CircleX className="size-20 text-rose-400" aria-hidden />}
                  </div>
                )}
              </div>
            </div>

            <p className="absolute inset-x-0 bottom-5 text-center text-sm text-white/80">
              {result ? 'Ketuk “Pindai berikutnya” untuk lanjut' : 'Posisikan QR Code di dalam bingkai'}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={result ? () => setResult(null) : scan}>
              {result ? <RefreshCw className="size-4" aria-hidden /> : <ScanLine className="size-4" aria-hidden />}
              {result ? 'Pindai berikutnya' : 'Simulasikan pindai'}
            </Button>
            <form onSubmit={onManual} className="flex flex-1 gap-2">
              <label htmlFor="kode-manual" className="sr-only">Masukkan kode tiket manual</label>
              <div className="relative flex-1">
                <Keyboard className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                <Input id="kode-manual" value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Kode tiket manual" className="h-12 pl-10 font-mono" />
              </div>
              <Button type="submit" variant="secondary" size="lg">Cek</Button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {/* Result */}
          <div aria-live="polite">
            {!result && (
              <Card className="p-6 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500">
                  <ScanLine className="size-6" aria-hidden />
                </span>
                <p className="mt-3 font-semibold text-slate-900">Menunggu pemindaian</p>
                <p className="mt-1 text-sm text-slate-500">Hasil validasi tiket akan muncul di sini.</p>
              </Card>
            )}
            {result?.kind === 'ok' && (
              <Card className="border-emerald-200 bg-emerald-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <CircleCheck className="size-5" aria-hidden /> Tiket valid · presensi tercatat
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar name={result.name} className="size-12 bg-white text-sm" />
                  <div>
                    <p className="font-semibold text-slate-900">{result.name}</p>
                    <p className="text-sm text-slate-600">{result.nim} · {result.prodi}</p>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-white p-3 text-xs">
                  <div><dt className="text-slate-500">Kode tiket</dt><dd className="font-mono font-semibold text-slate-900">{result.code}</dd></div>
                  <div><dt className="text-slate-500">Waktu check-in</dt><dd className="font-semibold text-slate-900">{result.time} WIB</dd></div>
                </dl>
              </Card>
            )}
            {result?.kind === 'dup' && (
              <Card className="border-amber-200 bg-amber-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                  <CircleAlert className="size-5" aria-hidden /> Tiket sudah digunakan
                </p>
                <p className="mt-3 text-sm text-amber-900/80">
                  <b>{result.name}</b> telah check-in pukul {result.time} WIB. Tidak perlu dipindai ulang.
                </p>
                <p className="mt-3 font-mono text-xs text-amber-900/70">{result.code}</p>
              </Card>
            )}
            {result?.kind === 'invalid' && (
              <Card className="border-rose-200 bg-rose-50 p-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-rose-800">
                  <CircleX className="size-5" aria-hidden /> Tiket tidak valid untuk acara ini
                </p>
                <p className="mt-3 text-sm text-rose-900/80">Kode tidak terdaftar pada acara terpilih. Arahkan peserta ke meja bantuan.</p>
                <p className="mt-3 font-mono text-xs text-rose-900/70">{result.code}</p>
              </Card>
            )}
          </div>

          <Card className="p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Peserta hadir</p>
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {count}<span className="text-base font-medium text-slate-400"> / 286</span>
                </p>
              </div>
              <p className="text-sm font-semibold text-emerald-700">{Math.round((count / 286) * 100)}%</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all" style={{ width: `${(count / 286) * 100}%` }} />
            </div>
            <p className="mt-3 text-xs text-slate-500">Setiap pindaian menggantikan 1 baris tanda tangan di daftar hadir kertas.</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-slate-900">Riwayat pindai</p>
            <ul className="mt-4 space-y-3">
              {log.map((l, idx) => (
                <li key={`${l.name}-${idx}`} className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <CircleCheck className="size-4" aria-hidden />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm text-slate-800">{l.name}</p>
                  <span className="text-xs text-slate-400">{l.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
