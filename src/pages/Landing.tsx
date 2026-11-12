import {
  ArrowRight,
  Award,
  CalendarPlus,
  ChartNoAxesColumn,
  CircleCheck,
  ClipboardList,
  Leaf,
  QrCode,
  ScanLine,
  Sparkles,
  Ticket,
  TreePine,
  Users,
  Droplets,
} from 'lucide-react'
import { Badge, ButtonLink, Card, Eyebrow } from '../components/ui'
import { EventCard } from '../components/EventCard'
import { QRCode } from '../components/QRCode'
import { events, img, impact, photos } from '../data'
import { nf } from '../lib/cn'

const steps = [
  { icon: CalendarPlus, title: 'Buat acara', text: 'Penyelenggara menyusun detail, kuota, dan rundown dalam hitungan menit.' },
  { icon: ClipboardList, title: 'Pendaftaran online', text: 'Peserta mendaftar dengan NIM dan email kampus, tanpa formulir kertas.' },
  { icon: Ticket, title: 'E-tiket QR Code', text: 'Tiket unik terkirim otomatis dan tersimpan di akun peserta.' },
  { icon: ScanLine, title: 'Presensi digital', text: 'Panitia memindai QR Code di pintu masuk, data hadir tercatat real-time.' },
  { icon: Award, title: 'E-sertifikat', text: 'Sertifikat terverifikasi QR siap diunduh sesudah acara selesai.' },
]

export function Landing() {
  const upcoming = events.slice(0, 3)
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden />
        <div className="absolute -top-40 -right-40 size-[520px] rounded-full bg-lime-200/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
              <Sparkles className="size-3.5 text-lime-600" aria-hidden />
              Platform acara kampus tanpa kertas
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
              Acara kampus yang rapi, <span className="text-emerald-600">tanpa selembar kertas.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Kelola pendaftaran, e-tiket QR Code, presensi digital, dan e-sertifikat dalam satu alur. Setiap acara
              sekaligus menghitung kertas dan emisi CO2e yang berhasil dihemat.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/acara" size="lg">
                Jelajahi Acara <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink to="/panel" size="lg" variant="secondary">
                Mulai sebagai Penyelenggara
              </ButtonLink>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200 pt-6">
              {[
                ['120+', 'organisasi mahasiswa'],
                [nf.format(impact.totalParticipants), 'peserta terdaftar'],
                ['79%', 'emisi dokumen berkurang'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-slate-900">{v}</dd>
                  <dd className="mt-0.5 text-xs leading-snug text-slate-500">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[28px] shadow-lift">
              <img
                src={img(photos.hallStanding, 1080)}
                alt="Peserta berdiri di aula kampus sebelum seminar dimulai"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/10 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 text-white">
                <Badge tone="lime" className="bg-lime-300 text-emerald-950 ring-0">Berlangsung hari ini</Badge>
                <p className="mt-2 text-lg font-semibold">Talkshow Dies Natalis ke-45</p>
                <p className="text-sm text-emerald-100/85">214 dari 286 peserta sudah check-in</p>
              </div>
            </div>

            {/* Floating ticket */}
            <div className="absolute -bottom-10 -left-4 w-56 motion-safe:animate-float sm:-left-10 sm:w-64">
              <div className="rounded-2xl bg-white p-4 shadow-lift ring-1 ring-slate-200/80">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-widest text-emerald-700 uppercase">E-Tiket</p>
                  <QrCode className="size-4 text-slate-400" aria-hidden />
                </div>
                <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">Seminar Green Campus 2026</p>
                <div className="perforation my-3 h-1" aria-hidden />
                <div className="flex items-center gap-3">
                  <QRCode value="NKT-GC26-0342" className="size-16 rounded-md sm:size-20" label="Contoh QR Code e-tiket" />
                  <div className="text-xs">
                    <p className="text-slate-400">Kode</p>
                    <p className="font-mono font-semibold text-slate-800">GC26-0342</p>
                    <p className="mt-1.5 inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <CircleCheck className="size-3.5" aria-hidden /> Valid
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating impact chip */}
            <div className="absolute top-6 -right-3 rounded-2xl bg-emerald-950 px-4 py-3 text-white shadow-lift sm:-right-8">
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-200">
                <Leaf className="size-3.5 text-lime-300" aria-hidden /> Kertas dihemat
              </p>
              <p className="mt-0.5 text-xl font-bold">
                {nf.format(impact.sheetsSaved)} <span className="text-xs font-medium text-emerald-200">lembar</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Org strip */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Digunakan oleh</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-slate-400">
            {['BEM Universitas', 'HIMA Sistem Informasi', 'KSM Eco Ranger', 'UKM Pecinta Alam', 'LPPM', 'HIMA Manajemen'].map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Flow */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>Alur paperless</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Satu alur digital, dari pendaftaran sampai sertifikat.</h2>
          <p className="mt-4 text-slate-600">
            Setiap tahap yang dulu membutuhkan kertas kini berjalan otomatis, sehingga panitia bisa fokus pada isi acara.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative">
              <Card className="h-full p-5">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-bold text-slate-300">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Two audiences */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="p-8 sm:p-10">
              <Badge tone="teal">
                <Users className="size-3.5" aria-hidden /> Untuk peserta
              </Badge>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Daftar sekali klik, semua tersimpan di akunmu.</h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Pendaftaran online acara kampus dengan NIM',
                  'E-tiket QR Code langsung di email dan akun',
                  'Riwayat acara yang pernah diikuti',
                  'Unduh e-sertifikat terverifikasi setelah acara',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-slate-700">
                    <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-emerald-600" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/tiket" variant="secondary" className="mt-8">
                Lihat contoh e-tiket <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Card>
          <div className="overflow-hidden rounded-2xl bg-emerald-950 text-white shadow-soft">
            <div className="p-8 sm:p-10">
              <Badge tone="lime" className="bg-lime-300/15 text-lime-200 ring-lime-300/25">
                <ChartNoAxesColumn className="size-3.5" aria-hidden /> Untuk penyelenggara
              </Badge>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">Administrasi acara yang efisien dan terukur.</h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Buat dan kelola acara beserta kuota peserta',
                  'Daftar peserta real-time, ekspor dalam satu klik',
                  'Pindai QR Code untuk presensi di pintu masuk',
                  'Dashboard dampak: kertas dan CO2e yang dihemat',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-emerald-50/90">
                    <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-lime-300" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/panel" variant="lime" className="mt-8">
                Buka panel penyelenggara <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Impact band */}
      <section className="relative overflow-hidden bg-emerald-950">
        <img src={img(photos.campusTrees, 1600)} alt="" className="absolute inset-0 size-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <Eyebrow className="text-lime-300 [&>span]:bg-lime-300">Dampak bersama</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Setiap e-tiket adalah selembar kertas yang tidak dicetak.</h2>
            <p className="mt-4 text-emerald-100/80">
              Angka berikut dihitung otomatis dari seluruh acara di platform sepanjang Januari–Oktober 2026.
            </p>
            <ButtonLink to="/panel/dampak" variant="lime" className="mt-8">
              Lihat dashboard dampak <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Leaf, v: nf.format(impact.sheetsSaved), u: 'lembar', l: 'kertas tidak dicetak' },
              { icon: Sparkles, v: '67,5', u: 'kg CO2e', l: 'emisi berhasil dihindari' },
              { icon: TreePine, v: '2,2', u: 'pohon', l: 'setara kebutuhan bahan kertas' },
              { icon: Droplets, v: '186', u: 'ribu liter', l: 'air produksi kertas dihemat' },
            ].map(({ icon: Icon, v, u, l }) => (
              <div key={l} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur">
                <Icon className="size-5 text-lime-300" aria-hidden />
                <p className="mt-4 text-3xl font-bold tracking-tight text-white">
                  {v} <span className="text-sm font-medium text-emerald-200">{u}</span>
                </p>
                <p className="mt-1 text-sm text-emerald-100/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Segera hadir</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Acara kampus terdekat</h2>
          </div>
          <ButtonLink to="/acara" variant="secondary">
            Semua acara <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 px-8 py-12 text-white sm:px-12 sm:py-16">
          <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight">Siap menggelar acara paperless pertama organisasimu?</h2>
              <p className="mt-3 text-emerald-50/90">Gratis untuk organisasi mahasiswa terverifikasi. Tanpa cetak tiket, tanpa daftar hadir kertas.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/panel/acara" variant="lime" size="lg">
                Buat acara sekarang
              </ButtonLink>
              <ButtonLink to="/acara" size="lg" className="bg-white/10 ring-1 ring-white/30 hover:bg-white/20">
                Lihat acara
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
