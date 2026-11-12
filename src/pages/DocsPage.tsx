import { useEffect } from 'react'
import { AlertTriangle, Check, Cpu, Download, Scale, Shield, Wrench } from 'lucide-react'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { brand, cta, hero } from '../content'

const sections = [
  { id: 'install', label: 'Install' },
  { id: 'presets', label: 'Presets' },
  { id: 'modules', label: 'Modules' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'license', label: 'License' },
]

const requirements = [
  'Windows 10 1809+ or Windows 11 21H2+ (x64 or Arm64)',
  'AME Wizard (latest release) — the button below downloads it',
  'An internet connection (the browser install runs through winget)',
  'AC power — the playbook refuses to run on battery',
  'No pending Windows updates',
  'A System Restore point or a VM snapshot before you start',
]

const beforeStart = [
  'Back up your data. The playbook never touches personal files, but a restore point is not a data backup.',
  'Uninstall third-party antivirus — the wizard blocks the run while one is active. Defender stays.',
  'Let the wizard disable Defender’s four toggles when it asks. Nothing is removed and they come back after the pass.',
  'Install all pending Windows updates — this is a hard requirement check.',
]

const installSteps = [
  {
    title: 'Grab the .apbx and open it in AME Wizard',
    body: 'Playbooks → Open → pick the file you downloaded from this site. No install, no account.',
  },
  {
    title: 'Pick your options on the wizard pages',
    body: 'Preset (Safe / Balanced / Extreme), restore point (keep it on), OneDrive / Teams / Edge / AI removals, inbox apps, browser (Chrome, Brave or Firefox — one is always installed), plus appearance and extras.',
  },
  {
    title: 'Run the pass',
    body: 'Roughly 8–15 minutes depending on app removals and the browser download. Explorer restarts at the end so visual changes appear.',
  },
  {
    title: 'Read the report',
    body: 'C:\\Windows\\X-ADYO-OS\\install-report.html lists every module, service, app and policy change with undo notes. Reboot only if reboot-required.txt exists.',
  },
]

const afterInstall = [
  'Pre-change snapshots live in C:\\Windows\\X-ADYO-OS\\Backups (services, AppX families, scheduled tasks).',
  'Undo X-ADYO OS.cmd restores service startup values and re-enables disabled tasks.',
  'rstrui.exe → “X-ADYO OS” puts back the full registry state from the restore point.',
]

const presets = [
  {
    name: 'Safe',
    tag: 'Stays out of the way',
    points: [
      'Retired and consumer AppX removal, with deprovision',
      'Telemetry services and diagnostic scheduled tasks off',
      'Advertising ID, CEIP, WER and cloud content policies off',
      'No service or performance changes',
    ],
  },
  {
    name: 'Balanced',
    tag: 'Default — recommended',
    points: [
      'Everything in Safe',
      'Conservative service set (about 25 services touched)',
      'Search web results off, network hardening (LLMNR, SMB)',
      'Game/MMCSS priorities, Win32PrioritySeparation, NTFS tweaks',
    ],
  },
  {
    name: 'Extreme',
    tag: 'For dedicated machines',
    points: [
      'Everything in Balanced',
      'Xbox service stack, touch keyboard and sensor services off',
      'Payment, hotspot, AppReadiness and WerSvc off',
      'Prefetch off, paging executive resident, maintenance off',
      'Widgets removed on Windows 11',
    ],
  },
]

const extremeTradeOffs = [
  'Game Pass and some Xbox-integrated games stop until the Xbox services are re-enabled.',
  'Touchscreen laptops lose the touch keyboard; auto-rotate and ambient light stop.',
  'Prefetch off only makes sense on an SSD; Windows may keep more kernel memory resident.',
]

const moduleGroups = [
  {
    icon: Download,
    title: 'Debloat',
    body: 'Retired and consumer AppX removal with snapshot + deprovision, OneDrive and Teams, optional Edge uninstall, AI components (Copilot, Recall) on Windows 11, and reinstall blockers so removed apps stay removed.',
  },
  {
    icon: Shield,
    title: 'Privacy',
    body: 'DiagTrack and friends off, diagnostic data / CEIP / WER / advertising ID policies, cloud content and spotlight, search hardened to local results only, per-app telemetry (Edge, Office, NVIDIA), cross-device features off.',
  },
  {
    icon: Cpu,
    title: 'Services & performance',
    body: 'Full backups first, then the Balanced service set — Extreme goes further (Xbox, touch, sensors, payment). Fast Startup, MMCSS and game task priorities, NTFS and file-hashing tweaks, Game DVR off, Game Mode on.',
  },
  {
    icon: Wrench,
    title: 'Network',
    body: 'Network throttling index off, LLMNR off, SMB hardening, legacy HomeGroup / Wi-Fi Sense cleanup, NIC power saving and delayed ACK off — tuned so downloads and LAN transfers behave.',
  },
]

const fixes = [
  {
    symptom: 'The wizard refuses to open the playbook',
    fix: 'Download the .apbx again from this site and open it as-is. Do not rename, re-zip or password-protect it — the wizard only reads the original ZipCrypto package, and AES-encrypted zips are rejected.',
  },
  {
    symptom: 'The run halts at the very start',
    fix: 'That is a requirement check: pending updates, battery power or no internet. Install updates, plug in, go online and re-run.',
  },
  {
    symptom: 'Edge removal fails or Edge comes back',
    fix: 'Reboot and retry once. If it still loops, reinstall Edge, run Windows Update, then remove it again — the unlock script lives in C:\\Windows\\X-ADYO-OS.',
  },
  {
    symptom: 'A low-storage error appears',
    fix: 'Backups plus the restore point need a few hundred megabytes. Free space and re-run.',
  },
  {
    symptom: 'Windows Update fails after the pass',
    fix: 'X-ADYO OS never disables Windows Update. Run Undo X-ADYO OS.cmd from C:\\Windows\\X-ADYO-OS, retry the update, then re-apply.',
  },
  {
    symptom: 'Game Pass or Xbox games stopped working',
    fix: 'You picked Extreme. Re-enable the Xbox services with the Undo script, or sc config XblAuthManager (and the XblGameSave, XboxNetApiSvc, XboxGipSvc services) back to demand.',
  },
  {
    symptom: 'Touch keyboard, rotation or WSL2 / Hyper-V stopped',
    fix: 'Extreme turns off touch and sensor services; VBS off breaks Hyper-V. Undo script restores the services; bcdedit /set hypervisorlaunchtype auto (then reboot) brings VBS back.',
  },
]

export function DocsPage() {
  useEffect(() => {
    document.title = `Docs — ${brand.name}`
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      el?.scrollIntoView()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div className="depth flex h-14 w-full max-w-[1120px] items-center justify-between rounded-control-lg bg-bg/70 px-3 pl-4 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
          <Logo />
          <Button href={cta.primary.href} className="h-9 rounded-[12px] px-4 text-[14px]">
            {cta.primary.label}
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-36 pb-10 sm:pt-44">
          <Container className="max-w-[860px]">
            <Reveal>
              <p className="text-[13px] font-medium text-accent">Docs</p>
              <h1 className="mt-3 text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[52px]">
                Everything about <span className="text-accent">the pass</span>
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">
                {hero.badge} — the full guide: how to install the playbook, what each preset
                changes, which modules run and what to do when something looks off.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="depth inline-flex h-9 items-center rounded-[12px] bg-white/[0.04] px-4 text-[14px] text-muted transition-colors hover:bg-white/[0.08] hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* Install */}
        <section id="install" className="scroll-mt-28 border-t border-line py-16 sm:py-20">
          <Container className="max-w-[860px]">
            <SectionHeading
              align="left"
              eyebrow="Install"
              title="From download to a quiet machine"
            />
            <Reveal className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="depth rounded-card bg-surface p-6">
                <p className="text-[15px] font-medium text-fg">Requirements</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {requirements.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="depth rounded-card bg-surface p-6">
                <p className="text-[15px] font-medium text-fg">Before you start</p>
                <ol className="mt-4 flex flex-col gap-2.5">
                  {beforeStart.map((b, i) => (
                    <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                      <span className="grid size-5 shrink-0 place-items-center rounded-[7px] bg-white/[0.06] text-[11px] font-medium text-fg">
                        {i + 1}
                      </span>
                      {b}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal className="mt-4">
              <div className="depth rounded-card bg-surface p-6">
                <p className="text-[15px] font-medium text-fg">The four steps</p>
                <ol className="mt-4 grid gap-4 sm:grid-cols-2">
                  {installSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-white/[0.06] text-[12px] font-medium text-fg">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[14px] font-medium text-fg">{s.title}</p>
                        <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal className="mt-4">
              <div className="depth rounded-card bg-surface p-6">
                <p className="text-[15px] font-medium text-fg">After install</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {afterInstall.map((a) => (
                    <li key={a} className="flex gap-2.5 text-[14px] leading-relaxed text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Presets */}
        <section id="presets" className="scroll-mt-28 border-t border-line py-16 sm:py-20">
          <Container className="max-w-[860px]">
            <SectionHeading
              align="left"
              eyebrow="Presets"
              title="Safe, Balanced, Extreme"
              description="Same backups, same report, same build gates in every preset — only the depth changes. You pick it on a wizard page before the run."
            />
            <Reveal className="mt-8 grid gap-4 sm:grid-cols-3">
              {presets.map((p) => (
                <div key={p.name} className="depth rounded-card bg-surface p-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[15px] font-semibold text-fg">{p.name}</p>
                    {p.name === 'Balanced' && (
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                        default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-faint">{p.tag}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-4">
              <div className="depth rounded-card bg-surface p-6">
                <p className="flex items-center gap-2 text-[15px] font-medium text-fg">
                  <AlertTriangle className="size-4 text-accent" />
                  What you accept with Extreme
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {extremeTradeOffs.map((t) => (
                    <li key={t} className="text-[14px] leading-relaxed text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] leading-relaxed text-faint">
                  Every toggle lands in the report as a registry value or service start type, and
                  the Undo script reverses the service changes.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Modules */}
        <section id="modules" className="scroll-mt-28 border-t border-line py-16 sm:py-20">
          <Container className="max-w-[860px]">
            <SectionHeading
              align="left"
              eyebrow="Modules"
              title="What actually runs"
              description="Around 30 modules run in a fixed order — restore point, backups, then the changes. Every module carries a build gate, so Windows 10-only tweaks stay off on 11 and vice versa."
            />
            <Reveal className="mt-8 grid gap-4 md:grid-cols-2">
              {moduleGroups.map((g) => (
                <div key={g.title} className="depth rounded-card bg-surface p-6">
                  <p className="flex items-center gap-2.5 text-[15px] font-medium text-fg">
                    <g.icon className="size-4 text-accent" />
                    {g.title}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{g.body}</p>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-4">
              <p className="text-[14px] leading-relaxed text-muted">
                Appearance and extras round it out: wallpaper, dark mode, legacy context menu,
                transparency, hibernation, SysMain, search indexing and HAGS — each one a wizard
                option, never a surprise. The install report lists the exact module, value and
                undo note for everything that ran.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="scroll-mt-28 border-t border-line py-16 sm:py-20">
          <Container className="max-w-[860px]">
            <SectionHeading
              align="left"
              eyebrow="Troubleshooting"
              title="When something looks off"
              description="First stop, always: C:\\Windows\\X-ADYO-OS\\install-report.html and the wizard log. Most symptoms have a one-step fix."
            />
            <Reveal className="mt-8">
              <ul className="depth divide-y divide-line rounded-card bg-surface shadow-glow">
                {fixes.map((f) => (
                  <li key={f.symptom} className="px-6 py-5">
                    <p className="text-[15px] font-medium text-fg">{f.symptom}</p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{f.fix}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        {/* License */}
        <section id="license" className="scroll-mt-28 border-t border-line py-16 sm:py-20">
          <Container className="max-w-[860px]">
            <SectionHeading align="left" eyebrow="License" title="Free, and it stays free" />
            <Reveal className="mt-8">
              <div className="depth rounded-card bg-surface p-6 sm:p-8">
                <p className="flex items-center gap-2.5 text-[15px] font-medium text-fg">
                  <Scale className="size-4 text-accent" />
                  GPL-3.0
                </p>
                <div className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-muted">
                  <p>
                    X-ADYO OS is released under the GNU General Public License v3.0. You may use
                    it on any number of machines, study it, change it and redistribute it —
                    including in modified form, as long as derivatives carry the same license.
                    No warranty is implied; like any system-level tool, read the report and keep
                    your restore point.
                  </p>
                  <p>
                    Windows, AME Wizard and every third-party product mentioned on this page
                    belong to their respective owners. X-ADYO OS is an independent playbook and is
                    not affiliated with Microsoft or Ameliorated.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal className="mt-10">
              <div className="depth relative overflow-hidden rounded-card bg-surface px-6 py-12 text-center shadow-glow sm:px-12">
                <p className="text-balance text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
                  Ready to run it?
                </p>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {cta.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button href={cta.primary.href} size="lg">
                    {cta.primary.label}
                  </Button>
                  <Button href={cta.secondary.href} variant="secondary" size="lg">
                    {cta.secondary.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="pb-10 pt-10">
        <Container>
          <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
            <p className="text-[13px] text-faint">
              © {new Date().getFullYear()} adityagg13 · {brand.name} · GPL-3.0
            </p>
            <p className="text-[13px] text-faint">
              <a href="/" className="transition-colors hover:text-fg">
                ← Back to the site
              </a>
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
