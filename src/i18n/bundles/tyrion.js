// THE HAND OF THE KING — easter-egg personality (Tyrion Lannister voice).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('tyrion')` once unlocked. Pure flavor —
// the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — just in Tyrion's voice. The visitor is still Manan; he is
// only *channeling* the wittiest man in the Seven Kingdoms. He drinks, and he
// knows things — chiefly, how to ship software.

export default {
  common: { chapterLabel: 'Chapter' },

  chapters: {
    origin: { label: 'Casterly Rock', sub: 'Where the Small Man Began' },
    about: { label: 'The Imp', sub: 'The Man They Underestimate' },
    work: { label: 'Debts Paid', sub: 'A Lannister Always Pays' },
    arsenal: { label: 'My Mind Is My Weapon', sub: 'The Armoury' },
    projects: { label: 'Houses I Have Built', sub: 'Realms Charted' },
    contact: { label: 'Send a Raven', sub: 'Request an Audience' },
  },

  hero: {
    lead: 'I build',
    phrases: ['production web platforms', 'React systems that hold', 'full-stack machinery', 'interfaces worthy of a court'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'I drink and I know things'],
    ctaPrimary: 'See the work',
    ctaSecondary: 'Request an audience',
    ctaResume: 'Résumé',
    scroll: 'Descend',
    spin: 'Give it a turn',
  },

  about: {
    pullQuote: '“That’s what I do. I drink, and I know things.” And one of the things I know is how to ship software that refuses to fall over.',
    intro: [
      'I am Manan — though for the length of your visit, you may call me the Imp. Full-stack developer, five years, twenty-plus releases. A very small man can cast a very large shadow, and I have been casting this one across production since before it was fashionable.',
      'I take an idea from an empty page [[endToEnd|all the way to production]], across six industries. My brother had his sword and the King his warhammer — I have my mind. And my mind has never once lost a merge it bothered to review.',
      'Once you accept your flaws, no one can ever use them against you. So, plainly: I over-explain, I refactor at midnight, and I have a tender spot in my heart for broken things — legacy code, chiefly. I fix them. A Lannister always pays his debts, and I always ship mine.',
    ],
    disciplines: 'My Mind Is My Weapon',
    services: {
      frontend: { title: 'The Face of the Realm', description: 'Production UIs with React, Next.js and TypeScript. The interface is what the people see, and the people judge with their eyes. So I make it worth looking at — and I make it work.' },
      backend: { title: 'The Foundations', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. Every great house rests on stones no visitor ever sees. Neglect them and the whole thing comes down at the worst possible moment.' },
      performance: { title: 'Speed & Standing', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, not guessed. And structured-data SEO, so the search engines know precisely who I am. A man with no reputation is a man with no leverage.' },
      fullstack: { title: 'The Whole Game', description: 'End to end, requirement to production monitoring. I keep the entire board in my head at once — the frontend, the backend, the edge cases, the debts that come due. That is the job. Anyone who tells you otherwise is selling something.' },
    },
    stats: {
      years: 'Years of Service',
      projects: 'Releases Shipped',
      domains: 'Industries Served',
      load: 'Faster Than Before',
    },
  },

  experience: {
    intro: 'Allow me to pour a cup and tell you the history. It is a good story — there is ambition, there are debts paid, there is even a promotion or two. Try to keep up.',
    travelTrail: 'Walk the road',
    present: 'Presently',
    onAssignment: 'On loan',
    journey: {
      'first-trail': {
        chapter: 'A Small Beginning',
        headline: 'Every powerful man was once an underestimated one.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React interfaces for sales — the unglamorous work that quietly runs a house.',
          'Shipped PDF and Excel reporting and returned 16–20 hours a week to people who had better things to do.',
          'Cut load time by 38%. I did not guess the number. I measured it. Guessing is for men who enjoy losing.',
        ],
      },
      oath: {
        chapter: 'An Education',
        headline: 'A mind needs books as a sword needs a whetstone. CGPA 8.36 / 10.',
        role: 'Student of Information Technology',
        credential: 'And a second blade: an LL.B., bar examination (AIBE) passed. I read the law for the same reason I read the docs — so no one can lie to me about the rules.',
        points: [
          'Earned a formal engineering degree. Credentials open doors that charm alone will not.',
        ],
      },
      expedition: {
        chapter: 'The Long Campaign',
        headline: 'Six industries. Production-grade. No survivors among the bugs.',
        role: 'Full Stack Developer',
        points: [
          'Named the first-ever Employee of the Month — chosen over nine-and-twenty others. I do try not to gloat. I fail.',
          'Delivered applications across finance, health, logistics, CRM, SaaS and media. Different courts, same competence.',
          'Owned features end to end — from the first meeting to production monitoring. A man must pay his debts, and I always ship mine.',
        ],
      },
      vanguard: {
        chapter: 'A Seat at the High Table',
        headline: 'Hand to the Capital Group account. A great house. A greater responsibility.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'The chain of loyalty, stated plainly so no one need whisper: sworn to Inexture, lent to Infosys, seated at Capital Group. Three banners, one man. It is less complicated than a Lannister wedding, and considerably safer.',
        points: [
          'Led frontend across multiple Capital Group products. Leadership is not shouting; it is knowing what to build next.',
          'Shipped 4 production releases, features raised from nothing. Nothing is where every great thing begins.',
          'Ran sprint planning, client demos and code reviews. I have found that most disasters are just meetings no one bothered to hold.',
        ],
      },
      horizon: {
        chapter: 'The Next Campaign',
        headline: 'Seeking a worthy house. I come with my own wine.',
        role: 'Awaiting the Next Seat',
        points: [],
      },
    },
    summonCta: 'Request an audience',
  },

  arsenal: {
    subtitle: 'My brother had his sword; the King his warhammer; I have this armoury — and my mind. Every blade here has drawn blood in production. Hover one and it will name the company it keeps.',
    coreLabel: 'The Arsenal',
    coreLegend: 'the burning ones are the weapons I reach for first',
  },

  works: {
    intro: 'The houses I have built — across finance, healthcare, logistics and media. Some I may speak of freely. Others are bound by contracts I intend to honour, because a man who breaks his word is worth nothing, and I am worth a great deal.',
    realm: 'House',
    featured: 'Favoured',
    nda: 'Sealed',
    enterRealm: 'Enter the house',
    source: 'The Plans',
    ndaSealed: 'That one is under [[nda|seal]]. I have already said more than my contract permits. Pour me another and we shall speak of something else.',
    ndaArch: 'An abstracted plan — the details kept under seal.',
    chartMore: 'Reveal {{count}} more houses',
    furl: 'Seal the records',
    fullStory: 'The full account',
    nod: 'Six houses above. The seventh is the ground beneath your feet — this very site.',
    nodCta: 'Tour the workshop',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s domain, made to load as beautifully as it looks. Weddings are theatre; I built the stage.',
        description: 'A media-heavy site and admin panel for a fine wedding studio — every image and film arriving fast enough that no guest grows restless.',
        highlights: [
          'Built a Next.js site — landing, portfolio, blogs — with a proper admin panel behind it.',
          'Made it swift with caching, a CDN, Cloudflare R2 and video streaming.',
          'Wired Firebase Auth and Firestore for access and content, locked and orderly.',
          'Wrote scripts to compress images and video — a lord who does not watch his coin does not keep it long.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor in a browser, then carry off an order-ready PDF. Tiles. I find the small kingdoms fascinating.',
        description: 'An interactive tile-design tool — choose layouts, preview them live, and download templates ready for the order.',
        highlights: [
          'Built a floor visualiser with live preview and downloadable PDF templates.',
          'Rendered tile variants on the fly — corners, fills, the whole grid.',
          'Used TensorFlow.js to turn PNGs into [[regionSvg|region-based SVGs]]. A neat piece of sorcery.',
          'Built an admin panel to govern designs and layouts.',
          'Added tours and shortcuts, so the uninitiated are never lost.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A financiers’ dashboard, raised from nothing. The men who count coin for a living now count it with my tools.',
        description: 'A finance dashboard for advisors, built from scratch — Next.js, Okta login, and charts a lord could study for hours.',
        highlights: [
          'Built the entire frontend from scratch — design, reusable systems, protected routes.',
          'Wired Okta OAuth with server-side authorization. No one enters a room they have no right to.',
          'Made portfolio views with tables and Highcharts — handsome and useful in equal measure.',
          'Set up feature flags, deployments and debugging instruments.',
          'Lent a hand on a Spring Boot backend for PDF reports.',
        ],
      },
      'digital-investor': { description: 'An investment platform, rich with interaction and analytics. Coin is only power to the man who understands it.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance house — data, workflows, identity checks, sealed tight.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC. I have stayed in enough inns to know what a good one owes its guests.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and rigorous testing. It knows things, though rather fewer than I.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, administration. Men will wager on anything. I merely built the table.' },
    },
  },

  contact: {
    availability: 'My door is open and my cup is full. I try to know as many people as I can — you never know which one you will need. Send word; I answer every raven that finds me.',
    theMessage: 'Your Words',
    correspondence: 'Where to Find Me',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Speak plainly. I have little patience for riddles and a great deal for good ideas.',
    },
    submitIdle: 'Send the raven',
    submitLoading: 'The raven takes wing…',
    status: {
      idle: 'The raven waits, patient as I am not.',
      sending: 'Away it flies…',
    },
    resumeCta: 'My Résumé',
    success: 'Your message is received. I shall read it over a cup of wine and reply before it runs dry. A Lannister always pays his debts — his correspondence included.',
    errors: {
      required: [
        'You have left a field empty. A message with holes in it is like a cup with holes in it — useless, and faintly insulting.',
        'One field stands blank. Fill it. I cannot answer questions you decline to ask.',
        'An empty field. Come now — say what you mean and mean what you say.',
        'You skipped something. I notice these things. Noticing things is rather the whole of my talent.',
      ],
      email: [
        'That is not an email. I have read a great many documents, and none of them looked quite so wrong. Try again.',
        'That address would confound the cleverest raven. Correct it, if you please.',
        'That email does not exist. I checked. I am tiresomely thorough.',
        'A false address helps no one. Give me a real one and I shall give you a real reply.',
      ],
      failed: [
        'It did not send. Some things are beyond even my influence. Try once more.',
        'The raven returned, message undelivered. Bad luck, or bad weather. Send it again.',
        'Delivery failed. Blame the gods, then quietly try again.',
        'That did not go through. Even the best-laid plans, and so forth. Once more.',
      ],
      notConfigured: [
        'The rookery is not yet built — my oversight. Write to me directly at {{email}}.',
        'The form is not yet wired. Until it is, reach me plainly at {{email}}.',
        'This channel sleeps for now. Send your words straight to {{email}}.',
      ],
    },
    quote: '“I try to know as many people as I can. You never know which one you’ll need.”',
    channels: { location: 'The Small Council Chamber' },
  },

  map: {
    footerHint: 'enter to travel · esc to withdraw',
    actions: {
      resume: 'My Résumé',
      themeLight: 'Raise the sun',
      themeDark: 'Call the night',
    },
  },

  recap: {
    title: 'What I Have Deduced About You',
    subtitle: 'I read your device the way I read a room — quickly, and with more accuracy than is entirely comfortable. Nothing was kept. I have no need of it.',
    how: 'One service told me your city, once, with your leave. I did not write it down. I remember quite enough already.',
    sigilNote: 'This little mark is yours alone — struck here, sent nowhere. A sigil for a house of one.',
    map: {
      localNow: 'it is {{time}} where you sit — {{sky}}. I do like to know the hour of a conversation.',
    },
    reading: {
      title: 'Your Household',
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
      title: 'Sealed Voices',
      unlocked: '{{count}} of {{total}} freed',
      sealed: 'Sealed',
      switchTo: 'Speak as {{voice}}',
      locked: 'Sealed. For now.',
    },
    sealed: {
      none: 'Several voices remain sealed. A locked door is only a puzzle you have not yet flattered open.',
      some: '{{count}} of {{total}} still sealed. Keep at it — I do admire persistence.',
      all: 'Every voice unsealed. You are, it seems, my kind of person. Have some wine.',
    },
  },

  // The Atelier — Tyrion's voice. Narrative keys only; per-phase/per-cut details
  // fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Curtain',
    title: 'How the Thing Was Made',
    confession: 'It passed every test long before I was satisfied. That is rather the point of me.',
    confessionSub:
      'The site was finished some forty commits ago. But “finished” is a word men use when they are tired. So I stayed on, mended what no one would ever notice, and wired up analytics to prove the clever parts are actually used. Proof is more persuasive than pride.',
    acts: { build: 'The Building', engine: 'The Machine Room', hidden: 'The Sealed Rooms' },
    commits: {
      title: 'Every Time I Committed',
      range: 'Drawn from the true history, not a flattering copy.',
      caption: 'Each square is a day something shipped. A steady campaign, not a single lucky charge.',
    },
    ci: {
      title: 'The Law of the Land',
      on: 'Runs on',
      caption:
        'Every commit must pass judgement before it enters — lint, types, build. Green, or it does not ship. I did read for the bar; I have a fondness for rules that cannot be bribed.',
    },
    stats: {
      hours: 'Hours spent',
      commits: 'Commits made',
      phases: 'Phases',
      voices: 'Voices (mine included)',
      lines: 'Lines written',
    },
    ledger: {
      intro:
        'Any fool can add. The whole art is in knowing what to cut — and cutting it without sentiment. I have a great deal of practice removing things that had to go.',
      built: 'What was kept',
      cut: 'What was cut, deliberately',
    },
    eggs: {
      title: 'The Sealed Rooms',
      intro: 'Small secrets, hidden in plain sight. Open one — I do enjoy watching a clever guest find them.',
      astrolabe: {
        title: 'The Turning Compass',
        how: 'Pass your cursor over the great compass above. It follows, faithfully, and turns a small gear as it goes. Even instruments like to be paid attention.',
      },
      spin: {
        title: 'The Spinning Needle',
        how: 'There is a button on the compass. Press it. The needle spins and slows of its own accord — real weight, real friction. Physics keeps no secrets and takes no bribes.',
      },
      sound: {
        title: 'The Music',
        how: 'Every chime here is conjured live by the machine — nothing downloaded. Wake the sound, bottom right, then change the sky and listen.',
      },
      sky: {
        title: 'The Sky',
        how: 'Top right: five skies. One is “auto,” and it knows the hour where you are. A useful trick, and only slightly unsettling.',
      },
      voices: {
        title: 'The Other Voices',
        how: 'The whole site will speak in other tongues. Press ⇧⌘V. Some are sealed — type the right word anywhere to free them. A hint, since I like you: type “wine.”',
      },
      map: {
        title: 'The Chart',
        how: 'Press ⌘K and a map of the realm appears. Every place I have built, marked and reachable.',
      },
      raven: {
        title: 'The Ravens',
        how: 'Send a message and a flock crosses the sky, with sound. Theatre, yes — but the good kind, the kind that means the message flew.',
      },
      recap: {
        title: 'The Reading',
        how: 'At the foot of the contact chamber, the site reads your device, your screen, even your city. I read rooms; it reads machines. Neither of us keeps notes.',
      },
      console: {
        title: 'The Whispered Word',
        how: 'Open the developer console — F12, if you must — and a gilded message waits, with clues, for those curious enough to look where no one thinks to.',
      },
    },
    observatory: {
      eyebrow: 'The Master of Whisperers',
      title: 'I Watch. Discreetly.',
      intro: 'You cannot govern what you do not measure — every good master of coin knows it. So I wired up analytics. The honourable sort: no cookies, wholly anonymous, silent the moment you decline. Knowledge, gathered without theft.',
      hub: 'the summary',
      hubNote: 'Everything you do gathers into one clean account when you take your leave. A single line — the whole of the tale.',
      indexHint: 'Each point is something truly measured. Sweep your cursor across them, or choose one from the list — it will name itself and say where it lives.',
      cadence: { once: 'Once a visit', repeat: 'Every time' },
      metrics: {
        events: 'Tracked events',
        superProps: 'Auto-tags',
        webhooks: 'Alert pipes',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Finding the way',
        craft: 'The clever parts',
        realms: 'The houses',
        intent: 'Reaching for me',
      },
      panels: {
        privacy: {
          title: 'No Cookies',
          body: 'Anonymous, no login, nothing kept. If your browser asks not to be followed, it is not followed. A whisperer with manners.',
        },
        discoverability: {
          title: 'Known to the Realm',
          body: 'Five schema instruments, so the search engines seat me correctly. A man with no reputation has no seat at all.',
        },
        observability: {
          title: 'Word Reaches Me First',
          body: 'When something breaks, my Discord hears of it before you do. I prefer my bad news early and my wine late.',
        },
      },
    },
    atlas: {
      eyebrow: 'The Archive',
      title: 'Where Every Thing Is Kept',
      intro: 'Men think a folder is merely a folder. It is not. Every file sits where it sits for a reason — and I will happily tell you each one. Click about.',
      hotspots: 'The Notable Rooms',
      browseAll: 'Open the whole archive',
      prompt: 'Choose a folder or a notable file, and I shall explain why it lives precisely there.',
      why: 'Why It Is So',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Man Behind the Title',
      intro: 'There are, at minimum, three of me. Choose one and I shall tell you rather more than is wise.',
    },
    personas: {
      more: 'Tell me more',
      less: 'That will do',
      storyteller: {
        label: 'The Reader',
        hook: 'I have lived a thousand lives in books.',
        story: 'Lord of the Rings, this very saga, a truly indecent quantity of One Piece. I look at software and I see a story — houses, alliances, debts that come due. That is why this site is a tale and not a ledger.',
      },
      filmmaker: {
        label: 'The Eye',
        hook: 'I have an eye, and I use it.',
        story: 'Real cinematic work — cafés, weddings, short films. So when this site moves the way it moves, that is not luck. That is a man who has spent his life learning what looks good, and why.',
      },
      wanderer: {
        label: 'The Traveller',
        hook: 'And now and then, I disappear.',
        story: 'Into the mountains, past the reach of any signal. A mind kept sharp needs silence as often as it needs wine. I return clearer, and rather harder to argue with.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'The truth of it: I cannot leave a good thing merely good. Beneath all the wit I am wholly serious about work that holds up and details no one will ever thank me for. That is the difference, and the whole of it.',
    ],
    sign: '— Tyrion. Which is to say, Manan. (It is Manan.)',
  },

  voiceHall: {
    title: 'The Court of Voices',
    subtitle: 'Choose who narrates this tale. I recommend myself — I am, after all, the cleverest man in most rooms, this one included. But I am generous. The others have their charms.',
    nowNarrating: 'Now speaking',
    tryHint: 'Choose a voice and the whole site — this chamber included — will retell itself in their words. Even the clever bits.',
    close: 'Take your leave',
    sealedHint: 'Some voices are sealed. Answer a voice’s riddle — or type its secret word anywhere on the page — and it is yours.',
    found: '{{count}}/{{total}} sealed voices freed',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Honest Men',
      sealed: 'The Sealed Voices',
    },
    request: {
      section: 'Summon',
      cta: 'Summon another voice',
      ctaSub: 'Would you have someone else narrate this? Name them, and make your case. I have always respected a well-argued petition.',
      back: 'Back',
      persona: 'Whose voice?',
      personaPlaceholder: 'a lord · a legend · a rival worth roasting…',
      email: 'Your email',
      emailPlaceholder: 'your email — so I might reply in kind',
      note: 'Why them?',
      notePlaceholder: 'plead your case (I am a fair judge, mostly)',
      send: 'Send the petition',
      sending: 'Summoning…',
      done: 'The petition is sent.',
      doneSub: 'I shall give “{{persona}}” the consideration it deserves. No promises — only the ones I intend to keep.',
      errors: {
        persona: 'You must name someone. A summons with no name summons no one.',
        email: 'That email looks wrong. Mend it, or leave it blank — your choice.',
        failed: 'It did not send. Ill fortune. Try again.',
      },
    },
  },

  voice: {
    menuSub: 'Who tells the tale? Me, if you have any taste at all.',
    sealedHint: 'Tap a sealed one and',
    sealedTypeHint: 'answer its riddle.',
    cluePlaceholder: 'Answer the riddle…',
    clueSubmit: 'Speak',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'No. A fine guess, but wrong is wrong. Again.',
    clueCloser: 'Closer — {{hint}}',
    clueGiveaway: 'Very well, I shall spare you. The word is',
    clueTapUnlock: 'tap to unseal',
    more: '{{count}} more voices wait in the wings.',
  },

  footer: {
    quote: '“A Lannister always pays his debts.”',
    atelierLink: 'The making-of — the truth behind the tale.',
    closeHead: 'Let us talk.',
    closeSub: 'Open to senior roles, collaborations, and any alliance of mutual advantage.',
    getInTouch: 'Request an audience',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'Seen enough?',
    cta: 'Let us talk',
    resume: 'Take my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Back to the tale',
  },
};
