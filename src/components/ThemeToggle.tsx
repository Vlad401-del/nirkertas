import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem('nirkertas-theme')
      } catch {}
      const next = saved === 'dark' || (saved !== 'light' && media.matches)
      document.documentElement.classList.toggle('dark', next)
      setDark(next)
    }
    media.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    setDark(next)
    try {
      localStorage.setItem('nirkertas-theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-sm font-semibold text-emerald-800 shadow-sm transition-colors hover:bg-emerald-100 dark:border-emerald-500/50 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/70"
    >
      {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      {dark ? 'Terang' : 'Gelap'}
    </button>
  )
}
