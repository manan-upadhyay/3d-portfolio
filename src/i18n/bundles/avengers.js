// THE AVENGERS — easter-egg personality (Marvel / MCU ensemble).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('avengers')` once unlocked. Pure flavor
// — the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact). FIRST PERSON throughout: the visitor is Manan *channeling*
// the whole team at once — Iron Man's swagger, Cap's resolve, Hulk's bluntness,
// Spidey's warmth, Thanos's menace (for bugs & deadlines), Groot, and more. No
// third-person "as X said" attributions — the iconic lines are delivered direct.
// Avengers, assemble.

export default {
  common: { chapterLabel: 'Mission' },

  chapters: {
    origin: { label: 'Suit Up', sub: 'Systems Online' },
    about: { label: 'Who’s Under the Mask', sub: 'I am Groot' },
    work: { label: 'The Origin Story', sub: 'How I Assembled' },
    arsenal: { label: 'The Armory', sub: 'Suit Up' },
    projects: { label: 'The Missions', sub: 'Threats Neutralized' },
    contact: { label: 'Assemble', sub: 'Open a Channel' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web platforms', 'React systems, fully armored', 'full-stack machinery', 'apps worth avenging'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Whatever it takes'],
    ctaPrimary: 'See the missions',
    ctaSecondary: 'Assemble a meeting',
    ctaResume: 'Résumé',
    scroll: 'Suit up',
    spin: 'Give it a spin. Maximum effort.',
  },

  about: {
    pullQuote: '“Genius, billionaire, playboy, philanthropist.” Two of those are aspirational. The genius part, though — that one ships to production every single day.',
    intro: [
      'I’m Manan — full-stack developer, five years in the field, twenty-plus releases shipped. No super-soldier serum, no billion-dollar suit. I’m just a kid from Brooklyn with React, Node, and a refusal to quit. (Alright — not Brooklyn. But you get the idea.)',
      'I take an idea from an empty file [[endToEnd|all the way to production]], across six industries. When something looks impossible — the tangled, on-fire, nobody-knows-how-to-fix-this kind — I don’t flinch. Whatever it takes.',
      'Everyone runs from the hard bugs. Not me — that’s my secret, Cap: I’m always shipping. And when a deadline swaggers in like it owns the place, I’ve got two words for it: I am inevitable.',
    ],
    disciplines: 'The Loadout',
    services: {
      frontend: { title: 'The Armor Everyone Sees', description: 'Production UIs with React, Next.js and TypeScript. The interface is the suit — clean lines, no exposed wiring, holds under fire. If it isn’t beautiful and bulletproof, I’m not done.' },
      backend: { title: 'The Arc Reactor', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. The power source — nobody sees it, everything runs on it. Build it wrong and the whole thing goes dark at forty thousand feet. Mine doesn’t.' },
      performance: { title: 'On Your Left', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, never guessed. I blow past slow like it’s standing still, then hand the search engines clean structured data so they know exactly who just passed them.' },
      fullstack: { title: 'A One-Man Avengers', description: 'End to end, requirement to production monitoring. Front, back, and the terrifying middle — I hold the whole schematic in my head at once. With great power comes a very long changelog, and I own every line of it.' },
    },
    stats: {
      projects: 'Missions Shipped',
      domains: 'Sectors Defended',
      shipped: 'Made It to Production',
    },
  },

  experience: {
    intro: 'Every hero gets an origin story. This is mine — every prototype, every field test, every version that led to the one you’re looking at. Suit up.',
    travelTrail: 'Run the log',
    present: 'Active duty',
    onAssignment: 'On deployment',
    journey: {
      'first-trail': {
        chapter: 'Mark I',
        headline: 'Built rough, built fast, basically in a cave with a box of scraps. It flew anyway.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React interfaces for sales — the first working prototypes, shipped and used.',
          'Deployed PDF/Excel reporting and handed 16–20 hours a week back to people who had real wars to fight. No amount of money ever bought a second of time — so I built them more of it.',
          'Cut load time by 38%. Measured, logged, verified — I don’t ship “probably.”',
        ],
      },
      oath: {
        chapter: 'The Training Arc',
        headline: 'Formal credentials, locked in. CGPA 8.36 / 10.',
        role: 'Student of Engineering',
        points: [
          'Earned a real engineering degree. You want the one building the reactor to actually understand the physics.',
        ],
        credential: 'Second system online: an LL.B., bar exam (AIBE) passed. I read my own contracts — I learned the hard way what happens when you don’t.',
      },
      expedition: {
        chapter: 'The Initiative',
        headline: 'Six industries. Production-grade. The bugs? Dusted. Every last one.',
        role: 'Full Stack Developer',
        points: [
          'Shipped across finance, health, logistics, CRM, SaaS and media. Different battlefield, same standard.',
          'Owned features end to end — first spec to production monitoring. If my name’s on it, it’s mine to answer for. All of it.',
          'And, month one, first-ever Employee of the Month — beat twenty-nine others. I don’t like to brag — I love to brag.',
        ],
      },
      vanguard: {
        chapter: 'The Big Op',
        headline: 'Leading frontend on the Capital Group account. High stakes, high altitude.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · deployed to Capital Group',
        via: 'Chain of command, on the record: contracted through Inexture, deployed via Infosys, stationed at Capital Group. Three badges, one operative. I’ve seen tidier org charts — not by much.',
        points: [
          'Led frontend across multiple Capital Group products. Somebody had to call the plays. It was me.',
          'Shipped 4 production releases, features built from nothing. Nothing’s my favorite starting line.',
          'Ran sprint planning, client demos and code reviews. The suit’s only as good as the plan behind it.',
        ],
      },
      horizon: {
        chapter: 'The Next Chapter',
        headline: 'Standing by for the next call. The sun will shine on us again — so bring me the impossible one.',
        role: 'Awaiting Deployment',
        points: [],
      },
    },
    summonCta: 'Assemble a meeting',
  },

  arsenal: {
    subtitle: 'My armory — every tool here is combat-tested, not tutorial-grade. But the tools aren’t the hero: if I were nothing without the suit, I shouldn’t have it. The hands matter more. (And yes, I speak Groot: I am Groot — rough translation, full-stack.)',
    coreLabel: 'The Armory',
    inventoryLegend: 'marks a heavy hitter — bring me the hard problems',
    skimCoach: 'Rather scan a list? Pull up the debrief.',
    viewChart: 'Holotable',
    viewInventory: 'Debrief',
  },

  works: {
    intro: 'The mission archive — real systems, real clients, real threats neutralized, across finance, healthcare, logistics and media. Some are classified; I’ll show you the shape and keep the schematics sealed. That’s the deal.',
    realm: 'Mission',
    featured: 'Priority One',
    nda: 'Classified',
    enterRealm: 'Open the file',
    source: 'The Schematics',
    ndaSealed: 'That file’s [[nda|classified]]. I’ve already shown more of the blueprint than clearance allows. Nothing to see here. Move along.',
    ndaArch: 'Abstracted schematic — the good parts stay sealed.',
    chartMore: 'Show {{count}} more missions',
    furl: 'Seal the archive',
    fullStory: 'The full briefing',
    nod: 'Six missions above. The seventh is the one you’re standing inside right now — this whole site. Yeah. I built the command center too.',
    nodCta: 'Enter the workshop',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s platform, tuned so the media loads before you can blink. On your left — the galleries are already done.',
        description: 'A media-heavy site and admin panel for a high-end wedding studio — every photo and film delivered fast enough that nobody waits.',
        highlights: [
          'Built a Next.js system — landing, portfolio, blogs — with a full admin panel behind it.',
          'Optimized delivery with caching, a CDN, Cloudflare R2 and video streaming.',
          'Wired Firebase Auth and Firestore for access and content. Secured.',
          'Wrote scripts to compress images and video — efficiency at the byte level. Waste is just a design flaw.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor in the browser, walk out with an order-ready PDF. Small problem — I over-engineered the daylights out of it. Worth it.',
        description: 'An interactive tile-design tool — choose layouts, preview live, export templates ready to order.',
        highlights: [
          'Built a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants in real time — corners, fills, the entire grid.',
          'Used TensorFlow.js to convert PNGs into [[regionSvg|region-based SVGs]]. Machine learning, aimed at a genuinely useful problem.',
          'Built an admin panel to manage designs and layouts.',
          'Added guided tours and shortcuts so the interface teaches itself.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A financial-advisor command center — sometimes the best you can do is start over, so I built it from zero. Real money runs through this HUD; it doesn’t get to fail.',
        description: 'A finance dashboard for advisors, engineered from scratch — Next.js, Okta login, heavy interactive charts.',
        highlights: [
          'Built the entire frontend from scratch — design system, reusable UI, protected routes.',
          'Integrated Okta OAuth with server-side authorization. Access is earned, not assumed. I checked the perimeter myself.',
          'Built portfolio views with tables and Highcharts — dense data, made readable.',
          'Set up feature flags, deployments and debugging instrumentation.',
          'Contributed to a Spring Boot backend for PDF reporting.',
        ],
      },
      'digital-investor': { description: 'An investment platform, rich with interactions and analytics. I follow the money — and I make it make sense to the humans moving it.', highlights: [
        'Built React/Next.js feature modules, wired with Adobe Analytics so every move gets tracked.',
        'Integrated Node/Express REST APIs — error handling tight, performance tuned.',
        'Added React Query caching, so it stops asking the server the same question twice. Efficient.',
      ] },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance firm — data, workflows, identity verification, locked down. Nobody gets in who shouldn’t. I ran the perimeter myself.', highlights: [
        'Engineered RBAC and audit logs — compliance, handled.',
        'Cut onboarding time 20–25% with verification APIs.',
        'Optimized the images and hit the Core Web Vitals. Green across the board.',
      ] },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the full front desk. Multi-tenant done right is a genuinely hard problem. Consider it solved.', highlights: [
        'Designed multi-tenant PostgreSQL models and REST APIs — one system, many hotels, zero leaks.',
        'Cut manual billing adjustments 30–35%.',
        'Sped up checkout 15–20%. Nobody likes waiting at a front desk.',
      ] },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and serious test coverage. I built an AI — dude, you’re embarrassing me in front of the wizard. We’re basically everywhere now. You’re welcome. Probably.', highlights: [
        'Led the UI architecture — Next.js, Redux, WebSocket, real-time.',
        'Brought in Storybook and Cypress so nothing ships untested.',
        'Dropped regressions 25–30%. Puny bugs.',
      ] },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scoring, secure payouts, admin tools. When actual money moves, the margin for error is zero. I built it like lives depended on it.', highlights: [
        'Owned the Node.js backend — MongoDB schema, REST APIs, and cron pipelines pulling live ball-by-ball data in real time.',
        'Built a real-time points engine — Dream11-style teams, captain/vice-captain multipliers, scored off every event.',
        'Back-traceable wallet ledger — auto payouts, custom winning logic, Razorpay wired in. Real money, zero slips.',
        'Configurable contests and prize pools per match, plus GST/TDS tax reports in the React admin panel.',
        'Backed up the React Native app — team building, live contest tracking. I am Groot.',
      ] },
    },
  },

  contact: {
    availability: 'Channel’s open. Your friendly neighborhood developer answers everything that comes in — fast response time is a spec, not a favor.',
    theMessage: 'Your Message',
    correspondence: 'Secure Channels',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me what you’re building. The more impossible, the better — easy missions bore me.',
    },
    submitIdle: 'Transmit',
    submitLoading: 'Transmitting…',
    status: {
      idle: 'Channel open. Standing by.',
      sending: 'Uplink live, sending…',
    },
    resumeCta: 'The Dossier',
    success: 'Message received, flagged priority, straight to the top of my queue. You’ll hear back fast — I’ve got you. And hey: I love you 3,000.',
    errors: {
      required: [
        'A field’s empty. An incomplete uplink is an incomplete mission. Fill it in.',
        'You left a field blank — I can’t transmit half a message, and I don’t ship half-built either. Complete it.',
        'Missing input. Small gap now, big problem later. Every field.',
        'One field’s empty. Precision is the whole job. Fix it.',
      ],
      email: [
        '“I don’t feel so good…” — because that’s not a valid email. Patch it and we’re good.',
        'That address won’t route. Give me one that actually resolves.',
        'That email doesn’t exist. I checked. I’m thorough — occupational hazard.',
        'Invalid address — the uplink can’t deliver it. Fix it and resend.',
      ],
      failed: [
        'Transmission failed. Could be anything. Run it again.',
        'Message didn’t send. Even the best suits drop a connection. Retry.',
        'Delivery failed. Logging it. Send it once more.',
        'That didn’t go through. Recoverable. Hit transmit again.',
      ],
      notConfigured: [
        'The uplink isn’t wired yet — my oversight, not yours. Reach me directly at {{email}}.',
        'This channel isn’t live yet. Until it is, hit me straight at {{email}}.',
        'The relay’s offline for now. Send it directly to {{email}}.',
      ],
    },
    quote: '“I’m with you till the end of the line.”',
    channels: { location: 'The Tower' },
  },

  map: {
    footerHint: 'enter to navigate · esc to close',
    actions: {
      resume: 'The Dossier',
      themeLight: 'Bring up the lights',
      themeDark: 'Kill the lights',
    },
  },

  recap: {
    title: 'Full Scan Complete',
    subtitle: 'I read your device straight off the browser — GPU, display, network, the works. Nothing stored. A clean scan doesn’t need to keep the data.',
    how: 'One service coughed up your city, once, with your say-so. Didn’t save it. I don’t hoard what I don’t need. Mostly.',
    sigilNote: 'This mark’s generated from your device signature — computed right here, sent nowhere. One of a kind. Like a prototype that actually worked.',
    map: {
      localNow: 'it’s {{time}} where you are — {{sky}}. The scan’s thorough. It’s supposed to be.',
    },
    reading: {
      title: 'Your Hardware',
      machine: 'Your Rig',
      system: 'Your System',
      display: 'Your Display',
      tongue: 'Your Language',
    },
    signal: {
      title: 'Your Signal',
      lantern: 'Power Reserve',
      road: 'Your Bandwidth',
      carrier: 'Your Carrier',
      origin: 'Your Coordinates',
    },
    journey: {
      timeAfield: 'Session Time',
      trail: 'Distance Scrolled',
      visit: 'Return Visits',
    },
    voices: {
      title: 'Sealed Narrators',
      unlocked: '{{count}} of {{total}} online',
      sealed: 'Locked',
      switchTo: 'Deploy {{voice}}',
      locked: 'Locked. Classified.',
    },
    sealed: {
      none: 'Some narrators are still locked. Consider it a side mission. You look like someone who finishes those.',
      some: '{{count}} of {{total}} still sealed. Keep going — you’re closing in.',
      all: 'Every narrator online. All systems green. Nicely done — and I don’t hand out “nicely done.”',
    },
  },

  // The Atelier — first person, Manan behind the suit. Narrative keys only;
  // per-phase/per-cut details fall back to chronicle's real facts.
  atelier: {
    eyebrow: 'Under the Hood',
    title: 'How the Suit Got Built',
    confession: 'It passed every diagnostic long before I stopped rebuilding it. Just because something works doesn’t mean it can’t be improved — tests are the floor, and I don’t ship to the floor.',
    confessionSub:
      'This thing was mission-complete forty commits ago. But “complete” is where most people stop and I start. So I kept going — fixing things nobody would ever notice, wiring telemetry to prove the clever systems get used. I don’t trust vibes. I trust data. I looked at the outcomes and shipped the one where it works.',
    acts: { build: 'The Build', engine: 'The Reactor', hidden: 'Classified' },
    engineBridge: 'That is how it is monitored. This is how it is assembled. Suit up.',
    commits: {
      title: 'Every Commit',
      range: 'Straight from the real repo. No reconstructions.',
      caption: 'A three-week rebuild sprint in 2026 — on a repo that’s been around since 2023. Iterative, relentless, logged. Every commit cleared the gate before it merged — lint, types, build. No exceptions. And I can do this all day.',
    },
    stats: {
      voices: 'Voices (mine included)',
      lines: 'Lines of code',
    },
    ledger: {
      intro:
        'Anyone can add a feature. The discipline is knowing what to cut — the hardest choices require the strongest wills. Half of good engineering is restraint. I’ve got plenty. Now.',
      built: 'Shipped',
      cut: 'Cut (on purpose)',
    },
    eggs: {
      title: 'Classified',
      intro: 'Hidden systems, built in on purpose. Tap one — I’ll show you how it works.',
      astrolabe: {
        title: 'The Compass',
        how: 'Move your cursor over the compass up top. It tracks you — and turns a gear as it goes. Every good instrument gives feedback.',
      },
      sky: {
        title: 'The Sky System',
        how: 'Top right: five skies. One’s “auto” — it reads the actual time where you are and sets the scene. Context-aware. The way everything should be.',
      },
      voices: {
        title: 'The Narration System',
        how: 'The whole site re-narrates in different voices — press ⇧⌘V. Some are locked. Type the right word anywhere to bring one online. Since you’ve earned clearance: type “assemble.”',
      },
      raven: {
        title: 'The Send-Off',
        how: 'Send a message and a flock crosses the screen with sound. Theatrical, sure — but the theater is the confirmation. You should feel the thing land.',
      },
      recap: {
        title: 'The Scan',
        how: 'Bottom of the contact section: the site reads your device, your screen, even your city. A full diagnostic — of you. Nothing kept. I just like a system that knows its environment.',
      },
      console: {
        title: 'The Back Channel',
        how: 'Open the dev console — F12 — and there’s a message waiting, gold-plated, with clues. I left it for anyone curious enough to open the panel nobody opens. (I’ll do you one better: why is Gamora?)',
      },
    },
    observatory: {
      eyebrow: 'The Diagnostics',
      title: 'I Monitor Everything',
      intro: 'You can’t optimize what you don’t measure — so I instrumented the whole thing. The responsible kind: no cookies, fully anonymous, off the instant you decline. Telemetry, not surveillance.',
      hub: 'the summary',
      hubNote: 'Everything you do compiles into one clean report as you leave — a single line, the full readout.',
      indexHint: 'Every point is a real, tracked signal. Sweep the field, or pick one from the list — it’ll ID itself and tell you where it fires.',
      cadence: { once: 'Once a visit', repeat: 'Every time' },
      metrics: {
        events: 'Tracked events',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Navigation',
        craft: 'The interactions',
        realms: 'The missions',
        intent: 'Reaching out',
      },
      panels: {
        privacy: {
          title: 'No Cookies',
          body: 'Anonymous, no login, nothing stored. Your browser says “do not track”? Then you’re not tracked. Non-negotiable.',
        },
        discoverability: {
          title: 'Indexed Correctly',
          body: 'Five schema instruments so the search engines file me right. Being findable is just good systems design.',
        },
        observability: {
          title: 'Alerted First',
          body: 'Something breaks and my Discord lights up before you even notice. Nothing goes over my head — my reflexes are too fast. I would catch it. Proactive beats apologetic.',
        },
      },
    },
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'Mission Schematics',
      title: 'One base. Three uplinks.',
      intro: 'Schematics on screen. The entire operation runs inside your device — local processing, no cloud dependency. Exactly three uplinks ever leave the base, each one designated below. FRIDAY, run the tour.',
      clientZone: 'The base',
      clientZoneSub: 'all systems run local, on your device',
      beyondZone: 'Uplink range',
      beyondZoneSub: 'the only three transmissions',
      wall: 'The shield perimeter',
      sealedNote: 'Nothing else transmits. No cookies, no identity beacons, no heavy payloads. Even the fonts are stationed on-base.',
      hint: 'Select a system',
      readoutRest: 'Every system on this board earned its slot. Select one for the briefing.',
      nodes: {
        traveler: { name: 'You, the recruit', why: 'One request and the doors open — no clearance forms, no S.H.I.E.L.D. paperwork.' },
        shell: { name: 'The tower', why: 'One structure, armor pre-fitted: styles inlined at build, so it renders before a single script boots. Two wings, one core.' },
        motion: { name: 'Thrusters', why: 'One clock drives all flight systems — scroll and animation never fight for control. On touch: manual override, native scroll.' },
        narrator: { name: 'The comms array', why: 'Ten voice channels on one protocol. The classified ones stay encrypted until someone speaks the passphrase. They assemble on demand.' },
        sky: { name: 'Environmental systems', why: 'Reads your local clock — never your coordinates — and matches the lighting to your actual sky. JARVIS-grade courtesy.' },
        sound: { name: 'The arc reactor (audio)', why: 'Self-sustaining: nearly every cue synthesized on-device — only the raven’s caw ships as a file. Clean energy, for the ears.' },
        memory: { name: 'Mission logs', why: 'Session telemetry self-destructs with the tab; your visit count stays in your own systems. Nothing phones home.' },
        telemetry: { name: 'Mission control', why: 'Counts engagements, not identities — cookieless, anonymous. Do-Not-Track engages full radio silence.' },
        raven: { name: 'The courier drone', why: 'Your message uplinks to a serverless relay; the launch codes never touch the browser. Secure channel — whatever it takes.' },
        reading: { name: 'Satellite pass', why: 'One authorized flyover names your city — displayed to you, logged nowhere. Then the satellite stands down.' },
      },
    },

    atlas: {
      eyebrow: 'The Blueprint',
      title: 'Where Everything Lives',
      intro: 'A folder isn’t just a folder — it’s an architecture decision. Every file sits where it sits for a reason, and I’ll walk you through each one. Click around.',
      hotspots: 'Key Components',
      browseAll: 'Open the full blueprint',
      prompt: 'Pick a folder or a key file and I’ll tell you why it’s built that way.',
      why: 'Why It’s Built This Way',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'Out of the Suit',
      intro: 'There’s more than one version of me. At least three. Pick one and click — full readout.',
    },
    personas: {
      more: 'Tell me more',
      less: 'That’s enough',
      storyteller: {
        label: 'The Storyteller',
        hook: 'I run on stories.',
        story: 'Lord of the Rings. This saga. Every superhero ever put on film — seen them all. A frankly excessive amount of One Piece. There are two types of beings in the universe: those who see the story, and those who don’t. I see it — which is exactly why this site is a story and not a spec sheet. Engineering with a plot.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'I’m a real filmmaker, too.',
        story: 'Actual cinematic work — cafés, weddings, short films. So when this site moves like a title sequence, that’s not luck. That’s an engineer with an eye. Dangerous combination.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'And then I go off-grid.',
        story: 'Into the mountains, out of signal range entirely. Full system shutdown. We never lose our demons — we only learn to live above them, and the quiet is where I do it. I come back with a clearer head and sharper answers. Even reactors need to cool down.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'No suit, no showmanship, just the truth: I can’t leave a working system alone if it can be better. Under all the swagger, I’m dead serious about work that holds up and the details nobody will ever thank me for. That’s the engineer. That’s the whole pitch. Now — assemble.',
    ],
    sign: '— Manan. (No cape. Ships anyway.)',
  },

  voiceHall: {
    title: 'The Narrator Array',
    subtitle: 'Pick who narrates the whole thing — what master do I serve? Whoever you crown. I’d pick me, obviously, but it’s your call. The rest of the roster’s solid too. Even the one who only says “moo.”',
    nowNarrating: 'Now running',
    preview: {
      eyebrow: 'Standing by',
      sealed: 'Access restricted',
      apply: 'Deploy this narrator',
      active: 'Now running',
    },
    tryHint: 'Pick a narrator and the entire site — this panel included — re-narrates in their register. Instantly. The way a good switch should feel.',
    close: 'Close',
    sealedHint: 'Some narrators are locked. Answer a narrator’s clue — or type its secret word anywhere on the page — to bring it online.',
    found: '{{count}}/{{total}} sealed narrators online',
    footerHint: 'enter to run · esc to close',
    categories: {
      core: 'The Professionals',
      sealed: 'The Locked Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Request a new narrator',
      ctaSub: 'Want someone else narrating this? Name them and make the case. Good ideas get built around here.',
      back: 'Back',
      persona: 'Whose narration?',
      personaPlaceholder: 'a hero · a legend · a rival worth out-building…',
      email: 'Your email',
      emailPlaceholder: 'your email — so a real human can get back to you',
      note: 'Why them?',
      notePlaceholder: 'make the case (I respect a good pitch)',
      send: 'Transmit',
      sending: 'Summoning…',
      done: 'Sent.',
      doneSub: 'I’ll give “{{persona}}” real thought. No promises — just the ones worth keeping.',
      errors: {
        persona: 'You’ve got to name someone. A request with no target builds nothing.',
        email: 'That email looks off. Fix it, or leave it blank. Your call.',
        failed: 'That didn’t transmit. Run it again.',
      },
    },
  },

  voice: {
    menuSub: 'Change who narrates the whole site. Pick your fighter.',
    sealedHint: 'Tap a locked one and',
    sealedTypeHint: 'answer its clue.',
    cluePlaceholder: 'Enter the answer…',
    clueSubmit: 'Deploy',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Wrong input. It happens. Iterate. Again.',
    clueCloser: 'Warmer — {{hint}}',
    clueGiveaway: 'Fine, I’ll hand it to you. It’s',
    clueTapUnlock: 'tap to deploy',
  },

  footer: {
    quote: '“I am Iron Man.”',
    atelierLink: 'The making-of — the engineering behind the command center.',
    closeHead: 'Avengers, assemble.',
    closeSub: 'Part of the journey is the end — and every ending is just the next build’s origin story. Open to senior roles, collaborations, and problems everyone else called impossible.',
    getInTouch: 'Assemble a meeting',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Wakanda forever. Ready when you are.',
    cta: 'Assemble',
    resume: 'Grab the dossier',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Back to the mission',
  },

  void: {
    eyebrow: 'signal lost',
    title: 'We’ve lost telemetry.',
    body: 'Mission control has no data on this sector. The coordinates resolve to empty space. Recommend immediate RTB.',
    position: 'last known signal: {{path}}',
    cta: 'Recalibrate nav',
    home: 'Return to base',
  },
};
