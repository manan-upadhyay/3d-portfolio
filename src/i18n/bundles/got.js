// THE GAME OF THRONES — easter-egg personality (a voice of the whole realm).
//
// Override bundle (like plain): only the keys that change; the rest falls back
// to chronicle. Lazy-loaded by `loadVoice('got')` once unlocked. Pure flavor —
// the site stays fully navigable and every section still conveys the real
// portfolio substance (5 yrs, full-stack, ownership, performance, security,
// projects, contact) — narrated by a wry Maester of the realm who deploys the
// most famous lines of Westeros where they land hardest. One coherent voice,
// the whole iconic-quote library. The visitor is still Manan; a lord of the
// realm, this one is. Winter is coming.

export default {
  common: { chapterLabel: 'Chapter' },

  chapters: {
    origin: { label: 'Winter Is Coming', sub: 'House Words' },
    about: { label: 'The Man Behind the Sigil', sub: 'Know the Lord' },
    work: { label: 'Playing the Game', sub: 'How He Rose' },
    arsenal: { label: 'A Mind Is a Weapon', sub: 'The Arsenal' },
    projects: { label: 'The Realms', sub: 'Territories Held' },
    contact: { label: 'Send a Raven', sub: 'Treat With the Lord' },
  },

  hero: {
    lead: 'I build',
    phrases: ['web apps that hold the Wall', 'production React systems', 'full-stack machinery', 'interfaces fit for a throne'],
    proof: ['5+ yrs · React · Next.js · Node.js', 'Winter is coming'],
    ctaPrimary: 'See the work',
    ctaSecondary: 'Send a raven',
    ctaResume: 'Résumé',
    scroll: 'Descend',
    spin: 'Give it a turn',
  },

  about: {
    pullQuote: '“A Lannister always pays his debts.” This one is no Lannister — but he ships every debt he owes, on time and in full. Winter is coming; his releases are ready for it.',
    intro: [
      'Manan of the realm — full-stack developer, five years sworn to the craft, twenty-plus releases shipped. A very small man can cast a very large shadow, and underestimating him is a mistake the realm makes exactly once.',
      'He carries an idea from an empty page [[endToEnd|all the way to production]], across six kingdoms — and he holds to the old law of the North: the man who passes the sentence should swing the sword. He writes the code, he ships the code, he answers for the code. All of it.',
      'When you play the game of production, you win or you white-screen — there is no middle ground. So he tests before he ships, owns what he breaks, and when the bugs come for his release, he says what the brave say to the God of Death: not today.',
    ],
    disciplines: 'His Weapons',
    services: {
      frontend: { title: 'The Face of the House', description: 'Production UIs with React, Next.js and TypeScript. The realm judges with its eyes, and the interface is the sigil every visitor sees first. So he makes it worth the looking — and he makes it hold.' },
      backend: { title: 'The Foundations of the Keep', description: 'Scalable APIs with Node, Express, NestJS, JWT/OAuth and RBAC. Every great house rests on stones no visitor ever sees. Neglect them, and the whole keep comes down in the night — always at the worst hour.' },
      performance: { title: 'Swift as a Raven', description: 'Code-splitting, caching, CDNs, Core Web Vitals — measured, not guessed. Winter is coming, and slow sites do not survive it. Structured-data SEO too, so the search engines know exactly whose banner flies here.' },
      fullstack: { title: 'The Whole Realm', description: 'End to end, requirement to production monitoring. The man who passes the sentence should swing the sword — he owns the frontend, the backend, and every edge case lesser lords pretend they never saw.' },
    },
    stats: {
      projects: 'Releases Shipped',
      domains: 'Kingdoms Served',
      shipped: 'Delivered to the Realm',
    },
  },

  experience: {
    intro: 'Every house has a history, and every lord a rise. Pour the wine and attend — this is how he climbed. Chaos, after all, is a ladder.',
    travelTrail: 'Climb the ladder',
    present: 'Presently',
    onAssignment: 'Sworn elsewhere',
    journey: {
      'first-trail': {
        chapter: 'The First Sword',
        headline: 'Every lord begins as an unproven boy. A very small man — a very large shadow.',
        role: 'Frontend Developer',
        points: [
          'Built CRM modules and React interfaces for sales — the unglamorous work that quietly runs a house.',
          'Shipped PDF and Excel reporting and returned 16–20 hours a week to people with wars of their own to fight.',
          'Cut load time by 38%. He did not guess the number; he measured it. Guessing is how men lose their heads.',
        ],
      },
      oath: {
        chapter: 'The Maester’s Chain',
        headline: 'Kill the boy, and let the man be born. CGPA 8.36 / 10.',
        role: 'Student of the Citadel',
        credential: 'A second link forged in that chain: an LL.B., the trial by bar (AIBE) passed. He reads the law as a maester reads the stars — so no one may lie to him about the rules.',
        points: [
          'Earned a formal engineering degree. Credentials open gates that charm alone cannot.',
        ],
      },
      expedition: {
        chapter: 'The War of the Six Kingdoms',
        headline: 'Six kingdoms. Production-grade. And the bugs? Valar morghulis.',
        role: 'Full Stack Developer',
        points: [
          'Delivered applications across finance, health, logistics, CRM, SaaS and media. Different courts, one competence.',
          'Owned features end to end — from the first council to production monitoring. He swings his own sword; he leaves no debt for another to pay.',
          'And, in his first moon, named the first-ever Employee of the Month — over nine-and-twenty rivals. He tries not to gloat. He fails.',
        ],
      },
      vanguard: {
        chapter: 'A Seat on the Small Council',
        headline: 'Hand to the Capital Group account — a great house, a greater duty.',
        role: 'Lead Frontend Developer',
        org: 'Infosys · for Capital Group',
        via: 'The chain of fealty, stated plainly so none may whisper treason: sworn to Inexture, lent to Infosys, seated at Capital Group. Three banners, one man. Less tangled than a royal wedding, and considerably less bloody.',
        points: [
          'Led frontend across multiple Capital Group products. A leader does not shout — a leader knows what to build next.',
          'Shipped 4 production releases, features raised from nothing. Nothing is where every great house begins.',
          'Ran sprint planning, client demos and code reviews. Most wars are lost in the council chamber no one bothered to hold.',
        ],
      },
      horizon: {
        chapter: 'The Long Night Ahead',
        headline: 'Seeking a worthy house. Winter is coming — and he is ready for it.',
        role: 'Awaiting the Next Banner',
        points: [],
      },
    },
    summonCta: 'Send a raven',
  },

  arsenal: {
    subtitle: 'Words are wind; steel is not. A mind is a weapon, and these are his — every blade blooded in production, never in a tourney.',
    coreLabel: 'The Arsenal',
    inventoryLegend: 'marks a sword he draws first',
    skimCoach: 'Rather read a plain list? Turn to the ledger.',
    viewChart: 'The Stars',
    viewInventory: 'The Ledger',
  },

  works: {
    intro: 'The realms he has taken and held — across finance, healthcare, logistics and media. When you play the game of thrones you win or you die; he has yet to die. Some realms are sealed by contract, and a man who breaks his word is worth less than a corpse.',
    realm: 'Realm',
    featured: 'Crowned',
    nda: 'Sealed by Oath',
    enterRealm: 'Enter the realm',
    source: 'The Blueprints',
    ndaSealed: 'That realm is [[nda|sealed by oath]]. Already I have said more than my vows permit. Press me further and someone loses a tongue — likely mine.',
    ndaArch: 'An abstracted map — the borders kept under seal.',
    chartMore: 'Reveal {{count}} more realms',
    furl: 'Seal the maps',
    fullStory: 'The full account',
    nod: 'Six realms above. The seventh is the ground beneath your feet — this very keep.',
    nodCta: 'Walk behind the walls',
    projects: {
      gajaakriti: {
        lead: 'A wedding studio’s domain — and a wedding is a battlefield with better food. I built the stage, and the galleries load like dragonfire. Dracarys.',
        description: 'A media-heavy site and admin panel for a fine wedding studio — every image and film arriving fast enough that no guest grows restless enough to start a war.',
        highlights: [
          'Built a Next.js site — landing, portfolio, blogs — with a proper admin panel behind it.',
          'Made it swift with caching, a CDN, Cloudflare R2 and video streaming.',
          'Wired Firebase Auth and Firestore for access and content — locked and orderly.',
          'Wrote scripts to compress image and video. A lord who does not watch his coin does not keep his lands.',
        ],
      },
      'royal-tiles': {
        lead: 'Design a floor in a browser, then carry off an order-ready decree. Tiles — small kingdoms, endlessly fascinating.',
        description: 'An interactive tile-design tool — choose layouts, preview them live, and download templates ready for the order.',
        highlights: [
          'Built a floor visualiser with live preview and downloadable PDF templates.',
          'Rendered tile variants on the fly — corners, fills, the whole grid.',
          'Used TensorFlow.js to turn PNGs into [[regionSvg|region-based SVGs]]. A neat piece of sorcery — arithmetic, a maester would insist.',
          'Built an admin panel to govern designs and layouts.',
          'Added tours and shortcuts, so the smallfolk are never lost.',
        ],
      },
      'advisor-portfolio': {
        lead: 'A financiers’ dashboard, raised from nothing. Knowledge is power — and the men who count the realm’s coin now count it with this.',
        description: 'A finance dashboard for advisors, built from scratch — Next.js, Okta login, and charts a maester could study for hours.',
        highlights: [
          'Built the entire frontend from scratch — design, reusable systems, protected routes.',
          'Wired Okta OAuth with server-side authorization. No man enters a hall he has no right to.',
          'Built portfolio views with tables and Highcharts — handsome and useful in equal measure.',
          'Set up feature flags, deployments and debugging instruments.',
          'Lent a hand on a Spring Boot backend for PDF reports.',
        ],
      },
      'digital-investor': { description: 'An investment platform, rich with interaction and analytics. Gold wins wars, but only in the hands of one who understands it. This puts it in those hands.', highlights: [
        'Built React/Next.js feature modules, with Adobe Analytics to mark every move made.',
        'Wove in Node/Express REST APIs — errors caught, performance sharpened.',
        'Added React Query caching, so the server is not asked the same question twice. A steward wastes nothing.',
      ] },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance house — data, workflows, identity checks, sealed tight. The Iron Bank always collects; so does this.', highlights: [
        'Forged RBAC and audit logs — none pass who should not, and all is written down.',
        'Quickened onboarding by a fifth with verification APIs.',
        'Sharpened the images; the Core Web Vitals stood green.',
      ] },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC. Guest right, enforced in code: eat at a man’s table, and you are under his protection.', highlights: [
        'Drew multi-tenant PostgreSQL models and REST APIs — many houses under one roof, none crossing.',
        'Cut manual billing by a third.',
        'Hastened checkout by a fifth. No guest waits at the gate.',
      ] },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and rigorous testing. It knows things — fewer than a maester, but it never sleeps.', highlights: [
        'Led the UI — Next.js, Redux, WebSocket — words arriving as they are spoken.',
        'Set Storybook and Cypress to guard against regressions.',
        'Cut regressions by near a third.',
      ] },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, administration. Men will wager on anything. When you play, you win or you pay out — and it pays out, securely.', highlights: [
        'Held the Node.js backend — MongoDB schema, REST APIs, and cron riders bringing live ball-by-ball word in real time.',
        'Built a points engine — captains and vice-captains counted, scored anew with every turn of the match.',
        'A wallet ledger that remembers all — payouts automatic, winnings just, Razorpay at the gate. The Iron Bank always collects.',
        'Contests and prize pools set per match, and GST/TDS tax rolls with rich filters in the admin hall.',
        'Aided the React Native app — hosts assembled, matches watched as they unfold.',
      ] },
    },
  },

  contact: {
    availability: 'The raven is fed and the keep’s door is open. Treat with him honestly and he answers every message that reaches the walls.',
    theMessage: 'Your Words',
    correspondence: 'How to Reach the Keep',
    placeholders: {
      name: 'Your name',
      email: 'Your email',
      message: 'Speak plainly. The realm has riddles enough already.',
    },
    submitIdle: 'Send the raven',
    submitLoading: 'The raven takes wing…',
    status: {
      idle: 'The raven waits, patient as the old gods.',
      sending: 'Away it flies, over the Wall…',
    },
    resumeCta: 'His Résumé',
    success: 'Your raven is received. He will read it and reply before the moon turns. A Lannister always pays his debts — and he answers every raven.',
    errors: {
      required: [
        'An empty field. A raven carrying half a message is worse than none. Fill it.',
        'You left a field blank. The old gods are watching, and so am I. Complete it.',
        'A missing field. Winter is coming; do not face it half-armed. Every field.',
        'You skipped one. I notice these things — noticing is how a man keeps his head.',
      ],
      email: [
        'That is no email. Valar dohaeris — all men must serve, but that address serves no one. Mend it.',
        'That address would lose a raven over the Narrow Sea. Give me a true one.',
        'That email does not exist. I have searched the ledgers. Twice.',
        'A false address helps no one. A true one, and a true reply you shall have.',
      ],
      failed: [
        'The raven did not arrive. Ill winds, or ill luck. Loose another.',
        'It failed to send. Somewhere a crow feasts on the message. Try once more.',
        'Delivery failed. Not today, it seems. Send another raven.',
        'That did not reach the keep. The night is dark and full of dropped packets. Again.',
      ],
      notConfigured: [
        'The rookery is not yet built — my failing, not yours. Send word directly to {{email}}.',
        'The ravens are not yet loosed. Until they are, reach the lord at {{email}}.',
        'This channel sleeps. Send your words straight to {{email}}.',
      ],
    },
    quote: '“What do we say to an unanswered raven? Not today.”',
    channels: { location: 'The Keep' },
  },

  map: {
    footerHint: 'enter to travel · esc to withdraw',
    actions: {
      resume: 'His Résumé',
      themeLight: 'Raise the sun',
      themeDark: 'Bring the Long Night',
    },
  },

  recap: {
    title: 'What the Ravens Told Me About You',
    subtitle: 'I read your device as a maester reads the sky — swiftly, and closely. The night is dark and full of terrors, yet your data is safe: kept nowhere, sent nowhere.',
    how: 'One raven fetched your city, once, with your leave. Written down it was not. The realm forgets; I have no need to remember.',
    sigilNote: 'This mark is your sigil — struck here, flown nowhere. A house of one, and you its only lord.',
    map: {
      localNow: 'it is {{time}} where you keep your court — {{sky}}. A maester knows the hour.',
    },
    reading: {
      title: 'Your House',
      machine: 'Your Steed',
      system: 'Your Banner',
      display: 'Your Looking-Glass',
      tongue: 'Your Tongue',
    },
    signal: {
      title: 'Your Standing',
      lantern: 'Your Reserves',
      road: 'Your Roads',
      carrier: 'Your Sworn House',
      origin: 'Your Coordinates',
    },
    journey: {
      timeAfield: 'Time at Court',
      trail: 'Ground Ridden',
      visit: 'Times Returned',
    },
    voices: {
      title: 'Sealed Narrators',
      unlocked: '{{count}} of {{total}} freed',
      sealed: 'Sealed',
      switchTo: 'Crown {{voice}}',
      locked: 'Sealed. For now.',
    },
    sealed: {
      none: 'Several narrators remain sealed. Chaos is a ladder — climb it.',
      some: '{{count}} of {{total}} still sealed. Keep climbing, my lord.',
      all: 'Every narrator unsealed. The realm is yours. Long may you reign.',
    },
  },

  // The Atelier — the Maester's voice. Narrative keys only; per-phase/per-cut
  // details fall back to chronicle's real facts (still Manan's substance).
  atelier: {
    eyebrow: 'Behind the Walls',
    title: 'How the Keep Was Raised',
    confession: 'It passed every trial long before its builder was satisfied. Kill the boy; let the master be born.',
    confessionSub:
      'The keep was finished forty commits ago. But “finished” is a word for the dead. So he stayed, mended stones no eye would ever find, and set watchers to prove the clever passages are walked. Proof outranks pride.',
    acts: { build: 'The Raising', engine: 'The Engine Room', hidden: 'The Sealed Crypts' },
    engineBridge: 'So the realm is watched. Now see how the realm is built.',
    commits: {
      title: 'Every Stone Laid',
      range: 'From the true chronicle — not a flattering septon’s tale.',
      caption: 'A three-week campaign — the 2026 rebuild of a hold first raised in 2023. Not a single reckless charge. Every commit was tried before it could pass the gate — lint, types, build. What do we say to a broken build? Not today.',
    },
    stats: {
      voices: 'Voices (this realm included)',
      lines: 'Lines written',
    },
    ledger: {
      intro:
        'Any fool can raise a tower. The art is knowing which to pull down — and pulling it down without sentiment. Much practice at razing things that had to go, this one has.',
      built: 'What was raised',
      cut: 'What was razed, on purpose',
    },
    eggs: {
      title: 'The Sealed Crypts',
      intro: 'Small secrets, walled into plain sight. Open one — I do love watching a clever guest find them.',
      astrolabe: {
        title: 'The Turning Compass',
        how: 'Pass your cursor over the great compass above. It follows, faithfully, and turns a small gear as it goes. Even instruments crave attention — as do kings.',
      },
      sky: {
        title: 'The Sky',
        how: 'Top right: five skies. One is “auto,” and it knows the hour where you sit. Sorcery, some would call it. A maester calls it arithmetic.',
      },
      voices: {
        title: 'The Other Narrators',
        how: 'The whole keep will speak in other tongues. Press ⇧⌘V. Some are sealed — type the right word anywhere to free them. A hint, since I favour you: type “winter.”',
      },
      raven: {
        title: 'The Ravens',
        how: 'Send a message and a flock crosses the sky, with sound. Theatre, aye — the good kind, the kind that means the raven flew.',
      },
      recap: {
        title: 'The Reading',
        how: 'At the close of this page, the keep reads your device, your screen, even your city. I read ravens; it reads machines. Neither of us keeps a ledger.',
      },
      console: {
        title: 'The Whispered Word',
        how: 'Open the maester’s console — F12, if you must — and a gilded message waits, with clues, for those curious enough to look where no lord thinks to.',
      },
    },
    observatory: {
      eyebrow: 'The Master of Whisperers',
      title: 'I Watch. Discreetly.',
      intro: 'A realm you cannot measure is a realm you cannot rule. So watchers were set — the honourable kind: no cookies, wholly anonymous, silent the moment you decline. Knowledge gathered, never stolen.',
      hub: 'the summary',
      hubNote: 'Everything you do gathers into one clean account as you take your leave — a single line, the whole of the tale.',
      indexHint: 'Each point is a thing truly measured. Sweep your cursor across them, or choose one from the list — it will name itself and say where it lives.',
      cadence: { once: 'Once a visit', repeat: 'Every time' },
      metrics: {
        events: 'Tracked events',
        dashboards: 'Dashboards',
        schemas: 'SEO schemas',
      },
      groups: {
        origin: 'Finding the way',
        craft: 'The clever parts',
        realms: 'The realms',
        intent: 'Treating with the lord',
      },
      panels: {
        privacy: {
          title: 'No Cookies',
          body: 'Anonymous, no login, nothing kept. If your banner says “do not follow,” you are not followed. A whisperer with honour.',
        },
        discoverability: {
          title: 'Known to the Realm',
          body: 'Five schema instruments, so the search engines seat him rightly. A lord with no reputation holds no seat.',
        },
        observability: {
          title: 'Word Reaches Him First',
          body: 'When something breaks, his Discord hears of it before you do. A lord prefers his bad news early and his wine late.',
        },
      },
    },
    // The Blueprint — the runtime system chart (Act II). Node ids + geometry are
    // data in constants.atelier.blueprint; gate captions stay EN-technical there.
    blueprint: {
      eyebrow: 'The Map of the Realm',
      title: 'One realm. Three ravens.',
      intro: 'Mark this chart well: every hall and every engine stands inside your own device. Only three ravens ever fly beyond the Wall, and each one is named. The night is dark, but this map is honest.',
      clientZone: 'The realm',
      clientZoneSub: 'all of it stands on your device',
      beyondZone: 'Beyond the Wall',
      beyondZoneSub: 'only three ravens fly',
      wall: 'The Wall',
      sealedNote: 'Nothing else crosses. No cookies, no watchers, no baggage trains of media. Even the letters — the fonts — were forged in this keep.',
      hint: 'Name a holdfast',
      readoutRest: 'Every holdfast keeps its own counsel. Touch one and it will speak — a map that lies is worth less than its parchment.',
      nodes: {
        traveler: { name: 'You, the traveler', why: 'You come to the gates once — one request, one page. No tolls, no oaths demanded at the door.' },
        shell: { name: 'The keep', why: 'One page, its banners — the styles — sewn in at the forging, so the hall stands dressed before a single script stirs. Two roads share one gatehouse.' },
        motion: { name: 'The river', why: 'One current moves everything — Lenis and GSAP row to a single drum, so the water never fights itself. On touch, the river yields to your own hands.' },
        narrator: { name: 'The faceless ones', why: 'Ten faces, one truth beneath. The sealed ones sleep across the narrow sea and cross only when their word is spoken. Valar morghulis.' },
        sky: { name: 'The maesters', why: 'They read your own clock — never your whereabouts — and call the hour: dawn, day, dusk, or night. The Citadel needs no spies for this.' },
        sound: { name: 'The bells', why: 'Nearly every toll is cast fresh in the moment — only the raven’s caw rides in as a file. The music is conjured, not carried.' },
        memory: { name: 'The archives', why: 'The record of your journey burns with the session; the count of your visits stays in your own vault. No ledger leaves the realm.' },
        telemetry: { name: 'The small council', why: 'It counts deeds, never names — no seals on your person, no little birds following you home. Whisper “do not track” and the council disbands.' },
        raven: { name: 'The raven', why: 'Your words fly to a roost beyond — a serverless keep — and the key to it never leaves that tower. A Lannister pays his debts; this raven always flies.' },
        reading: { name: 'The far-eyes', why: 'Once, and only at your command, a single look names your city — shown to you openly, written down nowhere.' },
      },
    },

    atlas: {
      eyebrow: 'The Archive',
      title: 'Where Every Thing Is Kept',
      intro: 'Men think a folder is merely a folder. It is not. Every file sits where it sits for a reason — and gladly I will tell you each. Click about.',
      hotspots: 'The Notable Halls',
      browseAll: 'Open the whole archive',
      prompt: 'Choose a folder or a notable file, and I shall explain why it dwells precisely there.',
      why: 'Why It Is So',
      repoCta: 'See It On GitHub',
    },
    offmap: {
      title: 'The Man Behind the Sigil',
      intro: 'There are, at the least, three of him. Choose one and I shall tell you rather more than is wise.',
    },
    personas: {
      more: 'Tell me more',
      less: 'That will do',
      storyteller: {
        label: 'The Reader',
        hook: 'A thousand lives in books, he has lived.',
        story: 'Lord of the Rings, this very saga, an indecent quantity of One Piece. He looks at software and sees a story — houses, alliances, debts that come due. That is why this keep is a tale and not a ledger.',
      },
      filmmaker: {
        label: 'The Eye',
        hook: 'An eye he has, and he uses it.',
        story: 'Real cinematic work — cafés, weddings, short films. So when this keep moves the way it moves, that is not luck. That is a man who has spent his life learning what looks good, and why.',
      },
      wanderer: {
        label: 'The Ranger',
        hook: 'And now and then, he rides beyond the Wall.',
        story: 'Into the mountains, past the reach of any raven. A mind kept sharp needs silence as often as wine. He returns clearer, and rather harder to argue with.',
      },
    },
    builtWith: 'Built with',
    manifesto: [
      'The truth of it: he cannot leave a good keep merely good. Beneath all the banners, wholly serious he is about work that holds under siege and details no lord will ever thank him for. That is the difference — and the whole of it.',
    ],
    sign: '— A Maester of the realm. Which is to say, Manan. (It is Manan.)',
  },

  voiceHall: {
    title: 'The Court of Narrators',
    subtitle: 'Choose who narrates this tale. Any narrator may hold the throne a while — the realm does not mind a little chaos. Chaos, after all, is a ladder.',
    nowNarrating: 'Now holding the throne',
    preview: {
      eyebrow: 'Now auditioning',
      sealed: 'Sealed narrator',
      apply: 'Let this narrator hold the throne',
      active: 'Now holds the throne',
    },
    tryHint: 'Choose a narrator and the whole keep — this hall included — retells itself in their words. Even the clever bits.',
    close: 'Take your leave',
    sealedHint: 'Some narrators are sealed. Answer a narrator’s riddle — or type its secret word anywhere in the keep — and it is yours.',
    found: '{{count}}/{{total}} sealed narrators freed',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Sworn',
      sealed: 'The Sealed Narrators',
    },
    request: {
      section: 'Summon',
      cta: 'Summon another narrator',
      ctaSub: 'Would you have another narrate this? Name them, and make your case. I have always respected a well-argued petition.',
      back: 'Back',
      persona: 'Whose narration?',
      personaPlaceholder: 'a king · a legend · a rival worth beheading…',
      email: 'Your email',
      emailPlaceholder: 'your email — that I might reply in kind',
      note: 'Why them?',
      notePlaceholder: 'plead your case (a fair judge I am, mostly)',
      send: 'Send the petition',
      sending: 'Summoning…',
      done: 'The petition is sent.',
      doneSub: 'I shall give “{{persona}}” the consideration it deserves. No promises — only the ones I mean to keep.',
      errors: {
        persona: 'You must name someone. A summons with no name summons no one.',
        email: 'That email looks wrong. Mend it, or leave it blank — your choice.',
        failed: 'It did not send. Ill fortune. Try again.',
      },
    },
  },

  voice: {
    menuSub: 'Who tells this tale? Whoever you crown.',
    sealedHint: 'Tap a sealed one and',
    sealedTypeHint: 'answer its riddle.',
    cluePlaceholder: 'Answer the riddle…',
    clueSubmit: 'Speak',
    clueAria: 'Answer the clue: {{hint}}',
    clueWrong: 'No. A fine guess, but wrong is wrong. Again.',
    clueCloser: 'Closer — {{hint}}',
    clueGiveaway: 'Very well, I shall spare you. The word is',
    clueTapUnlock: 'tap to unseal',
  },

  footer: {
    quote: '“When you play the game of thrones, you win or you die.”',
    atelierLink: 'The making-of — how the keep was raised.',
    closeHead: 'Treat with me.',
    closeSub: 'Open to senior roles, alliances, and any pact of mutual advantage.',
    getInTouch: 'Send a raven',
    resume: 'Résumé',
  },
  stickyCta: {
    text: 'The night is dark and full of terrors. An unfilled role is darker.',
    cta: 'Send a raven',
    resume: 'Take my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Back to the tale',
  },

  // Older portfolios (/time-machine) — framing in character; factual "world then"
  // context inherited from chronicle.
  timeMachine: {
    probe: {
      dismiss: 'Send the raven home',
      recall: 'Summon the watcher',
      quips: {
        greet: [
          'A watcher of ruins, sworn to no house. Pay me no mind — I merely count the fallen keeps.',
          'A drone of cold iron, ranging the crypt. Someone must guard these dead halls.',
          'I am the keeper of these ruins, traveller. Tread softly among the dead.',
        ],
        scanTitle: [
          'I read the banner at the gate. Bold letters, freshly raised. They will fade, as all banners do.',
          'The sigil above the door. New-forged, and proud of it. Pride is a young house’s luxury.',
        ],
        scanCard: [
          'An old holdfast, its magic frayed. It stands yet. The dead are stubborn that way.',
          'A ruined keep, banners rotted. Yet its walls hold. Respect the walls that still hold.',
          'Here lies an elder work, cold and grey. It was mighty once. All things were, once.',
        ],
        scanFloor: [
          'Here the road ends. Below this stone, only rumour and dust.',
          'The deepest vault. No crypt lies beneath. The first stone was laid here.',
        ],
        scanFail: [
          'The scrying failed. This old keep guards its secrets still.',
          'The vision clouds. Some ruins do not wish to be remembered. Let them rest.',
        ],
        scanRail: [
          'The rail — a map of the fallen kingdoms. It knows every ruin by name.',
          'A road carved along the edge, joining keep to keep. Travel it, and lose no year.',
        ],
        scanVoice: [
          'You would change the voice that guides you? Choose well. Words have power.',
          'You reach for another storyteller? Many tongues have told this tale. Pick a worthy one.',
        ],
        scanSound: [
          'The horn of sound. Sound it — even a crypt deserves a song.',
          'The bells of this hall. Ring them, and the silence of the dead lifts a little.',
        ],
        fastScroll: [
          'You ride too fast, traveller. The dead do not like to be rushed.',
          'Slow your horse. The crypt reveals nothing to those who gallop through it.',
        ],
        backUp: [
          'Climbing back toward the light so soon? The crypt runs deeper.',
          'You flee to the surface? The oldest bones lie below, not above.',
        ],
        bored: [
          'You have gone still as stone. Do you yet draw breath?',
          'The silence stretches long. Are you lost among the tombs, traveller?',
        ],
        hit: [
          'You strike a sworn watcher? Bold. And foolish.',
          'You raise a hand to me? Many did. Their houses are ash.',
        ],
        angry: [
          'Enough. Wound me again and the old gods will hear of it.',
          'Strike me once more and I name you kinslayer of drones. It will stick.',
        ],
        escape: [
          'No chain holds me. I range where I please.',
          'You cannot bind a free rider. I go where the cold wind goes.',
        ],
        idle: [
          'So many fallen keeps in this crypt. A house that rose far.',
          'I keep the watch. The years grow cold down here.',
          'Dust and old glory, as far as the eye can see. Such is every crypt.',
        ],
      },
    },
    eyebrow: 'The ruins of old kingdoms',
    title: 'The Time Machine',
    intro:
      'Every ruler leaves ruins. These are the fallen keeps the maker raised before this one — old holdfasts, unmaintained, their banners frayed. Descend into the crypt, and the years grow colder. Winter took these long ago. Look, but do not mourn — a house is measured by how far it has risen.',
    readoutLabel: 'The year',
    booting: 'Raising the dead…',
    wake: 'Raise the ruin',
    wakeHint: 'Raise it to walk its cold halls here, or open its gates in a new tab.',
    enter: 'Enter the ruin',
    archived: 'Fallen',
    back: 'Back to the tale',
    threshold: { cue: 'Descend into the crypt' },
    floor: {
      title: 'Before the first stone',
      body: 'No keep stands below this. What came before was never built in stone — only practice, lost to time. From this cold floor, the whole climb was earned.',
    },
    eras: {
      2023: {
        plaque: 'The first keep that stirred — where stone learned to move, and the banners caught the wind.',
        note: 'Raised with React and Three.js. Rougher than the hall you stand in, and abandoned since — some enchantments no longer hold. Yet it marks the distance climbed, and so it is kept.',
      },
      2019: {
        plaque: 'The first holdfast — hand-hewn, humble, and wholly of its age.',
        note: 'Plain HTML, CSS and a little jQuery, from before the maker knew the old ways. It creaks in the wind. Let it. Every dynasty begins in a draughty hall.',
      },
    },
  },

  // Time Tunnel (feedback §5) — tidings carried by raven, oldest last.
  timeTunnel: {
    hint: 'Descend slowly, and read the tidings of each passing year.',
    events: {
      worldcup26: 'Three kingdoms host the great tourney together — an uneasy, glorious alliance.',
      aiagents26: 'The thinking machines begin to labour for men. Sorcery, some whisper.',
      foldiphone26: 'Word spreads of a scrying-glass that folds like a raven’s wing.',
      iphone17: 'The smiths of the fruit-sigil unveil a new glass. The smallfolk covet it.',
      lawildfires25: 'Wildfire takes the City of Angels. The hills burn green and gold.',
      nvidia25: 'A house of tiny engines rises to become the richest in all the realm.',
      ghibli25: 'By some enchantment, every portrait becomes a painted dream.',
      minecraft25: 'A mummers’ tale of blocks fills every coffer in the land.',
      erastour24: 'A singer’s progress becomes the grandest the Seven Kingdoms have known.',
      sora24: 'The machines learn to conjure moving visions from mere words. Dark art.',
      deadpool24: 'Two immortals who will not die and will not cease their prattle. Maddening.',
      trumpshot24: 'An arrow flies at a lord before his banners. The realm holds its breath.',
      chatgpt23: 'All the realm counsels with an oracle of glass. None are the same after.',
      barbenheimer23: 'A tale of pink and a tale of fire, told on one day. The people feast on both.',
      chandrayaan23: 'The men of the sunlit east plant their banner on the moon’s dark south.',
      cricketwc23: 'A great contest of bat and ball. A thousand thousand hearts beat as one.',
      israelhamas23: 'War is kindled in the old holy lands. Grief rides on every raven.',
      twitterx23: 'The house of the little bird takes a new sigil: a single dark rune, X.',
      threads23: 'A new banner gathers a hundred million sworn men in but five days.',
      gta6_23: 'A herald’s scroll of a coming game sets the whole realm ablaze in a day.',
      barbiepink23: 'The whole realm dons the colour of the rose.',
      aichatbots23: 'To speak with a machine no longer seems witchcraft. Only Tuesday.',
      evcars23: 'Silent carriages, drawn by lightning, roll into every city.',
      applewatch23: 'The people bind small oracles to their wrists to count their very sleep.',
      worldcup22: 'The small master from the south lifts the golden cup at last. A realm weeps.',
      chatgptlaunch22: 'An oracle named ChatGPT is loosed upon the world. The age turns early.',
      webb22: 'A great far-eye opens and shows the heavens in wonders unimagined.',
      ukraine22: 'The bear of the north marches on its neighbour. War comes again to the old continent.',
      musktwitter22: 'A rich lord buys the house of the little bird. The court has been chaos since.',
      oscarslap22: 'A blow struck at a feast of mummers. The whole realm gasps as one.',
      vaccines21: 'The healers’ cure spreads at last, and the realm dares to breathe.',
      squidgame21: 'A deadly game in green becomes the tale on every tongue.',
      nft21: 'Fools trade fortunes for painted trinkets that no man can hold.',
      suez21: 'A single great cog runs aground and chokes the trade of all the world.',
      meta21: 'The house of faces takes a new name and swears itself to a dream-realm.',
      taliban21: 'A distant capital falls. A heavy sorrow; no jape belongs here.',
      covid20: 'A grey plague stills the whole world. The streets go silent as a crypt.',
      wfh20: 'Lords and smallfolk alike labour from their holdfasts, by scrying-glass.',
      amongus20: 'Shut within their keeps, all hunt the traitor hidden among the crew.',
      masks20: 'Every face in the realm goes veiled against the plague.',
      blackhole19: 'The maesters capture the first likeness of a void that eats all light.',
      endgame19: 'The champions gather for their final battle, and all the realm bears witness.',
      got19: 'The song of ice and fire sings its last verse. The realm argues still.',
      area51_19: 'Two million smallfolk vow to storm a forbidden keep. “They cannot stop us all.”',
      babyshark19: 'A children’s chant of a small shark is sung in every corner of the world.',
      foldables19: 'The first scrying-glasses that fold in twain appear in the markets.',
      fiveg19: 'A swifter kind of raven-signal comes to the great cities.',
      covidwuhan19: 'In a far eastern city, a few strange fevers stir. None yet know what comes.',
    },
  },

  void: {
    eyebrow: 'beyond the wall',
    title: 'The map is dark and full of terrors.',
    body: 'You have ridden past the edge of every chart. The realm you seek was never claimed. Turn back before the night takes you.',
    position: 'last raven from: {{path}}',
    cta: 'Find your heading',
    home: 'Return to the realm',
  },
};
