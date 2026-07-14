import projects from '@/data/projects.json'
import { skills } from '@/data/skills-sets'

/** One rendered output line. `href` turns it into a link; `tone` colors it. */
export type Line = {
  text: string
  tone?: 'default' | 'muted' | 'accent' | 'error' | 'success'
  href?: string
}

/** Side effects the React layer performs after a command runs. */
export type Action =
  | { kind: 'clear' }
  | { kind: 'close' }
  | { kind: 'route'; to: string }
  | { kind: 'open'; url: string }
  | { kind: 'copy'; text: string }

export type Result = { lines: Line[]; action?: Action }

const ME = {
  name: 'Md Abdullah Al Noman',
  role: 'Lead Software Engineer',
  bio: 'Five years shipping production platforms — from data model to deployment. Currently leading engineering at Autoworx.',
  email: 'noman229430@gmail.com',
  github: 'https://github.com/Md-AbdullahAl-Noman',
  linkedin: 'https://www.linkedin.com/in/alnoman-se/',
}

const COMMANDS: Record<string, string> = {
  help: 'list every command',
  whoami: 'who is this',
  about: 'the short story',
  ls: 'ls projects | ls skills',
  open: 'open <project> [--live] — e.g. open autoworx --live',
  skills: 'the stack, grouped',
  contact: 'ways to reach me',
  email: 'copy my email to clipboard',
  github: 'open my GitHub',
  linkedin: 'open my LinkedIn',
  neofetch: 'system info, hacker-style',
  sudo: "you don't have permission for that",
  clear: 'wipe the screen',
  exit: 'close the terminal',
}

export const COMMAND_NAMES = Object.keys(COMMANDS)

/** ASCII banner shown on boot and via `neofetch`. */
export const BANNER: Line[] = [
  { text: '  ███╗   ██╗ ██████╗ ███╗   ███╗ █████╗ ███╗   ██╗', tone: 'accent' },
  { text: '  ████╗  ██║██╔═══██╗████╗ ████║██╔══██╗████╗  ██║', tone: 'accent' },
  { text: '  ██╔██╗ ██║██║   ██║██╔████╔██║███████║██╔██╗ ██║', tone: 'accent' },
  { text: '  ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║', tone: 'accent' },
  { text: '  ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║', tone: 'accent' },
  { text: '  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝', tone: 'accent' },
  { text: '' },
  { text: `  ${ME.role} · portfolio.os`, tone: 'muted' },
  { text: "  type 'help' to look around · Esc to close", tone: 'muted' },
  { text: '' },
]

function projectList(): Line[] {
  return projects.map((p) => ({
    text: `  ${p.id.padEnd(22)} ${p.name}`,
    tone: 'default',
  }))
}

function skillList(): Line[] {
  const byCat: Record<string, string[]> = {}
  for (const s of skills) {
    ;(byCat[s.category] ??= []).push(s.name)
  }
  const lines: Line[] = []
  for (const [cat, names] of Object.entries(byCat)) {
    lines.push({ text: `  ${cat}`, tone: 'accent' })
    lines.push({ text: `    ${names.join(' · ')}`, tone: 'muted' })
  }
  return lines
}

/**
 * Pure command interpreter. No side effects — returns lines to print plus an
 * optional Action for the React layer (routing, clipboard, window.open).
 */
export function runCommand(raw: string): Result {
  const input = raw.trim()
  if (!input) return { lines: [] }

  const [cmd, ...args] = input.split(/\s+/)
  const name = cmd.toLowerCase()

  switch (name) {
    case 'help':
      return {
        lines: [
          { text: 'Available commands:', tone: 'muted' },
          ...COMMAND_NAMES.map((c) => ({
            text: `  ${c.padEnd(10)} ${COMMANDS[c]}`,
          })),
        ],
      }

    case 'whoami':
      return {
        lines: [
          { text: ME.name, tone: 'accent' },
          { text: ME.role },
        ],
      }

    case 'about':
      return { lines: [{ text: ME.bio }] }

    case 'ls': {
      const what = (args[0] ?? '').toLowerCase()
      if (what === 'skills') return { lines: skillList() }
      if (what === '' || what === 'projects' || what === '.')
        return {
          lines: [
            { text: 'projects/', tone: 'muted' },
            ...projectList(),
            { text: '' },
            { text: "run 'open <name>' to visit, add --live for the running site", tone: 'muted' },
          ],
        }
      return { lines: [{ text: `ls: no such directory: ${what}`, tone: 'error' }] }
    }

    case 'open': {
      const id = args.find((a) => !a.startsWith('-'))
      const live = args.includes('--live') || args.includes('-l')
      if (!id)
        return { lines: [{ text: 'usage: open <project> [--live]', tone: 'error' }] }
      const p = projects.find((x) => x.id === id)
      if (!p)
        return {
          lines: [
            { text: `open: project not found: ${id}`, tone: 'error' },
            { text: "try 'ls projects'", tone: 'muted' },
          ],
        }
      if (live) {
        const url = p.links?.live?.trim()
        if (!url)
          return { lines: [{ text: `open: no live URL for ${id}`, tone: 'error' }] }
        return {
          lines: [{ text: `launching ${p.name} → ${url}`, tone: 'success' }],
          action: { kind: 'open', url },
        }
      }
      return {
        lines: [{ text: `opening ${p.name}…`, tone: 'success' }],
        action: { kind: 'route', to: `/projects/${p.id}` },
      }
    }

    case 'skills':
      return { lines: skillList() }

    case 'contact':
      return {
        lines: [
          { text: `email     ${ME.email}`, href: `mailto:${ME.email}` },
          { text: `github    ${ME.github}`, href: ME.github },
          { text: `linkedin  ${ME.linkedin}`, href: ME.linkedin },
          { text: '' },
          { text: "tip: 'email' copies my address to your clipboard", tone: 'muted' },
        ],
      }

    case 'email':
      return {
        lines: [{ text: `${ME.email} — copied to clipboard`, tone: 'success' }],
        action: { kind: 'copy', text: ME.email },
      }

    case 'github':
      return {
        lines: [{ text: `opening ${ME.github}`, tone: 'success' }],
        action: { kind: 'open', url: ME.github },
      }

    case 'linkedin':
      return {
        lines: [{ text: `opening ${ME.linkedin}`, tone: 'success' }],
        action: { kind: 'open', url: ME.linkedin },
      }

    case 'neofetch':
      return { lines: [...BANNER] }

    case 'sudo':
      return {
        lines: [
          { text: `${ME.name.split(' ')[1]} is not in the sudoers file.`, tone: 'error' },
          { text: 'This incident will be reported. 😏', tone: 'muted' },
        ],
      }

    case 'clear':
      return { lines: [], action: { kind: 'clear' } }

    case 'exit':
    case 'quit':
      return { lines: [], action: { kind: 'close' } }

    default:
      return {
        lines: [
          { text: `command not found: ${name}`, tone: 'error' },
          { text: "type 'help' for the list", tone: 'muted' },
        ],
      }
  }
}
