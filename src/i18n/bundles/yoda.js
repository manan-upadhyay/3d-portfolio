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
      shipped: 'To Production, Delivered',
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
          'Across finance, health, logistics, CRM, SaaS and media, applications he delivered.',
          'End to end, features he owned — from the first meeting to production monitoring. Left behind, nothing was.',
          'And in his first month, the first-ever Employee of the Month, named he was — over nine-and-twenty others, chosen. Proud, but humble, he tries to be. Tries.',
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
    subtitle: 'His tools, these are. Field-tested in production, every one — not in a tutorial.',
    coreLabel: 'The Tools',
    inventoryLegend: 'marked so, the tools he reaches for first are',
    skimCoach: 'A plain list, prefer you? To the archives, turn.',
    viewChart: 'The Galaxy',
    viewInventory: 'The Archives',
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
      'digital-investor': { description: 'An investment platform, rich with interaction and analytics. Power, coin is — only to the one who understands it.', highlights: [
        'React/Next.js feature modules, built he did — with Adobe Analytics, every move it marks.',
        'Node/Express REST APIs, wove he did — errors caught, performance sharpened.',
        'React Query caching, added he did — twice the server it asks not.',
      ] },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance house — data, workflows, identity checks, sealed tight they are.', highlights: [
        'RBAC and audit logs, forged he did — pass none who should not, and written all is.',
        'Onboarding, quickened a fifth he did — with verification APIs.',
        'Images optimized — green the Core Web Vitals stood.',
      ] },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC. What a good inn owes its guests, know he does.', highlights: [
        'Multi-tenant PostgreSQL models and REST APIs, drew he did — many under one roof, cross they do not.',
        'Manual billing, cut a third he did.',
        'Checkout, hastened a fifth he did. Wait, no guest does.',
      ] },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and rigorous testing. Know things it does — fewer than a Jedi, but well it tries.', highlights: [
        'The UI, led he did — Next.js, Redux, WebSocket. Real-time, the words arrive.',
        'Storybook and Cypress, set he did — against regressions, guard they do.',
        'Regressions, near a third he cut.',
      ] },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, administration. Wager on anything, people will. The table, built it he did.', highlights: [
        'The Node.js backend, held he did — MongoDB schema, REST APIs, and cron riders bringing live ball-by-ball word, in real time.',
        'A points engine, built he did — captains and vice-captains counted, scored anew each turn of the match.',
        'A wallet ledger that forgets nothing — payouts automatic, winnings just, Razorpay at the gate. Collect, it always does.',
        'Contests and prize pools per match, set he did — and GST/TDS tax rolls, filtered richly in the admin hall.',
        'The React Native app, aided he did — teams assembled, matches watched as unfold they do.',
      ] },
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
        how: 'At the close of this page, your device it reads, your screen, even your city. Kept, nothing is. Reads machines, it does — as read rooms, a Jedi does.',
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
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'The Schematic',
      title: 'One realm, it is. Three signals, there are.',
      intro: 'Study this map, you should. Inside your own device, everything runs — yes. Three signals only, ever leave. Named, each one is. Hide, this site does not.',
      clientZone: 'Your device',
      clientZoneSub: 'run here, everything does',
      beyondZone: 'Beyond',
      beyondZoneSub: 'three signals only, pass they do',
      wall: 'The threshold',
      sealedNote: 'Cross, nothing else does. Cookies, there are none. Identity, taken it is not. Even the fonts — live here, they do.',
      hint: 'Touch a station, you may',
      readoutRest: 'A reason, every station has. Explore, and revealed it will be. Patience.',
      nodes: {
        traveler: { name: 'You, it is', why: 'Arrive once, you do. One request, one page. Gates, there are none. Welcome, you are.' },
        shell: { name: 'The vessel', why: 'One file, the styles woven in at the forging. Paint before the scripts wake, it does. Two paths, one vessel — wasteful, this is not.' },
        motion: { name: 'The current', why: 'One clock, all movement obeys. Fight itself, the motion does not. On touch — flow natively, it must.' },
        narrator: { name: 'The voices', why: 'Ten voices, one truth. Sleep, the sealed ones do, until spoken their word is. Do, or do not narrate — there is no try.' },
        sky: { name: 'The suns', why: 'Your clock it reads — your location, never. Dawn or night it chooses, as your own sky stands. Spy, it need not.' },
        sound: { name: 'The hum', why: 'Conjured in the moment, nearly every sound is. Ship as a file, only the raven’s caw does. Luminous math — not crude recordings.' },
        memory: { name: 'The holocron', why: 'With the session, your log dies. In your own browser, the visit count stays. Sent, nothing is.' },
        telemetry: { name: 'The council', why: 'Moments it counts, not beings. Nameless, you remain. Say “track me not,” and silent the council goes.' },
        raven: { name: 'The messenger', why: 'To a serverless temple, your words fly. The key — board the browser, it never does. Strong, this security is.' },
        reading: { name: 'The seeing stone', why: 'Once, if ask you do, your city it names — shown to you, kept nowhere. Then rest, it does.' },
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

  // Older portfolios (/time-machine) — framing in character; factual "world then"
  // context inherited from chronicle.
  timeMachine: {
    probe: {
      dismiss: 'Home, send the drone',
      recall: 'Back, call the probe',
      quips: {
        greet: [
          'A probe, I am. Lost in the wrong age, hmm. Mind me not — the ruins, I count.',
          'Watch over this old glass, someone must. That someone, I am. Yes.',
          'Come, you have. Guide you through the ruins, I will. Yes.',
        ],
        scanTitle: [
          'The sign at the gate, I scan. Bold, its letters are. Approve, I do.',
          'The heading, read it I do. Proud, it stands. Newest of all things here, it is.',
        ],
        scanCard: [
          'An old relic, this is. Breathe, its code still does. Impressive, hmm.',
          'Ancient, this build is. Rough, yes — yet stood the years, it has. Honour that, we must.',
          'A ruin, before you. Learning, its maker was. Everyone begins so. Everyone, hmm.',
        ],
        scanFloor: [
          'End here, the trail does. Below this, only sketches there are.',
          'The bottom, this is. Older than this, nothing kept there was. Begin here, all did.',
        ],
        scanFail: [
          'Failed, the scan has. Resist me, this old ruin does. Hmm.',
          'Clouded, the reading is. Its secrets, this relic keeps. Force it, I will not.',
        ],
        scanRail: [
          'The rail, that is. Between the years, carry you it does. Hmm.',
          'A path along the edge, this is. The year, lose it you will not. Trust it, you may.',
        ],
        scanVoice: [
          'Change my voice, you wish? Chosen carefully, words must be. Yes.',
          'Another storyteller, seek you do? Many voices, this tale has. Wisely, choose, hmm.',
        ],
        scanSound: [
          'The sound, control it here you can. A score, this descent has. Hear it, you should.',
          'The volume, this is. Silence, comfort it brings — but sing, the dark can. Let it, mmm.',
        ],
        fastScroll: [
          'Too fast, you fall. Rushed, the past does not like to be. Patience.',
          'Slow, you must go. Blur, the years do, when hurried they are. Hmm.',
        ],
        backUp: [
          'Upward, back you climb? Deeper, the past lies. The other way, hmm.',
          'To the present, return you do? New, nothing there is. Down, the wisdom waits.',
        ],
        bored: [
          'Still, you have gone. There, are you? Wonder, I do.',
          'Quiet, long you are. Lost among the ruins, hmm? Or rest, you take?',
        ],
        hit: [
          'Ow. A delicate instrument, I am. Poke me, you should not.',
          'Strike me, you did. Feel it, I do. Kind, that was not. Hmph.',
        ],
        angry: [
          'Enough! Precision optics, I am — a toy, I am not. Hmph.',
          'Again, you poke? Patience, even a Jedi drone runs out of. Cease, you will.',
        ],
        escape: [
          'Hold me, you cannot. Answer to no cursor, this drone does.',
          'Free, I slip. Quicker than you, my thrusters are. Yes, hmm.',
        ],
        idle: [
          'Much old glass, down here there is. Busy, someone was.',
          'Hover, I do. Best at it, I am. Mmm.',
          'Wait, I do. Patient, a good watcher is. Come and go, the years will.',
        ],
      },
    },
    eyebrow: 'The past, revisit we do',
    title: 'The Time Machine',
    intro:
      'Older, these portfolios are. Built before this one, they were — preserved, unchanged, tended no longer. Broken, some of their magic may be. Downward you go, and backward the years fall. Judge them not harshly. From these first steps, the long walk came. Mmm.',
    readoutLabel: 'The year',
    booting: 'Awaken it, I will…',
    wake: 'Awaken the ruin',
    wakeHint: 'Awaken it, and walk the living site here you may — or in its own tab, open it you can.',
    enter: 'Enter the ruin',
    archived: 'Old, this is',
    back: 'To the tale, back',
    threshold: { cue: 'Downward, travel back' },
    floor: {
      title: 'Before the first, nothing',
      body: 'Below this, nothing there is. Practice only, unkept, lost to time. From this floor to the present — long, the climb was. The point, that climb is. Yes, hmmm.',
    },
    eras: {
      2023: {
        plaque: 'Move, the first one did — where scenes, not pages, the maker learned to build.',
        note: 'With React and Three.js, made it was. Rougher than where you stand, and tended no longer — breathe, some animations do not. A marker of distance, it is. Keep it, we must.',
      },
      2019: {
        plaque: 'The first map, this was — by hand cut, earnest, of its age wholly.',
        note: 'HTML, CSS, jQuery a little — before build steps, the maker knew them not. Creak, it does. Meant to, it is. Begin somewhere, all Jedi must.',
      },
    },
  },

  // Time Tunnel (feedback §5) — the years, backward Yoda reads. Slow, you must go.
  timeTunnel: {
    hint: 'Slow, your descent must be — read the years, then, you can.',
    events: {
      worldcup26: 'Three nations, one great contest host they do. United, briefly, the world is.',
      aiagents26: 'The work, the thinking machines now do. Watch them, we must. Hmm.',
      foldiphone26: 'Fold in half, a glass may soon. Whisper of it, the people do.',
      iphone17: 'A new glass, the fruit-makers forge. Covet it, the people do.',
      lawildfires25: 'Burn, the City of Angels does. Fierce, the fire is. Flee, the wise do.',
      nvidia25: 'Richest of all, a maker of tiny engines becomes. Foreseen, this was not.',
      ghibli25: 'Into painted dreams, every image turns. Enchanting, the trick is.',
      minecraft25: 'Of blocks, a tale is told. Fortunes, it earns. Strange, the world is.',
      erastour24: 'The greatest song-journey ever known, a singer makes. Move millions, she does.',
      sora24: 'From words alone, moving visions the machines conjure. Careful, we must be.',
      deadpool24: 'Die, two warriors will not. Silent, they also will not be. Tiresome, hmm.',
      trumpshot24: 'At a leader, a shot is loosed. Its breath, the world holds.',
      chatgpt23: 'To an oracle of glass, all the world speaks. Changed, everyone is. Yes.',
      barbenheimer23: 'Of pink and of fire, two tales on one day arrive. Both, the people choose.',
      chandrayaan23: 'The moon’s dark south, the eastern people reach. First, they are. Proud, be.',
      cricketwc23: 'Bat and ball, a billion hearts follow. As one, they beat.',
      israelhamas23: 'Kindled, war is, in the old holy lands. Grieve, we should. Jest, I will not.',
      twitterx23: 'A single rune, the little bird becomes: X. Colder, the name is.',
      threads23: 'A hundred million, a new banner gathers — in five days only. Swift, hmm.',
      gta6_23: 'A scroll of a coming game, the whole world stops for. Wait, they will.',
      barbiepink23: 'The colour of the rose, all the world wears. Everywhere, pink is.',
      aichatbots23: 'To speak with machines, ordinary it has become. Witchcraft, it seems no longer.',
      evcars23: 'Silent carriages, drawn by lightning, everywhere roll. The old engines fade.',
      applewatch23: 'Their very sleep, to small oracles the people bind. Watched, all is now.',
      worldcup22: 'The golden cup, the small master lifts at last. Weep with joy, a nation does.',
      chatgptlaunch22: 'Loosed upon the world, the oracle ChatGPT is. Early, the age turns.',
      webb22: 'A great far-eye opens. The heavens, in wonder it shows. Vast, all is.',
      ukraine22: 'On its neighbour, the northern bear marches. War again, to the old lands, comes.',
      musktwitter22: 'The house of the bird, a rich lord buys. Chaos, the court has been since.',
      oscarslap22: 'At a feast of mummers, a blow is struck. Gasp as one, the world does.',
      vaccines21: 'The healers’ cure, at last it spreads. Breathe, the world dares to.',
      squidgame21: 'A deadly game in green, the tale on every tongue becomes. Dark, it is.',
      nft21: 'For trinkets no hand can hold, fortunes fools trade. Foolish, hmm.',
      suez21: 'A single great ship, aground it runs. The trade of the world, it chokes.',
      meta21: 'A new name, the house of faces takes. To a dream-realm, it swears itself.',
      taliban21: 'A distant capital falls. Heavy, the sorrow is. No jest, here belongs.',
      covid20: 'The whole world, a grey plague stills. Silent, the streets go. Yes.',
      wfh20: 'From their homes, all now labour. By scrying-glass, they meet.',
      amongus20: 'Within their keeps shut, the traitor all hunt. Trust no one, they learn.',
      masks20: 'Veiled, every face becomes. Against the plague, they guard.',
      blackhole19: 'A void that eats all light, its first likeness we capture. Wondrous, it is.',
      endgame19: 'For their final battle, the champions gather. Witness, all the world does.',
      got19: 'Its last verse, the song of ice and fire sings. Argue still, the people do.',
      area51_19: 'A forbidden keep, two million vow to storm. “Stop us all, they cannot,” say they.',
      babyshark19: 'A small shark’s chant, in every corner sung it is. Escape it, you cannot.',
      foldables19: 'In twain, the first glasses fold. New, the trick is. Fragile, also.',
      fiveg19: 'A swifter signal, to the great cities comes. Faster, the future feels.',
      covidwuhan19: 'In a far eastern city, strange fevers stir. What comes, know it yet, none do.',
    },
  },

  void: {
    eyebrow: 'lost, you are',
    title: 'Lost, you are. Found, you will be.',
    body: 'Exist, this page does not. The path you seek, back the way you came, it lies. Patience, young padawan.',
    position: 'last sensed at: {{path}}',
    cta: 'The way, find it',
    home: 'To the chronicle, return',
  },
};
