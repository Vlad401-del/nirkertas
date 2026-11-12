import { useMemo } from 'react'

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Decorative, deterministic QR-style matrix for mock tickets and certificates. */
export function QRCode({
  value,
  className,
  fg = '#022c22',
  label,
}: {
  value: string
  className?: string
  fg?: string
  label?: string
}) {
  const n = 29
  const d = useMemo(() => {
    let seed = hash(value) || 1
    const rand = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      return seed / 4294967296
    }
    const grid: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false))
    const reserved: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false))

    const finder = (r: number, c: number) => {
      for (let i = -1; i <= 7; i++)
        for (let j = -1; j <= 7; j++) {
          const rr = r + i
          const cc = c + j
          if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue
          reserved[rr][cc] = true
          const inside = i >= 0 && i <= 6 && j >= 0 && j <= 6
          grid[rr][cc] = inside && (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4))
        }
    }
    finder(0, 0)
    finder(0, n - 7)
    finder(n - 7, 0)

    const a = n - 9
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 5; j++) {
        reserved[a + i][a + j] = true
        grid[a + i][a + j] = i === 0 || i === 4 || j === 0 || j === 4 || (i === 2 && j === 2)
      }

    for (let k = 8; k < n - 8; k++) {
      reserved[6][k] = reserved[k][6] = true
      grid[6][k] = grid[k][6] = k % 2 === 0
    }

    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!reserved[r][c]) grid[r][c] = rand() > 0.52

    let path = ''
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (grid[r][c]) path += `M${c} ${r}h1v1h-1z`
    return path
  }, [value])

  return (
    <svg
      viewBox={`-2 -2 ${n + 4} ${n + 4}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label ?? `QR Code ${value}`}
    >
      <rect x={-2} y={-2} width={n + 4} height={n + 4} fill="#fff" />
      <path d={d} fill={fg} />
    </svg>
  )
}
