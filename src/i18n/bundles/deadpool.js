// THE MERC WITH A MOUTH — easter-egg personality (Deadpool voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('deadpool')` once unlocked. Pure flavor
// — the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — just in Wade's voice, breaking the fourth wall the whole
// way down. The visitor is still Manan; he is only *channeling* the Merc with a
// Mouth. Kept PG-13 on purpose — this is still a job application, technically.

export default {
  common: { chapterLabel: 'Chapter' },

  chapters: {
    origin: { label: 'The Cold Open', sub: 'Before the Title Card' },
    about: { label: 'Under the Mask', sub: 'Yeah, You’re Still Reading' },
    work: { label: 'The Flashback', sub: 'Cue the Sad Piano' },
    arsenal: { label: 'The Utility Belt', sub: 'Stuff That Goes Pew' },
    projects: { label: 'The Greatest Hits', sub: 'Roll the Montage' },
    contact: { label: 'Hit Me Up', sub: 'Slide Into the DMs' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web apps', 'React stuff that slaps', 'full-stack everything', 'UIs with maximum effort'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Yes, this is a portfolio. Surprise.'],
    ctaPrimary: 'See the work',
    ctaSecondary: 'Slide into my inbox',
    ctaResume: 'Résumé',
    scroll: 'Keep scrolling, you',
    spin: 'Spin it, I dare you',
  },

  about: {
    pullQuote: '“With great power comes great irresponsibility.” That’s the Spider-Man line, but improved. Honestly this entire website runs on that exact energy — plus semicolons, and way more chimichangas.',
    intro: [
      'Oh hey, you actually unlocked me! Look at you, you beautiful over-achiever. Okay, breaking the fourth wall real quick — the guy who ACTUALLY built this is Manan. Full-stack dev, five years, twenty-plus releases. I’m just the mouth. He’s the hands. Together we’re basically one fully functional adult.',
      'He takes an idea from a blank file [[endToEnd|all the way to production]], across six industries, and makes it look easy — which, and I cannot stress this enough with a straight face I physically do not have, it is NOT. I watched him do it. There was so much squinting at logs. Riveting television. Zero stars, would not stream again.',
      'Where’s he best? The tangled, on-fire, nobody-knows-how-to-fix-this problems that make other devs quietly update their résumés. That’s his origin story. Mine involves a shady lab, a healing factor, and a face only a chimichanga could love — but this isn’t about me. Okay it’s a LITTLE about me. It’s always a little about me.',
    ],
    disciplines: 'The Skill Tree',
    services: {
      frontend: { title: 'The Pretty Part', description: 'Production UIs with React, Next.js and TypeScript. This is the face of the operation — the part you actually look at. Unlike my face, it’s gorgeous and it works.' },
      backend: { title: 'The Guts', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. The stuff under the hood that nobody claps for. I know a thing or two about guts. Moving on.' },
      performance: { title: 'Fast. Like, Regeneration Fast', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, not vibes. Plus SEO schema so Google actually knows this exists. Speed heals all wounds. Trust me. Literally all of them.' },
      fullstack: { title: 'The Whole Enchilada', description: 'End to end, requirement to production monitoring. Front, back, the scary middle bit — all of it. Also enchiladas are just chimichangas that gave up. Anyway. He owns the whole stack.' },
    },
    stats: {
      years: 'Years In',
      projects: 'Things Shipped',
      domains: 'Industries Hit',
      load: 'Faster Now',
    },
  },

  experience: {
    intro: 'Okay, flashback time. Cue the moody piano, soften the lighting — this is the montage where we explain how the hero got so annoyingly competent. Don’t skip it. I’ll know.',
    travelTrail: 'Roll the montage',
    present: 'Right Now',
    onAssignment: 'On Loan (fancy)',
    journey: {
      'first-trail': {
        chapter: 'The Origin',
        headline: 'Every hero starts somewhere. This is the somewhere.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React UIs for sales. Real ones. That people used. Wild concept.',
          'Shipped PDF/Excel reporting and saved everybody 16–20 hours a week. That’s like a whole extra nap, per person.',
          'Cut load time by 38%. Measured it too, because “trust me bro” is not a metric.',
        ],
      },
      oath: {
        chapter: 'Training Montage',
        headline: 'Got the degree. CGPA 8.36 / 10. Overachiever alert.',
        role: 'Student (a suspiciously good one)',
        credential: 'ALSO a law degree — LL.B., passed the bar (AIBE). So he can build your app AND sue you. Kidding. Mostly. Please hire him anyway.',
        points: [
          'Earned a real engineering degree in IT. Framed, probably. I would.',
        ],
      },
      expedition: {
        chapter: 'The Big Leagues',
        headline: 'Six industries. Production-grade. Bugs got bodied.',
        role: 'Full Stack Developer',
        points: [
          'Won the first-ever Employee of the Month. Month one. Beat 29 people. Undefeated. Somebody get this man a belt.',
          'Shipped apps across finance, health, logistics, CRM, SaaS and media. That’s basically the whole cinematic universe of industries.',
          'Owned features end to end — meeting to monitoring, no hand-holding. He’s a big boy.',
        ],
      },
      vanguard: {
        chapter: 'The Team-Up Movie',
        headline: 'Leading frontend on the Capital Group account. Big client. Big deal.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'Okay the org chart is confusing so pay attention: he works for Inexture, who loaned him to Infosys, who put him on Capital Group. It’s a three-company crossover event. There are more studios involved than an Avengers movie.',
        points: [
          'Led frontend across multiple Capital Group products. Somebody had to be in charge. It was him.',
          'Shipped 4 production releases, features built from scratch. From NOTHING. Chef’s kiss.',
          'Ran sprint planning, demos and code reviews. Meetings. The real final boss.',
        ],
      },
      horizon: {
        chapter: 'The Post-Credits Scene',
        headline: 'Looking for the next team. He’ll bring the chimichangas.',
        role: 'Awaiting the Sequel',
        points: [],
      },
    },
    summonCta: 'Slide into my inbox',
  },

  arsenal: {
    subtitle: 'The utility belt. Every tool here has been used in an actual fight — I mean project. Hover one and it’ll rat out its friends. Snitches, all of them.',
    coreLabel: 'The Utility Belt',
    coreLegend: 'the glowy ones are the mains. everything else is a very confident side quest.',
  },

  works: {
    intro: 'The greatest hits. Real projects, real clients, real results, zero CGI. Some are under NDA, which means I legally cannot tell you the good parts, which is EXACTLY the parts I want to tell you. The system works.',
    realm: 'Hit',
    featured: 'The Blockbuster',
    nda: 'Redacted',
    enterRealm: 'Roll it',
    source: 'The Code',
    ndaSealed: 'That one’s [[nda|redacted]]. I’ve already said too much and a lawyer somewhere just woke up in a cold sweat. Next.',
    ndaArch: 'Blurry schematic. Legal made me do it.',
    chartMore: 'Show {{count}} more hits',
    furl: 'Okay, cut the montage',
    fullStory: 'The whole saga',
    nod: 'Six hits up there. The seventh is the website you’re standing in right now. Very meta. I love meta. It’s kind of my thing.',
    nodCta: 'Go backstage',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio site so slick the photos load before you finish blinking. Weddings: expensive, emotional, great lighting.',
        description: 'A media-heavy site and admin panel for a fancy wedding studio — every photo and video landing fast enough to keep the in-laws calm.',
        highlights: [
          'Built a Next.js site — landing, portfolio, blogs — plus an admin panel to run it all.',
          'Made it FAST with caching, a CDN, Cloudflare R2 and video streaming. Zoomies.',
          'Wired Firebase Auth and Firestore for logins and content. Locked down.',
          'Wrote scripts to squish images and video so nobody pays for bytes they don’t need. Fiscally responsible king.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor in your browser, download an order-ready PDF. It’s tiles. It’s weirdly fun. I don’t make the rules.',
        description: 'An interactive tile-design tool — pick layouts, preview live, download templates ready to order.',
        highlights: [
          'Built a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants on the fly — corners, fills, the whole grid.',
          'Used TensorFlow.js to turn PNGs into [[regionSvg|region-based SVGs]]. That’s machine learning. For tiles. Absolute flex.',
          'Built an admin panel for designs and layouts.',
          'Added tours and shortcuts so nobody rage-quits the floor.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A full Wall-Street-grade dashboard, built from NOTHING. Money people, meet your new favorite tool.',
        description: 'A finance dashboard for advisors, built from scratch — Next.js, Okta login, big interactive charts, very serious vibes.',
        highlights: [
          'Built the whole frontend from scratch — design, reusable UI, protected routes, all of it.',
          'Wired Okta OAuth with real server-side authorization. Nobody sneaks in. Not even me. I tried.',
          'Made portfolio views with tables and Highcharts — pretty AND useful, a rare combo.',
          'Set up feature flags, deployments and debugging tools.',
          'Pitched in on a Spring Boot backend for PDF reports. Java. Brave.',
        ],
      },
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money stuff. I’m a spender, not a saver, but I respect the craft.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance company — data, workflows, ID checks, locked down tight. Boring? To you. Beautiful? To the accountants.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the whole front desk. I’ve been thrown out of nicer places. And worse ones.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time chat and serious testing. It talks back. It’s also a better listener than most people I’ve shot at.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, admin tools. People bet real money on this. On CRICKET. Legends.' },
    },
  },

  contact: {
    availability: 'I’m around. Send a message. I reply to everything — texts, emails, skywriting, notes taped to knives. Your call.',
    theMessage: 'Your Message',
    correspondence: 'Ways to Reach Me',
    placeholders: {
      name: 'Your name (or your superhero name, no judgment)',
      email: 'Your email',
      message: 'Tell me everything. I’ve got nowhere to be and an attention span of— ooh, is that a chimichanga?',
    },
    submitIdle: 'Send it!',
    submitLoading: 'Sending, hang on…',
    status: {
      idle: 'I’m right here. Staring at you. Lovingly.',
      sending: 'Okay it’s going, it’s going…',
    },
    resumeCta: 'The Résumé',
    success: 'Boom. Message sent. I’ll get back to you faster than I heal, which is saying something.',
    errors: {
      required: [
        'You left a field empty. Come on, we were so close. Fill it in and let’s make magic.',
        'Empty field detected. My spidey-sense— wait, wrong franchise. Anyway, fill it in.',
        'You skipped one! I skip a lot of things. Leg day. This field. Don’t be like me. Fill it in.',
        'A blank field. Bold. Chaotic. Wrong. Every field, please.',
      ],
      email: [
        'That’s not an email. That’s a keyboard smash. I respect it, but fix it.',
        'That email does not exist. I checked. I have a lot of free time. Try again.',
        'Yeah that email’s fake and we both know it. Gimme a real one.',
        'Your email and reality are not currently on speaking terms. Double-check it?',
      ],
      failed: [
        'The promise was rejected. Literally, in the code. I blame Vercel. Hit it again.',
        'Message failed. The universe said no. Rude. Try once more.',
        'Delivery failed. Somewhere a server sighed. Resend it.',
        'That did not go through. Plot twist! Try again and stick the landing.',
      ],
      notConfigured: [
        'The form’s not wired up yet — that’s on the dev, not me, I’m just the mouth. Email him at {{email}}.',
        'Okay real talk, the form isn’t hooked up. Just email {{email}} directly.',
        'Form’s taking a personal day. Hit up {{email}} instead.',
      ],
    },
    quote: '“Maximum effort. Also, send the message. Both. Do both.”',
    channels: { location: 'Somewhere Chaotic' },
  },

  map: {
    footerHint: 'enter to go · esc to bail',
    actions: {
      resume: 'The Résumé',
      themeLight: 'Lights on',
      themeDark: 'Brooding mode',
    },
  },

  recap: {
    title: 'Everything I Know About You. Which Is a Lot.',
    subtitle: 'I read your device off your browser like the world’s nosiest party guest. Nothing was saved. Fourth wall’s broken, but the privacy policy isn’t.',
    how: 'One website told me your city. Once. With your permission. I didn’t keep it. I know, I’m as shocked as you are.',
    sigilNote: 'This little squiggle? That’s YOU. One of a kind. Made right here, sent nowhere. Frame it.',
    map: {
      localNow: 'it’s {{time}} where you are. {{sky}}. yes I know that. no it’s not creepy. okay it’s a little creepy.',
    },
    reading: {
      title: 'Your Setup (Respect)',
      machine: 'Your Rig',
      system: 'Your Browser Situation',
      display: 'That Screen',
      tongue: 'How You Talk',
    },
    signal: {
      title: 'Your Signal & Stuff',
      lantern: 'Your Battery',
      road: 'Your Wi-Fi',
      carrier: 'Your Internet Person',
      origin: 'Your Secret Numbers',
    },
    journey: {
      timeAfield: 'Time You Hung Around',
      trail: 'Scroll Mileage',
      visit: 'Times You Came Back',
    },
    voices: {
      title: 'Secret Voices',
      unlocked: '{{count}} of {{total}}. nice.',
      sealed: 'Locked',
      switchTo: 'Be {{voice}}',
      locked: 'Locked. Mysterious. Like my backstory.',
    },
    sealed: {
      none: 'A bunch of voices still locked. Go find ’em. It’s basically a scavenger hunt and I’m rooting for you.',
      some: '{{count}} of {{total}} voices still hiding. Keep going, you glorious weirdo.',
      all: 'You found ALL of them. Overachiever. I’d hug you but you’re on the other side of the screen. For now.',
    },
  },

  // The Atelier — Wade's voice. Narrative keys only; per-phase/per-cut details
  // fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Scenes',
    title: 'How This Got Made',
    confession: 'It passed every test way before the dev was done poking at it. Perfectionists, am I right?',
    confessionSub:
      'The site was finished like forty commits ago. But “finished” is a suggestion, apparently, so he kept going — fixing stuff nobody would ever notice and adding analytics to PROVE people use the cool bits. Nerd behavior. Deeply respect it.',
    acts: { build: 'The Build', engine: 'The Engine Room', hidden: 'The Secret Stuff' },
    commits: {
      title: 'Every Time He Saved',
      range: 'Straight from the real repo. No CGI.',
      caption: 'Each square is a day something shipped. Not one lucky montage — a whole grind.',
    },
    ci: {
      title: 'The Rules',
      on: 'Runs on',
      caption:
        'Every commit has to pass The Gauntlet before it gets in — lint, types, build. Green or it doesn’t ship. It’s like a bouncer, but for code, and it cannot be flirted with. I checked.',
    },
    stats: {
      hours: 'Hours sunk',
      commits: 'Times saved',
      phases: 'Phases',
      voices: 'Voices (incl. yours truly)',
      lines: 'Lines written',
    },
    ledger: {
      intro:
        'Adding stuff is easy. Anybody can add stuff. The hard part is cutting stuff — killing your darlings, as the writers say, usually while crying. He cut a lot. Ice cold. Love it.',
      built: 'What made the cut',
      cut: 'What got cut (on purpose)',
    },
    eggs: {
      title: 'The Secret Stuff',
      intro: 'Hidden goodies. Tap one. It’s like a post-credits scene, but there’s a bunch and you don’t have to sit through the whole movie.',
      astrolabe: {
        title: 'The Spinny Compass',
        how: 'Wave your mouse over the big compass up top. It follows you. Clingy. Relatable. It also makes a little gear sound, which, chef’s kiss.',
      },
      spin: {
        title: 'The Spin',
        how: 'See the button on the compass? Push it. The needle spins and slows down on its own. That’s real physics, baby, no faking. Unlike some things about me.',
      },
      sound: {
        title: 'The Sounds',
        how: 'Every beep and whoosh here is made LIVE by the computer. Zero downloads. Hit the speaker button, bottom right, then change the theme and listen. You’re welcome.',
      },
      sky: {
        title: 'The Sky Button',
        how: 'Top right. Five skies. One’s “auto” and it knows what time it is where you are. Which is either magic or surveillance. Why not both?',
      },
      voices: {
        title: 'The Other Voices',
        how: 'The whole site can talk in different voices — press ⇧⌘V. Some are locked. Type the secret word anywhere to bust ’em out. Hint, because I like you: type my name. It’s “deadpool.” Obviously.',
      },
      map: {
        title: 'The Map',
        how: 'Press ⌘K. A map pops up. It’s got all the projects on it. Fast travel, basically. Every good game has fast travel.',
      },
      raven: {
        title: 'The Birds',
        how: 'Send a message and a whole flock of birds flies across the screen with a sound. Dramatic? Extremely. Necessary? Also extremely.',
      },
      recap: {
        title: 'The Creepy-Cool Part',
        how: 'Scroll to the bottom of the contact section. It reads your device, your screen, even your city. It’s the fourth wall, but for your computer. I feel very at home there.',
      },
      console: {
        title: 'The Hidden Menu',
        how: 'Open the browser’s dev console — F12, the developer thing — and there’s a whole gold message waiting with secret hints. He left it for the nosy ones. Hi, nosy one.',
      },
    },
    observatory: {
      eyebrow: 'The Watcher',
      title: 'He Watches. Politely.',
      intro: 'You can’t improve what you don’t measure — so he wired up analytics. But the classy kind: no cookies, totally anonymous, off the second you say no. It’s surveillance with consent and a firm handshake.',
      hub: 'the big summary',
      hubNote: 'Everything you do rolls up into one neat little report when you leave. One line. The whole story. Like a series finale, but good.',
      indexHint: 'Every dot is a real thing he tracks. Sweep your mouse around, or click one from the list — it’ll tell you what it is and where it lives.',
      cadence: { once: 'Once a visit', repeat: 'Every single time' },
      metrics: {
        events: 'Tracked events',
        superProps: 'Auto-tags',
        webhooks: 'Alert pipes',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Getting around',
        craft: 'The fun stuff',
        realms: 'The projects',
        intent: 'Trying to reach him',
      },
      panels: {
        privacy: {
          title: 'No Cookies. Zero.',
          body: 'Anonymous, no login, nothing saved. Your browser says “don’t track me”? It doesn’t. Done. Even I respect that, and I respect almost nothing.',
        },
        discoverability: {
          title: 'Google Knows Him',
          body: 'Five fancy schema things so Google puts his face in the little box. The box is prime real estate. He owns some.',
        },
        observability: {
          title: 'He Gets Alerts',
          body: 'Something breaks, his Discord buzzes before you even notice. Proactive. Like ducking before the punch. I should try that.',
        },
      },
    },
    atlas: {
      eyebrow: 'The Filing System',
      title: 'Where Everything Lives',
      intro: 'You think a folder’s just a folder. Wrong. Every file is exactly where it should be, on purpose. Click around and he’ll explain. It’s nerdier and cooler than it sounds.',
      hotspots: 'The Greatest Hits',
      browseAll: 'Open the whole cabinet',
      prompt: 'Click a folder or a hit and he’ll tell you why he did it that way.',
      why: 'Why He Did It This Way',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Real Guy (Mask Off)',
      intro: 'There are, like, three sides to this dude, minimum. Pick one and click. He overshares. It’s great.',
    },
    personas: {
      more: 'Tell me more',
      less: 'Okay, enough',
      storyteller: {
        label: 'The Storyteller',
        hook: 'He lives inside stories.',
        story: 'Lord of the Rings. This saga. Every superhero ever (hi). A frankly concerning amount of One Piece. He looks at software and sees a saga — which is exactly why this whole site is a story and not a boring list. I approve. I’m fictional; I have standing.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'He’s an actual filmmaker.',
        story: 'Real cinematic videos — cafés, weddings, short films. So when this site MOVES like a movie, that’s not luck, that’s a guy with an eye. An eye he keeps, unlike some of us.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'And then he vanishes into the mountains.',
        story: 'No phone, no signal, just him and the trees. Keeps him grounded. I’ve never been grounded a day in my life and honestly it shows.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'Real talk, mask off for a sec: he cannot leave “good enough” alone. Under all the noise — mine, mostly — he’s dead serious about work that holds up and details nobody will ever thank him for. That’s the whole bit. That’s the guy. Hire the guy.',
    ],
    sign: '— Deadpool. On behalf of Manan. (It’s a Manan production.)',
  },

  voiceHall: {
    title: 'The Voice Booth',
    subtitle: 'Pick who narrates this whole thing. I’m obviously the best choice, but the site’s a democracy, so. Democracy. Gross. Vote for me.',
    nowNarrating: 'Currently: me',
    preview: {
      eyebrow: 'Now previewing',
      sealed: 'Locked (boo)',
      apply: 'Give this voice the mic',
      active: 'Currently: this legend',
    },
    tryHint: 'Click a voice and BOOM — the whole site starts talking like them. Even this exact box. Especially this box. Fourth wall’s already gone, might as well.',
    close: 'Bail',
    sealedHint: 'Some voices are locked, like a treasure chest, or my emotional core. Tap one and answer its clue — or type the secret word anywhere — to pop it open.',
    found: '{{count}}/{{total}} secret voices found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Normal Ones',
      sealed: 'The Chaos Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Summon a new voice',
      ctaSub: 'Want somebody else narrating this? Name them. Make it weird. I’ll personally lobby for it. I have nothing but time.',
      back: 'Back',
      persona: 'Whose voice?',
      personaPlaceholder: 'a hero · a villain · that one celebrity · me but somehow louder…',
      email: 'Your email',
      emailPlaceholder: 'your email — so a real human can reach out, allegedly',
      note: 'Why them?',
      notePlaceholder: 'make your pitch (I love a chaotic pitch)',
      send: 'Send it!',
      sending: 'Summoning…',
      done: 'Boom. Sent.',
      doneSub: 'We’ll give “{{persona}}” some real thought. No promises. Okay, a tiny one. Don’t tell legal.',
      errors: {
        persona: 'You gotta tell us WHO. That’s the entire bit. Name, please.',
        email: 'That email looks fake. Fix it, or leave it blank. Freedom.',
        failed: 'Okay that didn’t send. The universe again. Try once more.',
      },
    },
  },

  voice: {
    menuSub: 'Who tells this story? Me. The answer is me.',
    sealedHint: 'Tap a locked one and',
    sealedTypeHint: 'answer the clue. Boom.',
    cluePlaceholder: 'Type the answer…',
    clueSubmit: 'Boom',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Nope. Wrong. But like, confidently wrong, which I respect. Again.',
    clueCloser: 'Warmer — {{hint}}',
    clueGiveaway: 'Ugh, fine, I’ll just tell you. It’s',
    clueTapUnlock: 'tap it, hero',
    more: '{{count}} more voices in here. It’s a whole party. You’re invited.',
  },

  footer: {
    quote: '“Maximum effort.”',
    atelierLink: 'The making-of. The behind-the-scenes. The DVD extras nobody watches but should.',
    closeHead: 'Let’s talk.',
    closeSub: 'Open to senior roles, collaborations, and morally flexible team-ups.',
    getInTouch: 'Hit me up',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Let’s talk',
    resume: 'Grab the résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Okay, back to the good stuff',
  },
};
