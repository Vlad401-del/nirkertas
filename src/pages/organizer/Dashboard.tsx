import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, ArrowUpRight, Award, CalendarRange, CirclePlus, Leaf, ScanLine, UserCheck, Users } from 'lucide-react'
import { Avatar, Badge, ButtonLink, Card, PageHeader, Progress, StatCard, statusTone } from '../../components/ui'
import { ChartTooltip, axisProps } from '../../components/charts'
import { PaperToLeafIllustration } from '../../components/Illustrations'
import { managedEvents, organizer, recentCheckins, registrationTrend } from '../../data'
import { nf } from '../../lib/cn'

export function Dashboard() {
  const live = managedEvents.find((e) => e.status === 'Berlangsung')!
  const upcoming = managedEvents.filter((e) => e.status === 'Pendaftaran Dibuka' || e.status === 'Kuota Penuh').slice(0, 4)

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Selamat pagi, ${organizer.admin.split(' ')[0]}`}
        description="Ringkasan acara, pendaftaran, dan presensi organisasimu minggu ini."
        actions={
          <>
            <ButtonLink to="/panel/pindai" variant="secondary">
              <ScanLine className="size-4" aria-hidden /> Pindai QR
            </ButtonLink>
            <ButtonLink to="/panel/acara">
              <CirclePlus className="size-4" aria-hidden /> Buat acara
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarRange} label="Acara aktif" value="5" hint="1 berlangsung, 4 pendaftaran" />
        <StatCard icon={Users} label="Total pendaftar" value={nf.format(2049)} trend="+18%" hint="dibanding bulan lalu" accent="teal" />
        <StatCard icon={UserCheck} label="Tingkat kehadiran" value="86" unit="%" trend="+4%" hint="rata-rata 3 acara terakhir" />
        <StatCard icon={Award} label="E-sertifikat terkirim" value={nf.format(843)} hint="0 cetakan kertas" accent="lime" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">Tren pendaftaran dan kehadiran</h2>
              <p className="text-sm text-slate-500">8 minggu terakhir, semua acara</p>
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-600" /> Pendaftar</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-lime-400" /> Hadir</span>
            </div>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend} margin={{ left: -16, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a3e635" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<ChartTooltip unit=" orang" />} />
                <Area type="monotone" dataKey="pendaftar" name="Pendaftar" stroke="#059669" strokeWidth={2} fill="url(#gReg)" />
                <Area type="monotone" dataKey="hadir" name="Hadir" stroke="#84cc16" strokeWidth={2} fill="url(#gAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="relative bg-emerald-950 p-5 text-white sm:p-6">
            <div className="flex items-center justify-between">
              <Badge tone="lime" className="bg-lime-300 text-emerald-950 ring-0">
                <span className="size-1.5 rounded-full bg-emerald-700 motion-safe:animate-pulse" /> Berlangsung
              </Badge>
              <span className="text-xs text-emerald-200">{live.date}</span>
            </div>
            <h2 className="mt-3 font-semibold">{live.title}</h2>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-3xl font-bold">
                {live.attended}
                <span className="text-base font-medium text-emerald-200"> / {live.registered} hadir</span>
              </p>
              <p className="text-sm font-semibold text-lime-300">{Math.round((live.attended / live.registered) * 100)}%</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-lime-300" style={{ width: `${(live.attended / live.registered) * 100}%` }} />
            </div>
          </div>
          <div className="flex-1 p-5">
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Check-in terbaru</p>
            <ul className="mt-3 space-y-3">
              {recentCheckins.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <Avatar name={c.name} className="size-8" />
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">{c.name}</p>
                  <span className="shrink-0 text-xs text-slate-400">{c.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <a href="#/panel/pindai" className="flex items-center justify-center gap-2 border-t border-slate-100 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            Buka pemindai presensi <ArrowRight className="size-4" aria-hidden />
          </a>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Acara mendatang</h2>
            <a href="#/panel/acara" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">Kelola semua</a>
          </div>
          <ul className="divide-y divide-slate-100 border-t border-slate-100">
            {upcoming.map((e) => (
              <li key={e.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_180px_auto] sm:items-center sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{e.title}</p>
                  <p className="text-xs text-slate-500">{e.date} · {e.location}</p>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>{e.registered}/{e.quota}</span>
                    <span>{Math.round((e.registered / e.quota) * 100)}%</span>
                  </div>
                  <Progress value={e.registered} max={e.quota} tone={e.registered >= e.quota ? 'amber' : 'emerald'} />
                </div>
                <Badge tone={statusTone[e.status]} className="w-fit">{e.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-soft">
          <PaperToLeafIllustration className="absolute -right-6 -bottom-4 w-48 opacity-90" />
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-50">
            <Leaf className="size-4 text-lime-300" aria-hidden /> Dampak lingkungan bulan ini
          </p>
          <p className="mt-4 text-4xl font-bold tracking-tight">1.842</p>
          <p className="text-sm text-emerald-50/85">lembar kertas tidak dicetak</p>
          <div className="mt-5 flex gap-6">
            <div>
              <p className="text-xl font-bold">8,5 kg</p>
              <p className="text-xs text-emerald-50/80">CO2e dihindari</p>
            </div>
            <div>
              <p className="text-xl font-bold">−81%</p>
              <p className="text-xs text-emerald-50/80">vs konvensional</p>
            </div>
          </div>
          <ButtonLink to="/panel/dampak" variant="lime" size="sm" className="relative mt-6">
            Lihat analitik <ArrowUpRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
