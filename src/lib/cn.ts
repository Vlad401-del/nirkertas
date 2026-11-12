export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const nf = new Intl.NumberFormat('id-ID')
export const nf1 = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
