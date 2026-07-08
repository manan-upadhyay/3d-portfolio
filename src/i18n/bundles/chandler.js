// COULD I BE ANY MORE… — easter-egg personality (Chandler Bing voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('chandler')` once unlocked. Pure flavor
// — the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — just in Chandler's voice: sarcasm, self-deprecation, and
// random EMPHASIS. The visitor is still Manan; he is only *channeling* the guy
// who makes jokes when he's uncomfortable. Which is always.

export default {
  common: { chapterLabel: 'Chapter' },

  chapters: {
    origin: { label: 'The Cold Open', sub: 'Could This BE Any More Intro?' },
    about: { label: 'About Me, I Guess', sub: 'Could I BE Any More Qualified?' },
    work: { label: 'The Résumé Part', sub: 'Places I Have Worked' },
    arsenal: { label: 'The Skills', sub: 'Things I Can Do, Apparently' },
    projects: { label: 'Stuff I Actually Made', sub: 'The Real Work' },
    contact: { label: 'Talk to Me', sub: 'Could We BE Any More In Touch?' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web apps', 'React frontends', 'full-stack systems', 'interfaces that actually work'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Could I BE any more full-stack?'],
    ctaPrimary: 'See my work',
    ctaSecondary: 'Could we talk?',
    ctaResume: 'Résumé',
    scroll: 'Keep going, sure',
    spin: 'Give it a spin, why not',
  },

  about: {
    pullQuote: '“Could I BE any more of a developer?” Five years of evidence says no. Also that was rhetorical — please, I’m begging you, don’t answer.',
    intro: [
      'Hi. I’m Manan. I build web apps, and I make jokes when I’m uncomfortable, so this next part could get weird. Five years in, twenty-plus releases. I’m basically a professional. It’s alarming, honestly.',
      'I take an idea from an empty file [[endToEnd|all the way to production]], across six industries. Could I BE any more end-to-end? (I could not.) I do my best work on the hard, tangled problems — mostly because sarcasm doesn’t compile and I’ve tried.',
      'I’m not great at bragging. Can I interest you in a sarcastic comment instead? …Fine. The code is good. Really good. There — I said an earnest thing out loud and now I need to go lie down in a quiet room.',
    ],
    disciplines: 'The Skills, I Guess',
    services: {
      frontend: { title: 'The Part You See', description: 'Production UIs with React, Next.js and TypeScript. This is the face of the whole operation — the part you actually look at. Could this interface BE any cleaner? Don’t answer, it’s a display of confidence.' },
      backend: { title: 'The Part You Don’t', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. The stuff nobody sees and everything depends on — kind of like my job, which to this day no one at any party has understood.' },
      performance: { title: 'The Fast Part', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, not guessed. Plus SEO schema so Google knows I exist. Could it BE any faster? Yes. It always could. That’s the whole terrifying job.' },
      fullstack: { title: 'All of It, Apparently', description: 'End to end, requirement to production monitoring. Front, back, and the deeply frightening middle — I own the whole thing. Could I BE any more responsible for this? I really, really could not.' },
    },
    stats: {
      years: 'Years In',
      projects: 'Things Shipped',
      domains: 'Industries Survived',
      load: 'Faster Now',
    },
  },

  experience: {
    intro: 'So this is the part where I list my jobs and pretend I had a plan the whole time. I did not have a plan. But could the timeline BE any more impressive? Read on. Judge gently.',
    travelTrail: 'Scroll through it',
    present: 'Currently',
    onAssignment: 'On Loan (it’s a whole thing)',
    journey: {
      'first-trail': {
        chapter: 'The First Job',
        headline: 'Everyone starts somewhere. This is my somewhere. Try to look impressed.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React UIs for sales. Real ones. That people used. I know — I was shocked too.',
          'Shipped PDF/Excel reporting and saved everyone 16–20 hours a week. Could I BE any more of a time-saver?',
          'Cut load time by 38%. I measured it, because “it feels faster” is not a number and I’ve been in enough meetings to know.',
        ],
      },
      oath: {
        chapter: 'The School Part',
        headline: 'I have a degree. CGPA 8.36 / 10. Could I BE any more credentialed?',
        role: 'Student (a suspiciously good one)',
        credential: 'Also — and this is real — a LAW degree. LL.B., passed the bar (AIBE). So I can build your app AND represent you when you get sued over it. That’s called value.',
        points: [
          'Earned a formal engineering degree in IT. Framed it. Look at it sometimes. It looks back.',
        ],
      },
      expedition: {
        chapter: 'The Big Leagues',
        headline: 'Six industries. Production-grade. The bugs did not make it. RIP the bugs.',
        role: 'Full Stack Developer',
        points: [
          'Won the first-ever Employee of the Month. Month one. Out of 30 people. Could I BE any more employee-of-the-month? No. Literally no, I checked.',
          'Shipped apps across finance, health, logistics, CRM, SaaS and media. That’s basically all the industries. I ran out of industries.',
          'Owned features end to end — meeting to monitoring, no babysitting. I am, unnervingly, a responsible adult now.',
        ],
      },
      vanguard: {
        chapter: 'The Big Client',
        headline: 'Leading frontend on the Capital Group account. It’s a big deal. I’m as surprised as you.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'Okay, the org chart. Buckle up: I work for Inexture, who loaned me to Infosys, who put me on Capital Group. Could this reporting structure BE any more confusing? It’s three companies. I have three lanyards. It’s a lot.',
        points: [
          'Led frontend across multiple Capital Group products. Someone had to be in charge. Somehow it was me.',
          'Shipped 4 production releases, features built from scratch. From NOTHING. Which is also how I felt at the first standup.',
          'Ran sprint planning, client demos and code reviews. So many meetings. I have become the meetings.',
        ],
      },
      horizon: {
        chapter: 'What’s Next',
        headline: 'Looking for the next team. Could I BE any more available? (Please hire me, I’m very funny.)',
        role: 'Awaiting My Next Thing',
        points: [],
      },
    },
    summonCta: 'Could we talk?',
  },

  arsenal: {
    subtitle: 'My skills. Could there BE any more of them? Hover one — it’ll tell you which tools it hangs out with. They’re a very codependent group. I relate to them deeply.',
    coreLabel: 'The Skills',
    coreLegend: 'the glowing ones are the mains — the rest are, and I cannot stress this enough, also good',
  },

  works: {
    intro: 'Real projects, real clients, real results. Some are under NDA — which means I could tell you, but then legal would do that thing with their face, so no. Could this BE any more classified?',
    realm: 'Project',
    featured: 'The Good One',
    nda: 'Classified',
    enterRealm: 'Take a look',
    source: 'The Code',
    ndaSealed: 'That one’s [[nda|under NDA]]. I’ve said too much already and somewhere a lawyer just felt a disturbance. Moving on, could we?',
    ndaArch: 'A blurry blueprint. Legal insisted. They insist a lot.',
    chartMore: 'Show {{count}} more, sure',
    furl: 'Okay, that’s plenty',
    fullStory: 'The whole thing',
    nod: 'Six projects up there. The seventh is the website you’re currently standing in. Yeah. Meta. Could it BE any more meta?',
    nodCta: 'Go behind the scenes',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio site so slick the photos load before you finish blinking. Weddings: expensive, emotional, great lighting. I know things about weddings now.',
        description: 'A media-heavy site and admin panel for a fancy wedding studio — every photo and video loading fast enough to keep the whole family calm. Which, at a wedding, is a miracle.',
        highlights: [
          'Built a Next.js site — landing, portfolio, blogs — plus an admin panel to run it all.',
          'Made it fast with caching, a CDN, Cloudflare R2 and video streaming. Could it BE any faster? …Okay maybe. But barely.',
          'Wired Firebase Auth and Firestore for logins and content. Locked down. Very secure. Unlike my emotions.',
          'Wrote scripts to compress images and video, so nobody pays for bytes they don’t need. Fiscally responsible. My one adult trait.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a tile floor in your browser, download an order-ready PDF. It’s tiles. It’s weirdly satisfying. I don’t fully understand why either.',
        description: 'An interactive tile-design tool — pick layouts, preview live, download templates ready to order.',
        highlights: [
          'Built a floor visualizer with live preview and downloadable PDF templates.',
          'Rendered tile variants on the fly — corners, fills, the whole grid.',
          'Used TensorFlow.js to turn PNGs into [[regionSvg|region-based SVGs]]. That’s machine learning. For tiles. Could I BE any more overqualified for floor design?',
          'Built an admin panel for designs and layouts.',
          'Added tours and shortcuts so nobody rage-quits picking a tile. It happens. I’ve seen it.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A full Wall-Street-grade dashboard, built from NOTHING. Finance people, meet the tool you didn’t know you were emotionally dependent on.',
        description: 'A finance dashboard for advisors, built from scratch — Next.js, Okta login, big interactive charts, very serious money vibes.',
        highlights: [
          'Built the whole frontend from scratch — design, reusable UI, protected routes, all of it.',
          'Wired Okta OAuth with real server-side authorization. Nobody sneaks in. I tried, to test it. I was denied. Humbling.',
          'Made portfolio views with tables and Highcharts — pretty AND useful, which, could that combo BE any rarer?',
          'Set up feature flags, deployments and debugging tools.',
          'Pitched in on a Spring Boot backend for PDF reports. Java. I did Java. I’d like that noted.',
        ],
      },
      'digital-investor': { description: 'An investment platform with rich interactions and analytics. Money stuff. I understand it professionally and fear it personally.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance company — data, workflows, ID checks, locked down tight. Riveting to build. Genuinely. I don’t even mean that sarcastically, which is rare.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC, the whole front desk. Could a check-in flow BE any more thoroughly handled? It could not.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time chat and serious testing. It talks back — and honestly it’s a better conversationalist than I am at parties.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, admin tools. People bet actual money on it. On CRICKET. Could that BE any more of a responsibility? Built it anyway.' },
    },
  },

  contact: {
    availability: 'I’m around. Could I BE any more available? Send a message — I actually respond, which continues to surprise everyone, including me.',
    theMessage: 'Your Message',
    correspondence: 'Ways to Reach Me',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me about the role or project — or just say hi. Warning: I will make it awkward, but in a charming way.',
    },
    submitIdle: 'Send It',
    submitLoading: 'Sending, hang on…',
    status: {
      idle: 'Ready when you are. No pressure. Okay a little pressure.',
      sending: 'Okay it’s going, it’s going…',
    },
    resumeCta: 'My Résumé',
    success: 'Message sent. Could I BE any more excited to reply? (This is me excited. I know it doesn’t look like much. It never does.)',
    errors: {
      required: [
        'You left a field empty. Could this form BE any less complete? Fill it in and we’re golden.',
        'A blank field. Bold move. Wrong move, but bold. Every field, please.',
        'You skipped one. I noticed. I notice everything, it’s exhausting. Fill it in.',
        'Empty field detected. Could you BE any more mysterious? Give me the whole thing.',
      ],
      email: [
        'That’s not an email. That’s a cry for help. A charming one. Fix it?',
        'That email does not exist. I checked. I have trust issues and a keyboard. Try again.',
        'Could that email BE any more fake? Give me a real one, I won’t judge. Much.',
        'Your email and reality are currently on a break. Double-check it for me?',
      ],
      failed: [
        'It didn’t send. Not my fault. Probably. Definitely maybe not my fault. Try again.',
        'Message failed. The universe said no. Rude. Hit send once more.',
        'Delivery failed. Somewhere a server sighed. I felt it. Resend it.',
        'That didn’t go through. Could this BE any more inconvenient? Try again.',
      ],
      notConfigured: [
        'The form isn’t wired up yet — that’s on me, not you, for once. Just email me directly at {{email}}.',
        'Full transparency, because I panic under pressure: the form isn’t live. Email {{email}} directly.',
        'The form is taking a personal day. I respect that. Reach me at {{email}} instead.',
      ],
    },
    quote: '“I’m not great at the advice. Can I interest you in a sarcastic comment?”',
    channels: { location: 'Somewhere, Being Sarcastic' },
  },

  map: {
    footerHint: 'enter to go · esc to bail',
    actions: {
      resume: 'My Résumé',
      themeLight: 'Lights on',
      themeDark: 'Dramatic lighting',
    },
  },

  recap: {
    title: 'Everything I Know About You. It’s… A Lot.',
    subtitle: 'I read your device right off the browser, like the nosiest guest at a party. Nothing was saved. Could I BE any more respectful of your privacy? No. That’s the whole bit.',
    how: 'One website told me your city. Once. With your permission. I didn’t keep it. I know. Growth.',
    sigilNote: 'This little squiggle? That’s YOU. One of a kind. Made right here, sent nowhere. It’s basically your mood ring, but honest.',
    map: {
      localNow: 'it’s {{time}} where you are. {{sky}}. Yes, I know that. Could it BE any more slightly creepy? It could not.',
    },
    reading: {
      title: 'Your Setup',
      machine: 'Your Rig',
      system: 'Your Browser Situation',
      display: 'That Screen',
      tongue: 'How You Talk',
    },
    signal: {
      title: 'Your Connection & Stuff',
      lantern: 'Your Battery',
      road: 'Your Wi-Fi',
      carrier: 'Your Internet Person',
      origin: 'Your Secret Numbers',
    },
    journey: {
      timeAfield: 'Time You Spent Here',
      trail: 'Scroll Mileage',
      visit: 'Times You Came Back',
    },
    voices: {
      title: 'Hidden Narrators',
      unlocked: '{{count}} of {{total}}. Not bad.',
      sealed: 'Locked',
      switchTo: 'Be {{voice}}',
      locked: 'Locked. Mysterious. Like my job.',
    },
    sealed: {
      none: 'A bunch of narrators still locked. Could this BE any more of a scavenger hunt? Go find them. I believe in you.',
      some: '{{count}} of {{total}} narrators still hiding. Keep going, you delightful person.',
      all: 'You found ALL of them. Could you BE any more thorough? I’m genuinely impressed, and I’m stingy with that.',
    },
  },

  // The Atelier — Chandler's voice. Narrative keys only; per-phase/per-cut
  // details fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Scenes',
    title: 'How This Got Made',
    confession: 'It passed every test way before I stopped fiddling with it. Could I BE any more of a perfectionist? Apparently not.',
    confessionSub:
      'The site was finished like forty commits ago. But “finished” felt like a threat, so I kept going — fixing things nobody would ever notice and adding analytics to PROVE the cool parts get used. It’s deeply nerdy. I’ve made peace with it.',
    acts: { build: 'The Build', engine: 'The Engine Room', hidden: 'The Secret Stuff' },
    engineBridge: 'So that is how it watches itself. This is how it is built. Could this codebase BE any more organized?',
    commits: {
      title: 'Every Time I Saved',
      range: 'Straight from the real repo. No embellishment. Okay, minimal embellishment.',
      caption: 'A three-week sprint — the 2026 rebuild, on a repo I’ve apparently had since 2023. Not one lucky montage, a whole grind. And every commit had to pass the checks before it merged — lint, types, build. It’s like a bouncer, but for code, and it cannot be charmed. I have tried.',
    },
    stats: {
      voices: 'Voices (incl. this one)',
      lines: 'Lines written',
    },
    ledger: {
      intro:
        'Adding stuff is easy. Anybody can add stuff. The hard part is cutting stuff — killing your darlings, as the writers say, usually while quietly weeping. I cut a lot. Could I BE any more ruthless? Turns out yes.',
      built: 'What made the cut',
      cut: 'What got cut (on purpose)',
    },
    eggs: {
      title: 'The Secret Stuff',
      intro: 'Hidden little details. Tap one. It’s like a bonus scene, except there are a bunch and you don’t have to sit through credits.',
      astrolabe: {
        title: 'The Spinny Compass',
        how: 'Wave your mouse over the big compass up top. It follows you around. Clingy. Relatable. It also makes a little gear sound, which — could that BE any more satisfying? No.',
      },
      spin: {
        title: 'The Spin',
        how: 'See the button on the compass? Push it. The needle spins and slows down on its own. That’s real physics. No faking. Unlike my confidence, which is entirely fabricated.',
      },
      sound: {
        title: 'The Sounds',
        how: 'Every beep and whoosh here is made live by the computer. Zero downloads. Hit the speaker button, bottom right, then change the theme and listen. You’re welcome.',
      },
      sky: {
        title: 'The Sky Button',
        how: 'Top right. Five skies. One’s “auto” and it knows what time it is where you are. Could that BE any more slightly unsettling? And yet, cool. Both things.',
      },
      voices: {
        title: 'The Other Narrators',
        how: 'The whole site can talk in different voices — press ⇧⌘V. Some are locked. Type the secret word anywhere to unlock them. Hint, because I like you: type “chandler.” That’s me. Hi.',
      },
      map: {
        title: 'The Map',
        how: 'Press ⌘K. A map pops up with everything on it. It’s fast travel, basically. Every good thing has fast travel. And snacks. This one only has the fast travel.',
      },
      raven: {
        title: 'The Birds',
        how: 'Send a message and a whole flock of birds flies across the screen with a sound cue. Dramatic? Extremely. Necessary? …Also extremely.',
      },
      recap: {
        title: 'The Nosy Part',
        how: 'Scroll to the bottom of the contact section. It reads your device, your screen, even your city. Could it BE any more thorough? It’s fine. It’s all local. Probably calm down.',
      },
      console: {
        title: 'The Hidden Menu',
        how: 'Open the browser’s dev console — F12, the developer thing — and there’s a whole gold message waiting with hints. I left it for the nosy ones. Hi again, nosy one.',
      },
    },
    observatory: {
      eyebrow: 'The Watcher',
      title: 'I Watch. Politely. It’s Weird, I Know.',
      intro: 'You can’t improve what you don’t measure — so I wired up analytics. But the classy kind: no cookies, totally anonymous, off the second you say no. It’s surveillance, but the polite, deeply apologetic kind.',
      hub: 'the big summary',
      hubNote: 'Everything you do rolls up into one neat little report when you leave. One line. The whole story. Could a summary BE any more efficient?',
      indexHint: 'Every dot is a real thing I track. Sweep your mouse around, or click one from the list — it’ll tell you what it is and where it lives.',
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
        intent: 'Trying to reach me',
      },
      panels: {
        privacy: {
          title: 'No Cookies. None.',
          body: 'Anonymous, no login, nothing saved. Your browser says “don’t track me”? Then I don’t. Could I BE any more respectful? Done.',
        },
        discoverability: {
          title: 'Google Knows Me',
          body: 'Five fancy schema things so Google puts me in the little box. The box is prestigious. I’m in the box.',
        },
        observability: {
          title: 'I Get Alerts',
          body: 'Something breaks, my Discord buzzes before you even notice. Proactive. It’s the most on-top-of-things part of my entire life.',
        },
      },
    },
    atlas: {
      eyebrow: 'The Filing System',
      title: 'Where Everything Lives',
      intro: 'You think a folder is just a folder. Could you BE more wrong? Every file is exactly where it should be, on purpose. Click around and I’ll explain. It’s nerdier and cooler than it sounds.',
      hotspots: 'The Greatest Hits',
      browseAll: 'Open the whole cabinet',
      prompt: 'Click a folder or a hit and I’ll tell you why I did it that way.',
      why: 'Why I Did It This Way',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Real Me (Uh Oh)',
      intro: 'There are, like, three sides to me, minimum. Pick one and click. I overshare when nervous, so this should go great.',
    },
    personas: {
      more: 'Tell me more',
      less: 'Okay, enough',
      storyteller: {
        label: 'The Storyteller',
        hook: 'I live inside stories. It’s cheaper than therapy.',
        story: 'Lord of the Rings. This whole saga. Every superhero ever. A frankly concerning amount of One Piece. I look at software and see a saga — which is exactly why this site is a story and not a boring list. Could a portfolio BE any more dramatic? Apparently not. You’re welcome.',
      },
      filmmaker: {
        label: 'The Filmmaker',
        hook: 'I’m also an actual filmmaker.',
        story: 'Real cinematic videos — cafés, weddings, short films. So when this site MOVES like a movie, that’s not luck, that’s a guy with an eye. An eye I have kept, unlike my composure at networking events.',
      },
      wanderer: {
        label: 'The Wanderer',
        hook: 'And then I vanish into the mountains.',
        story: 'No phone, no signal, just me and the trees. It keeps me grounded. It’s the one place my phone can’t make me anxious, which — could that BE any more necessary? No.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'Okay, sincerity, quick, before I ruin it with a joke: I cannot leave “good enough” alone. Under all the sarcasm, I’m dead serious about work that holds up and the details nobody will ever thank me for. …And we’re back. That was exhausting. Hire me.',
    ],
    sign: '— Chandler. I mean, Manan. (It’s Manan. Obviously.)',
  },

  voiceHall: {
    title: 'The Narration Booth',
    subtitle: 'Pick who narrates this whole thing. Could I BE any more biased toward myself? No. But it’s your call. The others are great too, I guess.',
    nowNarrating: 'Currently: me',
    preview: {
      eyebrow: 'Now previewing',
      sealed: 'Locked narrator',
      apply: 'Could this narrator BE the one?',
      active: 'Currently: me',
    },
    tryHint: 'Click a narrator and the whole site — this box included — re-tells itself in their words. Even this exact sentence. Could that BE any more meta?',
    close: 'Close',
    sealedHint: 'Some narrators are locked, like my feelings. Tap one and answer its clue — or type the secret word anywhere — to open it up.',
    found: '{{count}}/{{total}} hidden narrators found',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Normal Ones',
      sealed: 'The Hidden Ones',
    },
    request: {
      section: 'Summon',
      cta: 'Request a new narrator',
      ctaSub: 'Want someone else narrating this? Tell me who. Make the case. I love a good pitch — it’s the one time I don’t have to talk.',
      back: 'Back',
      persona: 'Whose narration?',
      personaPlaceholder: 'a character · a celebrity · me, but even more anxious…',
      email: 'Your email',
      emailPlaceholder: 'your email — so a real human can follow up, allegedly',
      note: 'Why them?',
      notePlaceholder: 'make your case (I’m an easy sell)',
      send: 'Send It',
      sending: 'Summoning…',
      done: 'Sent.',
      doneSub: 'I’ll give “{{persona}}” some real thought. No promises. Okay, a small one, because I fold under pressure.',
      errors: {
        persona: 'You have to tell me WHO. That’s the whole point. Give me a name.',
        email: 'That email looks off. Fix it, or leave it blank. I’m not the boss of you.',
        failed: 'Okay, that didn’t send. Could this BE any more inconvenient? Try again.',
      },
    },
  },

  voice: {
    menuSub: 'Change who narrates this. It’s a whole personality thing. Roll with it.',
    sealedHint: 'Tap a locked one and',
    sealedTypeHint: 'answer the clue.',
    cluePlaceholder: 'Type your answer…',
    clueSubmit: 'Unlock',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'Nope. Wrong. But confidently wrong, which I respect. Try again.',
    clueCloser: 'Getting warmer — {{hint}}',
    clueGiveaway: 'Ugh, fine, I’ll just tell you. It’s',
    clueTapUnlock: 'tap to unlock',
  },

  footer: {
    quote: '“Hi. I’m Chandler. I make jokes when I’m uncomfortable.”',
    atelierLink: 'The making-of — how this got made, minus my commentary. Mostly.',
    closeHead: 'Let’s work together.',
    closeSub: 'Open to senior full-stack roles and collaborations. And banter. Mostly banter.',
    getInTouch: 'Could we talk?',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Could we talk?',
    resume: 'Grab my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Okay, back to the good stuff',
  },
};
