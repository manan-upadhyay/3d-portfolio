// PLAINSPOKEN — a straight, professional portfolio voice.
//
// This is an OVERRIDE bundle: it only contains the keys whose wording changes
// from `chronicle`. Anything omitted (e.g. factual labels, the inquiry chips)
// falls back to the chronicle bundle automatically via i18next `fallbackLng`.
//
// Purpose: de-risk the cinematic concept for hurried/skeptical visitors —
// "Dispatch the Raven" → "Send message", "The Realms" → "Projects".

export default {
  common: {
    chapterLabel: 'Section',
  },

  chapters: {
    origin: { label: 'Home', sub: 'Home' },
    about: { label: 'About', sub: 'About Me' },
    work: { label: 'Experience', sub: 'Experience' },
    arsenal: { label: 'Skills', sub: 'Tech Stack' },
    projects: { label: 'Projects', sub: 'Selected Work' },
    contact: { label: 'Contact', sub: 'Get in Touch' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web apps', 'React frontends', 'full-stack systems', 'polished interfaces'],
    proof: ['5+ yrs · React · Next.js · Node.js'],
    ctaPrimary: 'See my work',
    ctaSecondary: 'Contact me',
    ctaResume: 'Résumé',
    spin: 'Spin the pointer',
  },

  about: {
    pullQuote: 'Five years, 20+ releases, six industries — all shipped to production.',
    intro: [
      'I build production web platforms with a focus on solid architecture and the details users feel but never see.',
      'Five years and twenty-plus releases across six industries. I own features end to end — [[endToEnd|from an empty repository to production monitoring]] — and do my best work on hard, ambiguous problems.',
    ],
    disciplines: 'What I Do',
  },

  experience: {
    intro: "A timeline of where I've worked and what I shipped — from my first role to today.",
    travelTrail: 'Scroll the timeline',
    journey: {
      'first-trail': { chapter: 'First Role', headline: 'Where I started.' },
      oath: { chapter: 'Education', headline: 'CGPA 8.36 / 10' },
      expedition: { chapter: 'Full Stack Role', headline: 'Six industries. Production-grade. End to end.' },
      vanguard: {
        chapter: 'Lead Role',
        headline: 'Leading frontend across the Capital Group product network.',
        org: 'Infosys · on the Capital Group team (USA)',
        via: 'Employed by Inexture, placed through Infosys, working on-site with the Capital Group team.',
      },
      horizon: { chapter: "What's Next", headline: 'Open to teams who value craft and ownership.' },
    },
    summonCta: 'Contact me',
  },

  arsenal: {
    subtitle: 'The tools I use across the stack.',
    coreLabel: 'Skills',
    inventoryLegend: 'marks my core stack',
    skimCoach: 'Prefer a quick list? Switch to the list view.',
    viewChart: 'Orbit',
    viewInventory: 'List',
  },

  works: {
    intro:
      "Selected production projects across finance, healthcare, logistics, media and visualization. Some are under NDA; shared details are limited to what's permissible.",
    realm: 'Project',
    enterRealm: 'View project',
    ndaSealed: "[[nda|Under NDA]] — details limited to what's permissible.",
    ndaArch: 'System architecture (details under NDA)',
    chartMore: 'Show {{count}} more projects',
    furl: 'Show less',
    fullStory: 'Full details',
    nod: 'Six projects above. The seventh is this site itself.',
    nodCta: 'See how it was built',
    // (nodCta keeps its literal wording — the doorway reads the same in plain.)
    projects: {
      gajaakriti: {
        lead: 'A media-heavy studio site built so 4K galleries load fast.',
      },
      'royal-tiles': {
        lead: 'Design a tile floor in the browser, preview it live, download an order-ready PDF.',
      },
      'advisor-portfolio': {
        lead: 'An enterprise portfolio-analysis platform, built from scratch.',
      },
    },
  },

  contact: {
    availability: 'Open to senior full-stack roles and collaborations.',
    theMessage: 'Message',
    correspondence: 'Contact',
    placeholders: {
      message: 'Tell me about the role or project — or just say hi…',
    },
    submitIdle: 'Send Message',
    submitLoading: 'Sending…',
    status: {
      idle: 'Ready when you are.',
      sending: 'Sending your message…',
    },
    success: "Thanks — your message is on its way. I'll reply soon.",
    errors: {
      required: ['Please fill in every field before sending.'],
      email: ['That email address looks off — mind double-checking it?'],
      failed: ['Something went wrong sending your message. Please try again.'],
      notConfigured: ['The contact form isn’t live yet. Reach me directly at {{email}}.'],
    },
    quote: '“Every great project begins with a single message.”',
    channels: {
      location: 'Location',
    },
  },

  map: {
    footerHint: 'enter to go · esc to close',
    actions: {
      voices: 'Change narrator',
      resume: 'Resume',
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
    },
  },

  voiceHall: {
    title: 'Narrators',
    subtitle: 'Pick the narrator — or request one that isn’t here yet.',
    nowNarrating: 'Current narrator',
    preview: {
      eyebrow: 'Preview',
      sealed: 'Locked narrator',
      apply: 'Use this narrator',
      active: 'Current narrator',
    },
    tryHint: 'Pick a narrator — the whole site, this panel included, re-reads itself in that style.',
    close: 'Close',
    sealedHint: 'Tap a hidden narrator and answer its clue to unlock it — or type the secret word anywhere on the page.',
    found: '{{count}}/{{total}} found',
    foundShort: '{{count}}/{{total}} found',
    footerHint: 'enter to select · esc to close',
    categories: {
      core: 'Narrators',
      sealed: 'Hidden',
    },
    request: {
      section: 'Request',
      cta: 'Request a narrator',
      ctaSub: 'Want a specific narrator or character? Let me know and I’ll consider adding it.',
      persona: 'Which narrator / character?',
      personaPlaceholder: 'e.g. a famous character, an accent, a tone…',
      email: 'Your email',
      emailPlaceholder: 'your email — so I can follow up',
      note: 'Why this one?',
      notePlaceholder: 'a short reason (optional)',
      send: 'Send request',
      sending: 'Sending…',
      done: 'Request sent',
      doneSub: 'Thanks — I’ll consider “{{persona}}.”',
      errors: {
        persona: 'Enter a narrator or character.',
        email: 'That email doesn’t look right — fix it, or leave it blank.',
        failed: 'Something went wrong — please try again.',
      },
    },
  },

  recap: {
    title: 'Your Session',
    subtitle: 'Read from your device and connection — shown here, never stored.',
    how: 'One request to an IP geolocation service resolves your city. Nothing else is sent, and nothing is saved.',
    sigilNote: 'A fingerprint generated from your device signals — unique to you, and computed entirely on this page.',
    map: {
      localNow: '{{sky}} · {{time}} local',
    },
    reading: {
      title: 'Your Device',
      machine: 'Hardware',
      system: 'Browser & OS',
      display: 'Display',
      tongue: 'Language',
    },
    signal: {
      title: 'Connection',
      lantern: 'Battery',
      road: 'Network',
      carrier: 'ISP',
      origin: 'IP address',
    },
    journey: {
      timeAfield: 'Time on page',
      trail: 'Scroll distance',
      visit: 'Visit no.',
    },
    voices: {
      title: 'Hidden Narrators',
      unlocked: '{{count}} / {{total}} found',
      sealed: 'Locked',
      explore: 'Browse all',
      switchTo: 'Switch to {{voice}}',
      locked: 'Locked — not yet found',
    },
    sealed: {
      none: 'Three hidden narrators are still locked — the right words unlock them.',
      some: '{{count}} of {{total}} hidden narrators still locked.',
      all: 'All hidden narrators unlocked. Nice.',
    },
  },

  // The Atelier — straight, factual register. Full coverage so plain never falls
  // back into the cinematic voice mid-section.
  atelier: {
    eyebrow: 'Making-Of',
    title: 'How this site was built',
    confession: 'Behind the scenes — how this was really made.',
    confessionSub:
      'How this site is built, what was cut, and the details you might miss — all real, not screenshots of a process.',
    acts: { build: 'The Build', engine: 'Infrastructure', hidden: 'Details & extras' },
    engineBridge: 'That is how the site measures itself. Here is how it is organised.',
    commits: {
      title: 'Commit history',
      range: 'The build window, straight from this repo’s git log',
      caption:
        'A focused three-week sprint — the 2026 rebuild, on a repo I first pushed in 2023. Real git history, straight from git: every commit ran the same checks first — lint, type-check, a production build — or it didn’t merge.',
      less: 'Less',
      more: 'More',
      tip_one: '{{count}} commit',
      tip_other: '{{count}} commits',
      share: '{{pct}}% of the build',
      peak: 'Busiest day',
      streakUnit: '{{count}} days',
      aria: 'A calendar heatmap of daily commits to this repository',
      stats: {
        commits: 'Commits',
        streak: 'Longest streak',
      },
    },
    stats: {
      voices: 'Writing voices',
      lines: 'Lines of code',
    },
    ledger: {
      intro:
        'The harder engineering decision was not what to add — it was what to leave out. Here is what shipped, and what I cut or chose not to add, and why.',
      built: 'Shipped',
      cut: 'Cut, and why',
    },
    phases: {
      voice: { title: 'Multi-voice system', why: 'A full i18next layer; the entire site re-skins through ten writing voices, architected to scale further.' },
      marginalia: { title: 'Footnotes', why: 'Hover a phrase to reveal the underlying engineering fact in a footnote.' },
      sky: { title: 'Time-aware theme', why: 'Five theme modes resolved from your local time via SunCalc — no geolocation permission required.' },
      sound: { title: 'Sound design', why: 'A Web Audio cue system (synthesized — only the raven’s caw ships as a file); default-on, muted under reduced-motion.' },
      recap: { title: 'Session recap', why: 'A client-side panel that reads device + connection details and maps your location — nothing stored or sent.' },
      eggs: { title: 'Hidden voices', why: 'Type a trigger word to unlock additional personality voices, each fully written.' },
      telemetry: { title: 'Analytics & SEO', why: 'Fifty product events feeding a single per-visit session recap, twenty-three super-properties, and five PostHog dashboards — all cookieless, anonymous, and disabled under Do-Not-Track. Plus structured-data SEO and a custom logger. It answers "are these features actually used?" without tracking who uses them.' },
    },
    cuts: {
      assets: { title: 'Image, GIF and audio files', why: 'Very little of this site is shipped media. The hero is rendered in Canvas2D, the starfield is CSS, and the interface sounds are generated at runtime with the Web Audio API. Shipping the feedback layer as code instead of files means a smaller bundle, fewer requests, and faster loads.' },
      threejs: { title: 'Three.js and WebGL', why: 'An early version used a 3D library for depth. I removed it and recreated the effect with layered CSS, parallax, and a Canvas2D compass — cutting a large dependency and keeping the initial JS bundle small.' },
      tracking: { title: 'Cookie banners, cross-session tracking and surveillance analytics', why: 'The site does measure itself — but the decision was how. PostHog runs cookieless (memory-only), fully anonymous (no accounts, no identify()), and turns off completely when Do-Not-Track is set. No consent banner, because there is nothing to consent to: no cookies, no cross-session identity, nothing sold. The analytics measure which features get used, not who uses them.' },
      componentLib: { title: 'A pre-built UI kit or template', why: 'Every component is custom-built with Tailwind and CSS variables — no component library. It is more work, but it means full control over the design and no template bloat.' },
    },
    eggs: {
      title: 'Things you might miss',
      intro: 'The quiet details — tap one to see where it lives.',
      astrolabe: {
        title: 'Cursor-tracked needle',
        how: 'Move your cursor over the hero compass — the needle tracks your pointer, and a gear sound spins at the exact speed you move it.',
      },
      sky: {
        title: 'Five themes',
        how: 'The control at top-right offers five skies, including “auto”, which picks dawn/day/dusk/night from your local time.',
      },
      voices: {
        title: 'Alternate narrators',
        how: 'Every line of copy can switch personality. Open the full narrator list with ⇧⌘V; locked narrators unlock when you type their secret word on the page.',
      },
      raven: {
        title: 'Raven on send',
        how: 'Submit the contact form and a flock of birds animates across the screen with a sound cue.',
      },
      recap: {
        title: 'Visitor readout',
        how: 'At the bottom of the contact section, a panel reads your device, screen, and connection (and your city, if you allow it) and generates a unique sigil.',
      },
      console: {
        title: 'Console greeting',
        how: 'Open your browser’s DevTools console — there’s a styled greeting, hints toward the hidden voices and the making-of page, and a debug key for inspecting things in production.',
      },
    },
    observatory: {
      eyebrow: 'Analytics & SEO',
      title: 'Instrumented, not surveilled',
      intro: 'A site you can’t measure is guesswork. So once it was built, I instrumented it — product analytics, SEO, and observability — without compromising the privacy of the people using it.',
      hub: 'session recap',
      hubNote: 'Every event folds into one per-visit summary, sent as you leave — the whole session in a single row.',
      indexHint: 'Each star is a real event. Hover the field, or pick one from the list, to see what it tracks and where it fires.',
      cadence: { once: 'Once per visit', repeat: 'Every time' },
      metrics: {
        events: 'Product events',
        dashboards: 'Live dashboards',
        schemas: 'Structured schemas',
      },
      groups: {
        origin: 'Navigation',
        craft: 'Interaction',
        realms: 'Projects',
        intent: 'Contact intent',
      },
      panels: {
        privacy: {
          title: 'Privacy-first by design',
          body: 'No cookies, no accounts, nothing kept between visits — and it turns off completely if your browser asks not to be tracked.',
        },
        discoverability: {
          title: 'Built to be found',
          body: 'Five JSON-LD schemas, Open Graph cards, canonical URLs — readable by machines and humans alike.',
        },
        observability: {
          title: 'Nothing breaks silently',
          body: 'A structured logger, errors pushed to Discord as they happen, Core Web Vitals from real visits.',
        },
      },
    },
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'Architecture',
      title: 'System map — what runs where',
      intro: 'Everything on this site runs in your browser. Exactly three network calls ever leave it, each one labelled below — open the network tab and verify.',
      clientZone: 'Your browser',
      clientZoneSub: 'everything here runs locally',
      beyondZone: 'Network',
      beyondZoneSub: 'the only outbound calls',
      wall: 'The boundary',
      sealedNote: 'Nothing else goes out — no cookies, no identity, no media files. Even the fonts are self-hosted.',
      hint: 'Select a component',
      readoutRest: 'Each component carries the decision behind it. Click one — or check the network tab.',
      nodes: {
        traveler: { name: 'You', why: 'One request, one page — no redirects, no login, no paywall.' },
        shell: { name: 'The page', why: 'A single HTML file with the CSS inlined at build time, so the first paint doesn’t wait on a stylesheet request. Two routes share one layout; sections lazy-load.' },
        motion: { name: 'The scroll', why: 'Lenis and GSAP run on one shared ticker, so scrolling and animation never compete. Touch devices get native scroll.' },
        narrator: { name: 'The narrators', why: 'Ten narration styles over one i18next layer; the hidden ones are code-split and load only when unlocked.' },
        sky: { name: 'The theme', why: 'SunCalc derives the theme from your local time — no geolocation involved.' },
        sound: { name: 'The sound', why: 'Nearly all interface sound is synthesized with the Web Audio API — only the raven’s caw ships as a file; muted when reduced motion is set.' },
        memory: { name: 'The memory', why: 'Session-only visit data plus a local visit counter — stored in your browser, never transmitted.' },
        telemetry: { name: 'Analytics', why: 'PostHog and Vercel Analytics, cookieless and anonymous — fully disabled when Do-Not-Track is on.' },
        raven: { name: 'Contact form', why: 'Messages post to a serverless function which calls Resend — the API key stays server-side.' },
        reading: { name: 'City lookup', why: 'One opt-in IP lookup powers the visitor recap on this page — displayed to you, stored nowhere.' },
      },
    },

    atlas: {
      eyebrow: 'The codebase',
      title: 'How it’s structured',
      intro: 'A guided map of the repository. Expand a folder or jump to a landmark; each file explains the decision behind it, not its source.',
      hotspots: 'Start here',
      browseAll: 'Browse the full tree',
      prompt: 'Open a folder or pick a landmark to see the reasoning behind it.',
      why: 'Why it’s built this way',
      repoCta: 'View the source',
    },
    offmap: {
      title: 'Away from the keyboard',
      intro: 'Three sides of who I am outside the work — open one to read more.',
    },
    personas: {
      more: 'Read more',
      less: 'Close',
      storyteller: {
        label: 'The Storyteller',
        hook: 'I read systems the way I read a good story.',
        story: 'I’ve always been drawn to deep, structured worlds — Lord of the Rings, the big film universes, long-form anime, Nolan films. Structure underneath, payoff on top. That instinct is why this site is shaped as a story rather than a list.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'Before development, there was a camera.',
        story: 'I’ve shot short films and cinematic videos for cafés, restaurants and events, and that eye for framing and pacing never left. A lot of the motion and detail here comes from asking whether something is timed and framed right — not just whether it works.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'I reset best where there’s no signal.',
        story: 'Away from screens I head to the mountains and trek, ideally somewhere completely off the grid. Time in nature is how I recharge, and it’s part of why I can stay with a hard problem for a long time without losing patience.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'This site is a habit I can’t switch off: pushing past the normal version of a thing. What I care about is work that holds up under load, and the details most people skip.',
    ],
    sign: '— Manan Upadhyay',
  },

  sound: {
    enableHint: 'Click the speaker below to turn on sound.',
    ready: 'Ready',
  },

  voice: {
    menuSub: 'Change who narrates the whole site.',
    sealedHint: 'Tap a hidden narrator and',
    sealedTypeHint: 'answer its clue to unlock it.',
    cluePlaceholder: 'Type your answer…',
    clueSubmit: 'Unlock',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'That’s not it — check the clue and try again.',
    clueCloser: 'Getting closer — {{hint}}',
    clueGiveaway: 'The answer is',
    clueTapUnlock: 'tap to unlock',
    openHall: 'Browse all narrators',
    hallTeaserSome: '{{count}} hidden narrators to find',
    hallTeaserAll: 'All narrators unlocked',
    note: 'Tip: you can change who narrates the site — try Story, or find the hidden ones.',
  },

  footer: {
    quote: '“The journey is the reward.”',
    atelierLink: 'The making-of — how this site was built',
    timeMachineLink: 'Older portfolios — my work from 2019 and 2023',
    closeHead: 'Let’s work together.',
    closeSub: 'Open to senior full-stack roles and collaborations.',
    getInTouch: 'Contact me',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Contact me',
    resume: 'Download résumé',
    dismiss: 'Dismiss',
  },

  makingOf: {
    back: 'Back to the portfolio',
  },

  // Older portfolios (/time-machine) — straight, professional register. Factual
  // per-era `context` is inherited from chronicle (it's the same real history).
  timeMachine: {
    probe: {
      dismiss: 'Dismiss the drone',
      recall: 'Bring the drone back',
      quips: {
        greet: [
          'Hi. I’m a small drone that flies around this page. I’ll stay out of your way.',
          'Drone here. I scan the old sites as you scroll. Send me off any time.',
          'Hello. I’ll hover around and point things out. Ignore me whenever you like.',
        ],
        scanTitle: [
          'Scanning the title. This is the newest thing on the page.',
          'That’s the heading — the start of the descent.',
          'Reading the title at the top.',
          'The main heading. Everything below it is older.',
        ],
        scanCard: [
          'Scanning an old portfolio. It still mostly works.',
          'This is an older site, kept as it was.',
          'An old build. Rougher than this one, but it shipped.',
          'Reading a preserved project. A few things may be broken now.',
          'This one’s from a few years back. A snapshot in time.',
        ],
        scanFloor: [
          'This is the bottom. Nothing older is kept here.',
          'The end of the descent. This is where it started.',
          'Bedrock. No earlier sites were saved.',
        ],
        scanFail: [
          'Scan failed — the old site glitched out on me.',
          'Couldn’t read that one. Old code can be stubborn.',
          'Lost the signal for a second there.',
        ],
        scanRail: [
          'That’s the timeline rail — it jumps you between the years.',
          'The side rail. Use it to move through the eras.',
          'That rail navigates the descent.',
          'The nav rail — it keeps track of the year.',
        ],
        scanVoice: [
          'That control changes the narrator’s voice.',
          'The voice switcher. You can pick a different narrator.',
          'That’s where you change who’s telling the story.',
          'Tap that to try a different voice.',
        ],
        scanSound: [
          'That’s the sound control. There’s ambient audio here.',
          'The sound button — turn the audio on or off.',
          'That controls the volume. There’s a soundtrack if you want it.',
          'Sound settings. Optional, but nice.',
        ],
        fastScroll: [
          'You’re scrolling fast — slow down to take it in.',
          'Easy — you might miss things at that speed.',
          'That’s quick. Slow down a bit?',
          'Scrolling fast. Take your time, it’s worth it.',
        ],
        backUp: [
          'Scrolling back up? The older sites are further down.',
          'Heading back to the top? The past is below.',
          'Going up again? The old work is downward.',
          'Back toward the present? Nothing new up there.',
        ],
        bored: [
          'Still there? Nothing has moved in a while.',
          'You’ve been still for a bit. All good?',
          'Just checking in — still with me?',
          'Take your time. I’ll wait.',
        ],
        hit: [
          'Ow. Please don’t poke the drone.',
          'Hey — easy on the hardware.',
          'That’s a bit rough.',
        ],
        angry: [
          'Okay, that’s enough poking.',
          'Seriously, stop that.',
          'I’d rather you didn’t keep doing that.',
        ],
        escape: [
          'You can’t really hold me. I’ll just float off.',
          'Nope — I slip right out.',
          'And I’m free. Nice try.',
        ],
        idle: [
          'Just floating along while you read.',
          'Lots of old work down here.',
          'Taking a look around.',
          'Quiet down here. I like it.',
          'Still hovering. Let me know if you need anything.',
        ],
      },
    },
    eyebrow: 'Older work',
    title: 'Earlier portfolios',
    intro:
      'The portfolios I built before this one — from 2019 and 2023 — kept online exactly as they shipped. They’re older and no longer maintained, so a few things may be broken. They’re here to show how the work has grown. Scroll down to go back in time.',
    readoutLabel: 'Year',
    booting: 'Loading the live site…',
    wake: 'Load the live site',
    wakeHint: 'Load it to preview it here, or open it in a new tab.',
    enter: 'Open the site',
    archived: 'Archived',
    gravestone: 'Built {{built}} · last updated {{touched}} · archived {{preserved}}',
    back: 'Back to the portfolio',
    threshold: {
      rail: 'Now',
      cue: 'Scroll down to go back',
    },
    floor: {
      rail: 'Earlier',
      title: 'Before these',
      body: 'Nothing earlier is preserved — just practice projects with no live URL. The point is the progression from here to now.',
    },
    eras: {
      2023: {
        rail: '2023',
        posterAlt: 'Manan’s {{year}} portfolio',
        plaque: 'My 2023 portfolio — the first animation-heavy one.',
        note: 'Built with React and Three.js. Rougher than this site and unmaintained since, so some animations may not work. Kept as a reference point for how the work has progressed.',
      },
      2019: {
        rail: '2019',
        posterAlt: 'Manan’s {{year}} portfolio',
        plaque: 'My first portfolio, from 2019.',
        note: 'Plain HTML, CSS and a little jQuery, before I used a build step. Dated by design — this is where it started.',
      },
    },
  },

  // The Time Tunnel (feedback §5) — plain, clean register. Factual + recognizable,
  // no flourish, easy to read at a glance for any reader.
  timeTunnel: {
    hint: 'Slow down to read the years as they pass.',
    events: {
      // — Gap 1 (2026 → 2023) —
      worldcup26: 'The World Cup returns — hosted by three countries at once for the first time.',
      aiagents26: 'AI “agents” start doing real tasks for people, not just answering questions.',
      foldiphone26: 'Everyone is talking about a folding iPhone.',
      iphone17: 'The iPhone 17 Pro is released.',
      lawildfires25: 'Major wildfires hit Los Angeles.',
      nvidia25: 'Nvidia becomes the most valuable company in the world.',
      ghibli25: 'AI turns everyone’s photos into Studio-Ghibli-style art.',
      minecraft25: 'A Minecraft Movie breaks box-office records.',
      erastour24: 'Taylor Swift’s Eras Tour becomes the highest-grossing tour ever.',
      sora24: 'OpenAI shows Sora — AI that makes video from text.',
      deadpool24: 'Deadpool & Wolverine hits cinemas.',
      trumpshot24: 'An attempt is made on Donald Trump’s life at a rally.',
      chatgpt23: 'ChatGPT and GPT-4 put AI in everyone’s hands.',
      barbenheimer23: '“Barbenheimer” — Barbie and Oppenheimer open on the same day.',
      chandrayaan23: 'India lands near the Moon’s south pole — a first for any country.',
      cricketwc23: 'India hosts the Cricket World Cup.',
      israelhamas23: 'War breaks out between Israel and Hamas.',
      twitterx23: 'Twitter is renamed “X”.',
      threads23: 'Threads launches and reaches 100 million users in days.',
      gta6_23: 'The first GTA VI trailer breaks view records.',
      barbiepink23: 'The Barbie movie makes pink sell out everywhere.',
      aichatbots23: 'Talking to AI chatbots becomes an everyday thing.',
      evcars23: 'Electric cars go mainstream.',
      applewatch23: 'Smartwatches and rings start tracking everyone’s sleep and health.',
      // — Gap 2 (2023 → 2019) —
      worldcup22: 'Argentina and Messi win the World Cup in Qatar.',
      chatgptlaunch22: 'ChatGPT launches and quickly changes everything.',
      webb22: 'The James Webb telescope sends back its first images.',
      ukraine22: 'Russia invades Ukraine.',
      musktwitter22: 'Elon Musk buys Twitter.',
      oscarslap22: 'The Will Smith slap at the Oscars.',
      vaccines21: 'COVID vaccines roll out around the world.',
      squidgame21: 'Squid Game becomes Netflix’s biggest show ever.',
      nft21: 'The NFT boom — digital art sells for millions.',
      suez21: 'A giant ship blocks the Suez Canal for days.',
      meta21: 'Facebook renames itself “Meta”.',
      taliban21: 'The Taliban retake Afghanistan.',
      covid20: 'COVID-19 shuts down the whole world.',
      wfh20: 'Working from home and Zoom calls become normal.',
      amongus20: 'Among Us becomes the game of the year.',
      masks20: 'Face masks become part of daily life.',
      blackhole19: 'The world sees the first-ever photo of a black hole.',
      endgame19: 'Avengers: Endgame becomes the biggest movie ever.',
      got19: 'Game of Thrones airs its final season.',
      area51_19: 'The “storm Area 51” meme goes viral.',
      babyshark19: '“Baby Shark” becomes the most-watched video online.',
      foldables19: 'The first foldable phones appear.',
      fiveg19: 'The first 5G phones arrive.',
      covidwuhan19: 'The first COVID cases quietly appear in Wuhan.',
    },
  },

  void: {
    eyebrow: 'page not found',
    title: 'This page doesn’t exist.',
    body: 'The link may be broken or the page may have moved. Head back to the homepage to keep exploring.',
    position: 'path: {{path}}',
    cta: 'Spin the compass',
    home: 'Back to homepage',
  },
};
