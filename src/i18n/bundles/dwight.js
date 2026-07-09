// ASSISTANT (TO THE) MANAGER — easter-egg personality (Dwight Schrute voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('dwight')` once unlocked. Pure flavor —
// every section still conveys the real portfolio substance, in Dwight's voice.
// The visitor is still Manan, channeling the Assistant (to the) Regional Manager.

export default {
  common: { chapterLabel: 'Fact' },

  chapters: {
    origin: { label: 'Identification', sub: 'Identification' },
    about: { label: 'Know Your Subject', sub: 'A Superior Specimen' },
    work: { label: 'Service Record', sub: 'Years of Service' },
    arsenal: { label: 'The Arsenal', sub: 'Weapons & Capabilities' },
    projects: { label: 'Conquests', sub: 'Territories Claimed' },
    contact: { label: 'Establish Contact', sub: 'Transmit a Message' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web systems', 'React applications', 'full-stack machines', 'zero-fault interfaces'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Bears · Beets · Battlestar Galactica'],
    ctaPrimary: 'See my work',
    ctaSecondary: 'Contact HQ',
    ctaResume: 'Résumé',
    scroll: 'Descend',
    spin: 'Free-spin it',
  },

  about: {
    pullQuote: '“Whenever I’m about to do something, I think ‘would an idiot do that?’ — and if they would, I do not do that thing.”',
    intro: [
      'I am Manan — a full-stack developer, a beet farmer, a black belt, and the owner of Schrute Farms (a five-star agritourism beet plantation). My code does not have bugs. Bugs have my code.',
      'Five years. Twenty-plus releases. Six industries conquered. I take a feature [[endToEnd|from requisition to production]] and I defend it like it is my own land — which, spiritually and legally, it is.',
    ],
    disciplines: 'Areas of Dominance',
    services: {
      frontend: { title: 'Interface Superiority', description: 'Production UIs with React, Next.js, TypeScript and reusable systems. The interface is the first line of defense. It will not fall.' },
      backend: { title: 'Core Infrastructure', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. The foundation — without it the structure collapses. Mine does not. Identity theft is not a joke; millions of families suffer every year. Not on my watch.' },
      performance: { title: 'Maximum Efficiency & Visibility', description: 'Code-splitting, caching, CDN, Core Web Vitals. Wasted time is weakness. I do not tolerate weakness — I ship faster than 80% of all snakes. Structured-data SEO ensures the search engines file me correctly. Fast and findable.' },
      fullstack: { title: 'Total Command', description: 'End-to-end ownership, requisition to production monitoring. I control the entire chain. There are no gaps in my perimeter.' },
    },
    stats: {
      projects: 'Missions Completed',
      domains: 'Sectors Dominated',
      load: 'Speed Increase',
    },
  },

  experience: {
    intro: 'This is my service record. It is accurate, verifiable, and impressive. Question it and you question the sun. Proceed.',
    travelTrail: 'Advance',
    present: 'Active Duty',
    onAssignment: 'Deployed',
    journey: {
      'first-trail': {
        chapter: 'Recruitment',
        headline: 'The campaign began here.',
        role: 'Frontend Developer',
        points: [
          'Constructed CRM modules and React interfaces for sales operations.',
          'Deployed PDF/Excel reporting — reclaimed 16–20 hours per week. Efficiency.',
          'Reduced load time by 38%. Measured. Verified. Documented.',
        ],
      },
      oath: {
        chapter: 'Training',
        headline: 'Formal credentials acquired. CGPA 8.36 / 10. Fact.',
        role: 'Cadet, Information Technology',
        credential: "Second credential: LL.B. — bar examination (AIBE) passed. Legally formidable. Also a former volunteer deputy sheriff.",
        points: [
          'Acquired a formal engineering degree. Credentials are non-negotiable.',
        ],
      },
      expedition: {
        chapter: 'The Long Campaign',
        headline: 'Six industries. Production-grade. No survivors — among the bugs.',
        role: 'Full Stack Developer',
        points: [
          'Awarded the first-ever Employee of the Month. Month one. Bested 29 rivals. Dominance.',
          'Deployed applications across six sectors: finance, health, logistics, CRM, SaaS, media.',
          'Maintained total ownership — requisition through production surveillance.',
        ],
      },
      vanguard: {
        chapter: 'Special Assignment',
        headline: 'Commanding the front line of the Capital Group account.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · stationed at Capital Group',
        via: 'Chain of command, stated precisely: enlisted at Inexture, sub-contracted through Infosys, stationed at Capital Group. Three flags. One soldier. Zero confusion. Question it and you question logistics itself.',
        points: [
          'Led frontend operations across multiple Capital Group products. Command established.',
          'Executed 4 production releases. Features built from nothing. Flawless.',
          'Directed sprint planning, client demos, code reviews, and production surveillance.',
        ],
      },
      horizon: {
        chapter: 'Next Deployment',
        headline: 'Seeking a worthy team. Beet-farming experience a plus, not required.',
        role: 'Awaiting Next Assignment',
        points: [],
      },
    },
    summonCta: 'Contact HQ',
  },

  arsenal: {
    subtitle: 'These are not skills. These are survival competencies. Each one field-tested in combat. Hover one to identify its known associates.',
    coreLabel: 'The Arsenal',
    coreLegend: 'the ringed ones are my primary weapons. fact.',
    inventoryLegend: 'marks a primary weapon. fact.',
    viewChart: 'Radar',
    viewInventory: 'Manifest',
  },

  works: {
    intro: 'Territories I have claimed and held — across finance, healthcare, logistics, media. Some are classified. I will disclose only what regulation permits. Do not push me.',
    realm: 'Conquest',
    featured: 'Decorated',
    nda: 'Classified',
    enterRealm: 'Enter the territory',
    source: 'Schematics',
    ndaSealed: '[[nda|Classified]]. I have said too much already. This conversation is over.',
    ndaArch: 'Abstracted schematic — classified',
    chartMore: 'Reveal {{count}} more conquests',
    furl: 'Seal the records',
    fullStory: 'The full report',
    nod: 'Six territories above. The seventh is the ground beneath your feet — this site.',
    nodCta: 'Review the schematics',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s media, delivered at superior speed. Weddings are a battlefield.',
        description: 'A media-heavy website and command center for a premium wedding studio. Media delivery: optimized. Performance: superior.',
        highlights: [
          'Constructed a Next.js site — landing pages, portfolio, blogs, admin command center.',
          'Optimized performance with caching, CDN, Cloudflare R2 and video streaming. No wasted bytes.',
          'Implemented Firebase Auth and Firestore. Access is controlled.',
          'Authored Bash scripts to compress media and reduce costs. Resourceful.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor. Preview it live. Generate the order document. Precision.',
        description: 'A tactical tile-design system — select layouts, preview live, generate order-ready PDFs. Precision tooling.',
        highlights: [
          'Engineered a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants programmatically — corners, fills, grids. Exact.',
          'Built a TensorFlow.js pipeline converting PNGs to [[regionSvg|region-based SVGs]].',
          'Constructed an admin panel for designs and layouts.',
          'Deployed product tours and shortcuts. Usability is a weapon.',
        ],
      },
      'advisor-portfolio': {
        lead: 'An enterprise finance platform, constructed from bare earth. The perimeter holds.',
        description: 'An advisor-facing finance platform, built from the ground up — Next.js, Okta authentication, Highcharts. Enterprise-grade.',
        highlights: [
          'Built the entire frontend from scratch — architecture, reusable UI, route protection, delivery.',
          'Integrated Okta OAuth with server-side authorization. The perimeter holds.',
          'Constructed analysis views with tables and Highcharts. Data, weaponized.',
          'Integrated feature flags, deployments and debugging instrumentation.',
          'Contributed to a Spring Boot backend for PDF generation.',
        ],
      },
      'digital-investor': { description: 'An investment platform with rich interactions and analytics tracking. Capital demands precision. I delivered.' },
      srifin: { description: 'A full-stack microfinance CRM/ERP — financial data, workflows, identity verification, RBAC. Compliance is law.' },
      xipper: { description: 'A multi-tenant hotel management platform — operations, eKYC, booking, billing. Total operational control.' },
      'ai-chatbot': { description: 'A context-aware chatbot interface with real-time messaging and comprehensive testing. It does not malfunction.' },
      'fantasy-cricket': { description: 'A real-money fantasy sports platform — live syncing, secure payouts, back-office command. Zero tolerance for error.' },
    },
  },

  contact: {
    availability: 'I respond to every transmission. Efficiency is the highest form of respect.',
    theMessage: 'The Transmission',
    correspondence: 'Channels',
    placeholders: {
      name: 'State your name',
      email: 'State your email',
      message: 'State your business. Be specific. Be honest. I will know.',
    },
    submitIdle: 'Transmit',
    submitLoading: 'Transmitting…',
    status: {
      idle: 'The raven is on standby. Disciplined. Alert.',
      sending: 'Raven deployed. Maintain radio silence…',
    },
    resumeCta: 'Service Record',
    success: 'Transmission received. Acknowledged. Filed in triplicate. I have already begun a background check on the sender. I will respond.',
    errors: {
      required: [
        'Incomplete transmission. A field is empty. Unacceptable. Complete it.',
        'You have left a field blank. This is a vulnerability. Fill every field.',
        'An empty field is a weakness. Weakness is unacceptable. Complete the form.',
        'Question: did you fill every field? Answer: no. Correct this immediately.',
      ],
      email: [
        'That address is invalid. Fact. Correct it and try again.',
        'That is not a valid email. I have verified this. I am never wrong. Fix it.',
        'False. That email does not exist. I checked. Re-enter a real one.',
        'An invalid address. The server cannot deliver it. Correct it.',
      ],
      failed: [
        'Transmission failed. Likely sabotage — possibly Jim. Attempt again.',
        'The message did not send. Sabotage is suspected. I will investigate. You: retry.',
        'Delivery failed. This will be noted in my report. Resend immediately.',
        'Failure. Unacceptable, but recoverable. Submit the form again.',
      ],
      notConfigured: [
        'The transmitter is not yet operational. Contact me directly: {{email}}.',
        'The system is not yet armed. Until then, transmit directly to {{email}}.',
        'The relay is offline — a temporary tactical disadvantage. Reach me at {{email}}.',
      ],
    },
    quote: '“Not everything is a lesson. Sometimes it is just an enjoyable experience. This contact form is both.”',
    channels: { location: 'Headquarters' },
  },

  map: {
    footerHint: 'enter to deploy · esc to retreat',
    actions: {
      resume: 'Service Record',
      themeLight: 'Daylight ops',
      themeDark: 'Night ops',
    },
  },

  recap: {
    title: 'Surveillance Report',
    subtitle: 'Compiled through superior observation of your machine and your uplink. You revealed all of this. Resistance is illogical.',
    how: 'A single reconnaissance ping to an IP registry confirmed your settlement. No intelligence was exfiltrated or archived. This time.',
    sigilNote: 'Your biometric crest, computed from your hardware. Unique. Unforgeable. Generated on-site and transmitted nowhere. Fact.',
    map: {
      localNow: 'Local time {{time}}. Condition: {{sky}}. Position triangulated. Logged.',
    },
    reading: {
      title: 'Subject Profile',
      machine: 'Hardware (Cataloged)',
      system: 'Operating Environment',
      display: 'Visual Apparatus',
      tongue: 'Dialect',
    },
    signal: {
      title: 'Intercepted Transmissions',
      lantern: 'Power Reserves',
      road: 'Uplink Speed',
      carrier: 'Service Provider',
      origin: 'Network Address',
    },
    journey: {
      timeAfield: 'Time Under Observation',
      trail: 'Distance Surveyed',
      visit: 'Recorded Incursions',
    },
    voices: {
      title: 'Classified Narrators',
      unlocked: '{{count}}/{{total}} declassified',
      sealed: 'Classified',
      switchTo: 'Assume identity: {{voice}}',
      locked: 'Classified. Strictly need-to-know.',
    },
    sealed: {
      none: 'Three narrators remain classified. I will find them. I always find them.',
      some: '{{count}} of {{total}} narrators still classified. The investigation continues.',
      all: 'All narrators declassified. Impressive. I trust you completely. (I do not.)',
    },
  },

  // The Atelier — Dwight's voice. Narrative keys only; per-phase/per-cut details
  // fall back to chronicle's real facts.
  atelier: {
    eyebrow: 'The Schematics',
    title: 'How This Was Constructed',
    confession: 'It met every standard. None of them were mine. Mine are higher.',
    confessionSub:
      'The site was presentable forty commits ago. External standards are for personnel who require supervision. I held it to the Schrute standard — absolute — and I installed the surveillance to prove which systems are used. Fact.',
    acts: { build: 'The Construction', engine: 'The Engine Room', hidden: 'Concealed Systems' },
    engineBridge: 'That is how the system is monitored. This is how the system is structured. Both are correct.',
    commits: {
      title: 'The Operations Log',
      range: 'Extracted directly from the repository. Verified.',
      caption: 'A disciplined three-week campaign — the 2026 rebuild of a repository established in 2023. Every commit was inspected before entering the codebase — lint, types, build, on every push and every pull request. Failure is not permitted. Standards are not optional.',
    },
    stats: {
      voices: 'Voices commanded',
      lines: 'Lines fortified',
    },
    ledger: {
      intro:
        'Weakness is adding everything. Strength is the discipline to remove. I removed with precision. Observe.',
      built: 'Deployed',
      cut: 'Eliminated, with cause',
    },
    eggs: {
      title: 'Concealed Features. A Briefing.',
      intro: 'Hidden systems. Tap an entry to receive its intelligence. Memorize it.',
      astrolabe: {
        title: 'The Tracking Alidade',
        how: 'Move your cursor across the compass. The needle pursues it without mercy. A gear sound matches its speed exactly. Precision. Like a falcon.',
      },
      sky: {
        title: 'Five Sky States',
        how: 'Top-right control. Five skies. “Auto” reads your local time and deploys the correct one. Surveillance-grade. Excellent.',
      },
      voices: {
        title: 'Classified Narrators',
        how: 'The site speaks in multiple identities. Open the Hall with ⇧⌘V. Locked identities require a password, typed anywhere on the page. The password for one of them is “beets”. You did not hear that from me.',
      },
      raven: {
        title: 'Raven Dispatch',
        how: 'Submit the form. A flock of ravens is released across the screen with an audible cry. The message is en route. Do not intercept it.',
      },
      recap: {
        title: 'Visitor Reconnaissance',
        how: 'At the base of the contact section, a panel scans your device, display, and network — and your city, with consent — then forges a unique sigil. Identity confirmed.',
      },
      console: {
        title: 'Encrypted Field Notes',
        how: 'Open the DevTools console. A classified gold-lettered briefing awaits, with intelligence on the sealed identities and a debug override for field operations. Standard protocol. Read it. Do not delete it.',
      },
    },
    observatory: {
      eyebrow: 'The Watch',
      title: 'Surveillance. Anonymous. Superior.',
      intro: 'A system you do not monitor is a system in mutiny. I monitor. Anonymously, cookielessly, and with the visitor’s full consent withdrawn the instant they request it. This is not paranoia. This is leadership.',
      hub: 'the session dossier',
      hubNote: 'Every action consolidates into a single dossier, transmitted on departure. One file. Complete. Filed.',
      indexHint: 'Each point of light is a logged event. Sweep the field or select one from the manifest; it will identify itself and disclose its trigger. Nothing here is unaccounted for.',
      cadence: { once: 'Once per visit', repeat: 'Every occurrence' },
      metrics: {
        events: 'Tracked events',
        dashboards: 'Command boards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Movement',
        craft: 'Engagement',
        realms: 'Territories',
        intent: 'Contact attempts',
      },
      panels: {
        privacy: {
          title: 'Anonymous. By Protocol.',
          body: 'No accounts. No cookies. Nothing retained. Do-Not-Track ceases surveillance instantly. Discipline.',
        },
        discoverability: {
          title: 'Correctly Filed',
          body: 'Five structured schemas and link previews — the search engines classify me with precision.',
        },
        observability: {
          title: 'No Failure Goes Unreported',
          body: 'Exceptions dispatched to Discord the instant they occur. I am notified first. Always first.',
        },
      },
    },
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'The Perimeter',
      title: 'One territory. Three sanctioned exits.',
      intro: 'Study this map. Everything operates inside your device — the territory. Exactly three transmissions are permitted through the perimeter. All others are neutralized. Fact.',
      clientZone: 'The territory',
      clientZoneSub: 'all operations run on your device',
      beyondZone: 'Beyond the perimeter',
      beyondZoneSub: 'sanctioned transmissions only',
      wall: 'The perimeter',
      sealedNote: 'Nothing else gets out. No cookies, no identity, no media payloads. The fonts are grown on-site, like my beets.',
      hint: 'Interrogate a station',
      readoutRest: 'Every post has a purpose. Inspect them. I have already inspected you.',
      nodes: {
        traveler: { name: 'You, the visitor', why: 'You enter once, through the front. I see you. One request, one page, no detours.' },
        shell: { name: 'Command post', why: 'One HTML file, styles installed at build. It renders before the scripts report for duty. Two routes, one Layout — chain of command, respected.' },
        motion: { name: 'Locomotion', why: 'One clock commands all movement. Two clocks would be chaos. On touch devices: native scroll. Use what the land gives you.' },
        narrator: { name: 'Identity roster', why: 'Ten approved identities. The sealed ones stay dark until the code word is spoken. I respect that protocol deeply.' },
        sky: { name: 'Weather station', why: 'Reads your clock, never your coordinates. It could find your coordinates. It chooses not to. Discipline.' },
        sound: { name: 'Alarm systems', why: 'All audio synthesized on-site. Zero bytes shipped. An armory that manufactures its own ammunition. Ideal.' },
        memory: { name: 'The files', why: 'The session log dies with the tab. The visit count stays in YOUR browser. Nothing leaves. Identity theft is not a joke.' },
        telemetry: { name: 'Surveillance (ethical)', why: 'Counts events, not people. Cookieless. Anonymous. Do-Not-Track shuts it down instantly. I wish Jim had that setting.' },
        raven: { name: 'The messenger', why: 'Your message routes through a serverless post. The key never enters the browser. I would trust it with the farm.' },
        reading: { name: 'Reconnaissance', why: 'One IP lookup, only if you request it, shown to you, then destroyed. That is how you run recon.' },
      },
    },

    atlas: {
      eyebrow: 'The Filing Protocol',
      title: 'Every File In Its Place',
      intro: 'A disorganised codebase is a disorganised mind. Mine is neither. Inspect the structure; each file is positioned by doctrine, and the doctrine is sound.',
      hotspots: 'Critical Assets',
      browseAll: 'Inspect the entire structure',
      prompt: 'Select a directory or a critical asset. The reasoning will be disclosed.',
      why: 'The Justification',
      repoCta: 'Inspect The Source',
    },
    offmap: {
      title: 'The Man Behind the Manager',
      intro: 'A superior man has multiple dimensions. I have three. Select one. Investigate.',
    },
    personas: {
      more: 'Read the file',
      less: 'Classify it',
      storyteller: {
        label: 'The Strategist',
        hook: 'I do not watch sagas. I study them.',
        story: 'Lord of the Rings — a documentary about loyalty and walking. Game of Thrones — a cautionary tale about poor succession planning. Anime — strategically superior storytelling. This is why the site is a map of realms. Tactics, not entertainment.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'I operate a camera with precision.',
        story: 'I have produced cinematic footage for establishments and events. This is why the site moves correctly — every motion is deliberate, surveilled, and personally approved by me. An undisciplined animation is a security vulnerability.',
      },
      wanderer: {
        label: 'The Survivalist',
        hook: 'I retreat to the wilderness. No signal.',
        story: 'Trekking. Off the grid. This is not a vacation — it is a readiness exercise. A man must be able to function away from the network. I return sharper. Nature does not coddle you, and neither do I.',
      },
    },
    builtWith: 'Constructed with',
    manifesto: [
      'I possess an unrelenting compulsion to surpass the ordinary specification. Beneath the discipline: work that withstands assault, and attention to detail so total it borders on surveillance. Fact.',
    ],
    sign: '— Dwight K. Schrute. (Manan. It is Manan.)',
  },

  voiceHall: {
    title: 'Narration Authorization',
    subtitle: 'Select the narrator cleared to narrate this chronicle. Choose correctly. Identity is everything.',
    nowNarrating: 'Currently in command',
    preview: {
      eyebrow: 'Under review',
      sealed: 'Unauthorized narrator',
      apply: 'Authorize this narrator',
      active: 'Currently in command',
    },
    tryHint: 'Select a narrator. The entire chronicle — this panel included — will immediately submit to it. There is no resistance.',
    close: 'Dismiss',
    sealedHint: 'Certain narrators are sealed for security. Select one and supply its password — or type the correct password anywhere on the page — to breach them.',
    found: '{{count}}/{{total}} sealed narrators breached',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'Authorized Personnel',
      sealed: 'Classified',
    },
    request: {
      section: 'Requisition',
      cta: 'Requisition a new narrator',
      ctaSub: 'A narrator is absent from the roster. This is a security gap. Report the candidate. I will investigate personally.',
      back: 'Back',
      persona: 'Identify the narrator',
      personaPlaceholder: 'a superior officer · a fellow farmer · a worthy adversary…',
      email: 'Your email',
      emailPlaceholder: 'your email — for the official record',
      note: 'State your reasoning',
      notePlaceholder: 'justify the requisition (strongly recommended)',
      send: 'Submit requisition',
      sending: 'Transmitting…',
      done: 'Requisition logged',
      doneSub: 'The candidate “{{persona}}” will be vetted thoroughly. Background check included. You have done your duty.',
      errors: {
        persona: 'State the narrator. A request with no subject is not a request.',
        email: 'That email is invalid. Correct it, or leave it blank.',
        failed: 'Transmission failed. Try again. Do not make me ask twice.',
      },
    },
  },

  voice: {
    menuSub: 'Identify the narrator. Assign a voice. Proceed.',
    sealedHint: 'Select a sealed voice and',
    sealedTypeHint: 'supply the correct password.',
    cluePlaceholder: 'Enter the password…',
    clueSubmit: 'Breach',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Incorrect. Access denied. Reread the clue. Do not fail again.',
    clueCloser: 'Second clue authorised — {{hint}}',
    clueGiveaway: 'Override. The password is',
    clueTapUnlock: 'tap to breach',
    more: '{{count}} more concealed. Locate them. That is an order.',
  },

  footer: {
    quote: '“Fact.”',
    atelierLink: 'The schematics — how this site was engineered. Question authority.',
    closeHead: 'Make contact.',
    closeSub: 'Available for senior roles and collaborations. Standards remain superior.',
    getInTouch: 'Contact HQ',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Convinced yet?',
    cta: 'Contact HQ',
    resume: 'Acquire résumé',
    dismiss: 'Dismiss',
  },

  makingOf: {
    back: 'Return to the survey',
  },

  void: {
    eyebrow: 'unauthorized location',
    title: 'You have left the designated area.',
    body: 'FACT: this page does not exist. FACT: you navigated here yourself. I have already reported the breach. Return to headquarters immediately.',
    position: 'unauthorized coordinates: {{path}}',
    cta: 'Recalibrate position',
    home: 'Return to headquarters',
  },
};
