// GENIUS, BILLIONAIRE, PLAYBOY… — easter-egg personality (Tony Stark voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('stark')` once unlocked. Pure flavor —
// the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — just in Tony's voice. The visitor is still Manan; he is
// only *channeling* the guy who is the suit. Confidence dialed to eleven, work
// ethic dialed higher.

export default {
  common: { chapterLabel: 'Log' },

  chapters: {
    origin: { label: 'Boot Sequence', sub: 'JARVIS, Wake Up' },
    about: { label: 'The Man in the Suit', sub: 'Genius, Billionaire, Developer' },
    work: { label: 'The Build Log', sub: 'From the Cave to the Suit' },
    arsenal: { label: 'The Workshop', sub: 'Where the Suits Get Made' },
    projects: { label: 'The Mark Series', sub: 'Everything I’ve Built' },
    contact: { label: 'Open a Channel', sub: 'JARVIS, Take a Message' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web platforms', 'React systems, no compromises', 'full-stack architecture', 'interfaces that feel like the future'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'I am the architecture'],
    ctaPrimary: 'See the build',
    ctaSecondary: 'Open a channel',
    ctaResume: 'Résumé',
    scroll: 'Descend',
    spin: 'Take it for a spin',
  },

  about: {
    pullQuote: '“Genius, billionaire, playboy, philanthropist.” Two of those are aspirational. The genius part ships to production.',
    intro: [
      'Manan. Full-stack developer, five years, twenty-plus releases. I don’t build résumés — I build systems. This entire site is one, and you’re standing inside the demo. JARVIS, dim the lights, he’s reading the good part.',
      'I take an idea from a blank file [[endToEnd|all the way to production]], across six industries, and I make it look effortless. It is not effortless — it’s a thousand small decisions in a row, all made correctly. Sometimes you gotta run before you can walk. I just happen to enjoy the running.',
      'Give me the tangled problem nobody wants — the ambiguous, on-fire, “is this even possible” one. That’s not the hard part of the job; that’s the whole reason I took it. Big man in a suit of armour — take that away, and what am I? Genius, billionaire (okay, aspiring), full-stack developer.',
    ],
    disciplines: 'The Workshop',
    services: {
      frontend: { title: 'The Interface', description: 'Production UIs with React, Next.js and TypeScript. The interface isn’t decoration — it’s the whole experience, the HUD, the part a human actually touches. If it doesn’t feel effortless, I haven’t finished.' },
      backend: { title: 'The Reactor Core', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. This is the power source — the part nobody sees and everything depends on. Build it wrong and the whole suit goes dark at altitude.' },
      performance: { title: 'Thrust & Visibility', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, never guessed. Plus structured-data SEO so the search engines index me correctly. Speed is a feature. Being findable is leverage. I like both.' },
      fullstack: { title: 'Full Systems Control', description: 'End to end, requirement to production monitoring. Frontend, backend, the infrastructure in between — I hold the whole schematic in my head at once. That’s not a flex. Okay, it’s a little bit of a flex.' },
    },
    stats: {
      years: 'Years Running',
      projects: 'Systems Shipped',
      domains: 'Industries Served',
      load: 'Faster Than Before',
    },
  },

  experience: {
    intro: 'Pull up the build log. This is the sequence — every prototype, every field test, every version that got us to the one you’re looking at. Try to keep up; I talk fast because I think fast.',
    travelTrail: 'Run the log',
    present: 'Currently',
    onAssignment: 'On Deployment',
    journey: {
      'first-trail': {
        chapter: 'Mark I',
        headline: 'Every suit starts as something rough, built in a hurry, that shouldn’t work. This one did.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React interfaces for sales — the first working prototypes, shipped and used.',
          'Deployed PDF/Excel reporting and gave everyone back 16–20 hours a week. Automation is just respect for people’s time.',
          'Cut load time by 38%. Measured, logged, verified. I don’t ship "probably."',
        ],
      },
      oath: {
        chapter: 'The Schematics',
        headline: 'Formal engineering credentials. CGPA 8.36 / 10. The fundamentals matter.',
        role: 'Student of Information Technology',
        credential: 'Also holds an LL.B. — passed the bar (AIBE). I read the contracts myself. I’ve learned the hard way what happens when you don’t.',
        points: [
          'Earned a formal engineering degree. You want the person building the reactor to understand the physics.',
        ],
      },
      expedition: {
        chapter: 'Mass Production',
        headline: 'Six industries. Production-grade. Field-tested under load.',
        role: 'Full Stack Developer',
        points: [
          'Named the first-ever Employee of the Month — out of thirty. I don’t compete with people. I compete with the last version of the work.',
          'Shipped across finance, health, logistics, CRM, SaaS and media. Different environments, same standard.',
          'Owned features end to end — from the first spec to production monitoring. If it’s got my name on it, it’s my responsibility. All of it.',
        ],
      },
      vanguard: {
        chapter: 'The Big Contract',
        headline: 'Leading frontend on the Capital Group account. High stakes, high visibility.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · deployed to Capital Group',
        via: 'The supply chain, since we’re being transparent: contracted through Inexture, deployed via Infosys, stationed at Capital Group. Three logos, one engineer. I keep the org chart cleaner than most keep their codebase.',
        points: [
          'Led frontend across multiple Capital Group products. Leadership means owning the outcome, not the title.',
          'Shipped 4 production releases, features built from nothing. Nothing is my favorite starting condition.',
          'Ran sprint planning, client demos and code reviews. The suit is only as good as the process behind it.',
        ],
      },
      horizon: {
        chapter: 'Next Prototype',
        headline: 'Looking for the next big build. Bring me the impossible one.',
        role: 'Awaiting the Next Deployment',
        points: [],
      },
    },
    summonCta: 'Open a channel',
  },

  arsenal: {
    subtitle: 'Welcome to the workshop — mind the prototypes. Every tool here has survived a live deployment, not a tutorial. Hover one and JARVIS will pull up what it runs with.',
    coreLabel: 'The Workshop',
    coreLegend: 'the glowing ones are the primaries — arc-reactor tier',
  },

  works: {
    intro: 'The Mark series — real systems, real clients, real load. Some are under NDA, so I’ll show you the shape and keep the schematics sealed. A good engineer honors the contract.',
    realm: 'Mark',
    featured: 'Flagship',
    nda: 'Classified',
    enterRealm: 'Open the schematic',
    source: 'The Schematics',
    ndaSealed: 'That one’s [[nda|classified]]. I’ve already shown you more of the blueprint than the contract allows. Moving on.',
    ndaArch: 'Abstracted schematic — the specifics stay sealed.',
    chartMore: 'Show {{count}} more builds',
    furl: 'Seal the schematics',
    fullStory: 'The full spec',
    nod: 'Six builds up there. The seventh is the one you’re inside right now — this site. Yeah. I built the showroom too.',
    nodCta: 'Tour the workshop',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s platform, tuned so the media loads instantly. Presentation is engineering too.',
        description: 'A media-heavy site and admin panel for a high-end wedding studio — every photo and film delivered fast enough that no one waits.',
        highlights: [
          'Built a Next.js system — landing, portfolio, blogs — with a full admin panel behind it.',
          'Optimized delivery with caching, a CDN, Cloudflare R2 and video streaming.',
          'Wired Firebase Auth and Firestore for access and content. Secured.',
          'Wrote scripts to compress images and video — efficiency at the byte level. Waste is just a design flaw.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor in the browser, export an order-ready PDF. Small problem, elegant machine.',
        description: 'An interactive tile-design tool — choose layouts, preview live, export templates ready to order.',
        highlights: [
          'Built a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants in real time — corners, fills, the entire grid.',
          'Used TensorFlow.js to convert PNGs into [[regionSvg|region-based SVGs]]. Machine learning, applied to a genuinely useful problem.',
          'Built an admin panel to manage designs and layouts.',
          'Added guided tours and shortcuts so the interface teaches itself.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A financial-advisor command center, built from zero. Real-money decisions run through this HUD.',
        description: 'A finance dashboard for advisors, engineered from scratch — Next.js, Okta login, heavy interactive charts.',
        highlights: [
          'Built the entire frontend from scratch — design system, reusable UI, protected routes.',
          'Integrated Okta OAuth with server-side authorization. Access is earned, not assumed.',
          'Built portfolio views with tables and Highcharts — dense data, made readable.',
          'Set up feature flags, deployments and debugging instrumentation.',
          'Contributed to a Spring Boot backend for PDF reporting.',
        ],
      },
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money is just a resource — the interesting part is the system that manages it well.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance firm — data, workflows, identity verification, locked down.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the full front desk. Multi-tenant done right is a genuinely hard problem. This one’s done right.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and serious test coverage. Conversational AI, engineered — not bolted on.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scoring, secure payouts, admin tooling. When actual money moves, the margin for error is zero. Built accordingly.' },
    },
  },

  contact: {
    availability: 'Channel’s open — JARVIS routes everything straight to me. Send a message; I answer all of them. Fast response time is a design principle, not a courtesy.',
    theMessage: 'Your Message',
    correspondence: 'Direct Channels',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me what you’re building. The more ambitious, the better — I get bored by easy.',
    },
    submitIdle: 'Transmit',
    submitLoading: 'Transmitting…',
    status: {
      idle: 'Channel open. Standing by.',
      sending: 'Sending it up…',
    },
    resumeCta: 'The Résumé',
    success: 'Message received. JARVIS logged it, flagged it, and bumped it to the top of the list. You’ll hear back fast — that’s a promise, not a maybe.',
    errors: {
      required: [
        'You left a field empty. Incomplete inputs, incomplete build. Fill it in and let’s go.',
        'A field’s blank. I don’t ship half-built and neither should you. Complete it.',
        'Missing input detected. Small gap now, big failure later. Fill every field.',
        'One field’s empty. Precision matters — it’s the whole job. Fix it.',
      ],
      email: [
        'That’s not a valid email. I ran the check. The check is never wrong. Fix it.',
        'That address won’t route. Give me one that actually resolves.',
        'That email doesn’t exist. I verified. Enter a real one.',
        'Invalid address — the server can’t deliver it. Correct it and resend.',
      ],
      failed: [
        'Transmission failed. Could be anything. Run it again.',
        'Message didn’t send. Even good systems drop a packet. Retry.',
        'Delivery failed. Logging it. Send it once more.',
        'That didn’t go through. Recoverable. Hit transmit again.',
      ],
      notConfigured: [
        'The transmitter isn’t wired up yet — my oversight. Reach me directly at {{email}}.',
        'This channel isn’t live yet. Until it is, contact me straight at {{email}}.',
        'The relay’s offline for now. Send it directly to {{email}}.',
      ],
    },
    quote: '“Sometimes you gotta run before you can walk. Then ship it.”',
    channels: { location: 'The Workshop' },
  },

  map: {
    footerHint: 'enter to navigate · esc to close',
    actions: {
      resume: 'The Résumé',
      themeLight: 'Bring up the lights',
      themeDark: 'Kill the lights',
    },
  },

  recap: {
    title: 'Full Scan Complete',
    subtitle: 'JARVIS ran a full scan straight off your browser — GPU, display, network, the works. Nothing stored. A good diagnostic doesn’t need to keep the data.',
    how: 'One service returned your city, once, with your permission. Not saved. I don’t hoard what I don’t need.',
    sigilNote: 'This mark is generated from your device signature — computed right here, transmitted nowhere. A one-off, like a good prototype.',
    map: {
      localNow: 'it’s {{time}} where you are — {{sky}}. the scan’s thorough. it’s supposed to be.',
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
      title: 'Sealed Voices',
      unlocked: '{{count}} of {{total}} online',
      sealed: 'Locked',
      switchTo: 'Run {{voice}}',
      locked: 'Locked. Classified.',
    },
    sealed: {
      none: 'Several voices still locked. Consider it an engineering challenge. You strike me as someone who finishes those.',
      some: '{{count}} of {{total}} still sealed. Keep going — you’re closing in.',
      all: 'Every voice online. All systems green. Nicely done — I don’t say that often.',
    },
  },

  // The Atelier — Tony's voice. Narrative keys only; per-phase/per-cut details
  // fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Under the Hood',
    title: 'How It Was Built',
    confession: 'It passed every test long before I stopped rebuilding it. Tests are the floor. I don’t ship to the floor.',
    confessionSub:
      'The site was done about forty commits ago. But "done" is where most people stop and I start. So I kept iterating — fixing things no one would ever notice, and wiring analytics to prove the clever parts actually get used. Data beats opinion. Every time.',
    acts: { build: 'The Build', engine: 'The Reactor', hidden: 'Classified' },
    commits: {
      title: 'Every Commit',
      range: 'Pulled from the real repo. No reconstructions.',
      caption: 'Each square is a day something shipped. Iterative, relentless, logged.',
    },
    ci: {
      title: 'The Protocol',
      on: 'Runs on',
      caption:
        'Every commit clears the gate before it merges — lint, types, build. Green or it doesn’t ship. Automated, incorruptible, no exceptions. I don’t trust vibes and neither should the pipeline.',
    },
    stats: {
      hours: 'Hours logged',
      commits: 'Commits',
      phases: 'Phases',
      voices: 'Voices (mine included)',
      lines: 'Lines of code',
    },
    ledger: {
      intro:
        'Anyone can add features. The discipline is knowing what to cut — and cutting it without ego. Half of good engineering is restraint. The other half is knowing which half.',
      built: 'Shipped',
      cut: 'Cut (on purpose)',
    },
    eggs: {
      title: 'Classified',
      intro: 'Hidden systems, built in on purpose. Tap one and I’ll show you how it works.',
      astrolabe: {
        title: 'The Compass',
        how: 'Move your cursor over the compass up top. It tracks you — and turns a gear as it goes. Every good instrument gives you feedback.',
      },
      spin: {
        title: 'The Needle',
        how: 'See the button on the compass? Hit it. The needle spins up and coasts down on its own — real inertia, real friction. That’s a physics simulation, not an animation loop.',
      },
      sound: {
        title: 'The Audio',
        how: 'Every tone here is synthesized live by the browser — nothing downloaded. Bring the sound online, bottom right, then change the sky and listen. Generative audio. Zero assets.',
      },
      sky: {
        title: 'The Sky System',
        how: 'Top right: five skies. One’s "auto" — it reads the actual time where you are and sets the scene. Context-aware. The way everything should be.',
      },
      voices: {
        title: 'The Voice System',
        how: 'The whole site re-narrates in different voices — press ⇧⌘V. Some are locked. Type the right word anywhere to bring one online. Hint, since you’ve earned it: type "jarvis."',
      },
      map: {
        title: 'The Map',
        how: 'Press ⌘K for a full map of the work — every build, marked and one click away. Navigation should be instant.',
      },
      raven: {
        title: 'The Send-Off',
        how: 'Send a message and a flock crosses the screen with sound. It’s theatrical, sure — but the theater is the confirmation. You should feel the thing complete.',
      },
      recap: {
        title: 'The Scan',
        how: 'At the bottom of the contact section, the site reads your device, your screen, even your city. It’s a full diagnostic — of you. Nothing kept. I just like a system that knows its environment.',
      },
      console: {
        title: 'The Back Channel',
        how: 'Open the dev console — F12 — and there’s a message waiting, gold-plated, with clues. I left it for the people curious enough to open the panel nobody opens.',
      },
    },
    observatory: {
      eyebrow: 'The Diagnostics',
      title: 'I Monitor Everything',
      intro: 'You can’t optimize what you don’t measure — so I instrumented the whole thing with analytics. The responsible kind: no cookies, fully anonymous, off the instant you decline. Telemetry, not surveillance.',
      hub: 'the summary',
      hubNote: 'Everything you do compiles into one clean report when you leave. A single line — the full readout.',
      indexHint: 'Every point is a real, tracked signal. Sweep the field, or select one from the list — it’ll identify itself and tell you where it fires.',
      cadence: { once: 'Once a visit', repeat: 'Every time' },
      metrics: {
        events: 'Tracked events',
        superProps: 'Auto-tags',
        webhooks: 'Alert pipes',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Navigation',
        craft: 'The interactions',
        realms: 'The builds',
        intent: 'Reaching out',
      },
      panels: {
        privacy: {
          title: 'No Cookies',
          body: 'Anonymous, no login, nothing stored. If your browser signals "do not track," it isn’t tracked. Non-negotiable.',
        },
        discoverability: {
          title: 'Indexed Correctly',
          body: 'Five schema instruments so the search engines file me right. Being findable is just good systems design.',
        },
        observability: {
          title: 'Alerted First',
          body: 'Something breaks, my Discord fires before you ever notice. Proactive monitoring beats reactive apologies.',
        },
      },
    },
    atlas: {
      eyebrow: 'The Blueprint',
      title: 'Where Everything Lives',
      intro: 'A folder isn’t just a folder — it’s an architectural decision. Every file sits where it sits for a reason, and I’ll walk you through each one. Click around.',
      hotspots: 'Key Components',
      browseAll: 'Open the full blueprint',
      prompt: 'Select a folder or a key file and I’ll tell you why it’s engineered that way.',
      why: 'Why It’s Built This Way',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Man Out of the Suit',
      intro: 'There’s more than one version of this guy. At least three. Pick one and click — I’ll give you the full readout.',
    },
    personas: {
      more: 'Tell me more',
      less: 'That’s enough',
      storyteller: {
        label: 'The Storyteller',
        hook: 'He runs on stories.',
        story: 'Lord of the Rings. This saga. Every superhero ever built. A frankly excessive amount of One Piece. He looks at software and sees a narrative — which is exactly why this site is a story, not a spec sheet. Engineering with a plot.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'He’s a real filmmaker.',
        story: 'Actual cinematic work — cafés, weddings, short films. So when this site moves like a title sequence, that’s not an accident. That’s an engineer who also happens to have an eye. Dangerous combination.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'And then he goes off-grid.',
        story: 'Into the mountains, out of signal range entirely. Full system shutdown. He comes back with a clearer head and sharper answers. Even reactors need to cool down.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'Straight version, no showmanship: he cannot leave a working system alone if it can be better. Under all the confidence, he’s genuinely obsessive about work that holds up and details nobody will ever thank him for. That’s the engineer. That’s the whole pitch.',
    ],
    sign: '— Tony. Which is to say, Manan. (It’s Manan.)',
  },

  voiceHall: {
    title: 'The Voice Array',
    subtitle: 'Pick who narrates the whole system. I’d pick me, obviously — but it’s your build. The others are solid too. I told them I don’t do super-secret boy bands, and yet, here we all are.',
    nowNarrating: 'Now running',
    tryHint: 'Select a voice and the entire site — this panel included — re-narrates in their register. Instantly. The way a good switch should.',
    close: 'Close',
    sealedHint: 'Some voices are locked. Answer a voice’s clue — or type its secret word anywhere on the page — to bring it online.',
    found: '{{count}}/{{total}} sealed voices online',
    footerHint: 'enter to run · esc to close',
    categories: {
      core: 'The Professionals',
      sealed: 'The Locked Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Request a new voice',
      ctaSub: 'Want someone else narrating the system? Name them and make the case. Good ideas get built around here.',
      back: 'Back',
      persona: 'Whose voice?',
      personaPlaceholder: 'a hero · a legend · a rival worth out-engineering…',
      email: 'Your email',
      emailPlaceholder: 'your email — so a real human can respond',
      note: 'Why them?',
      notePlaceholder: 'make the case (I respect a good spec)',
      send: 'Transmit',
      sending: 'Summoning…',
      done: 'Sent.',
      doneSub: 'We’ll give “{{persona}}” real consideration. No promises — just the ones worth keeping.',
      errors: {
        persona: 'You have to name someone. A request with no target builds nothing.',
        email: 'That email looks off. Fix it, or leave it blank. Your call.',
        failed: 'That didn’t transmit. Run it again.',
      },
    },
  },

  voice: {
    menuSub: 'Who narrates the system? Me, if you’ve got taste.',
    sealedHint: 'Tap a locked one and',
    sealedTypeHint: 'answer its clue.',
    cluePlaceholder: 'Enter the answer…',
    clueSubmit: 'Run',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Wrong input. It happens. Iterate. Again.',
    clueCloser: 'Warmer — {{hint}}',
    clueGiveaway: 'Fine, I’ll hand it to you. It’s',
    clueTapUnlock: 'tap to run it',
    more: '{{count}} more voices in the array.',
  },

  footer: {
    quote: '“I am Iron Man.”',
    atelierLink: 'The making-of — the engineering behind the showroom.',
    closeHead: 'Let’s talk.',
    closeSub: 'Open to senior roles, collaborations, and problems everyone else called impossible.',
    getInTouch: 'Open a channel',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Let’s talk',
    resume: 'Take the résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Back to the build',
  },
};
