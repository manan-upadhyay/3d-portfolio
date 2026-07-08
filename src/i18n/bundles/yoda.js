// THE JEDI MASTER — easter-egg personality (Yoda voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('yoda')` once unlocked. Pure flavor —
// the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — spoken in Yoda's order. The facts, intact they remain;
// only reordered, the words are. The visitor is still Manan; channel the Jedi
// Master, he does.

export default {
  common: { chapterLabel: 'Lesson' },

  chapters: {
    origin: { label: 'The Beginning', sub: 'Where Begins It, Does' },
    about: { label: 'Know Him, You Will', sub: 'A Developer, This One Is' },
    work: { label: 'The Path Walked', sub: 'Trained, He Has' },
    arsenal: { label: 'The Tools', sub: 'Wield These, He Does' },
    projects: { label: 'Built, He Has', sub: 'Realms Charted' },
    contact: { label: 'Reach Him, You Can', sub: 'Send Word' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web apps, mmm', 'React systems, strong', 'full-stack, all of it', 'interfaces, elegant they are'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Do or do not — there is no try'],
    ctaPrimary: 'The work, see it',
    ctaSecondary: 'Reach out, you may',
    ctaResume: 'Résumé',
    scroll: 'Descend, you must',
    spin: 'Spin it, you will',
  },

  about: {
    pullQuote: '“Judge him by his size, do you? And well you should not.” Small the developer may look. Strong with the code, he is. Very strong.',
    intro: [
      'Manan, this one is. A full-stack developer, five years trained. Twenty-plus releases, shipped he has. Underestimate him, many do — a mistake, that is.',
      'From an empty file [[endToEnd|all the way to production]], an idea he carries — across six industries. Where tangled the problem is and unclear the path, strongest he becomes. Hmm.',
      'Do or do not — there is no “fix it in the next sprint.” Clean, he ships it. Or ship it, he does not. Patience, ownership, and no fear of the hard thing: the way of this one, it is.',
    ],
    disciplines: 'Wield These, He Does',
    services: {
      frontend: { title: 'What Seen, It Is', description: 'Production UIs with React, Next.js and TypeScript, build he does. The face of the work, this is — judged by the eyes first, it always will be. Beautiful AND working, it must be. Both.' },
      backend: { title: 'What Unseen, It Is', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. Beneath, this power flows — see it, no one does; depend on it, everyone does. Fail here, and dark the whole system becomes.' },
      performance: { title: 'Swift & Found', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, not guessed. Wait, no one likes to. And structured-data SEO, so know him the search engines do. Fast AND findable. Yes, hmmm.' },
      fullstack: { title: 'All of It, He Holds', description: 'End to end, requirement to production monitoring. The whole system, in his mind at once he keeps — the front, the back, the edge cases feared by lesser developers. The way of the full-stack, this is.' },
    },
    stats: {
      projects: 'Releases Shipped',
      domains: 'Industries Served',
      load: 'Swifter Than Before',
    },
  },

  experience: {
    intro: 'Told, the story must be. Where begun he did, to where stands he now — patient you will be, and learn much you shall.',
    travelTrail: 'The path, walk it',
    present: 'Now, it is',
    onAssignment: 'On loan, he is',
    journey: {
      'first-trail': {
        chapter: 'The First Step',
        headline: 'Begin, every Jedi must. Here, this one did.',
        role: 'Frontend Developer',
        points: [
          'CRM modules and React interfaces for sales, built he did — used by real people, they were.',
          'PDF and Excel reporting he shipped — 16–20 hours a week, returned to others they were.',
          'Load time by 38%, cut he did. Guess the number, he did not. Measure it, he did.',
        ],
      },
      oath: {
        chapter: 'The Training',
        headline: 'A mind, sharpen it you must. CGPA 8.36 / 10.',
        role: 'Student of Information Technology',
        credential: 'A second path, walk he also did: an LL.B., the bar (AIBE) passed. The rules, learn them he did — so lie to him about them, no one can.',
        points: [
          'A formal engineering degree, earned he did. Open doors, credentials do.',
        ],
      },
      expedition: {
        chapter: 'The Long Journey',
        headline: 'Six industries. Production-grade. Survive, the bugs did not.',
        role: 'Full Stack Developer',
        points: [
          'The first-ever Employee of the Month, named he was — over nine-and-twenty others, chosen. Proud, but humble, he tries to be. Tries.',
          'Across finance, health, logistics, CRM, SaaS and media, applications he delivered.',
          'End to end, features he owned — from the first meeting to production monitoring. Left behind, nothing was.',
        ],
      },
      vanguard: {
        chapter: 'The Great Assignment',
        headline: 'The front line of the Capital Group account, lead he did.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'The chain, understand you must: sworn to Inexture, lent to Infosys, seated with Capital Group. Three banners, one developer. Confusing, it sounds. Simple, it is.',
        points: [
          'Frontend across multiple Capital Group products, led he did. Shout, a leader does not — know what to build next, a leader does.',
          '4 production releases, shipped he did — features raised from nothing. Where all great things begin, nothing is.',
          'Sprint planning, client demos and code reviews, ran he did. Prevented, most disasters are — by the meeting no one wished to hold.',
        ],
      },
      horizon: {
        chapter: 'What Comes Next',
        headline: 'A worthy team, seek he does. Bring his own wisdom, he will.',
        role: 'Await His Next Path',
        points: [],
      },
    },
    summonCta: 'Reach out, you may',
  },

  arsenal: {
    subtitle: 'His tools, these are. Field-tested in production, every one — not in a tutorial. Hover one, and its allies name it will. Much it keeps, hmm.',
    coreLabel: 'The Tools',
    coreLegend: 'the glowing ones, reach for them first he does',
  },

  works: {
    intro: 'Built, these he has — across finance, healthcare, logistics and media. Some, speak of freely he may. Others, bound by contract they are — and a Jedi, honour his word he must.',
    realm: 'Work',
    featured: 'Favoured',
    nda: 'Sealed',
    enterRealm: 'Enter, you may',
    source: 'The Plans',
    ndaSealed: 'Sealed, that one is. Already, said too much I have. Speak of another, we shall. [[nda|Bound by the contract]], I am.',
    ndaArch: 'Abstracted the plan is — sealed, the details remain.',
    chartMore: 'Reveal {{count}} more, you may',
    furl: 'Seal the records',
    fullStory: 'The full telling',
    nod: 'Six works, above there are. The seventh, beneath your feet it is — this very site.',
    nodCta: 'The workshop, tour it',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s domain, made to load as swiftly as it is beautiful. Theatre, a wedding is — the stage, build it he did.',
        description: 'A media-heavy site and admin panel for a fine wedding studio — every image and film, arrive quickly it must, so wait no guest does.',
        highlights: [
          'A Next.js site — landing, portfolio, blogs — with an admin panel behind, built he did.',
          'Swift he made it — with caching, a CDN, Cloudflare R2 and video streaming.',
          'Firebase Auth and Firestore, wired he did — access and content, ordered they are.',
          'Scripts to compress image and video, wrote he did. His coin, watch a wise one does.',
        ],
      },
      'royal-tiles': {
        lead: 'A floor, design it in a browser you can — then an order-ready PDF, carry off. Tiles, small kingdoms they are. Fascinating, hmm.',
        description: 'An interactive tile-design tool — layouts choose, live preview them, and download templates ready for the order you may.',
        highlights: [
          'A floor visualiser with live preview and downloadable PDF templates, built he did.',
          'Tile variants on the fly, rendered he did — corners, fills, the whole grid.',
          'TensorFlow.js, used he did — PNGs into [[regionSvg|region-based SVGs]], turn they became. Neat sorcery, this is.',
          'An admin panel to govern designs and layouts, built he did.',
          'Tours and shortcuts, added he did — so lost, the uninitiated never are.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A financiers’ dashboard, from nothing raised. Count their coin with his tools, the money-people now do.',
        description: 'A finance dashboard for advisors, from scratch built — Next.js, Okta login, and charts a Jedi could study for hours.',
        highlights: [
          'The entire frontend from scratch, built he did — design, reusable systems, protected routes.',
          'Okta OAuth with server-side authorization, wired he did. A room he has no right to, enter no one does.',
          'Portfolio views with tables and Highcharts, made he did — handsome and useful, both.',
          'Feature flags, deployments and debugging instruments, set up he did.',
          'A Spring Boot backend for PDF reports, a hand he lent.',
        ],
      },
      'digital-investor': { description: 'An investment platform, rich with interaction and analytics. Power, coin is — only to the one who understands it.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance house — data, workflows, identity checks, sealed tight they are.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC. What a good inn owes its guests, know he does.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and rigorous testing. Know things it does — fewer than a Jedi, but well it tries.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, administration. Wager on anything, people will. The table, built it he did.' },
    },
  },

  contact: {
    availability: 'Open, his door is. Answer every message that finds him, he does. Send word, and reply he will.',
    theMessage: 'Your Words',
    correspondence: 'Find Him, Here',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Plainly, speak. Little patience for riddles a busy Jedi has.',
    },
    submitIdle: 'Send it, you will',
    submitLoading: 'Away it goes…',
    status: {
      idle: 'Wait, the message does. Patient, you must be.',
      sending: 'Travel, it does…',
    },
    resumeCta: 'His Résumé',
    success: 'Received, your message is. Read it and reply he will — soon, mmm. Patience.',
    errors: {
      required: [
        'Empty, a field is. Fill it you must — complete, the message must be.',
        'Blank, one field remains. Answer, it cannot, questions you do not ask.',
        'Left something empty, you have. Notice these things, I do. Fill it, you will.',
        'A field, unfilled it is. Do or do not fill every field — there is no “mostly.”',
      ],
      email: [
        'An email, that is not. Wrong, it looks. Fix it, you must.',
        'Confound the message, that address would. Correct it, if you please.',
        'Exist, that email does not. Checked, I have. Thorough, I am.',
        'A false address, help no one it does. A real one, give — a real reply, receive.',
      ],
      failed: [
        'Send, it did not. Beyond even my control, some things are. Try once more, you will.',
        'Returned, the message did — undelivered. Bad luck, or bad weather. Again, send it.',
        'Failed, the delivery did. The gods, blame them — then quietly try again.',
        'Through, it did not go. Even the best-laid plans, hmm. Once more.',
      ],
      notConfigured: [
        'Built yet, the channel is not — mine, that oversight is. Directly at {{email}}, write to him.',
        'Wired yet, the form is not. Until then, plainly reach him at {{email}}.',
        'Sleeps, this path does. Straight to {{email}}, send your words.',
      ],
    },
    quote: '“Patience you must have. Reply, he will — when ready, the message is.”',
    channels: { location: 'The Quiet Swamp' },
  },

  map: {
    footerHint: 'enter to travel · esc to withdraw',
    actions: {
      resume: 'His Résumé',
      themeLight: 'The light, bring it',
      themeDark: 'The dark, summon it',
    },
  },

  recap: {
    title: 'Read You, I Have',
    subtitle: 'From your device, sense these things I do — quickly, and closely. Kept, nothing is. Need it, I do not.',
    how: 'One service, your city it told me, once, with your leave. Write it down, I did not. Remember enough already, I do.',
    sigilNote: 'Yours alone, this little mark is — struck here, sent nowhere. A sigil, for a house of one.',
    map: {
      localNow: '{{time}} where you sit, it is — {{sky}}. Know the hour of a conversation, I like to.',
    },
    reading: {
      title: 'Your Vessel',
      machine: 'Your Engine',
      system: 'Your Browser',
      display: 'Your Glass',
      tongue: 'Your Tongue',
    },
    signal: {
      title: 'Your Standing',
      lantern: 'Your Reserves',
      road: 'Your Roads',
      carrier: 'Your Banner',
      origin: 'Your Coordinates',
    },
    journey: {
      timeAfield: 'Time in Audience',
      trail: 'Ground Covered',
      visit: 'Times Returned',
    },
    voices: {
      title: 'Sealed Narrators',
      unlocked: '{{count}} of {{total}} freed',
      sealed: 'Sealed',
      switchTo: 'Speak as {{voice}}',
      locked: 'Sealed. For now.',
    },
    sealed: {
      none: 'Sealed, several narrators remain. A locked door, only a puzzle unsolved it is.',
      some: '{{count}} of {{total}}, still sealed. Keep at it — admire persistence, I do.',
      all: 'Unsealed, every narrator is. My kind of person, you are. Proud, I am.',
    },
  },

  // The Atelier — Yoda's voice. Narrative keys only; per-phase/per-cut details
  // fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Craft',
    title: 'Made, This Was — How',
    confession: 'Passed every test, it did — long before satisfied I was. The point of a master, that is.',
    confessionSub:
      'Finished some forty commits ago, the site was. But “finished,” a word for the tired it is. So stayed on, I did — mended what no one would notice, and wired analytics to prove the clever parts, used they are. More persuasive than pride, proof is.',
    acts: { build: 'The Building', engine: 'The Machine Room', hidden: 'The Sealed Rooms' },
    engineBridge: 'Watch itself, the site does. Built to be understood, also it is. See now, you will.',
    commits: {
      title: 'Every Time Committed, I Did',
      range: 'From the true history it comes — not a flattering copy.',
      caption: 'A focused three-week campaign, this was — the 2026 rebuild, begun on a repo from 2023. Not one lucky charge. Judged, every commit was, before pass the gate it could — lint, types, build. Green, or ship it did not.',
    },
    stats: {
      voices: 'Voices (mine included)',
      lines: 'Lines written',
    },
    ledger: {
      intro:
        'Add, any fool can. Know what to cut — and cut it without sentiment — the whole art, that is. Much practice, removing things that had to go, I have.',
      built: 'Kept, what was',
      cut: 'Cut, what was — deliberately',
    },
    eggs: {
      title: 'The Sealed Rooms',
      intro: 'Small secrets, hidden in plain sight. Open one — watch a clever guest find them, enjoy I do.',
      astrolabe: {
        title: 'The Turning Compass',
        how: 'Across the great compass above, your cursor pass. Follow it does, faithfully — and a small gear it turns as it goes. Attention, even instruments like.',
      },
      sky: {
        title: 'The Sky',
        how: 'Top right: five skies. One is “auto,” and the hour where you are, know it does. Useful, this trick is. Unsettling, only slightly.',
      },
      voices: {
        title: 'The Other Narrators',
        how: 'In other tongues, speak this whole site will. Press ⇧⌘V. Sealed, some are — the right word, type it anywhere to free them. A hint, since like you I do: type “yoda.”',
      },
      raven: {
        title: 'The Ravens',
        how: 'Send a message, and across the sky a flock crosses — with sound. Theatre, yes. But the good kind — flew, the message did.',
      },
      recap: {
        title: 'The Reading',
        how: 'At the foot of the contact chamber, your device it reads, your screen, even your city. Kept, nothing is. Reads machines, it does — as read rooms, a Jedi does.',
      },
      console: {
        title: 'The Whispered Word',
        how: 'The developer console, open — F12, if you must — and a gilded message waits, with clues, for those curious enough to look where no one thinks to.',
      },
    },
    observatory: {
      eyebrow: 'The Watcher',
      title: 'Watch, I Do — Politely',
      intro: 'Improve what measure you do not, you cannot. So wired up analytics, I did. The honourable sort: no cookies, wholly anonymous, silent the moment you decline. Knowledge, gathered without theft.',
      hub: 'the summary',
      hubNote: 'Into one clean account, everything you do gathers — when leave you take. A single line, the whole of the tale.',
      indexHint: 'Something truly measured, each point is. Across them your cursor sweep, or one from the list choose — name itself it will, and where it lives, say.',
      cadence: { once: 'Once a visit', repeat: 'Every time' },
      metrics: {
        events: 'Tracked events',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Finding the way',
        craft: 'The clever parts',
        realms: 'The works',
        intent: 'Reaching for him',
      },
      panels: {
        privacy: {
          title: 'No Cookies',
          body: 'Anonymous, no login, kept nothing. Followed you do not wish to be? Then followed, you are not. A watcher with manners.',
        },
        discoverability: {
          title: 'Known to the Realm',
          body: 'Five schema instruments, so seat him correctly the search engines do. Reputation, a developer needs — a seat without it, there is none.',
        },
        observability: {
          title: 'Word Reaches Him First',
          body: 'Break, when something does, hear of it his Discord does — before you. Bad news early, prefer it he does.',
        },
      },
    },
    atlas: {
      eyebrow: 'The Archive',
      title: 'Kept, Every Thing Is — Where',
      intro: 'A folder, merely a folder men think it is. It is not. Where it sits, for a reason each file sits — and gladly, tell you each one I will. Click about, you may.',
      hotspots: 'The Notable Rooms',
      browseAll: 'The whole archive, open it',
      prompt: 'A folder or a notable file, choose — and why precisely there it lives, explain I shall.',
      why: 'So It Is, Why',
      repoCta: 'On GitHub, see it',
    },
    offmap: {
      title: 'The One Behind the Title',
      intro: 'Three of him there are, at minimum. Choose one and click — rather more than wise, tell you I shall.',
    },
    personas: {
      more: 'More, tell me',
      less: 'Enough, that is',
      storyteller: {
        label: 'The Reader',
        hook: 'A thousand lives in stories, lived he has.',
        story: 'Lord of the Rings, this very saga, an indecent quantity of One Piece. At software he looks, and a story he sees — houses, alliances, debts that come due. A tale this site is, and not a ledger — for this reason, it is.',
      },
      filmmaker: {
        label: 'The Eye',
        hook: 'An eye he has, and use it he does.',
        story: 'Real cinematic work — cafés, weddings, short films. So when moves the way it moves the site does, luck that is not. A man who has learned what looks good, and why — that, it is.',
      },
      wanderer: {
        label: 'The Traveller',
        hook: 'And now and then, disappear he does.',
        story: 'Into the mountains, past the reach of any signal. Silence, a sharp mind needs — as often as wisdom it needs. Clearer he returns, and harder to argue with.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'The truth of it: leave a good thing merely good, this one cannot. Beneath all the calm, serious about work that holds up he is — and details no one will ever thank him for. The difference, that is. And the whole of it.',
    ],
    sign: '— Yoda. Which is to say, Manan. (Manan, it is.)',
  },

  voiceHall: {
    title: 'The Council of Narrators',
    subtitle: 'Who tells this tale, choose. Myself, recommend I would — but generous, I am. Their charms, the others have.',
    nowNarrating: 'Now speaking',
    preview: {
      eyebrow: 'Preview this, you do',
      sealed: 'Sealed, this narrator is',
      apply: 'Speak in this voice, it will',
      active: 'Now speaking, it is',
    },
    tryHint: 'A narrator, choose — and in their words, retell itself the whole site will, this chamber included. Even the clever parts.',
    close: 'Leave, you may',
    sealedHint: 'Sealed, some narrators are. A narrator’s riddle answer — or its secret word type anywhere — and yours it becomes.',
    found: '{{count}}/{{total}} sealed narrators freed',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Plain-Spoken',
      sealed: 'The Sealed Narrators',
    },
    request: {
      section: 'Summon',
      cta: 'Another narrator, summon',
      ctaSub: 'Someone else to narrate this, would you have? Name them, and your case make. A well-argued petition, respect I do.',
      back: 'Back',
      persona: 'Whose narration?',
      personaPlaceholder: 'a master · a legend · a rival worth teaching…',
      email: 'Your email',
      emailPlaceholder: 'your email — so reply in kind I might',
      note: 'Why them?',
      notePlaceholder: 'your case, plead it (a fair judge I am, mostly)',
      send: 'The petition, send',
      sending: 'Summoning…',
      done: 'Sent, the petition is.',
      doneSub: 'The consideration it deserves, “{{persona}}” I shall give. No promises — only the ones keep I intend to.',
      errors: {
        persona: 'Someone, name you must. Summon no one, a summons with no name does.',
        email: 'Wrong, that email looks. Mend it — or blank leave it. Your choice, it is.',
        failed: 'Send, it did not. Ill fortune. Again, try.',
      },
    },
  },

  voice: {
    menuSub: 'Who tells the tale? Me, if any taste you have.',
    sealedHint: 'A sealed one, tap — and',
    sealedTypeHint: 'its riddle, answer.',
    cluePlaceholder: 'The riddle, answer…',
    clueSubmit: 'Speak',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'No. A fine guess — but wrong, wrong is. Again.',
    clueCloser: 'Closer — {{hint}}',
    clueGiveaway: 'Spare you, I shall. The word, it is',
    clueTapUnlock: 'tap to unseal',
  },

  footer: {
    quote: '“May the Force be with you.”',
    atelierLink: 'The making-of — the truth behind the tale.',
    closeHead: 'Talk, let us.',
    closeSub: 'Open to senior roles, collaborations, and any alliance of mutual worth.',
    getInTouch: 'Reach out, you may',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Enough, seen you have?',
    cta: 'Talk, let us',
    resume: 'His résumé, take',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'To the tale, back',
  },
};
