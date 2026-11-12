import type { ReactNode } from 'react'

type TooltipPayload = { name?: string; value?: number | string; color?: string; payload?: { fill?: string; color?: string } }

export function ChartTooltip({
  active,
  payload,
  label,
  unit = '',
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: ReactNode
  unit?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-white px-3 py-2 text-xs shadow-lift ring-1 ring-slate-200">
      {label != null && <p className="mb-1 font-semibold text-slate-900">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2 text-slate-600">
          <span className="size-2 rounded-full" style={{ background: p.color ?? p.payload?.color ?? p.payload?.fill }} />
          {p.name}: <span className="font-semibold text-slate-900">{typeof p.value === 'number' ? p.value.toLocaleString('id-ID') : p.value}{unit}</span>
        </p>
      ))}
    </div>
  )
}

export const axisProps = {
  tick: { fill: '#64748b', fontSize: 12 },
  axisLine: false,
  tickLine: false,
} as const
