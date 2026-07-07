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
      years: 'Years In The Game',
      projects: 'Hits Delivered',
      domains: 'Industries Conquered',
      load: 'Faster Than Before',
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
          'Won the first-ever Employee of the Month. Month one. Out of 30 people. Undefeated.',
          'Delivered apps across finance, health, logistics, CRM, SaaS and media.',
          'Owned features end to end — meeting to monitoring, no babysitting required.',
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
    subtitle: 'These are my many talents. Hover one — go ahead, I’ll wait. I’m great at waiting, too. That’s another one.',
    coreLabel: 'My Skillset',
    coreLegend: 'the glowy ones are the ones I’m REALLY good at. boom.',
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
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money stuff. I’m good with money. Mostly.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance company — data, workflows, ID checks, locked down tight.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the whole front desk. Concierge not included.' },
      'ai-chatbot': { description: 'A context-aware chatbot UI with real-time chat and serious testing. It talks back. Politely.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, admin tools. Sports! I’m great at sports.' },
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
      title: 'Secret Voices',
      unlocked: '{{count}} of {{total}}. boom.',
      sealed: 'Locked',
      switchTo: 'Be {{voice}}',
      locked: 'Locked. Mysterious. Like me.',
    },
    sealed: {
      none: 'Three secret voices left to find. The hunt is on. That’s what she said.',
      some: '{{count}} of {{total}} voices still hiding. Keep going, you’re crushing it.',
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
    commits: {
      title: 'Every Time I Hit Save',
      range: 'Straight from the repo. The REAL one.',
      caption: 'Every square is a day I shipped. One glorious, caffeinated burst. Boom.',
    },
    ci: {
      title: 'The Rules. I Make Them.',
      on: 'Runs on',
      caption:
        'Every single commit has to pass The Test before it gets in. Lint. Types. Build. Green, or it does not ship. That is not being mean. That is leadership.',
    },
    stats: {
      hours: 'Hours of me',
      commits: 'Times I saved',
      phases: 'Genius phases',
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
      spin: {
        title: 'Give It a Whirl',
        how: 'See the little button on the compass? Push it. The needle spins like a fidget spinner and slows down all by itself. Physics. I’m basically a scientist.',
      },
      sound: {
        title: 'The Sounds',
        how: 'Every beep and whoosh here? Made by a computer, live, zero downloads. Hit the speaker button, bottom right. Then change the theme and listen. You’re welcome.',
      },
      sky: {
        title: 'The Sky Button',
        how: 'Top right. Five skies. One of them is “auto” and it knows what time it is where you are. Creepy? A little. Cool? Extremely.',
      },
      voices: {
        title: 'The Other Mes',
        how: 'The whole site can talk in different voices. Hit ⇧⌘V. Some are locked — type the magic word to unlock them. Hint: type “boss”. Trust me on this one.',
      },
      map: {
        title: 'The Map Thing',
        how: 'Press ⌘K. A map pops up. You can search it. It’s like Google Maps, but for me.',
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
        superProps: 'Auto-tags',
        webhooks: 'Alert pipes',
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
      sealed: 'Sealed voice',
      apply: 'Make me the narrator',
      active: 'That’s me. Narrating. Boom.',
    },
    tryHint: 'Click a voice and — BOOM — the whole site starts talking like them. Even this part right here. Especially this part.',
    close: 'Close (but don’t go)',
    sealedHint: 'Some voices are sealed, like a surprise party. Tap one and answer its clue — or type the secret word anywhere on the page — and they wake up. Surprise.',
    found: '{{count}}/{{total}} secret voices found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Professionals',
      sealed: 'The Secret Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Summon a new voice',
      ctaSub: 'Want somebody else to narrate this? Tell me who. I will make it happen. I am a people person AND a closer.',
      back: 'Back',
      persona: 'Whose voice?',
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
    text: 'Seen enough?',
    cta: 'Let’s talk',
    resume: 'Grab my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Okay, back to the good stuff',
  },
};
