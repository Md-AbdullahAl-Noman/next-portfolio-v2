'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CommandLineIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import {
  BANNER,
  COMMAND_NAMES,
  runCommand,
  type Action,
  type Line,
} from './terminal-engine'

type Entry = { prompt?: string; lines: Line[] }

const PROMPT = 'noman@portfolio ~ %'

const toneClass: Record<NonNullable<Line['tone']>, string> = {
  default: 'text-foreground/90',
  muted: 'text-muted',
  accent: 'text-[var(--primary)]',
  error: 'text-[#e0776b]',
  success: 'text-[#7ea884]',
}

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState<Entry[]>([{ lines: BANNER }])
  const [value, setValue] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [pastIdx, setPastIdx] = useState(-1)

  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // global launch: `~`/backtick, or Cmd/Ctrl-K — but never while typing elsewhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      const typing =
        el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (!open && !typing && (e.key === '`' || e.key === '~')) {
        e.preventDefault()
        setOpen(true)
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (open && e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // focus input + scroll to bottom whenever it opens or output grows
  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [open, history])

  const perform = useCallback(
    (action: Action) => {
      switch (action.kind) {
        case 'clear':
          setHistory([])
          break
        case 'close':
          setOpen(false)
          break
        case 'route':
          setOpen(false)
          router.push(action.to)
          break
        case 'open':
          window.open(action.url, '_blank', 'noopener,noreferrer')
          break
        case 'copy':
          navigator.clipboard?.writeText(action.text).catch(() => {})
          break
      }
    },
    [router],
  )

  const submit = useCallback(() => {
    const raw = value
    const { lines, action } = runCommand(raw)
    if (action?.kind === 'clear') {
      setHistory([])
    } else {
      setHistory((h) => [...h, { prompt: raw, lines }])
    }
    if (raw.trim()) setPast((p) => [raw.trim(), ...p])
    setPastIdx(-1)
    setValue('')
    if (action) perform(action)
  }, [value, perform])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(pastIdx + 1, past.length - 1)
      if (next >= 0) {
        setPastIdx(next)
        setValue(past[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = pastIdx - 1
      setPastIdx(next)
      setValue(next >= 0 ? past[next] : '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const word = value.trim()
      const hit = COMMAND_NAMES.find((c) => c.startsWith(word) && word)
      if (hit) setValue(hit + ' ')
    }
  }

  return (
    <>
      {/* launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="Open"
        aria-label="Open terminal"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-[var(--border-strong)] bg-black/40 px-4 py-2 font-mono text-xs text-muted backdrop-blur-md transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] md:inline-flex"
      >
        <CommandLineIcon className="size-4" />
        terminal
        <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted-2">~</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              role="dialog"
              aria-label="Terminal"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => inputRef.current?.focus()}
              initial={{ y: 24, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative flex h-[70vh] max-h-[640px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[#0b0e15]/95 shadow-[0_60px_160px_-40px_rgba(0,0,0,0.95)]"
            >
              {/* title bar */}
              <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-[#e0776b]/70" />
                  <span className="size-3 rounded-full bg-[#d3b384]/70" />
                  <span className="size-3 rounded-full bg-[#7ea884]/70" />
                </div>
                <span className="flex-1 text-center font-mono text-xs text-muted-2">
                  {PROMPT}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-muted transition-colors hover:text-foreground"
                  aria-label="Close terminal"
                >
                  <XMarkIcon className="size-4" />
                </button>
              </div>

              {/* body */}
              <div
                ref={bodyRef}
                className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
              >
                {history.map((entry, i) => (
                  <div key={i} className="mb-1">
                    {entry.prompt !== undefined && (
                      <div className="flex gap-2">
                        <span className="text-[var(--primary)]">{PROMPT}</span>
                        <span className="text-foreground/90">{entry.prompt}</span>
                      </div>
                    )}
                    {entry.lines.map((line, j) => (
                      <Row key={j} line={line} />
                    ))}
                  </div>
                ))}

                {/* live input */}
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-[var(--primary)]">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    className="flex-1 bg-transparent text-foreground caret-[var(--primary)] outline-none"
                    aria-label="Terminal input"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Row({ line }: { line: Line }) {
  const cls = toneClass[line.tone ?? 'default']
  if (line.href) {
    return (
      <a
        href={line.href}
        target={line.href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noreferrer"
        className={`block whitespace-pre-wrap ${cls} underline decoration-transparent transition-colors hover:decoration-current hover:text-[var(--primary)]`}
      >
        {line.text}
      </a>
    )
  }
  return <div className={`whitespace-pre-wrap ${cls}`}>{line.text || ' '}</div>
}
