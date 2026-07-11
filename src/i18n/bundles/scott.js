// WORLD'S BEST BOSS — easter-egg personality (Michael Scott voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('scott')` once unlocked. Pure flavor —
// the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — just in Michael's voice. The visitor is still Manan;
// he's only *channeling* the World's Best Boss.

export default {
  common: { chapterLabel: 'Lesson' },

  chapters: {
    origin: { label: 'The Cold Open', sub: 'The Cold Open' },
    about: { label: 'About Your Boss', sub: 'Who Is This Guy' },
    work: { label: 'The Résumé', sub: 'My Glorious Career' },
    arsenal: { label: 'My Skillset', sub: 'Things I Am Great At' },
    projects: { label: 'My Greatest Hits', sub: 'Look What I Made' },
    contact: { label: "Let's Talk", sub: "Let's Have a Meeting" },
  },

  hero: {
    lead: 'I build',
    phrases: ['the world’s best web apps', 'production React systems', 'full-stack everything', 'apps people actually use'],
    proof: ['5+ yrs · React · Next.js · Node.js'],
    ctaPrimary: 'See my work',
    ctaSecondary: 'Let’s be friends',
    ctaResume: 'Résumé',
    scroll: 'Scroll, please',
    spin: 'Give it a whirl',
  },

  about: {
    pullQuote: '“Would I rather be feared or loved? Easy — both. I want people to be afraid of how much they love me.”',
    intro: [
      'I’m Manan — a friend first, a developer second, and an entertainer third. Five years in, twenty-plus projects deep, somehow also one of the best full-stack engineers you will meet. Don’t make it weird.',
      'I take an idea from a blank page [[endToEnd|all the way to production]], across six industries, and I make it look easy. It is not easy. I just make it look that way. That’s the whole job.',
      'Sometimes I’ll start a sentence and I don’t even know where it’s going — I just hope I find it along the way. The web apps, though? Those I finish. Every time.',
    ],
    disciplines: 'My Many Talents',
    services: {
      frontend: { title: 'Making Things Look Great', description: 'Production UIs with React, Next.js and TypeScript. If it’s not pretty, it’s not done. I have an eye for these things.' },
      backend: { title: 'The Behind-the-Scenes Stuff', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC — the plumbing nobody sees but everybody needs.' },
      performance: { title: 'Fast AND Findable', description: 'Code-splitting, caching, CDNs, Core Web Vitals — nobody likes waiting and I HATE waiting. Plus the SEO schema stuff so Google actually knows who I am. Speed and fame. Both. I move like a gazelle. A coding gazelle in a Bluetooth headset.' },
      fullstack: { title: 'Doing It All', description: 'End to end, soup to nuts, grooming to production. I wear all the hats. I love hats. The edge cases and reusable components nobody claps for? I’m not superstitious about those — I’m a little stitious. They quietly save the day.' },
    },
    stats: {
      projects: 'Hits Delivered',
      domains: 'Industries Conquered',
      shipped: 'Actually Shipped. Boom.',
    },
  },

  experience: {
    intro: 'Okay, everybody — conference room, five minutes. This is the story of my career, and it is a journey. There will be snacks. (There are no snacks.)',
    travelTrail: 'Take the tour',
    present: 'Currently',
    onAssignment: 'On loan (big deal)',
    journey: {
      'first-trail': {
        chapter: 'The Cold Open',
        headline: 'Where the legend modestly began.',
        role: 'Frontend Developer (and morale officer)',
        points: [
          'Built CRM modules and React UIs for sales. Real ones. That people used.',
          'Shipped PDF/Excel reporting and saved everybody 16–20 hours a week. Hero stuff.',
          'Cut load time by 38%. People noticed. I made sure of it.',
        ],
      },
      oath: {
        chapter: 'School',
        headline: 'I have a degree. A real one. CGPA 8.36 / 10. Boom.',
        role: 'Student (a good one)',
        credential: 'Also a LAW degree — LL.B., bar passed (AIBE). Basically a lawyer.',
        points: [
          'Got an engineering degree in IT. Framed it. Looked at it. Still proud.',
        ],
      },
      expedition: {
        chapter: 'The Big Leagues',
        headline: 'Six industries. Production-grade. End to end. Boom — roasted.',
        role: 'Full Stack Developer',
        points: [
          'Delivered apps across finance, health, logistics, CRM, SaaS and media.',
          'Owned features end to end — meeting to monitoring, no babysitting required.',
          'Also? Won the first-ever Employee of the Month. Month one. Out of 30 people. Undefeated.',
        ],
      },
      vanguard: {
        chapter: 'The Big Account',
        headline: 'Running point on the Capital Group account. Huge client. Huge.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'Okay so technically I work for Inexture, who loaned me to Infosys, who put me on Capital Group. It’s a whole thing. I’m basically a free agent. A people person who happens to be a free agent.',
        points: [
          'Led frontend on multiple Capital Group products. They needed a leader. Hello.',
          'Shipped 4 production releases. Built features from scratch. From NOTHING.',
          'Ran sprint planning, client demos, code reviews. Meetings, basically. I love meetings.',
        ],
      },
      horizon: {
        chapter: 'What’s Next',
        headline: 'Looking for a team to lead. Or join. Friend first, employee second.',
        role: 'Looking For My Next Team',
        points: [],
      },
    },
    summonCta: 'Let’s be friends',
  },

  arsenal: {
    subtitle: 'These are my many talents. There are a lot of them. That’s kind of my whole thing.',
    coreLabel: 'My Skillset',
    inventoryLegend: 'star = one of my very best things. boom.',
    skimCoach: 'Just want the list? Switch to serious mode. Boom.',
    viewChart: 'Fun Mode',
    viewInventory: 'Serious Mode',
  },

  works: {
    intro: 'These are my greatest hits — real projects, real clients, real results. I’m kind of a hit machine. Don’t tell the others I said that. Actually, do.',
    realm: 'Hit',
    featured: 'Best One',
    nda: 'Top Secret',
    enterRealm: 'Check it out',
    source: 'The Code',
    ndaSealed: 'I’d tell you, but then I’d have to… you know. It’s [[nda|an NDA thing]]. Very official.',
    ndaArch: 'The secret blueprint. Redacted.',
    chartMore: 'Show {{count}} more hits',
    furl: 'Okay, that’s enough greatness',
    fullStory: 'The whole saga',
    nod: 'Six hits up there. The seventh one is the website you’re looking at. Boom.',
    nodCta: 'Take the behind-the-scenes tour',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio site so fancy I almost cried. The photos load FAST.',
        description: 'A gorgeous media-heavy website and admin panel for a fancy wedding studio. Weddings! I love weddings. And the media loads fast.',
        highlights: [
          'Built a slick Next.js site — landing pages, portfolio, blogs, the works — plus an admin panel.',
          'Made it fast with caching, a CDN, Cloudflare R2 and video streaming. Zoom.',
          'Wired up Firebase Auth and Firestore for logins and content. Locked.',
          'Wrote scripts to squish images and videos and save them money. You’re welcome.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor. In a browser. Download the PDF. Tiles! Surprisingly fun.',
        description: 'An interactive tile-design tool — pick layouts, preview live, download order-ready PDFs. Tiles! Surprisingly fun.',
        highlights: [
          'Built a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants on the fly — corners, fills, the whole grid.',
          'Used TensorFlow.js to turn PNGs into [[regionSvg|region-based SVGs]]. Very fancy.',
          'Built an admin panel for designs and layouts. Organized.',
          'Added tours and shortcuts so people actually get it.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A whole Wall Street dashboard, from nothing. From NOTHING.',
        description: 'A finance dashboard for advisors, built from scratch — Next.js, Okta login, big interactive charts. Very Wall Street.',
        highlights: [
          'Built the whole frontend from scratch — design, reusable UI, protected routes, the lot.',
          'Hooked up Okta OAuth with proper server-side authorization. Nobody sneaks in.',
          'Made portfolio views with tables and Highcharts — pretty AND useful.',
          'Wired in feature flags, deployments and debugging tools.',
          'Pitched in on a Spring Boot backend for PDF reports.',
        ],
      },
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money stuff. I’m good with money. Mostly.', highlights: [
        'Built React/Next.js feature modules with Adobe Analytics tracking. It tracks stuff! I love stuff.',
        'Integrated Node/Express REST APIs — error handling, performance, all of it.',
        'Added React Query caching so it stops bugging the server. Boom.',
      ] },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance company — data, workflows, ID checks, locked down tight.', highlights: [
        'Engineered RBAC and audit logs. Locked down. Very secure.',
        'Sped up onboarding 20–25% with verification APIs.',
        'Optimized the images and nailed the Core Web Vitals.',
      ] },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the whole front desk. Concierge not included.', highlights: [
        'Designed multi-tenant PostgreSQL models and REST APIs. Lots of hotels, one system. Boom.',
        'Cut manual billing adjustments 30–35%.',
        'Sped up checkout 15–20%. Fast!',
      ] },
      'ai-chatbot': { description: 'A context-aware chatbot UI with real-time chat and serious testing. It talks back. Politely.', highlights: [
        'Led the UI architecture — Next.js, Redux, WebSocket, real-time.',
        'Added Storybook and Cypress for testing. Responsible! That’s me.',
        'Cut regressions 25–30%. Boom. Roasted.',
      ] },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, admin tools. Sports! I’m great at sports.', highlights: [
        'Owned the Node.js backend — MongoDB schema, REST APIs, and cron pipelines pulling live ball-by-ball data in real time.',
        'Built a real-time points engine — Dream11-style teams, captain/vice-captain multipliers, scored off every match event.',
        'Back-traceable wallet ledger — auto payouts, winning logic, Razorpay. Real money! No pressure. Okay, some pressure.',
        'Configurable contests and prize pools per match, plus GST/TDS tax reports in the React admin panel.',
        'Backed up the React Native app — team building, live tracking. Boom.',
      ] },
    },
  },

  contact: {
    availability: 'I’m always available. Always. Possibly too available. Let’s set up a meeting — I love meetings.',
    theMessage: 'Your Message',
    correspondence: 'How to Reach Me',
    placeholders: {
      name: 'Your name (or a nickname — I love nicknames)',
      email: 'Your email',
      message: 'Tell me everything. I’m a great listener. World’s best, probably.',
    },
    submitIdle: 'Send it! Send it! Send it!',
    submitLoading: 'Sending…',
    status: {
      idle: 'I’m right here. Waiting. Patiently. Mostly.',
      sending: 'Okay here it goes, here it goes…',
    },
    resumeCta: 'My Résumé',
    success: 'Boom. Roasted. (I mean — message sent! I’ll reply soon, friend.)',
    errors: {
      required: [
        'You left a field empty. That’s a no from me. Fill it all in and we’re golden.',
        'An empty field? No, no, no. I need the whole thing. I’m a giver, but I’m also a taker.',
        'You skipped one. I don’t skip people, and I don’t skip fields. Fill them all in.',
        'Blank space — and not the fun Taylor Swift kind. Every field, please.',
      ],
      email: [
        'That email is not an email. I’m not even mad — honestly, I’m impressed. Fix it?',
        'That is not a real email. I would know. I have an email. Mine works. Try again?',
        'I typed that into my brain and got an error. Give the email another shot.',
        'That email and I are not friends yet. Double-check it for me?',
      ],
      failed: [
        'It didn’t send. Not great, Bob. Let’s try that again.',
        'Something broke. Probably Toby. It’s always Toby. Hit send again.',
        'That did not go through. Awkward. Let’s pretend it didn’t happen and retry.',
        'It failed. I’m gonna need you to do the thing again. The send thing.',
      ],
      notConfigured: [
        'The form isn’t hooked up yet — that one’s on me. Just email me directly at {{email}}.',
        'Okay, full transparency: the form isn’t wired up. Email me straight at {{email}}.',
        'The form is taking a personal day. Reach me directly at {{email}}.',
      ],
    },
    quote: '“Sometimes I’ll start an email and I don’t know where it’s going. Send it anyway.”',
    channels: { location: 'My Office' },
  },

  map: {
    footerHint: 'enter to go · esc to bail',
    actions: {
      resume: 'My Résumé',
      themeLight: 'Lights on',
      themeDark: 'Mood lighting',
    },
  },

  recap: {
    title: 'Your Performance Review',
    subtitle: 'I pulled all this off your computer and your internet. I’m basically a hacker now. Don’t tell IT.',
    how: 'Okay one website told me your city. That’s it. I didn’t save it. I would never. Probably.',
    sigilNote: 'This little doodle? That’s YOU. One of a kind. Like me. I made it right here, didn’t send it anywhere.',
    map: {
      localNow: 'it’s {{time}} where you are. {{sky}}. how did I— okay it’s a little creepy.',
    },
    reading: {
      title: 'Your Setup (Nice)',
      machine: 'Your Sweet Rig',
      system: 'Your Browser Situation',
      display: 'That Big Screen',
      tongue: 'How You Talk',
    },
    signal: {
      title: 'Your Internet & Stuff',
      lantern: 'Your Battery',
      road: 'Your Wi-Fi Speed',
      carrier: 'Your Internet Guy',
      origin: 'Your Secret Number',
    },
    journey: {
      timeAfield: 'Time You Hung Out',
      trail: 'Scrollage',
      visit: 'Times You Came Back',
    },
    voices: {
      title: 'Secret Narrators',
      unlocked: '{{count}} of {{total}}. boom.',
      sealed: 'Locked',
      switchTo: 'Be {{voice}}',
      locked: 'Locked. Mysterious. Like me.',
    },
    sealed: {
      none: 'Three secret narrators left to find. The hunt is on. That’s what she said.',
      some: '{{count}} of {{total}} narrators still hiding. Keep going, you’re crushing it.',
      all: 'You found all of them. World’s Best Visitor. I’m not crying, you’re crying.',
    },
  },

  // The Atelier — Michael's voice. Narrative keys only; the per-phase/per-cut
  // details fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Magic',
    title: 'How I Made This',
    confession: 'It passed every test but mine. And mine is the hard one.',
    confessionSub:
      'The website was done like forty saves ago. But “done” is what other people settle for — so I stayed, fixed stuff nobody would notice, and added analytics to PROVE people use the cool stuff. That’s my gift. Mostly gift.',
    acts: { build: 'How I Made It', engine: 'The Machine Room', hidden: 'Secret Stuff' },
    engineBridge: 'That is how I watch it. THIS is how I built it. Both, obviously, flawless.',
    commits: {
      title: 'Every Time I Hit Save',
      range: 'Straight from the repo. The REAL one.',
      caption: 'A three-week sprint — the 2026 rebuild, on a repo I’ve had since 2023, by the way. One glorious, caffeinated push. Boom. And every single commit had to pass The Test first — lint, types, build. Green, or it does not ship. That is leadership.',
    },
    stats: {
      voices: 'Voices (incl. mine)',
      lines: 'Lines, baby',
    },
    ledger: {
      intro:
        'The hard part isn’t adding stuff. Anybody can add stuff. The hard part is knowing what to cut. I know what to cut. I’m basically a surgeon.',
      built: 'Stuff I shipped',
      cut: 'Stuff I cut (on purpose)',
    },
    eggs: {
      title: 'Secret Stuff I Added',
      intro: 'Cool things nobody notices. Tap one. Boom — secret revealed.',
      astrolabe: {
        title: 'The Spinny Compass',
        how: 'Wave your mouse over the big compass thing up top. It follows you. Like a loyal employee. And it makes a little gear noise. I did that.',
      },
      sky: {
        title: 'The Sky Button',
        how: 'Top right. Five skies. One of them is “auto” and it knows what time it is where you are. Creepy? A little. Cool? Extremely.',
      },
      voices: {
        title: 'The Other Mes',
        how: 'The whole site can talk in different voices. Hit ⇧⌘V. Some are locked — type the magic word to unlock them. Hint: type “boss”. Trust me on this one.',
      },
      raven: {
        title: 'The Birds',
        how: 'Send me a message and a whole flock of birds flies across the screen. With a sound. It’s very dramatic. I love it.',
      },
      recap: {
        title: 'The Creepy Part',
        how: 'Scroll to the bottom of the contact part. It reads your computer, your screen, even your city. I’m basically the NSA. A friendly NSA.',
      },
      console: {
        title: 'The Secret Menu',
        how: 'Open the DevTools console — you know, F12, the developer thing. There’s a whole gold message waiting for you with secret hints. I left it there. For the smart ones. Like you.',
      },
    },
    observatory: {
      eyebrow: 'The Numbers Guy',
      title: 'I Watch. But Politely.',
      intro: 'Look, you can’t improve what you don’t measure — that’s just business. So I wired up analytics. But the CLASSY kind: no cookies, totally anonymous, off if you say no. I’m a data guy AND a gentleman.',
      hub: 'the big summary',
      hubNote: 'Everything you do rolls up into one neat little report when you leave. One row. Boom. The whole story.',
      indexHint: 'Every dot is a real thing I track. Wave your mouse around, or just click one from the list — it’ll tell you what it is and where it happens. See? Organized.',
      cadence: { once: 'Once a visit', repeat: 'Every single time' },
      metrics: {
        events: 'Things I track',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Getting around',
        craft: 'The fun stuff',
        realms: 'My projects',
        intent: 'Trying to reach me',
      },
      panels: {
        privacy: {
          title: 'No Cookies. None.',
          body: 'Anonymous, no login, nothing saved. Your browser says “don’t track me”? I don’t. Done.',
        },
        discoverability: {
          title: 'Google Knows Me',
          body: 'Five fancy schema things so Google puts my face in the little box. The box!',
        },
        observability: {
          title: 'I Get Alerts',
          body: 'Something breaks, my Discord buzzes before you even notice. That’s called being proactive.',
        },
      },
    },
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'The Big Board',
      title: 'Where the magic happens',
      intro: 'This is the org chart of the website, and everything happens in-house, in your browser. Only three things ever leave the office. That’s called efficiency. Look it up.',
      clientZone: 'The office',
      clientZoneSub: 'everything happens right here, in-house',
      beyondZone: 'Corporate',
      beyondZoneSub: 'the only three memos we ever send up',
      wall: 'The wall',
      sealedNote: 'Nothing else leaves this office. No cookies (Kevin ate them), no tracking, no files. Even the fonts work here full-time.',
      hint: 'Click somebody',
      readoutRest: 'Everyone here has a job and I know all of them. Click around. Get to know the team.',
      nodes: {
        traveler: { name: 'You, the client', why: 'You walk in once and get the whole tour — no waiting room, no receptionist, no “please hold”. That is the Michael Scott guarantee.' },
        shell: { name: 'Reception', why: 'One page, styles pre-loaded, so it looks amazing before it even starts working. Like me. Two departments share one office and split the rent perfectly.' },
        motion: { name: 'Party planning (scrolling)', why: 'One clock runs all the movement so nothing bumps into anything. On phones we let the phone do it — delegation. I invented that.' },
        narrator: { name: 'The improv troupe', why: 'Ten voices, one of them literally me. The secret ones don’t even show up until you say the magic word. Very exclusive club.' },
        sky: { name: 'Facilities (lighting)', why: 'The site checks YOUR clock and sets the lighting — dawn, day, dusk, night. Not your location. We are not creeps.' },
        sound: { name: 'The office band', why: 'Nearly every sound is made up on the spot by the browser — the one file we ship is the raven’s caw. The band never gets paid, because the band is mostly math.' },
        memory: { name: 'HR files', why: 'Your visit record stays in your own browser. HR here actually protects your information. Take notes, Toby.' },
        telemetry: { name: 'Accounting', why: 'They count what happens, not who you are. No cookies, no names. If you say Do-Not-Track, accounting goes home early.' },
        raven: { name: 'The mailroom', why: 'Your message goes to a back office that holds the only key — the browser never sees it. Security level: Threat Level Midnight.' },
        reading: { name: 'The wildcard', why: 'One time, if you ask, it looks up your city and shows you. Then forgets. Like me with birthdays, except on purpose.' },
      },
    },

    atlas: {
      eyebrow: 'My Filing System',
      title: 'Where Everything Lives',
      intro: 'People think a folder is just a folder. Wrong. Every file is exactly where it should be, for a reason. Click around. I’ll explain. You’re welcome.',
      hotspots: 'The Greatest Hits',
      browseAll: 'Open the whole filing cabinet',
      prompt: 'Click a folder or a greatest hit and I’ll tell you why I did it that way.',
      why: 'Why I Did It This Way',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Real Me (Get Comfortable)',
      intro: 'There are three sides to me. Minimum. Pick one and click — I’ll tell you everything.',
    },
    personas: {
      more: 'Tell me more',
      less: 'Okay, enough',
      storyteller: {
        label: 'The Storyteller',
        hook: 'I basically live inside stories.',
        story: 'Lord of the Rings. Game of Thrones. Every superhero ever. A truly upsetting amount of One Piece. I look at software and I see a saga — that’s not weird, that’s vision. It’s also why this whole site is a story and not a boring list.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'I’m also a filmmaker. A real one.',
        story: 'I’ve shot actual cinematic videos — cafés, weddings, short films. So when this site moves, that’s not luck, that’s an artist with an eye. People pay for this eye.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'And then I vanish into the mountains.',
        story: 'No phone, no signal, just me and the trees and my thoughts, which are excellent. It keeps me grounded. And a grounded genius is the most dangerous kind of genius.',
      },
    },
    builtWith: 'Made with',
    manifesto: [
      'Real talk: I cannot leave “normal” alone. Underneath the showmanship I’m dead serious about work that holds up and details. So many details. Boom.',
    ],
    sign: '— Michael. I mean, Manan. (It’s Manan.)',
  },

  voiceHall: {
    title: 'The Improv Stage',
    subtitle: 'Pick who narrates this whole thing. I do all the voices myself. I’m basically a chameleon, but for talking.',
    nowNarrating: 'Currently me',
    preview: {
      eyebrow: 'Now auditioning',
      sealed: 'Sealed narrator',
      apply: 'Make me the narrator',
      active: 'That’s me. Narrating. Boom.',
    },
    tryHint: 'Click a narrator and — BOOM — the whole site starts talking like them. Even this part right here. Especially this part.',
    close: 'Close (but don’t go)',
    sealedHint: 'Some narrators are sealed, like a surprise party. Tap one and answer its clue — or type the secret word anywhere on the page — and they wake up. Surprise.',
    found: '{{count}}/{{total}} secret narrators found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Professionals',
      sealed: 'The Secret Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Summon a new narrator',
      ctaSub: 'Want somebody else to narrate this? Tell me who. I will make it happen. I am a people person AND a closer.',
      back: 'Back',
      persona: 'Whose narration?',
      personaPlaceholder: 'Michael Scott (again) · a celebrity · me, but louder…',
      email: 'Your email',
      emailPlaceholder: 'your email — so I can personally reach out, like a friend',
      note: 'Why them?',
      notePlaceholder: 'make your case (I love a good pitch)',
      send: 'Send it. Boom.',
      sending: 'Summoning…',
      done: 'Boom. Sent.',
      doneSub: 'I’ll give “{{persona}}” some real thought. No promises. Okay, a small promise. Thank you, friend.',
      errors: {
        persona: 'You gotta tell me WHO. That’s the whole point. Give me a name.',
        email: 'That email looks off. Fix it — or just leave it blank. No pressure.',
        failed: 'Okay, that did not send. Try again. It’s gonna be fine. We’re a family.',
      },
    },
  },

  voice: {
    menuSub: 'Who tells this story? Me, ideally. I’m great at stories.',
    sealedHint: 'Tap a sealed one and',
    sealedTypeHint: 'answer the clue. Boom. Surprise.',
    cluePlaceholder: 'Type the answer…',
    clueSubmit: 'Boom',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Nope. Not the word. It’s okay, guessing is a process.',
    clueCloser: 'Okay, warmer — {{hint}}',
    clueGiveaway: 'Fine, I’ll just tell you. It’s',
    clueTapUnlock: 'boom, tap it',
  },

  footer: {
    quote: '“That’s what she said.”',
    atelierLink: 'The making-of. Behind the scenes. Pretty much a documentary.',
    closeHead: 'Let’s be friends.',
    closeSub: 'Open to senior roles, collaborations, and mutually beneficial friendships.',
    getInTouch: 'Let’s talk',
    resume: 'Résumé',
  },
  stickyCta: {
    text: '“You miss 100% of the shots you don’t take.” — Wayne Gretzky — Michael Scott',
    cta: 'Take the shot',
    resume: 'Grab my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Okay, back to the good stuff',
  },

  // Older portfolios (/time-machine) — framing in character; the factual "world
  // then" context is inherited from chronicle (same real history).
  timeMachine: {
    probe: {
      dismiss: 'Send the bee home',
      recall: 'Bring the bee back',
      quips: {
        greet: [
          'I’m a drone. Like a bee, but for computers. That’s me. The computer bee.',
          'Hello. I fly around and judge old websites. It’s a living.',
          'Welcome. To my time machine. Well, his time machine. I just live here now.',
        ],
        scanTitle: [
          'Big title. I like a big title. It says: this guy means business.',
          'That’s the header. Bold. Confident. Like me, but a font.',
          'Scanning the title. Verdict: it’s got real World’s Best Boss energy.',
        ],
        scanCard: [
          'An old one. I’m scanning it. Do I know what I’m scanning? No. Am I confident? Yes.',
          'This is an old website. Like a baby picture, but for code. Adorable. A little sad.',
          'Old site detected. We don’t judge the past. Okay, we judge it a little. It’s fine.',
        ],
        scanFloor: [
          'This is the bottom. Like the parking lot of the internet. Empty. Mine.',
          'The very bottom. It’s lonely down here. I brought snacks. I ate the snacks.',
        ],
        scanFail: [
          'Scan failed. Not my fault. The website did that. I saw it happen.',
          'It didn’t work. That’s okay. Failure is just success that’s running late.',
        ],
        scanRail: [
          'That’s the little menu thing. It takes you places. I don’t fully get it. Moving on.',
          'The side menu. Click it, go somewhere. Basically teleportation. You’re welcome.',
        ],
        scanVoice: [
          'You’re gonna change my voice? Wow. Okay. After everything we’ve been through.',
          'That button changes who’s talking. Please don’t. I’m just getting good at this.',
        ],
        scanSound: [
          'The sound button. Crank it. This is a moment. Give it a soundtrack.',
          'That’s the volume. Turn it up. Every great scene has music. This is a great scene.',
        ],
        fastScroll: [
          'Whoa whoa whoa. Slow down. You’re gonna miss the good stuff. Which is me.',
          'Easy, speed demon. This isn’t a race. And if it were, I’d win. Somehow.',
        ],
        backUp: [
          'Going back up? We literally just got here. Commit to the bit.',
          'Up again? Make a decision. Leadership is about decisions. I read that. On a mug.',
        ],
        bored: [
          'Hello? Are you still there? Don’t leave me. I get lonely up here.',
          'You’ve gone quiet. Is it something I said? It’s usually something I said.',
          'Still there? Say something. Anything. I’ll take an insult. I’m not picky.',
        ],
        hit: [
          'Ow. Okay. That is harassment. Against a drone.',
          'Hey! We do NOT hit in this office. This floating… office.',
        ],
        angry: [
          'That’s it. I’m writing you up. I don’t have a pen. I’ll remember.',
          'Okay, you know what? Meeting. Conference room. Now. …I don’t have one. But still.',
        ],
        escape: [
          'You can’t hold me. I am a free bird. A free computer bee. Whatever.',
          'And I’m gone. You can’t fire me — I quit. Wait, no. You can’t catch me. That one.',
        ],
        idle: [
          'Sometimes I fly up here and think. About lunch, mostly.',
          'I’m not stuck up here. I’m choosing to be up here. Big difference.',
          'Just me and the old websites. We don’t talk much. They’re dead. It’s fine.',
        ],
      },
    },
    eyebrow: 'World’s Best Old Websites',
    title: 'The Time Machine',
    intro:
      'These are my old portfolios. Are they perfect? No. Would I hire the guy who made them? …Also no. But he grew up to make this, so. Boom. Roasted — by myself. Scroll down. We’re going back in time. Like a DeLorean, but with more feelings.',
    readoutLabel: 'The year',
    booting: 'Firing it up…',
    wake: 'Fire it up',
    wakeHint: 'Fire it up to poke around in here, or open the whole thing in a new tab.',
    enter: 'Open it up',
    archived: 'Retired',
    back: 'Okay, back to the good stuff',
    threshold: { cue: 'Down we go' },
    floor: {
      title: 'That’s the whole record',
      body: 'There is nothing older than this. Well, there is, but it’s embarrassing and I deleted it. A manager knows what to keep and what to shred. This — this we keep.',
    },
    eras: {
      2023: {
        plaque: 'The one where the website started moving. I was very proud. Too proud, honestly.',
        note: 'React and Three.js. It’s rougher than the site you’re in and nobody maintains it, so some of it is broken. Like me. But charming. Like me.',
      },
      2019: {
        plaque: 'The first one. We don’t talk about the first one. Okay, we talk about it a little.',
        note: 'Plain HTML and jQuery, before I knew what half of that meant. It creaks. That’s not a bug, that’s history.',
      },
    },
  },

  // Time Tunnel (feedback §5) — Michael narrates history, mostly about himself.
  timeTunnel: {
    hint: 'Slow down. We’re going back in time. Try to keep up.',
    events: {
      worldcup26: 'The World Cup. Three countries host it. I can barely run one branch. Respect.',
      aiagents26: 'AI starts doing people’s work. Finally — an assistant TO the manager.',
      foldiphone26: 'A folding phone? I fold under pressure too. We’re basically the same.',
      iphone17: 'New iPhone. I will pretend to understand it and buy it immediately.',
      lawildfires25: 'L.A. is on fire. I once fought a fire by starting a smaller fire.',
      nvidia25: 'A chip company runs the world now. I don’t get it, but I’m proud of them.',
      ghibli25: 'Everyone’s photos turn into cartoons. I’d like mine to look thinner.',
      minecraft25: 'A movie made of blocks makes a fortune. Art is dead. Long live art.',
      erastour24: 'Taylor Swift’s tour is the biggest ever. World’s Best Boss of music.',
      sora24: 'AI makes videos now. I directed a movie once. It took eleven years.',
      deadpool24: 'Deadpool and Wolverine. Two guys who won’t shut up. I relate to both.',
      trumpshot24: 'Someone takes a shot at a rally. Yikes. That is a hard no from me.',
      chatgpt23: 'The whole world starts talking to a robot. I talk to a mug. Same thing.',
      barbenheimer23: 'Barbie AND the bomb, same day. I contain multitudes. So does cinema.',
      chandrayaan23: 'India lands on the Moon. I once landed on a trampoline. Also historic.',
      cricketwc23: 'India hosts the Cricket World Cup. A billion fans. I have, like, nine.',
      israelhamas23: 'War breaks out. This one isn’t funny, so I’ll just say: be safe.',
      twitterx23: 'Twitter becomes “X.” I would have called it “Michael.”',
      threads23: 'A new app gets 100 million people in five days. I peaked at one blog.',
      gta6_23: 'One game trailer breaks the internet. I once broke a copier. Different.',
      barbiepink23: 'The whole world wears pink. I look incredible in pink. Fact.',
      aichatbots23: 'Talking to a machine feels normal now. Done it for years. Hi, mug.',
      evcars23: 'Electric cars everywhere. My car runs on pretzels and dreams.',
      applewatch23: 'Your watch scores your sleep now. Mine would say “needs improvement.”',
      worldcup22: 'Messi wins the World Cup. I don’t know soccer, but I know a winner.',
      chatgptlaunch22: 'A little site called ChatGPT shows up. The future. I ignored it.',
      webb22: 'A telescope shows the whole universe. Still didn’t find a bigger boss.',
      ukraine22: 'War returns to Europe. Not a joke. Sending good thoughts, seriously.',
      musktwitter22: 'Elon buys Twitter. Rich guy buys website. I bought a condo. Similar.',
      oscarslap22: 'A slap at the Oscars. The whole world gasps. I would have fainted.',
      vaccines21: 'The vaccines arrive. The world exhales. I fainted at a flu shot once.',
      squidgame21: 'A show in green tracksuits takes over Earth. Terrifying. Watched twice.',
      nft21: 'People pay millions for a JPEG. I have Post-it drawings. Call me.',
      suez21: 'One ship blocks the whole ocean. Classic Tuesday. Been there.',
      meta21: 'Facebook becomes “Meta.” Rebrands are healthy. I once became Prison Mike.',
      taliban21: 'Kabul falls. This one is heavy. Not everything is a bit.',
      covid20: 'A virus stops the planet. I declared bankruptcy at it. Did not help.',
      wfh20: 'Everyone works from home. I do my best work not working.',
      amongus20: 'Everyone hunts the impostor. I am, historically, a terrible liar.',
      masks20: 'Masks become normal. I made mine from a napkin. It did nothing.',
      blackhole19: 'We photograph a black hole. A ring of fire. Like my famous chili.',
      endgame19: 'The Avengers reach “Endgame.” I cried. Not ashamed. Okay, a little.',
      got19: 'Game of Thrones ends. Everyone’s upset. Never watched. Don’t tell them.',
      area51_19: 'Two million people want to storm Area 51. Boundaries, people.',
      babyshark19: '“Baby Shark” becomes the most-watched video ever. Doo doo doo doo.',
      foldables19: 'Phones start to fold. I fold laundry. We’re all folding something.',
      fiveg19: '5G phones arrive. Faster. I still can’t send a calendar invite.',
      covidwuhan19: 'A few odd cases appear in a city called Wuhan. Nobody knows yet.',
    },
  },

  void: {
    eyebrow: 'wrong turn',
    title: 'I’m not lost. I am exploring.',
    body: 'Boldly. And with great confidence. But the page you wanted? Not here. Let me walk you back — I know a shortcut.',
    position: 'allegedly located at: {{path}}',
    cta: 'Find my bearing',
    home: 'Back to the World’s Best Portfolio',
  },
};
