import { useEffect, useState, type AnchorHTMLAttributes } from 'react'

function readPath() {
  const raw = window.location.hash.replace(/^#/, '')
  return raw.split('?')[0] || '/'
}

export function useHashPath() {
  const [path, setPath] = useState(readPath)
  useEffect(() => {
    const onChange = () => {
      setPath(readPath())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return path
}

export function navigate(to: string) {
  window.location.hash = to
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

export function Link({ to, ...rest }: LinkProps) {
  return <a href={`#${to}`} {...rest} />
}
