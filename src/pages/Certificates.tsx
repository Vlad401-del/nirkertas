import { useState } from 'react'
import { Award, CalendarCheck, Clock, Download, Eye, Hourglass, Link2, ShieldCheck } from 'lucide-react'
import { Badge, Button, Card, CategoryBadge, PageHeader, StatCard } from '../components/ui'
import { LogoMark } from '../components/Illustrations'
import { QRCode } from '../components/QRCode'
import { currentUser, pastEvents, university } from '../data'
import { cn } from '../lib/cn'

export function Certificates() {
  const available = pastEvents.filter((p) => p.certificate === 'Tersedia')
  const [selected, setSelected] = useState(available[0].id)
  const cert = pastEvents.find((p) => p.id === selected)!
  const totalHours = pastEvents.reduce((s, p) => s + p.hours, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Riwayat & sertifikat"
        title="Acara yang pernah kamu ikuti"
        description="Semua e-sertifikat dilengkapi QR Code verifikasi, sehingga sah tanpa tanda tangan basah atau cetakan."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarCheck} label="Acara dihadiri" value={String(pastEvents.length)} hint="Semester ganjil 2026" />
        <StatCard icon={Award} label="E-sertifikat diterima" value={String(available.length)} accent="lime" hint="1 menunggu evaluasi" />
        <StatCard icon={Clock} label="Total jam kegiatan" value={String(totalHours)} unit="jam" accent="teal" hint="Tercatat di transkrip SKP" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        {/* History list */}
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Riwayat acara</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {pastEvents.map((p) => {
              const ok = p.certificate === 'Tersedia'
              return (
                <li key={p.id} className={cn('p-5 transition-colors', selected === p.id && 'bg-emerald-50/50')}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <CategoryBadge category={p.category} />
                        <span className="text-xs text-slate-500">{p.date}</span>
                      </div>
                      <p className="mt-2 text-sm leading-snug font-semibold text-slate-900">{p.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {p.organizer} · {p.hours} jam
                      </p>
                    </div>
                    {ok ? (
                      <Badge tone="emerald">
                        <ShieldCheck className="size-3.5" aria-hidden /> Tersedia
                      </Badge>
                    ) : (
                      <Badge tone="amber">
                        <Hourglass className="size-3.5" aria-hidden /> Menunggu
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {ok ? (
                      <>
                        <Button size="sm" variant={selected === p.id ? 'primary' : 'secondary'} onClick={() => setSelected(p.id)}>
                          <Eye className="size-4" aria-hidden /> Pratinjau
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="size-4" aria-hidden /> PDF
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="secondary">
                        Isi evaluasi acara untuk membuka sertifikat
                      </Button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>

        {/* Certificate preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-lime-50 p-3 shadow-lift ring-1 ring-slate-200/80 sm:p-5">
            <article
              aria-label={`Pratinjau e-sertifikat ${cert.title}`}
              className="relative aspect-[1.414/1] overflow-hidden rounded-xl bg-white ring-1 ring-emerald-200"
            >
              <div className="absolute inset-2 rounded-lg border border-emerald-600/30 sm:inset-3" aria-hidden />
              <div className="absolute -top-16 -right-16 size-44 rounded-full bg-lime-200/50" aria-hidden />
              <div className="absolute -bottom-20 -left-12 size-48 rounded-full bg-emerald-100" aria-hidden />
              <div className="relative flex h-full flex-col items-center justify-between px-6 py-5 text-center sm:px-10 sm:py-8">
                <div className="flex items-center gap-2">
                  <LogoMark className="size-5 sm:size-7" />
                  <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase sm:text-xs">{university}</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-emerald-700 uppercase sm:text-xs">Sertifikat Penghargaan</p>
                  <p className="mt-1 text-[8px] text-slate-500 sm:mt-2 sm:text-[11px]">Diberikan kepada</p>
                  <p className="mt-0.5 text-base font-extrabold tracking-tight text-emerald-950 sm:mt-1 sm:text-3xl">{currentUser.name}</p>
                  <p className="mx-auto mt-1 max-w-sm text-[8px] leading-relaxed text-slate-600 sm:mt-2 sm:text-xs">
                    atas partisipasinya sebagai <b>Peserta</b> dalam kegiatan
                    <br />
                    <span className="font-semibold text-slate-800">{cert.title}</span>
                    <br />
                    yang diselenggarakan oleh {cert.organizer} pada {cert.date}.
                  </p>
                </div>
                <div className="flex w-full items-end justify-between">
                  <div className="text-left">
                    <p className="font-serif text-[10px] text-emerald-800 italic sm:text-base">Raka Mahendra</p>
                    <div className="mt-0.5 h-px w-16 bg-slate-300 sm:w-28" />
                    <p className="mt-0.5 text-[7px] text-slate-500 sm:text-[10px]">Ketua Pelaksana</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <QRCode value={cert.certNo} className="size-9 sm:size-14" label="QR Code verifikasi sertifikat" />
                    <p className="mt-0.5 font-mono text-[6px] text-slate-500 sm:text-[9px]">{cert.certNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-[10px] text-emerald-800 italic sm:text-base">Dr. Agus Salim</p>
                    <div className="mt-0.5 ml-auto h-px w-16 bg-slate-300 sm:w-28" />
                    <p className="mt-0.5 text-[7px] text-slate-500 sm:text-[10px]">Kepala Biro Kemahasiswaan</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1">
              <Download className="size-4" aria-hidden /> Unduh sertifikat (PDF)
            </Button>
            <Button variant="secondary" className="flex-1">
              <Link2 className="size-4" aria-hidden /> Salin tautan verifikasi
            </Button>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
            Keaslian dapat dicek siapa saja dengan memindai QR Code pada sertifikat.
          </p>
        </div>
      </div>
    </div>
  )
}
