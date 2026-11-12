// All copy lives here so the page can be re-themed for a product without
// touching layout. Sections read from this file; remove a section by deleting
// it from App.tsx.

export const brand = {
  name: 'X-ADYO OS',
  tagline: 'One playbook for every Windows 10 and 11 build',
}

export const repo = {
  url: 'https://github.com/adityagg13/X-ADYO-OS',
  release: 'https://github.com/adityagg13/X-ADYO-OS/releases/latest',
  // Direct download: always the newest release asset, served as an attachment
  // (the asset itself is named X-ADYO-OS.apbx so this link never changes).
  download: 'https://github.com/adityagg13/X-ADYO-OS/releases/latest/download/X-ADYO-OS.apbx',
  // Official AME Wizard (AME Beta) download, verified 2026-11.
  ameWizard: 'https://download.amelabs.net/AME%20Beta.zip',
  docs: {
    install: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/docs/INSTALL.md',
    presets: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/docs/PRESETS.md',
    modules: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/docs/MODULES.md',
    troubleshooting: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/docs/TROUBLESHOOTING.md',
    license: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/LICENSE',
    credits: 'https://github.com/adityagg13/X-ADYO-OS/blob/main/CREDITS.md',
  },
}

export const nav = {
  links: [
    { label: 'What it does', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Inside the pass', href: '#showcase' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Download', href: repo.download },
}

export const hero = {
  badge: 'v1.0.0 · open source · GPL-3.0',
  badgeHref: repo.download,
  title: ['One playbook for', 'every Windows build'],
  highlight: 'every',
  description:
    'X-ADYO OS is a single AME Wizard pass for Windows 10 and 11, from 1809 to 26H2: strip the bloat, close the telemetry defaults, tune services and performance, then read a full report of every change. Backed up, gated per build, reversible.',
  primary: { label: 'Download v1.0.0', href: repo.download },
  secondary: { label: 'See what it changes', href: '#features' },
  footnote: 'Restore point first · full backups · ~12 minute run',
}

export const logos = ['AME Wizard', 'Windows 10', 'Windows 11', 'PowerShell', 'Winget', 'GPL-3.0']

export const features = {
  eyebrow: 'What one pass does',
  title: 'Debloat, privacy, performance — with a way back',
  description:
    'Four things, done properly instead of pretending to do everything. Every tweak is gated per build, so the same file behaves correctly on Windows 10 1809 and Windows 11 26H2.',
  items: [
    {
      key: 'collab',
      title: 'One playbook, every build',
      description:
        'Per-module build gates: Windows 10-only tweaks stay off on 11, Windows 11-only tweaks stay off on 10. Fresh ISO or a year-old laptop — same package.',
      span: 2,
    },
    {
      key: 'automation',
      title: 'Three presets',
      description: 'Safe, Balanced (default) and Extreme. Same backups and report in every one.',
      span: 1,
    },
    {
      key: 'analytics',
      title: 'Measured, not guessed',
      description:
        'A self-contained HTML + TXT report lists every real before/after change, plus a stock-values inventory.',
      span: 1,
    },
    {
      key: 'integrations',
      title: 'Reversible by design',
      description:
        'A System Restore point first, then full backups of services, AppX families and scheduled tasks — with a partial undo script on top.',
      span: 2,
    },
  ],
}

export const steps = {
  eyebrow: 'How it works',
  title: 'From download to a quiet machine',
  items: [
    {
      title: 'Grab the .apbx',
      description:
        'Download the .apbx and open it in AME Wizard via Playbooks → Open. No install, no account.',
    },
    {
      title: 'Pick a preset',
      description:
        'Safe stays out of the way, Balanced tunes conservatively, Extreme goes further. The restore point stays on and you can pick Chrome, Brave or Firefox.',
    },
    {
      title: 'Apply, then read the report',
      description:
        'About 12 minutes later, C:\\Windows\\X-ADYO-OS\\install-report.html lists every change. The partial undo script brings back anything you miss.',
    },
  ],
}

export const showcase = {
  eyebrow: 'Inside the pass',
  title: 'What actually changes',
  tabs: [
    {
      key: 'inbox',
      title: 'Debloat',
      description: 'What gets removed, item by item, before anything changes on disk.',
    },
    {
      key: 'board',
      title: 'Privacy',
      description: 'Telemetry, ad IDs, suggested content and background apps — off by default.',
    },
    {
      key: 'report',
      title: 'Performance',
      description: 'Idle RAM, start-up items and services, before and after the pass.',
    },
  ],
}

export const metrics: { value: number; label: string; suffix?: string; decimals?: number }[] = [
  { value: 1, label: 'playbook for both operating systems' },
  { value: 15, label: 'supported builds across Windows 10 and 11' },
  { value: 3, label: 'presets: Safe, Balanced, Extreme' },
  { value: 100, suffix: '%', label: 'of changes backed up and logged' },
]

export const faq = {
  title: 'Questions, answered',
  items: [
    {
      q: 'What is X-ADYO OS, exactly?',
      a: 'One AME Wizard playbook (.apbx). It carries every module — debloat, privacy, services, performance, visual, network — with a build gate on each one, so the right changes apply to your exact Windows build.',
    },
    {
      q: 'Which Windows versions are supported?',
      a: 'Windows 10 from 1809 to 22H2 and Windows 11 from 21H2 to 26H2, plus the next servicing branch. See docs/COMPATIBILITY.md for the full build list and caveats.',
    },
    {
      q: 'Can I undo a pass?',
      a: 'Yes. A System Restore point is created first (unless you turn it off), services, AppX families and scheduled tasks are backed up, and a partial undo script restores startup values and re-enabled tasks. Full rollback is the restore point.',
    },
    {
      q: 'Does it need an internet connection?',
      a: 'Yes — the wizard checks requirements and the browser install (Chrome, Brave or Firefox) uses winget. Everything else runs locally; nothing is sent anywhere.',
    },
    {
      q: 'Will it break Windows Update or Defender?',
      a: 'No. A never-touch list is enforced by the build validator: Windows Update, Defender services, TrustedInstaller, the Store, winget and the shell AppX families are never disabled.',
    },
    {
      q: 'Where do I get it?',
      a: 'Free — the .apbx downloads straight from this page, under GPL-3.0. You can also build it yourself from source with the two Python scripts in the repo.',
    },
  ],
}

export const cta = {
  title: 'Download X-ADYO OS',
  description:
    'v1.0.0 is free and open source under GPL-3.0. Grab the .apbx — the download starts right away — and open it in AME Wizard.',
  primary: { label: 'Get the playbook', href: repo.download },
  secondary: { label: 'Get AME Wizard', href: repo.ameWizard },
  note: 'Restore point first · every change logged · partial undo included',
}

export const footer = {
  blurb: 'One AME Wizard playbook for every Windows 10 and 11 build. Transparent, reversible, open source.',
  columns: [
    {
      title: 'Playbook',
      links: [
        { label: 'What it does', href: '#features' },
        { label: 'How it works', href: '#how' },
        { label: 'Inside the pass', href: '#showcase' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Docs',
      links: [
        { label: 'Install guide', href: repo.docs.install },
        { label: 'Presets', href: repo.docs.presets },
        { label: 'Modules', href: repo.docs.modules },
        { label: 'Troubleshooting', href: repo.docs.troubleshooting },
      ],
    },
    {
      title: 'Project',
      links: [
        { label: 'GitHub', href: repo.url },
        { label: 'Releases', href: repo.release },
        { label: 'License', href: repo.docs.license },
        { label: 'Credits', href: repo.docs.credits },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} adityagg13 · X-ADYO OS · GPL-3.0`,
  github: repo.url,
}
