// All copy lives here so the page can be re-themed for a product without
// touching layout. Sections read from this file; remove a section by deleting
// it from App.tsx.

export const brand = {
  name: 'LITEXOS',
  tagline: 'One pass to a clean Windows',
}

export const nav = {
  links: [
    { label: 'What it does', href: '#features' },
    { label: 'How it works', href: '#how' },
    { label: 'Inside the pass', href: '#showcase' },
  ],
  signIn: { label: 'GitHub', href: 'https://github.com/adityagg13/saas-landing' },
  cta: { label: 'Get the playbook', href: '#cta' },
}

export const hero = {
  badge: 'v1.0 · private build',
  title: ['One pass to a', 'clean Windows'],
  highlight: 'clean',
  description:
    'LITEXOS Playbook is a single AME Wizard pass for Windows 10 and 11: strip the services nobody asked for, close the privacy defaults, tune for a low idle, then compress the image on the way out.',
  primary: { label: 'Get the playbook', href: '#cta' },
  secondary: { label: 'See what it removes', href: '#features' },
  footnote: 'Runs offline. Every change is logged and reversible.',
}

export const logos = ['AME Wizard', 'Windows 10', 'Windows 11', 'PowerShell', 'LZX', 'Winget']

export const features = {
  eyebrow: 'What one pass does',
  title: 'Debloat, privacy, performance — then compress',
  description:
    'Four stages, run in a fixed order. Each one does a single job properly instead of pretending to do everything.',
  items: [
    {
      key: 'collab',
      title: 'One playbook, every machine',
      description:
        'The same pass on a fresh install or on a laptop that has been collecting junk for a year.',
      span: 2,
    },
    {
      key: 'automation',
      title: 'Stages run in order',
      description: 'Debloat, privacy, performance and cleanup — then LZX compression at the end.',
      span: 1,
    },
    {
      key: 'analytics',
      title: 'Measured, not guessed',
      description: 'Idle RAM, start-up items and services are counted before and after the pass.',
      span: 1,
    },
    {
      key: 'integrations',
      title: 'Nothing left running',
      description:
        'Telemetry, widgets, store apps and background helpers that should not survive a fresh install.',
      span: 2,
    },
  ],
}

export const steps = {
  eyebrow: 'How it works',
  title: 'From ISO to a quiet machine',
  items: [
    {
      title: 'Boot into AME Wizard',
      description:
        'Run the playbook on a fresh install or your current Windows. It needs no network and installs nothing behind your back.',
    },
    {
      title: 'Pick a profile',
      description:
        'Standard keeps the day-to-day features, Minimal goes further, Keep takes your own list. Every stage can be toggled.',
    },
    {
      title: 'Run it, then reboot',
      description:
        'One pass, then LZX compression on the image. Everything disabled is written to the log, so it can come back.',
    },
  ],
}

export const showcase = {
  eyebrow: 'Inside the pass',
  title: 'The same machine, seen three ways',
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

export const metrics = [
  { value: 1, label: 'pass over the whole install' },
  { value: 4, label: 'stages in a fixed order' },
  { value: 0, label: 'subscriptions or nag screens' },
  { value: 100, suffix: '%', label: 'of changes logged and reversible' },
]

export const faq = {
  title: 'Questions, answered',
  items: [
    {
      q: 'What is a playbook, exactly?',
      a: 'One YAML file that AME Wizard reads. It lists every stage, service, scheduled task and registry change, so you can read what it does before you run it.',
    },
    {
      q: 'Which Windows versions are supported?',
      a: 'Windows 10 and Windows 11, x64. Server and LTSC builds are untested — they may work, but the playbook assumes a consumer install.',
    },
    {
      q: 'Can I undo a pass?',
      a: 'Yes. The playbook logs what it disables, and anything it turned off is a checkbox in AME Wizard or a one-line change in the YAML.',
    },
    {
      q: 'Does it need an internet connection?',
      a: 'No. The pass runs offline, and the LZX compression at the end is local too, so an image can be built on a machine that never sees a network.',
    },
    {
      q: 'Will it break Windows Update or Defender?',
      a: 'It does not remove Defender and it leaves the update pipeline alone. It targets advertising, telemetry and background helpers, not security patches.',
    },
    {
      q: 'Where do I get it?',
      a: 'v1.0 is a private build. Leave your email below and I will send the file with the changelog and a note on what each stage touches.',
    },
  ],
}

export const cta = {
  title: 'Get the playbook',
  description:
    'v1.0 is a private build. Drop your email and I will send the file, the changelog and a short note on what each stage touches.',
  placeholder: 'you@example.com',
  button: 'Send me the playbook',
  success: 'Check your inbox — the v1.0 file is on its way.',
}

export const footer = {
  blurb: 'A single-pass Windows playbook. Offline, logged, reversible.',
  columns: [
    { title: 'Playbook', links: ['What it does', 'How it works', 'Inside the pass', 'Changelog'] },
    { title: 'LITEXOS', links: ['Profile', 'GitHub', 'Notes', 'Contact'] },
    { title: 'Legal', links: ['Terms', 'Privacy'] },
  ],
  legal: `© ${new Date().getFullYear()} LITEXOS`,
}
