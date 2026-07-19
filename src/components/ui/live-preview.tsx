'use client'

import { useState } from 'react'
import {
  ArrowUpRightIcon,
  LockClosedIcon,
  PlayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

/**
 * Interactive live project preview. Shows the static poster by default; on
 * click it mounts an iframe of the real site inside faux browser chrome, so
 * visitors can actually scroll and click the running product.
 *
 * ponytail: iframe fills the frame responsively (no scale math) and only
 * mounts on click. Some sites send X-Frame-Options/CSP frame-ancestors and
 * will render blank inside the frame — the "open in new tab" link is always
 * present as the fallback, and the poster stays visible until you go live.
 */
export default function LivePreview({
  src,
  poster,
  alt,
  className = '',
}: {
  src?: string
  poster: string
  alt: string
  className?: string
}) {
  const [live, setLive] = useState(false)
  const host = safeHost(src)

  return (
    <div className={`group/preview relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1c] via-transparent to-transparent opacity-70 md:bg-gradient-to-r" />

      {src && !live && (
        <button
          type="button"
          onClick={() => setLive(true)}
          data-cursor="Live"
          className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-black/45 px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <PlayIcon className="size-3.5" />
          Live preview
        </button>
      )}

      {src && live && (
        <div className="absolute inset-0 z-20 flex flex-col bg-[#070a14]">
          {/* faux browser bar */}
          <div className="flex items-center gap-3 border-b border-[var(--border)] px-3.5 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/40 px-2.5 py-1">
              <LockClosedIcon className="size-3 shrink-0 text-muted" />
              <span className="truncate font-mono text-[11px] text-muted">{host}</span>
            </div>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-muted transition-colors hover:text-[var(--primary)]"
              aria-label="Open in new tab"
            >
              <ArrowUpRightIcon className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setLive(false)}
              className="shrink-0 text-muted transition-colors hover:text-foreground"
              aria-label="Close live preview"
            >
              <XMarkIcon className="size-4" />
            </button>
          </div>

          <iframe
            src={src}
            title={alt}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="w-full flex-1 bg-white"
          />
        </div>
      )}
    </div>
  )
}

function safeHost(url?: string) {
  if (!url) return ''
  try {
    return new URL(url).host
  } catch {
    return url
  }
}
