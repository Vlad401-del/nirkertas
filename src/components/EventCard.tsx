import { CalendarDays, MapPin, MonitorPlay } from 'lucide-react'
import { CategoryBadge, Progress } from './ui'
import { img, type EventItem } from '../data'
import { nf } from '../lib/cn'

export function EventCard({ event }: { event: EventItem }) {
  const full = event.registered >= event.quota
  const left = event.quota - event.registered
  return (
    <a
      href={`#/acara/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={img(event.image, 640)}
          alt={event.imageAlt}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-sm backdrop-blur">
          <p className="text-lg leading-none font-bold text-slate-900">{event.day}</p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 uppercase">{event.month}</p>
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-emerald-950/80 px-2.5 py-1 text-[11px] font-semibold text-lime-200 backdrop-blur">
          {event.mode}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={event.category} />
          <span className="truncate text-xs text-slate-500">{event.organizer}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-[15px] leading-snug font-semibold text-slate-900 group-hover:text-emerald-800">
          {event.title}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-slate-400" aria-hidden />
            <span className="truncate">{event.date}</span>
          </p>
          <p className="flex items-center gap-2">
            {event.mode === 'Daring' ? (
              <MonitorPlay className="size-4 shrink-0 text-slate-400" aria-hidden />
            ) : (
              <MapPin className="size-4 shrink-0 text-slate-400" aria-hidden />
            )}
            <span className="truncate">{event.location}</span>
          </p>
        </div>
        <div className="mt-auto pt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {nf.format(event.registered)} / {nf.format(event.quota)} terdaftar
            </span>
            <span className={full ? 'font-semibold text-amber-700' : 'font-semibold text-emerald-700'}>
              {full ? 'Kuota penuh' : `Sisa ${nf.format(left)}`}
            </span>
          </div>
          <Progress value={event.registered} max={event.quota} tone={full ? 'amber' : 'emerald'} />
        </div>
      </div>
    </a>
  )
}
