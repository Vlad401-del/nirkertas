import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowDown,
  CalendarRange,
  Cloud,
  Download,
  Droplets,
  FileText,
  Info,
  Layers,
  Leaf,
  Server,
  TreePine,
  Users,
} from 'lucide-react'
import { Badge, Button, Card, PageHeader, Segmented, StatCard } from '../../components/ui'
import { ChartTooltip, axisProps } from '../../components/charts'
import { PaperToLeafIllustration } from '../../components/Illustrations'
import { categorySavings, impact, monthlyCo2, opsFootprint, processComparison } from '../../data'
import { nf, nf1 } from '../../lib/cn'

const periods = ['Bulan ini', 'Semester', 'Tahun 2026'] as const

export function Impact() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Tahun 2026')
  const reduction = impact.co2Conventional - impact.co2Digital
  const pct = Math.round((reduction / impact.co2Conventional) * 100)
  const maxSheets = Math.max(...categorySavings.map((c) => c.sheets))

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analitik keberlanjutan"
        title="Dampak lingkungan"
        description="Estimasi penghematan kertas dan emisi CO2e dari digitalisasi tiket, presensi, sertifikat, poster, dan name tag."
        actions={
          <>
            <Segmented options={periods} value={period} onChange={setPeriod} label="Periode" />
            <Button variant="secondary">
              <Download className="size-4" aria-hidden /> Laporan PDF
            </Button>
          </>
        }
      />

      {/* Hero summary */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-6 text-white sm:p-8">
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
        <PaperToLeafIllustration className="absolute right-4 bottom-0 hidden w-72 opacity-90 md:block" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-200">
              <Leaf className="size-4 text-lime-300" aria-hidden /> Estimasi kertas dihemat · Jan–Okt 2026
            </p>
            <p className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
              {nf.format(impact.sheetsSaved)}
              <span className="ml-2 text-xl font-semibold text-emerald-200">lembar</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { icon: Layers, v: `${nf1.format(impact.paperKg)} kg`, l: `≈ ${nf1.format(impact.reams)} rim kertas A4` },
                { icon: TreePine, v: `${nf1.format(impact.trees)} pohon`, l: 'bahan baku kertas terselamatkan' },
                { icon: Droplets, v: `${nf.format(impact.waterL)} L`, l: 'air produksi kertas' },
              ].map(({ icon: Icon, v, l }) => (
                <div key={l} className="flex items-start gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-white/10 text-lime-300">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <div>
                    <p className="font-bold">{v}</p>
                    <p className="text-xs text-emerald-200/80">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-fit rounded-2xl bg-lime-300 p-5 text-emerald-950 md:mr-64">
            <p className="text-xs font-semibold">Emisi CO2e berkurang</p>
            <p className="mt-1 flex items-center gap-1 text-4xl font-extrabold">
              <ArrowDown className="size-7" aria-hidden /> {pct}%
            </p>
            <p className="text-xs font-medium">{nf1.format(reduction)} kg CO2e dihindari</p>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={CalendarRange} label="Total acara" value={nf.format(impact.totalEvents)} hint="38 selesai, 10 aktif" />
        <StatCard icon={Users} label="Total peserta" value={nf.format(impact.totalParticipants)} hint="dari 34 program studi" accent="teal" />
        <StatCard icon={FileText} label="Total dokumen digital" value={nf.format(impact.digitalDocs)} hint="tiket, sertifikat, presensi, dll." accent="lime" />
        <StatCard icon={Leaf} label="Reduksi limbah kertas" value={nf1.format(impact.paperKg)} unit="kg" trend={`−${pct}%`} hint="estimasi berat kertas A4" />
        <StatCard icon={Server} label="Jejak karbon sistem" value={nf1.format(impact.co2Ops)} unit="kg CO2e" hint="operasional server & email" accent="slate" />
      </div>

      {/* Before vs after + category */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">Estimasi emisi CO2e: sebelum vs sesudah digitalisasi</h2>
              <p className="text-sm text-slate-500">kg CO2e per bulan, seluruh acara</p>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <p className="text-xs text-slate-500">Konvensional</p>
                <p className="font-bold text-slate-700">{nf1.format(impact.co2Conventional)} kg</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Paperless</p>
                <p className="font-bold text-emerald-700">{nf1.format(impact.co2Digital)} kg</p>
              </div>
            </div>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCo2} margin={{ left: -20, right: 4, top: 8 }} barGap={4}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltip unit=" kg" />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Bar dataKey="konvensional" name="Sebelum (konvensional)" fill="#cbd5e1" radius={[6, 6, 0, 0]} maxBarSize={22} />
                <Bar dataKey="digital" name="Sesudah (paperless)" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Penghematan per jenis dokumen</h2>
          <p className="text-sm text-slate-500">Lembar kertas yang tidak dicetak</p>
          <ul className="mt-6 space-y-5">
            {categorySavings.map((c) => (
              <li key={c.name}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-800">{c.name}</span>
                  <span className="text-slate-500">
                    <span className="font-semibold text-slate-900">{nf.format(c.sheets)}</span> lbr · {nf1.format(c.co2)} kg CO2e
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${(c.sheets / maxSheets) * 100}%`, background: c.color }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            Tiket cetak dan sertifikat menyumbang <b className="text-slate-700">63%</b> dari total penghematan kertas.
          </p>
        </Card>
      </div>

      {/* Category chart + ops footprint */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-5 sm:p-6">
          <h2 className="font-semibold text-slate-900">Emisi yang dihindari per kategori</h2>
          <p className="text-sm text-slate-500">kg CO2e: tiket, daftar hadir, sertifikat, poster, dan name tag</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySavings} layout="vertical" margin={{ left: 8, right: 24 }}>
                <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" {...axisProps} />
                <YAxis type="category" dataKey="name" width={112} {...axisProps} />
                <Tooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltip unit=" kg CO2e" />} />
                <Bar dataKey="co2" name="CO2e dihindari" radius={[0, 8, 8, 0]} maxBarSize={26}>
                  {categorySavings.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">Jejak karbon operasional sistem</h2>
              <p className="text-sm text-slate-500">Digital juga beremisi, dan kami menghitungnya</p>
            </div>
            <Cloud className="size-5 text-slate-400" aria-hidden />
          </div>
          <div className="relative mt-4 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={opsFootprint} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} stroke="none">
                  {opsFootprint.map((o) => (
                    <Cell key={o.name} fill={o.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip unit=" kg CO2e" />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-xl font-bold text-slate-900">{nf1.format(impact.co2Ops)}</p>
                <p className="text-[11px] text-slate-500">kg CO2e/tahun</p>
              </div>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {opsFootprint.map((o) => (
              <li key={o.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="size-2.5 rounded-full" style={{ background: o.color }} /> {o.name}
                </span>
                <span className="font-semibold text-slate-900">{nf1.format(o.value)} kg</span>
              </li>
            ))}
            <li className="flex items-center justify-between border-t border-slate-100 pt-2 text-sm">
              <span className="text-slate-600">Dokumen digital (0,3 g/dok)</span>
              <span className="font-semibold text-slate-900">{nf1.format(impact.co2Digital - impact.co2Ops)} kg</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Process comparison */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">Perbandingan proses konvensional vs paperless</h2>
            <p className="text-sm text-slate-500">Dampak per tahapan administrasi acara</p>
          </div>
          <Badge tone="emerald">Rata-rata 15× lebih cepat saat presensi</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-y border-slate-100 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Tahapan</th>
                <th scope="col" className="px-6 py-3">Konvensional</th>
                <th scope="col" className="px-6 py-3">Paperless (nirkertas)</th>
                <th scope="col" className="px-6 py-3 text-right">Efisiensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processComparison.map((r) => (
                <tr key={r.step}>
                  <th scope="row" className="px-6 py-4 font-semibold text-slate-900">{r.step}</th>
                  <td className="px-6 py-4 text-slate-500">{r.conventional}</td>
                  <td className="px-6 py-4 text-slate-800">{r.paperless}</td>
                  <td className="px-6 py-4 text-right">
                    <Badge tone="lime">{r.gain}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Methodology */}
      <div className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200/80">
        <Info className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
        <div className="text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Asumsi perhitungan</p>
          <p className="mt-1 leading-relaxed">
            1 lembar A4 80 gsm ≈ 5 g kertas dan ≈ 4,6 g CO2e (produksi dan pencetakan). 1 dokumen digital ≈ 0,3 g CO2e
            (pengiriman dan penyimpanan). 1 pohon ≈ 8.333 lembar; ± 10 L air per lembar. Poster dihitung setara A4. Angka bersifat
            estimasi untuk edukasi dan pelaporan internal organisasi.
          </p>
        </div>
      </div>
    </div>
  )
}
