import { motion } from 'motion/react'
import { Archive, Check, Gauge, Shield, Trash2 } from 'lucide-react'

import { LogoMark } from './Logo'
import { cx } from '../lib/cx'

const stages = [
  { icon: Trash2, label: 'Debloat', count: '148 items' },
  { icon: Shield, label: 'Privacy', count: '22 toggles' },
  { icon: Gauge, label: 'Performance', count: '61 services' },
  { icon: Archive, label: 'Compress', count: 'LZX' },
]

const stats = [
  { label: 'Items queued', value: '148' },
  { label: 'Services off', value: '61' },
  { label: 'Start-up apps', value: '9' },
]

export function Monogram({
  initials,
  hue,
  className,
}: {
  initials: string
  hue: number
  className?: string
}) {
  return (
    <span
      className={cx('round grid size-6 shrink-0 place-items-center text-[10px] font-semibold text-white', className)}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 62%), hsl(${hue + 40} 70% 48%))` }}
    >
      {initials}
    </span>
  )
}

export function DashboardMock() {
  return (
    <div className="depth relative flex aspect-[16/10] w-full overflow-hidden rounded-window bg-surface text-left shadow-glow sm:aspect-[16/9]">
      <aside className="hidden w-[200px] shrink-0 flex-col border-r border-line bg-bg/60 p-3 sm:flex">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <LogoMark className="size-6 rounded-[8px]" />
          <span className="text-[12px] font-semibold">LITEXOS</span>
          <span className="ml-auto rounded-[6px] bg-accent/15 px-1.5 text-[10px] font-medium text-accent">v1.0</span>
        </div>
        <p className="mt-4 px-2 text-[11px] text-faint">Stages</p>
        <ul className="mt-1 flex flex-col gap-0.5">
          {stages.map(({ icon: Icon, label, count }) => (
            <li key={label} className="flex h-8 items-center gap-2 rounded-[10px] px-2 text-[12px] text-muted">
              <Icon className="size-3.5" />
              <span className="flex-1">{label}</span>
              <span className="tabular-nums text-[10px] text-faint">{count}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2 px-1.5 text-[10px] text-faint">
          <span className="round size-2 bg-accent-2" />
          Standard profile · offline
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="text-[12px] font-medium">Playbook run</span>
          <span className="rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-muted">Windows 11 · 24H2</span>
          <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-accent-2 sm:flex">
            <Check className="size-3.5" /> undo log saved
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="depth relative rounded-[12px] bg-white/[0.03] p-3">
              <p className="text-[11px] text-faint">{stat.label}</p>
              <p className="mt-1 text-[20px] font-semibold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="depth relative flex items-center gap-3 rounded-[12px] bg-white/[0.03] px-3 py-2.5"
            >
              <span className="text-[12px] font-medium">{stage.label}</span>
              <span className="block h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${25 * (i + 1)}%` }}
                />
              </span>
              <span className="text-[11px] tabular-nums text-faint">{25 * (i + 1)}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
