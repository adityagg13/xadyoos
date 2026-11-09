import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useState } from 'react'

import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { showcase } from '../content'
import { cx } from '../lib/cx'

export function Showcase() {
  const [active, setActive] = useState(showcase.tabs[0].key)
  return (
    <section id="showcase" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={showcase.eyebrow} title={showcase.title} align="left" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          <Reveal>
            <ul className="flex flex-col gap-1">
              {showcase.tabs.map((tab) => {
                const isActive = tab.key === active
                return (
                  <li key={tab.key}>
                    <button
                      type="button"
                      onClick={() => setActive(tab.key)}
                      aria-pressed={isActive}
                      className={cx(
                        'relative w-full rounded-card-sm px-5 py-4 text-left transition-colors',
                        isActive ? 'bg-surface' : 'hover:bg-white/[0.03]',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="showcase-active"
                          className="depth absolute inset-0 rounded-card-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                        />
                      )}
                      <span
                        className={cx(
                          'relative block text-[16px] font-semibold',
                          isActive ? 'text-fg' : 'text-muted',
                        )}
                      >
                        {tab.title}
                      </span>
                      <span className="relative mt-1 block text-[14px] leading-relaxed text-muted">
                        {tab.description}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="depth relative aspect-[16/10] overflow-hidden rounded-card bg-surface shadow-glow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 p-5 sm:p-7"
                >
                  {active === 'inbox' && <RemovedPanel />}
                  {active === 'board' && <PrivacyPanel />}
                  {active === 'report' && <MeasurePanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

const removed = [
  { name: 'Telemetry service', tag: 'service' },
  { name: 'Widgets and news feed', tag: 'package' },
  { name: 'Cortana', tag: 'app' },
  { name: 'OneDrive', tag: 'app' },
  { name: 'Xbox Game Bar', tag: 'package' },
  { name: 'Store suggestions', tag: 'policy' },
  { name: 'Recall', tag: 'feature' },
]

function RemovedPanel() {
  return (
    <ul className="flex h-full flex-col gap-2">
      {removed.map((item, i) => (
        <motion.li
          key={item.name}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className={cx(
            'depth relative flex items-center gap-3 rounded-[14px] px-4 py-2.5',
            i === 0
              ? 'bg-white/[0.04] [--depth-edge:rgb(255_236_224/0.22)]'
              : '[--depth-edge:var(--color-line)]',
          )}
        >
          <Check className="size-3.5 shrink-0 text-accent-2" />
          <span className="min-w-0 flex-1 truncate text-[13px] sm:text-[14px]">{item.name}</span>
          <span className="rounded-[6px] bg-white/[0.06] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-faint">
            {item.tag}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

const privacy = [
  { label: 'Telemetry', note: 'service off, scheduled task disabled' },
  { label: 'Advertising ID', note: 'off for every profile' },
  { label: 'Suggested content', note: 'Start, Settings and lock screen' },
  { label: 'Activity history', note: 'off, local list cleared' },
  { label: 'Background apps', note: 'denied by policy' },
]

function PrivacyPanel() {
  return (
    <ul className="flex h-full flex-col justify-center gap-2">
      {privacy.map((row, i) => (
        <motion.li
          key={row.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="depth relative flex items-center gap-3 rounded-[14px] bg-white/[0.03] px-4 py-3"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] sm:text-[14px]">{row.label}</span>
            <span className="mt-0.5 block truncate text-[11px] text-faint">{row.note}</span>
          </span>
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-faint">
            off
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

const groups = [
  { label: 'Idle RAM', before: 100, after: 61 },
  { label: 'Services', before: 92, after: 44 },
  { label: 'Start-up', before: 70, after: 38 },
]

function MeasurePanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="round size-2 bg-white/25" /> before
        </span>
        <span className="flex items-center gap-1.5">
          <span className="round size-2 bg-accent" /> after
        </span>
        <span className="ml-auto text-faint">sample run</span>
      </div>
      <div className="mt-4 flex flex-1 items-end gap-6">
        {groups.map((group, i) => (
          <div key={group.label} className="flex h-full flex-1 flex-col justify-end">
            <div className="flex flex-1 items-end gap-1.5">
              <motion.span
                className="w-1/2 origin-bottom rounded-[6px] bg-white/[0.12]"
                style={{ height: `${group.before}%` }}
                initial={{ scaleY: 0.2, opacity: 0.4 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
              />
              <motion.span
                className="w-1/2 origin-bottom rounded-[6px] bg-gradient-to-t from-accent/30 to-accent"
                style={{ height: `${group.after}%` }}
                initial={{ scaleY: 0.2, opacity: 0.4 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.7 }}
              />
            </div>
            <span className="mt-2 text-center text-[11px] text-faint">{group.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
