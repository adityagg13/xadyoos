import { motion } from 'motion/react'
import { Check } from 'lucide-react'

import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { features } from '../content'
import { cx } from '../lib/cx'

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={features.eyebrow} title={features.title} description={features.description} />
        <div className="mt-14 grid auto-rows-[320px] grid-cols-1 gap-4 md:grid-cols-3">
          {features.items.map((item, i) => (
            <Reveal key={item.key} delay={(i % 3) * 0.08} className={cx(item.span === 2 && 'md:col-span-2')}>
              <article className="depth group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-glow transition-colors duration-300 hover:[--depth-edge:rgb(255_236_224/0.22)]">
                <div className="relative flex-1 overflow-hidden">
                  {item.key === 'collab' && <MachinesVisual />}
                  {item.key === 'automation' && <StagesVisual />}
                  {item.key === 'analytics' && <MeasureVisual />}
                  {item.key === 'integrations' && <RemovedVisual />}
                </div>
                <div className="relative h-[96px] border-t border-line px-6 pt-4">
                  <h3 className="text-[16px] font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

const machines = [
  { name: 'Windows 10', meta: '22H2' },
  { name: 'Windows 11', meta: '24H2' },
  { name: 'Fresh ISO', meta: 'install.wim' },
]

function MachinesVisual() {
  return (
    <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-6">
      {machines.map((machine, i) => (
        <motion.div
          key={machine.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="depth relative w-[124px] rounded-[14px] bg-bg/60 p-3 backdrop-blur"
        >
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-white/25" />
            <span className="size-1.5 rounded-full bg-white/25" />
            <Check className="ml-auto size-3 text-accent-2" />
          </div>
          <p className="mt-2 text-[12px] font-medium">{machine.name}</p>
          <p className="text-[10px] text-faint">{machine.meta}</p>
          <p className="mt-2 text-[10px] text-accent-2">pass applied</p>
        </motion.div>
      ))}
    </div>
  )
}

const stageList = [
  { label: 'Debloat', color: '#ff7a45' },
  { label: 'Privacy', color: '#ff4d6d' },
  { label: 'Performance', color: '#ffb547' },
  { label: 'Compress', color: '#22d3ee' },
]

function StagesVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <ol className="relative flex w-full max-w-[240px] flex-col gap-4">
        <svg aria-hidden className="absolute left-[19px] top-5 h-[calc(100%-40px)] w-px overflow-visible">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="animate-dash"
            strokeLinecap="round"
          />
        </svg>
        {stageList.map((stage, i) => (
          <motion.li
            key={stage.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="depth relative flex h-10 items-center gap-3 rounded-[14px] bg-bg/60 pl-3 pr-4 text-[12px] backdrop-blur"
          >
            <span
              className="round size-3 shrink-0 ring-4 ring-surface"
              style={{ background: stage.color, boxShadow: `0 0 16px ${stage.color}66` }}
            />
            {stage.label}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

const measureGroups = [
  { label: 'RAM', before: 100, after: 62 },
  { label: 'Apps', before: 78, after: 41 },
  { label: 'Boot', before: 88, after: 54 },
]

function MeasureVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      <div className="depth absolute left-6 top-6 rounded-[10px] bg-surface-2 px-2.5 py-1.5 text-[11px] text-muted">
        before <span className="mx-1 text-faint">to</span> after
      </div>
      <div className="flex h-[62%] items-end gap-4">
        {measureGroups.map((group, i) => (
          <div key={group.label} className="flex h-full flex-1 flex-col items-center">
            <div className="flex h-full w-full items-end justify-center gap-1">
              <motion.span
                className="w-1/2 origin-bottom rounded-[4px] bg-white/[0.12]"
                style={{ height: `${group.before}%` }}
                initial={{ scaleY: 0.2, opacity: 0.4 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
              />
              <motion.span
                className="w-1/2 origin-bottom rounded-[4px] bg-gradient-to-t from-accent/30 to-accent"
                style={{ height: `${group.after}%` }}
                initial={{ scaleY: 0.2, opacity: 0.4 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
              />
            </div>
            <span className="mt-1 text-[10px] text-faint">{group.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const removedThings = [
  'Telemetry',
  'Widgets',
  'Cortana',
  'OneDrive',
  'Recall',
  'Teams',
  'Xbox',
  'Suggested apps',
  'Ads',
  'Bing',
  'Store',
  'Tips',
]

function RemovedVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="flex flex-wrap justify-center gap-2">
        {removedThings.map((name, i) => (
          <div
            key={name}
            className="depth relative flex animate-float items-center gap-1.5 rounded-[10px] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted"
            style={{ animationDelay: `${(i % 6) * 0.35}s` }}
          >
            <span className="size-1.5 rounded-full bg-accent/60" />
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
