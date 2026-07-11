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
      projects: 'Things Shipped',
      domains: 'Industries Hit',
      shipped: 'Shipped. Every One.',
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
          'Shipped apps across finance, health, logistics, CRM, SaaS and media. That’s basically the whole cinematic universe of industries.',
          'Owned features end to end — meeting to monitoring, no hand-holding. He’s a big boy.',
          'Also, month one: won the first-ever Employee of the Month. Beat 29 people. Undefeated. Somebody get this man a belt.',
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
    subtitle: 'The utility belt. Every tool here has been used in an actual fight — I mean project.',
    coreLabel: 'The Utility Belt',
    inventoryLegend: 'marks a main. everything else: confident side quests.',
    skimCoach: 'Rather skim a list? Flip to spreadsheet mode. No judgment.',
    viewChart: 'Fancy Mode',
    viewInventory: 'Spreadsheet Mode',
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
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money stuff. I’m a spender, not a saver, but I respect the craft.', highlights: [
        'Built React/Next.js feature modules with Adobe Analytics tracking. Every click, logged. Big Brother, but polite.',
        'Integrated Node/Express REST APIs — error handling, performance tuning.',
        'Added React Query caching so it stops nagging the server. Boundaries. Healthy.',
      ] },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance company — data, workflows, ID checks, locked down tight. Boring? To you. Beautiful? To the accountants.', highlights: [
        'Engineered RBAC and audit logs. Compliance. Nobody gets in who shouldn’t. Rude, but necessary.',
        'Sped up onboarding 20–25% with verification APIs.',
        'Optimized images, aced the Core Web Vitals.',
      ] },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the whole front desk. I’ve been thrown out of nicer places. And worse ones.', highlights: [
        'Designed multi-tenant PostgreSQL models and REST APIs. Many hotels, one brain, no crossed wires.',
        'Cut manual billing adjustments 30–35%.',
        'Sped up checkout 15–20%. Faster than housekeeping.',
      ] },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time chat and serious testing. It talks back. It’s also a better listener than most people I’ve shot at.', highlights: [
        'Led UI architecture — Next.js, Redux, WebSocket, real-time chatter.',
        'Added Storybook and Cypress so nothing ships broken.',
        'Cut regressions 25–30%. Chef’s kiss.',
      ] },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, admin tools. People bet real money on this. On CRICKET. Legends.', highlights: [
        'Owned the Node.js backend — MongoDB schema, REST APIs, cron pipelines syncing live ball-by-ball data in real time.',
        'Built a real-time points engine — Dream11 teams, captain/vice-captain multipliers, scored off every event.',
        'Back-traceable wallet ledger — auto payouts, winning logic, Razorpay. Real money means zero “oops.”',
        'Configurable contests and prize pools per match, plus GST/TDS tax reports in the React admin panel. Yes, taxes. Even chaos pays taxes.',
        'Backed the React Native app — team building, live tracking.',
      ] },
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
      title: 'Secret Narrators',
      unlocked: '{{count}} of {{total}}. nice.',
      sealed: 'Locked',
      switchTo: 'Be {{voice}}',
      locked: 'Locked. Mysterious. Like my backstory.',
    },
    sealed: {
      none: 'A bunch of narrators still locked. Go find ’em. It’s basically a scavenger hunt and I’m rooting for you.',
      some: '{{count}} of {{total}} narrators still hiding. Keep going, you glorious weirdo.',
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
    engineBridge: 'That is how it spies on itself — relax, anonymously. This is how it is built. Keep scrolling, gorgeous.',
    commits: {
      title: 'Every Time He Saved',
      range: 'Straight from the real repo. No CGI.',
      caption: 'A three-week rebuild sprint in 2026 — on a repo kicking around since 2023. Not one lucky montage, a whole grind. And every commit had to pass The Gauntlet before it got in — lint, types, build. It cannot be flirted with. I checked.',
    },
    stats: {
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
      sky: {
        title: 'The Sky Button',
        how: 'Top right. Five skies. One’s “auto” and it knows what time it is where you are. Which is either magic or surveillance. Why not both?',
      },
      voices: {
        title: 'The Other Narrators',
        how: 'The whole site can talk in different voices — press ⇧⌘V. Some are locked. Type the secret word anywhere to bust ’em out. Hint, because I like you: type my name. It’s “deadpool.” Obviously.',
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
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'The Behind-the-Scenes Tour',
      title: 'One set. Three phone calls.',
      intro: 'Okay, exposition time. This whole movie shoots inside YOUR device. Exactly three calls ever leave the set, and I name every single one — transparency is my third-best quality, after the suit and the humility.',
      clientZone: 'The set',
      clientZoneSub: 'shot entirely on location (your device)',
      beyondZone: 'Off set',
      beyondZoneSub: 'the only three calls that go out',
      wall: 'The fourth wall',
      sealedNote: 'Nothing else gets past it. No cookies, no stalking, no shipped media. Even the fonts live on set. The fourth wall only breaks when I do it.',
      hint: 'Poke something',
      readoutRest: 'Every department here has a reason to exist, which is more than I can say for most sequels. Poke around.',
      nodes: {
        traveler: { name: 'You (hi!)', why: 'One request, one page, and you’re in. No login, no popup asking about your feelings. You’re welcome.' },
        shell: { name: 'The set build', why: 'One HTML file with the styles baked in, so it looks finished before the scripts even show up to work. Two locations, one crew.' },
        motion: { name: 'Stunt coordination', why: 'One clock choreographs every scroll stunt so nobody collides mid-air. On phones we use your native scroll — practical effects, baby.' },
        narrator: { name: 'The voice cast', why: 'Ten voices, including yours truly — best casting decision of this production. The locked ones don’t exist until you say the magic word. Union rules.' },
        sky: { name: 'Lighting department', why: 'Checks your clock — NOT your GPS — and lights the set to match. Dawn, day, dusk, night. Zero creep factor.' },
        sound: { name: 'Foley artist', why: 'Almost every sound effect is improvised live by the browser — the one file we ship is the raven’s caw. The foley guy is mostly math, and he works for free.' },
        memory: { name: 'Continuity notes', why: 'Your session notes die when the tab does; the visit count stays in your browser. Nothing leaks to the tabloids.' },
        telemetry: { name: 'Box office numbers', why: 'Counts the moments, not the audience members. No cookies, no names. Do-Not-Track on? The studio gets nothing. Nada.' },
        raven: { name: 'The courier', why: 'Your message goes to a serverless back office holding the only key. The browser never touches it. Even I can’t steal it, and I steal everything.' },
        reading: { name: 'The cameo', why: 'One opt-in IP lookup names your city, shows it to you, keeps nothing. A one-scene appearance. No spin-off.' },
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
    title: 'The Narration Booth',
    subtitle: 'Pick who narrates this whole thing. I’m obviously the best choice, but the site’s a democracy, so. Democracy. Gross. Vote for me.',
    nowNarrating: 'Currently: me',
    preview: {
      eyebrow: 'Now previewing',
      sealed: 'Locked (boo)',
      apply: 'Give this narrator the mic',
      active: 'Currently: this legend',
    },
    tryHint: 'Click a narrator and BOOM — the whole site starts talking like them. Even this exact box. Especially this box. Fourth wall’s already gone, might as well.',
    close: 'Bail',
    sealedHint: 'Some narrators are locked, like a treasure chest, or my emotional core. Tap one and answer its clue — or type the secret word anywhere — to pop it open.',
    found: '{{count}}/{{total}} secret narrators found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Normal Ones',
      sealed: 'The Chaos Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Summon a new narrator',
      ctaSub: 'Want somebody else narrating this? Name them. Make it weird. I’ll personally lobby for it. I have nothing but time.',
      back: 'Back',
      persona: 'Whose narration?',
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
    text: 'Still scrolling? At this point we’re basically a team-up.',
    cta: 'Maximum effort — talk',
    resume: 'Grab the résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Okay, back to the good stuff',
  },

  // Older portfolios (/time-machine) — framing in character; factual "world then"
  // context inherited from chronicle.
  timeMachine: {
    probe: {
      dismiss: 'Yeet the drone',
      recall: 'Bring me back, baby',
      quips: {
        greet: [
          'Oh great, a talking drone. That’s me. I narrate. It’s my whole thing.',
          'Hi. I’m the flying comic relief. Every website needs one. This one got ME.',
          'Oh look, a person! Real one? Doesn’t matter. Hi. I’m the floating narrator. Cherish me.',
        ],
        scanTitle: [
          'Scanning the big title. Ooh, fancy font. Someone’s trying to impress you. It’s working, right?',
          'Big header alert! It’s giving “hire me.” A little desperate. A little iconic. Both.',
        ],
        scanCard: [
          'Old website detected. Held together with hope and duct tape. Respect.',
          'Ooh, a vintage site! Like finding your old MySpace. Cringe. Beautiful. Never delete it.',
          'Ancient build spotted. It’s janky, it’s charming, it’s doing its best. Like me. Emotionally.',
        ],
        scanFloor: [
          'Rock bottom. Nothing older down here. Well, there is, but it’s in witness protection.',
          'The basement of the internet. Spooky. Damp. I love it. Let’s never leave.',
        ],
        scanFail: [
          'Scan failed! Ugh, glitchy. This site runs on hope and duct tape and I RESPECT it.',
          'Scan bailed on me! Rude. Even the code has commitment issues. Relatable.',
        ],
        scanRail: [
          'Ooh, a nav rail! It’s like fast-travel but for a website. Fancy.',
          'The little side menu! Click it, teleport. Video-game logic. I approve. Chef’s kiss.',
        ],
        scanVoice: [
          'You’re gonna change my voice? Rude. I JUST got this one. Do it, I dare you.',
          'That swaps the narrator! Please don’t replace me. I have nowhere else to be. Literally.',
        ],
        scanSound: [
          'The sound button! Crank it. This scene NEEDS a soundtrack. Trust me, I’m in movies.',
          'Volume control! Turn it up. Silence is for indie films. We’re a summer blockbuster, baby.',
        ],
        fastScroll: [
          'WHOA speed racer. Slow down — you’re making me motion sick and I can’t even throw up on a website.',
          'Easy, Sonic! At this speed you’ll blow right past the cool stuff. Which is all me.',
        ],
        backUp: [
          'Going back UP? We were having a moment down here! Ugh, fine, abandon me.',
          'Up? UP? The plot is DOWN, my guy. Nobody scrolls back up in the good movies.',
        ],
        bored: [
          'Helloooo? You still there? Blink if you can hear me. …I can’t see you blink. Awkward.',
          'Did you leave? Did you LEAVE? I’m monologuing to an empty tab. Classic me.',
        ],
        hit: [
          'OW. Rude. I have feelings. Two, maybe three of them.',
          'Hey! No touchy! This hull is worth more than your car. Probably. I don’t know your car.',
        ],
        angry: [
          'Okay, poking the drone? Bold move. I’m writing your name in my little book.',
          'Keep it up and I’ll break the fourth wall AND your high score. Don’t test me.',
        ],
        escape: [
          'Nope! Can’t catch me. I’m greased up and emotionally unavailable.',
          'And I’m OUT. You’ll need chimichangas and a net, pal. Mostly chimichangas.',
        ],
        idle: [
          'Just floating here, breaking the fourth wall. Wave to the nice recruiter.',
          'Is this thing on? Are they still reading? Hi, still-reading person.',
          'Y’know, for a dead website museum, this place has GREAT lighting. Just saying.',
        ],
      },
    },
    eyebrow: 'Deleted scenes · director’s cut',
    title: 'The Time Machine',
    intro:
      'Oh, you scrolled all the way down HERE? Bold. These are the guy’s OLD portfolios — the deleted scenes, the before-times, the cringe-that-built-a-career. They’re broken in places. On purpose? No. But we’re calling it “vintage.” Keep scrolling. Time travel. No seatbelts. Maximum effort.',
    readoutLabel: 'The year, apparently',
    booting: 'Rebooting this old thing…',
    wake: 'Boot it up',
    wakeHint: 'Boot it up to mess with the live one right here, or fling it into a new tab.',
    enter: 'Open the old one',
    archived: 'Deleted scene',
    back: 'Okay, back to the good stuff',
    threshold: { cue: 'Down. Let’s go.' },
    floor: {
      title: 'End of the tape',
      body: 'That’s it. Nothing older. There WAS older, but it’s so bad it broke the fourth wall AND my will to live, so it’s gone. You’re welcome. Now go back up before you catch feelings.',
    },
    eras: {
      2023: {
        plaque: 'The one with all the moving parts. Somebody discovered 3D and would NOT shut up about it.',
        note: 'React, Three.js, unchecked ambition. Rougher than the site you’re in, zero maintenance, some animations DOA. It’s not a bug, it’s a period piece. Chef’s kiss.',
      },
      2019: {
        plaque: 'The origin story. Every hero has one. His is… HTML. Brace yourself.',
        note: 'Plain HTML, CSS, a sprinkle of jQuery, zero build step. It creaks like my knees after a fight scene. That’s the charm. Roll with it.',
      },
    },
  },

  // Time Tunnel (feedback §5) — Deadpool narrates the timeline, fourth wall down.
  timeTunnel: {
    hint: 'Slow your roll — we’re time-travelling. Read the years. I’ll wait.',
    events: {
      worldcup26: 'The World Cup, hosted by THREE countries. Commitment issues? Relatable.',
      aiagents26: 'AI starts doing real work. Great, robots have jobs and I have a mortgage.',
      foldiphone26: 'A folding iPhone. Finally, a phone as two-faced as my sense of humour.',
      iphone17: 'iPhone 17 drops. Yes, seventeen. We’re just counting now. No notes.',
      lawildfires25: 'L.A. catches fire. Even the celebs couldn’t look away. Too soon? Moving on.',
      nvidia25: 'A chip company becomes the richest on Earth. Plot twist: it was nerds all along.',
      ghibli25: 'Everyone’s photos become Ghibli art. My origin story, but with more explosions.',
      minecraft25: 'A block movie makes a fortune. Somewhere, a real script is crying.',
      erastour24: 'Taylor’s tour becomes the biggest ever. She’s basically a Marvel franchise now.',
      sora24: 'AI makes video from text. So it can finally recreate my box office. Kidding.',
      deadpool24: 'Deadpool & Wolverine. Two guys, zero filters, infinite money. I was THERE, folks.',
      trumpshot24: 'Someone takes a shot at a rally. Okay — this one’s serious. Be safe out there.',
      chatgpt23: 'The world starts talking to a chatbot. Great, now everyone breaks the fourth wall.',
      barbenheimer23: 'Barbie AND the bomb, same day. The only crossover bigger than mine.',
      chandrayaan23: 'India lands on the Moon’s south pole. Meanwhile I still can’t find my keys.',
      cricketwc23: 'India hosts the Cricket World Cup. A billion fans. My fanbase: growing, thanks.',
      israelhamas23: 'War breaks out. Yeah, I don’t joke about this one. Fourth wall stays up.',
      twitterx23: 'Twitter becomes “X.” A billion-dollar app named like my search history.',
      threads23: 'A new app gets 100 million users in five days. Rude. Took me two movies.',
      gta6_23: 'One game trailer breaks the internet. I demand a cameo. Call me, Rockstar.',
      barbiepink23: 'The whole world wears pink. Finally, a colour as confident as my red suit.',
      aichatbots23: 'Talking to machines feels normal now. I talk to YOU, so. Hi. Still here.',
      evcars23: 'Electric cars everywhere. Silent, deadly, judgmental. My kind of vehicle.',
      applewatch23: 'Your watch scores your sleep now. Mine just says “concerning.” Fair.',
      worldcup22: 'Messi wins the World Cup. A tiny legend with perfect timing. We stan.',
      chatgptlaunch22: 'A website called ChatGPT shows up. The exact moment the timeline got weird.',
      webb22: 'A telescope shows the whole universe. Still no Deadpool 3 script out there. Yet.',
      ukraine22: 'Russia invades Ukraine. Real war, real people. Not the bit. Never the bit.',
      musktwitter22: 'Elon buys Twitter. A billionaire buys a website. Peak 2022, honestly.',
      oscarslap22: 'The Oscar slap. The one time the whole world gasped and I said nothing. Growth.',
      vaccines21: 'Vaccines arrive. The world exhales. My healing factor was smug about it.',
      squidgame21: 'A killer game in green tracksuits. Finally, a dress code I respect.',
      nft21: 'People pay millions for JPEGs. I sold a doodle. Nobody bought it. Rude.',
      suez21: 'One giant ship blocks the whole ocean. Big mood. Been stuck sideways myself.',
      meta21: 'Facebook becomes “Meta.” Rebranding to escape your past. I’ve considered it.',
      taliban21: 'Kabul falls. This is heavy. I’ll shut up for this one. Genuinely.',
      covid20: 'A virus stops the entire planet. Even I stayed home. Well — mostly.',
      wfh20: 'Everyone works from home. Pants became optional. My favourite year, honestly.',
      amongus20: 'Everyone hunts the impostor. Sus. I got voted out first. Every time.',
      masks20: 'Masks become normal. FINALLY the world catches up to my whole aesthetic.',
      blackhole19: 'We photograph a black hole. A ring of fire. Basically my last relationship.',
      endgame19: 'The Avengers reach “Endgame.” I wasn’t invited. I’m not bitter. I’m VERY bitter.',
      got19: 'Game of Thrones ends. Everyone’s furious. I didn’t watch. Lived a better arc.',
      area51_19: 'Two million people plan to storm Area 51. Naruto-running included. Iconic.',
      babyshark19: '“Baby Shark” becomes the most-watched video ever. It’s in your head now. You’re welcome.',
      foldables19: 'Phones start folding. A hinge — so it can break your heart AND your screen.',
      fiveg19: '5G arrives. Faster everything. My jokes still buffer, though.',
      covidwuhan19: 'A few strange cases pop up in Wuhan. And nobody knows yet. …Yeah. That.',
    },
  },

  void: {
    eyebrow: 'nice try',
    title: 'You typed that URL yourself. I saw you.',
    body: 'This page doesn’t exist. It never did. You just made it up. I’m not mad, I’m impressed — but the actual portfolio is back that way.',
    position: 'your little adventure: {{path}}',
    cta: 'Fine, fix this',
    home: 'Back to the real page',
  },
};
