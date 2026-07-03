// CHRONICLE — the base voice (the cinematic, in-world register).
//
// This bundle is COMPLETE: it holds every voice-bearing string in the site and
// is the i18next `fallbackLng`. Other voices (plain, and the easter-egg
// personalities) override only the keys whose wording changes — missing keys
// resolve here automatically.
//
// Grouped by section. Non-copy data (links, icons, map coords, project facts,
// skill names, stat values) intentionally stays in `src/constants` — only
// display copy lives here. `{{var}}` are i18next interpolations.

export default {
  common: {
    // Rendered as "Chapter 01" in section eyebrows.
    chapterLabel: 'Chapter',
    optional: '(optional)',
  },

  nav: {
    toTop: 'To top',
    map: 'Map',
    openMap: 'Open the map',
    navigate: 'Navigate',
    navigateSub: 'Jump to any chapter',
    menu: 'Menu',
    close: 'Close menu',
    theme: 'Theme',
    sound: 'Sound',
    voice: 'Persona',
    voiceSub: 'Change who narrates the site',
    makingOfSub: 'How this site was built',
    menuCoach: 'Sound, themes & voices live in here — tap to explore.',
    contact: 'Contact',
  },

  // Chapter label (nav/eyebrow) + sub (the large serif section title). Keyed by
  // section id; `no`/`x`/`y`/`kw` stay in constants.
  chapters: {
    origin: { label: 'Origin', sub: 'Origin' },
    about: { label: 'The Craft', sub: 'The Craft' },
    work: { label: 'The Journey', sub: 'The Path So Far' },
    arsenal: { label: 'The Arsenal', sub: 'Tools of the Trade' },
    projects: { label: 'The Realms', sub: "Worlds I've Shipped" },
    contact: { label: 'Summon', sub: 'Get in Touch' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production React systems', 'full-stack web apps', 'dashboards & CRMs', 'interfaces that hold up'],
    hook: 'Full-stack developer, 5+ years shipping React, Next.js, and Node.js — from dashboards and CRMs to SaaS and enterprise products.',
    proof: ['5+ yrs · React / Next.js / Node.js'],
    ctaPrimary: 'See my work',
    ctaSecondary: 'Get in touch',
    ctaResume: 'Résumé',
    scroll: 'Scroll',
    spin: 'Spin the needle',
    spinShort: 'Spin',
    spinHint: 'Tap to spin',
  },

  about: {
    pullQuote: 'Five years, twenty-plus releases, six industries — every one shipped to production.',
    intro: [
      'I’m a full-stack developer focused on production web platforms — solid architecture underneath, and an obsessive eye on the details users feel but never see.',
      'Five years and twenty-plus releases across six industries. I own features [[endToEnd|from an empty repo to production monitoring]], and do my sharpest work where the problem is tangled and the path isn’t obvious.',
    ],
    scribeNote: "The Scribe's Note",
    principles: [
      { title: 'End-to-end ownership', body: 'From requirement grooming and system design to release validation and production monitoring.' },
      { title: 'Detail as discipline', body: 'Reusable UI systems, edge cases, and accessibility — the unglamorous craft that makes products feel solid.' },
      { title: 'Performance as a habit', body: 'Code-splitting, caching, CDN, and media optimization — [[measured|measured, not guessed]].' },
      { title: 'Secure by default', body: 'JWT/OAuth, Okta, RBAC and middleware access control across enterprise apps.' },
    ],
    disciplines: 'Disciplines',
    // Discipline cards (keyed by the service `iconKey` in constants).
    services: {
      frontend: { title: 'Frontend Architecture', description: 'React, Next.js, TypeScript, and reusable component systems.' },
      backend: { title: 'Backend Development', description: 'Node.js, Express, NestJS, REST APIs, JWT/OAuth, RBAC.' },
      performance: { title: 'Performance & SEO', description: 'Code-splitting, caching, CDN, Core Web Vitals, structured data.' },
      fullstack: { title: 'Full-Stack Delivery', description: 'End-to-end, from requirement grooming to production monitoring.' },
    },
    // Stat-band labels (keyed by the stat `key` in constants; values are data).
    stats: {
      years: 'Years Experience',
      projects: 'Projects Delivered',
      domains: 'Industry Domains',
      load: 'Faster Load Times',
    },
  },

  experience: {
    intro:
      'Where I’ve worked and what I shipped — from the first commit to the present campaign.',
    travelTrail: 'Travel the trail',
    prev: 'Previous waypoint',
    next: 'Next waypoint',
    hint: 'Swipe, or use the arrows',
    present: 'Present',
    onAssignment: 'On assignment',
    via: 'via Infosys',
    // Per-waypoint copy, keyed by the journey item `id` in constants.
    journey: {
      'first-trail': {
        chapter: 'The First Trail',
        headline: 'Where the road began.',
        role: 'Frontend Developer',
        org: 'Horizon Tour & Travels',
        points: [
          'Built CRM modules & responsive React UIs for sales workflows.',
          'Shipped PDF/Excel reporting — saved 16–20 hrs/week.',
          'Cut initial load time by 38%.',
        ],
      },
      oath: {
        chapter: 'The Oath',
        headline: 'Forged the foundations · CGPA 8.36 / 10.',
        role: 'B.E. Information Technology',
        org: 'Gujarat Technological University',
        points: [
          'Engineering degree in Information Technology.',
          'And a three-year LL.B. from Hemchandracharya North Gujarat University — earned alongside the work, with the bar cleared (AIBE) in 2026.',
        ],
      },
      expedition: {
        chapter: 'The Long Expedition',
        headline: 'Six industries. Production-grade. End to end.',
        role: 'Full Stack Developer',
        org: 'Inexture Solutions',
        points: [
          'First-ever Employee of the Month — claimed in month one, among 30.',
          'Delivered apps across finance, health, logistics, CRM, SaaS & media.',
          'Owned features end to end — grooming to production monitoring.',
        ],
      },
      vanguard: {
        chapter: 'The Vanguard',
        headline: 'Leading the front line of the Capital Group fleet.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · embedded with Capital Group',
        via: 'Flying Inexture’s colours — sub-contracted through Infosys, embedded with the Capital Group fleet.',
        points: [
          'Lead frontend across multiple products on the Capital Group network.',
          'Shipped 4 production releases — features charted from scratch.',
          'Ran sprint planning, client demos, code reviews & production monitoring.',
        ],
      },
      horizon: {
        chapter: 'The Horizon Ahead',
        headline: 'Seeking teams who value craft & ownership.',
        role: 'Open to the next quest',
        org: 'Available for senior roles',
        points: [],
      },
    },
    summonCta: 'Summon me',
  },

  arsenal: {
    subtitle: 'The tools I reach for across the stack — hover a skill to trace its constellation.',
    coreLabel: 'The Arsenal',
  },

  works: {
    intro:
      "Production work across finance, healthcare, logistics, media, and visualization. Some sits under NDA — what's shared is what's permissible.",
    realm: 'Realm',
    featured: 'Featured',
    nda: 'NDA',
    enterRealm: 'Enter the realm',
    source: 'Source',
    ndaSealed: "[[nda|Sealed under NDA]] — details limited to what's permissible.",
    chartMore: 'Chart {{count}} more realms',
    furl: 'Furl the map',
    // The nod to the unnumbered seventh realm — this very site (see the Atelier).
    nod: 'Six realms charted. The seventh is the one you are standing in.',
    nodCta: 'See how this site was built',
    // Per-project copy, keyed by the project `id` in constants. `name`,
    // `company`, `tags`, links and gallery stay data in constants.
    projects: {
      gajaakriti: {
        description: 'Dynamic media-heavy website and admin panel for a premium Ahmedabad-based wedding photography and films studio with optimized media delivery.',
        highlights: [
          'Built a modern Next.js website with dynamic landing pages, portfolio, blogs, testimonials, and admin panel',
          'Improved performance through caching, CDN strategy, Cloudflare R2, and video streaming optimization',
          'Implemented Firebase Auth and Firestore for authentication, user management, and content mapping',
          'Built Bash scripts to batch-compress images and videos, reducing hosting costs while maintaining quality',
        ],
      },
      'royal-tiles': {
        description: 'Interactive tile design and ordering tool where users select layouts, tile designs, fills, preview results live, and download order-ready PDF templates.',
        highlights: [
          'Built a custom floor visualization tool with live preview and downloadable PDF templates',
          'Programmatically rendered dynamic tile variants — corners, fills, grid patterns',
          'Built TensorFlow.js image-processing workflow to convert PNGs into [[regionSvg|region-based SVGs]]',
          'Developed an admin panel for managing tile designs, floor layouts, and configurations',
          'Added product tours, help drawers, and shortcut-key interactions for usability',
        ],
      },
      'advisor-portfolio': {
        description: 'Advisor-facing portfolio analysis platform built from scratch with Next.js, Okta authentication, Highcharts data visualization, and enterprise deployment tooling.',
        highlights: [
          'Built the frontend application from scratch — system design, reusable UI, route protection, API integration, sprint-wise delivery',
          'Integrated Okta OAuth with Auth.js and server-side middleware authorization logic',
          'Built portfolio analysis views with data tables and Highcharts for interactive digital reports',
          'Integrated LaunchDarkly feature flags, Harness deployments, and Splunk debugging',
          'Contributed to a Spring Boot backend for server-side PDF report generation',
        ],
      },
      'digital-investor': {
        description: 'Digital investment platform with rich user interactions, analytics tracking, and feature modules across frontend and backend.',
        highlights: [
          'Delivered React/Next.js feature modules and integrated Adobe Analytics tracking',
          'Supported Node/Express REST API integrations, error handling, and performance improvements',
          'Implemented React Query for server-state management, reducing redundant API calls',
        ],
      },
      srifin: {
        description: 'Full-stack CRM/ERP for managing financial data, workflows, and identity verification with secure RBAC.',
        highlights: [
          'Engineered RBAC and audit logs for compliance',
          'Accelerated onboarding by 20-25% with verification APIs',
          'Led image optimization improving Core Web Vitals',
        ],
      },
      xipper: {
        description: 'Multi-tenant hotel management platform with role-based operations, eKYC, booking, services, and billing.',
        highlights: [
          'Designed multi-tenant PostgreSQL models and REST APIs',
          'Cut manual billing adjustments by 30-35%',
          'Accelerated checkout speed by 15-20%',
        ],
      },
      'ai-chatbot': {
        description: 'Context-aware chatbot UI with real-time interactions using WebSocket and comprehensive end-to-end testing.',
        highlights: [
          'Led UI architecture with Next.js/Redux and WebSocket',
          'Adopted Storybook and Cypress for testing',
          'Decreased regressions by 25-30%',
        ],
      },
      'fantasy-cricket': {
        description: 'Real-money fantasy platform with live match syncing, secure payouts, and admin back-office operations.',
        highlights: [
          'Built cron pipelines for live match states',
          'Reduced admin intervention by 1.5-2 hours per match',
          'Achieved 99% transaction reliability',
        ],
      },
    },
  },

  contact: {
    availability:
      'Open to senior full-stack roles & collaborations — usually replies within a day.',
    theMessage: 'The Message',
    correspondence: 'Correspondence',
    inquiries: ['Senior role', 'Contract', 'Collaboration', 'Just saying hi'],
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me about the role or project…',
    },
    messagePlaceholders: {
      'Senior role': 'Tell me about the team, the role, and the stack…',
      Contract: 'Share the scope, timeline, and what you need shipped…',
      Collaboration: 'What should we build together? Pitch me the idea…',
      'Just saying hi': 'Say hello — what brought you here?',
    },
    submitIdle: 'Send message',
    submitLoading: 'Sending…',
    resumeCta: 'Download CV',
    status: {
      idle: 'I read every message myself.',
      sending: 'Sending your message…',
    },
    success: 'Message sent — I’ll reply as soon as I can.',
    errors: {
      required: [
        'Please fill in every field.',
        'Looks like a field or two is still empty.',
      ],
      email: [
        'That email doesn’t look right — mind checking it?',
        'Please enter a valid email address.',
      ],
      failed: [
        'That didn’t go through — try again?',
        'Something went wrong sending that. One more try?',
      ],
      notConfigured: [
        'The form isn’t wired up yet — reach me directly at {{email}}.',
        'Messaging is still being set up. For now, email me at {{email}}.',
      ],
    },
    quote: 'Prefer email? Copy my address or say hi on LinkedIn — no form required.',
    channels: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      location: 'Based in',
    },
  },

  map: {
    title: 'The Realm Map',
    close: 'Close the map',
    hint: 'Tap a realm to travel',
    actions: {
      voices: 'Change persona',
      resume: 'Read the Scroll (Resume)',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      themeLight: 'Light the dawn',
      themeDark: 'Fall to night',
    },
  },

  // The Voice Hall — the command-palette voice picker (scales past the popover).
  voiceHall: {
    title: 'Personas',
    subtitle: 'Choose who narrates the chronicle — or request a persona not yet among us.',
    searchPlaceholder: 'Search voices…  try “office”, “boss”, “moo”',
    nowNarrating: 'Now narrating',
    tryHint: 'Tap a voice — the whole chronicle, this hall included, re-tells itself in their words.',
    close: 'Close',
    noResult: 'No voice answers to that name — yet.',
    sealedHint: 'Tap a sealed voice and answer its clue to wake it — or type the secret word anywhere on the page.',
    found: '{{count}}/{{total}} sealed found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Voices',
      sealed: 'Sealed',
    },
    // The gamified "summon a new voice" tile.
    request: {
      section: 'Summon',
      cta: 'Summon a new voice',
      ctaSub: 'A character you’d love to hear narrate this? Send word to the cartographer.',
      back: 'Back',
      persona: 'Whose voice?',
      personaPlaceholder: 'Gandalf · a dread pirate · your favourite villain…',
      email: 'Your email',
      emailPlaceholder: 'your email — so I can tell you when it lands',
      note: 'Why them?',
      notePlaceholder: 'make your case (optional)',
      send: 'Send the request',
      sending: 'Summoning…',
      done: 'Your request takes flight',
      doneSub: 'The cartographer will weigh “{{persona}}.” Thank you, traveler.',
      error: 'The raven balked — check the name and a valid email, then try again.',
    },
  },

  footer: {
    quote: '“The journey is the reward.”',
    credit: '© {{year}} Manan Upadhyay · Crafted with React, GSAP & far too much chai.',
    atelierLink: 'The Making-Of — how this site was built',
    closeHead: 'Let’s build something.',
    closeSub: 'Open to senior full-stack roles and collaborations. I usually reply within a day.',
    getInTouch: 'Get in touch',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Get in touch',
    resume: 'Download résumé',
    dismiss: 'Dismiss',
  },

  // The Atelier's own route (/making-of) chrome — the doorway back home.
  makingOf: {
    back: 'Return to the Chronicle',
  },

  // Marginalia footnotes (LEGENDARY-ROADMAP §2). Keyed by the `[[id|…]]` marker
  // embedded in the flavor copy above. These are PLAIN substance — the real
  // engineering fact behind the flourish — and intentionally stay literal in
  // every voice (no per-voice overrides; personality bundles fall back here).
  marginalia: {
    endToEnd: 'End-to-end ownership: requirement grooming → system design → API integration → release validation → production monitoring.',
    measured: 'Profiled with Lighthouse and Chrome DevTools and tracked against Core Web Vitals — load time measured before and after, for a real 38% cut, not a guess.',
    nda: 'Real production work for an enterprise client, shipped under a non-disclosure agreement — the details stay sealed, but the engineering was the real thing.',
    regionSvg: 'No off-the-shelf library did this — I built a custom tool from scratch that uses TensorFlow.js to turn a flat PNG into an editable, region-segmented SVG.'
  },

  // Expedition recap (LEGENDARY-ROADMAP §5). A cinematic, session-only send-off
  // near contact: the cartographer "reads" the traveler from the browser alone
  // (device + locale + their live local sky) and pins them on an animated map —
  // all client-side, nothing stored or sent. `{{var}}` are interpolations.
  recap: {
    title: 'Your Expedition',
    subtitle: 'Read live from your device and your connection — shown here, kept nowhere.',
    how: 'One quiet lookup to an IP service names your city. Nothing else leaves this page, and nothing is stored.',
    sigilNote: 'Your traveler’s mark — drawn from your device alone. No two are alike, and this one was sent nowhere.',
    map: {
      // e.g. "your Dusk · 21:34"
      localNow: 'your {{sky}} · {{time}}',
    },
    reading: {
      title: 'The Reading',
      machine: 'Engine',
      system: 'Vessel',
      display: 'Viewport',
      tongue: 'Tongue',
    },
    signal: {
      title: 'The Signal',
      lantern: 'Lantern',
      road: 'Road',
      carrier: 'Carrier',
      origin: 'Origin',
    },
    journey: {
      timeAfield: 'Time afield',
      trail: 'Trail unrolled',
      visit: 'Voyage no.',
    },
    voices: {
      title: 'Sealed Voices',
      unlocked: '{{count}} / {{total}} found',
      sealed: 'Sealed',
      explore: 'Explore all',
      switchTo: 'Speak as {{voice}}',
      locked: 'A sealed voice, yet undiscovered',
    },
    sealed: {
      none: 'Three voices still lie sealed — listen for the words that wake them.',
      some: '{{count}} of {{total}} voices still lie sealed — keep listening.',
      all: 'Every voice discovered. A keen ear, traveler.',
    },
  },

  // The Atelier (LEGENDARY-ROADMAP §7) — the coda chapter: how this very site was
  // designed, developed and pushed past "done". The confession + manifesto are
  // the human core; the ledger pairs every shipped phase with what was cut. Metric
  // values + ids are data in constants.atelier; these are the voiced labels.
  atelier: {
    eyebrow: 'The Making-Of',
    title: 'How the map was drawn',
    confession: 'The making-of, minus the mystique.',
    confessionSub:
      'The honest version: why this site exists, how it’s built, what beta users flagged, and what I changed. Everything below is the real thing — a live analytics panel, the actual codebase map, the build reel — not screenshots of a process, but the process itself.',
    acts: { build: 'The Build', engine: 'The Engine Room', hidden: 'The Hidden Layer' },
    // The commit trail — a GitHub-style heatmap drawn from this repo's real git
    // history (CommitGraph + src/constants/commitHistory.js). All figures are data.
    commits: {
      title: 'The Commit Trail',
      range: 'Straight from this repo’s git log',
      caption:
        'Every square is a day I shipped to this repository — the whole build, drawn straight from its own git history. Not a mock-up: this is the real thing.',
      less: 'Less',
      more: 'More',
      tip_one: '{{count}} commit',
      tip_other: '{{count}} commits',
      busyUnit: '{{count}} in a day',
      streakUnit: '{{count}} days',
      aria: 'A calendar heatmap of daily commits to this repository',
      stats: {
        commits: 'Commits',
        days: 'Days building',
        busiest: 'Busiest day',
        streak: 'Longest streak',
      },
    },
    stats: {
      hours: 'Hours poured',
      commits: 'Revamp commits',
      phases: 'Wonder phases',
      voices: 'Site voices',
      lines: 'Lines of craft',
    },
    ledger: {
      intro:
        'The senior part of the work was not adding things — it was knowing what to leave out. Here is what shipped, and what I cut or refused to add on purpose.',
      built: 'What I shipped',
      cut: 'What I cut, and why',
    },
    phases: {
      voice: { title: 'The Voice switcher', why: 'A full i18next layer — the whole site re-skins through five personalities, scalable to fifteen, with easter-egg voices unlocked by discovery.' },
      marginalia: { title: 'Marginalia', why: 'Hover a flavor phrase and the real engineering fact unfolds in the margin — the fantasy made to earn its keep.' },
      sky: { title: 'Time-aware sky', why: 'Five theme modes that resolve from your real local time via SunCalc — no geolocation prompt, pure math from your timezone.' },
      sound: { title: 'Interactive sound', why: 'A Web Audio system of synthesized cues (zero bytes) that reward intent, never motion — default-on, silenced under reduced-motion.' },
      recap: { title: 'The Expedition recap', why: 'A cinematic instrument that reads your device and connection client-side and pins you on a live polar map — nothing stored, nothing sent.' },
      eggs: { title: 'Voice easter eggs', why: 'Type a secret word anywhere and a sealed personality wakes — Scott, Dwight, a cow — each authored in full character.' },
      telemetry: { title: 'Telemetry & discoverability', why: 'Thirty-three product events folding into one per-visit session recap, thirteen super-properties, and five PostHog dashboards — all cookieless, anonymous, and silenced under Do-Not-Track. Beside it, structured-data SEO and a bespoke logger. The instrument answers "are the moments touched?" without harvesting a thing about who touches them.' },
    },
    cuts: {
      assets: { title: 'A folder of images, GIFs & audio files', why: 'Almost none of this site is shipped media. The hero astrolabe is drawn in Canvas2D, the starfield is pure CSS, and every interface sound is synthesised live through the Web Audio API. The whole feedback layer ships as code, not megabytes — a smaller bundle, fewer network round-trips, and a faster first paint.' },
      threejs: { title: 'Three.js & the whole WebGL layer', why: 'An early build leaned on a 3D library for depth. I tore it out and rebuilt the same sense of space with layered CSS, parallax, and a hand-drawn Canvas2D astrolabe — dropping a heavy dependency and keeping the initial JS well under budget. Depth, without the download.' },
      tracking: { title: 'Cookie banners, cross-session tracking & surveillance analytics', why: 'The site does measure itself — but the senior call was how. PostHog runs cookieless (memory-only persistence), fully anonymous (no accounts, no identify(), no cross-session identity), and hard-disabled the instant Do-Not-Track is set. No consent banner, because there is nothing to consent to: nothing is sold, nothing follows you off the page. The analytics serve the craft — which moments get touched — not the surveillance.' },
      componentLib: { title: 'A pre-built UI kit or paid template', why: 'Every component here is bespoke — Tailwind for layout, CSS variables for theme, nothing lifted from a library. More work, but full pixel control and none of the bloat or that unmistakable look-alike-template feel.' },
      statusLine: { title: 'The “how did he know?” status line', why: 'Region + moon phase near the hero. Built, reviewed, cut — it edged from wonder toward creepy, and the time-driven palette already carried the magic.' },
      battery: { title: 'The battery readout', why: 'Removed: the Battery Status API lies on some platforms (macOS Chrome reports 100% while charging). A card that “reads you” must never show data it cannot trust.' },
    },
    eggs: {
      title: 'The Field Guide',
      intro: 'Most of the craft here is quiet on purpose — it answers only when you reach for it. Here is where to find what hides in plain sight.',
      astrolabe: {
        title: 'The living needle',
        how: 'Sweep your cursor across the hero astrolabe — the needle follows your hand, and a gear-mechanism sound turns at exactly the speed you move it.',
      },
      spin: {
        title: 'Spin the needle',
        how: 'Press the spin button on the instrument’s rim to flick the needle into a free spin — real flywheel physics wind it up and let it coast to rest.',
      },
      sound: {
        title: 'A synthesised score',
        how: 'Every cue on the page is generated live by Web Audio — zero bytes shipped. Toggle it from the speaker control, bottom-right, then listen on a theme change, a send, a map open.',
      },
      sky: {
        title: 'Five skies',
        how: 'The control top-right holds five skies — and “auto” reads your local time to choose dawn, day, dusk, or night for you.',
      },
      voices: {
        title: 'Hidden voices',
        how: 'The whole site can be re-voiced. Open the Voice Hall (⇧⌘V) — sealed personalities unlock when you type their secret word anywhere on the page. (Try “boss”.)',
      },
      map: {
        title: 'The chart',
        how: 'Press ⌘K (Ctrl K) to summon the realm map — a searchable chart of every chapter of the journey.',
      },
      raven: {
        title: 'The raven',
        how: 'Send word from Summon and a flock of ravens bursts across the page with a caw — the courier carrying your message.',
      },
      recap: {
        title: 'The traveller’s read',
        how: 'At the foot of Summon, an instrument panel reads your own device, screen, and connection — and, with your blessing, your city — then mints a one-of-a-kind sigil from it.',
      },
      console: {
        title: 'The cartographer’s ledger',
        how: 'Open the browser’s DevTools console — the cartographer left a gold-lettered greeting, clues to the sealed voices and the margins of the map, and a debug key for travellers who want to look under the hood in the wild.',
      },
    },
    observatory: {
      eyebrow: 'The Observatory',
      title: 'Instrumented, not surveilled',
      intro: 'A map you cannot read is just decoration. So once the realms were drawn, I built the instrument that reads them — product analytics, discoverability, and observability, engineered to respect the very traveller it watches.',
      hub: 'session recap',
      hubNote: 'Every named event folds into one tidy per-visit summary, flushed as you leave — the whole journey in a single row.',
      indexHint: 'Every star is a real event. Sweep the field — or choose one from the ledger — and the instrument names it and where it fires.',
      tapHint: 'The field revolves on its own. Tap any event below — the orbit points to it and its detail opens right here.',
      cadence: { once: 'Once per visit', repeat: 'Every time' },
      metrics: {
        events: 'Product events',
        superProps: 'Super-properties',
        webhooks: 'Webhook routes',
        dashboards: 'Live dashboards',
        schemas: 'Structured schemas',
      },
      groups: {
        origin: 'Origin & wayfinding',
        craft: 'The craft',
        realms: 'The realms',
        intent: 'Intent & summons',
      },
      panels: {
        privacy: {
          title: 'Privacy-first by design',
          body: 'PostHog runs cookieless and fully anonymous — no accounts, no identify(), memory-only persistence — and hard-disables the moment Do-Not-Track is set. No consent banner, because there is nothing to consent to.',
        },
        discoverability: {
          title: 'Built to be found',
          body: 'Five JSON-LD schemas (Person, WebSite, ProfilePage, Organization, address), Open Graph and Twitter cards, canonical URLs, and an application-name that claims the Google Knowledge Panel — so machines and humans read it the same way.',
        },
        observability: {
          title: 'Watched, so it never breaks quietly',
          body: 'A zero-dependency structured logger with scoped tags and a production debug key, exceptions caught from the error boundary and relayed to a Discord channel the instant they occur, and Vercel Speed Insights tracking Core Web Vitals from real visits.',
        },
      },
      webhooks: {
        title: 'The alert path',
        caption: 'Two webhooks carry word the instant it matters — a thrown exception, a fresh deploy — straight to where I already keep watch. No dashboard to babysit; the news finds me.',
        hop: 'webhook',
      },
      footnote: 'Thirty-three events, thirteen super-properties, five dashboards, five schemas — and not a single cookie. Senior work is not just shipping the moment; it is proving the moment lands.',
    },
    atlas: {
      eyebrow: 'The Codebase',
      title: 'How the map is built',
      intro: 'Open the structure itself — a hand-drawn chart of the repository. Walk it like a map; each file tells you not what it does, but why it sits where it does.',
      hotspots: 'Start here',
      prompt: 'Open a folder, or pick a landmark — every file carries the reasoning behind it.',
      why: 'Why it’s built this way',
      repoCta: 'See the originals',
    },
    reckoning: {
      eyebrow: 'The Reckoning',
      title: 'What the beta changed',
      intro: 'v1.0 shipped to ~358 visitors in three days and drew 200+ comments — some praise, some sharp. I read all of it, cross-checked it against the analytics, and shipped a revision. The honest split:',
      saidHead: 'They said',
      changedHead: 'I changed',
      items: [
        { said: 'Over-signals AI / “vibe-coded”.', changed: 'Redesigned the eyebrow tell, dropped the glass cards for opaque surfaces, rewrote the copy human-first, and rebuilt About as an editorial spread.' },
        { said: 'Too much text — recruiters won’t read it.', changed: 'Cut visible copy by roughly half and pushed the depth behind disclosure.' },
        { said: 'The hero doesn’t sell the developer.', changed: 'A value-first hook, an above-the-fold proof strip, and CTAs that point straight at the work.' },
        { said: 'Zero project images.', changed: 'Real screenshots now lead the featured realms.' },
        { said: 'Buggy scroll, confusing controls.', changed: 'Snappier scroll, native on mobile, and a label on every control.' },
      ],
      notes: 'Under the hood: canvas DPR capped at 2×, animation lifecycles leak-audited, reduced-motion and touch honored, AA-contrast text — and the analytics rebuilt so the next beta is judged on data, not vibes.',
      ctaLine: 'If this is the kind of product thinking you’re hiring for, let’s talk.',
      ctaContact: 'Get in touch',
      ctaResume: 'Résumé',
    },
    offmap: {
      title: 'The cartographer, off the map',
      intro: 'Three sides of the person who could not leave it alone — open a door.',
    },
    personas: {
      more: 'Read on',
      less: 'Close',
      storyteller: {
        label: 'The Storyteller',
        hook: 'I read systems the way I read sagas.',
        story: 'Middle-earth, Westeros, the Grand Line, every Nolan cut sliced out of order — structure underneath, consequence on top. That instinct is exactly why this site is built as a Chronicle, and not a CV.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'Before the code, there was a camera.',
        story: 'Short films and cinematic edits for cafés, restaurants and weddings — and that eye for framing and pacing never switched off. The motion on this page is not decoration; it is the same instinct, pointed at an interface.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'I reset where there is no signal.',
        story: 'When the screens go dark I head for the mountains — trekking, raw nature, the kind of quiet that resets you. It is part of why I can sit with a hard problem for hours and still enjoy it.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'Honestly? I built this because I get restless with the normal version of a thing — it was an excuse to try ideas I hadn’t tried and tools I hadn’t used yet, and to see how far past “done” I could push before I ran out of patience. (I didn’t.)',
      'What I actually care about is smaller than a hero shot: work that holds up under load, clients glad they trusted me, and the details most people let slide. The rest of this page is just me holding myself to that in public.',
    ],
    sign: '— Manan',
  },

  voice: {
    menuTitle: 'Persona',
    menuSub: 'Who narrates this chronicle? Pick a persona.',
    pinned: 'Marked Voices',
    sealed: 'Sealed Voices',
    sealedHint: 'Tap a sealed voice and',
    sealedTypeHint: 'answer its clue to wake it.',
    cluePlaceholder: 'Answer the clue…',
    clueSubmit: 'Speak the word',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Not the word. Read the clue and try again.',
    clueCloser: 'Closer — {{hint}}',
    clueGiveaway: 'The word is',
    clueTapUnlock: 'tap to speak it',
    more: '{{count}} more in the Voice Hall',
    openHall: 'Enter the Voice Hall',
    hallTeaserSome: '{{count}} sealed voices await discovery',
    hallTeaserAll: 'Every voice discovered — wander them all',
    // The one-time entice note above the quill (replaces the old static ring).
    note: 'Psst — this whole tale can be told by other personas. Care to meet them?',
    locked: 'Locked',
    ariaOpen: 'Choose a persona',
  },

  // Interactive sound design (LEGENDARY-ROADMAP §4). UI copy for the bottom-right
  // sound control; cues themselves are audio, not copy. Literal across voices.
  sound: {
    enableHint: 'This site has a soundtrack — tap below to hear it.',
    on: 'Sound',
    off: 'muted',
    live: 'on',
    lockedHint: 'tap to start',
    ready: 'Ready',
    toggleOn: 'Turn sound on',
    toggleOff: 'Turn sound off',
    volume: 'Sound volume',
  },

  // Time-aware sky (LEGENDARY-ROADMAP §3). `auto` reads the visitor's real local
  // sky; the others are manual. Mode names feed the `SkyControl` menu + chip and
  // stay literal across voices — the personality bundles fall back here.
  sky: {
    menuTitle: 'Sky',
    ariaOpen: 'Choose the sky',
    autoFollowing: 'following {{sky}}',
    modes: {
      auto: 'Auto',
      dawn: 'Dawn',
      day: 'Day',
      dusk: 'Dusk',
      night: 'Night',
    },
  },
};
