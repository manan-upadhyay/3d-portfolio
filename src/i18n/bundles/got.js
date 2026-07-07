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
      years: 'Years Sworn',
      projects: 'Releases Shipped',
      domains: 'Kingdoms Served',
      load: 'Swifter Than Before',
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
          'Named the first-ever Employee of the Month — over nine-and-twenty rivals. “The King in the North,” they might have cried. He tries not to gloat. He fails.',
          'Delivered applications across finance, health, logistics, CRM, SaaS and media. Different courts, one competence.',
          'Owned features end to end — from the first council to production monitoring. He swings his own sword; he leaves no debt for another to pay.',
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
    subtitle: 'Words are wind; steel is not. A mind is a weapon, and these are his — every blade blooded in production, never in a tourney. Hover one and it names the house it rides with.',
    coreLabel: 'The Arsenal',
    coreLegend: 'the burning ones are the swords he draws first',
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
      'digital-investor': { description: 'An investment platform, rich with interaction and analytics. Gold wins wars, but only in the hands of one who understands it. This puts it in those hands.' },
      srifin: { description: 'A full-stack CRM/ERP for a microfinance house — data, workflows, identity checks, sealed tight. The Iron Bank always collects; so does this.' },
      xipper: { description: 'A multi-tenant hotel platform — bookings, billing, eKYC. Guest right, enforced in code: eat at a man’s table, and you are under his protection.' },
      'ai-chatbot': { description: 'A context-aware chatbot with real-time conversation and rigorous testing. It knows things — fewer than a maester, but it never sleeps.' },
      'fantasy-cricket': { description: 'A real-money fantasy cricket platform — live scores, secure payouts, administration. Men will wager on anything. When you play, you win or you pay out — and it pays out, securely.' },
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
      title: 'Sealed Voices',
      unlocked: '{{count}} of {{total}} freed',
      sealed: 'Sealed',
      switchTo: 'Crown {{voice}}',
      locked: 'Sealed. For now.',
    },
    sealed: {
      none: 'Several voices remain sealed. Chaos is a ladder — climb it.',
      some: '{{count}} of {{total}} still sealed. Keep climbing, my lord.',
      all: 'Every voice unsealed. The realm is yours. Long may you reign.',
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
    commits: {
      title: 'Every Stone Laid',
      range: 'From the true chronicle — not a flattering septon’s tale.',
      caption: 'Each square is a day something shipped. A long campaign, not a single reckless charge.',
    },
    ci: {
      title: 'The Law of the Land',
      on: 'Runs on',
      caption:
        'Every commit is tried before it may pass the gate — lint, types, build. Green, or it does not ship. What do we say to a broken build? Not today.',
    },
    stats: {
      hours: 'Hours spent',
      commits: 'Stones laid',
      phases: 'Campaigns',
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
      spin: {
        title: 'The Spinning Needle',
        how: 'A button rides the compass rim. Press it. The needle spins and slows of its own accord — real weight, real friction. Physics keeps no secrets and swears no false oaths.',
      },
      sound: {
        title: 'The Music of the Realm',
        how: 'Every chime here is conjured live by the machine — nothing downloaded. Wake the sound, bottom right, then change the sky and listen.',
      },
      sky: {
        title: 'The Sky',
        how: 'Top right: five skies. One is “auto,” and it knows the hour where you sit. Sorcery, some would call it. A maester calls it arithmetic.',
      },
      voices: {
        title: 'The Other Voices',
        how: 'The whole keep will speak in other tongues. Press ⇧⌘V. Some are sealed — type the right word anywhere to free them. A hint, since I favour you: type “winter.”',
      },
      map: {
        title: 'The Map of the Realm',
        how: 'Press ⌘K and a map unfurls — every realm he has taken, marked and one ride away.',
      },
      raven: {
        title: 'The Ravens',
        how: 'Send a message and a flock crosses the sky, with sound. Theatre, aye — the good kind, the kind that means the raven flew.',
      },
      recap: {
        title: 'The Reading',
        how: 'At the foot of the contact hall, the keep reads your device, your screen, even your city. I read ravens; it reads machines. Neither of us keeps a ledger.',
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
        superProps: 'Auto-tags',
        webhooks: 'Alert pipes',
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
    title: 'The Court of Voices',
    subtitle: 'Choose who narrates this tale. Any voice may hold the throne a while — the realm does not mind a little chaos. Chaos, after all, is a ladder.',
    nowNarrating: 'Now holding the throne',
    preview: {
      eyebrow: 'Now auditioning',
      sealed: 'Sealed voice',
      apply: 'Let this voice hold the throne',
      active: 'Now holds the throne',
    },
    tryHint: 'Choose a voice and the whole keep — this hall included — retells itself in their words. Even the clever bits.',
    close: 'Take your leave',
    sealedHint: 'Some voices are sealed. Answer a voice’s riddle — or type its secret word anywhere in the keep — and it is yours.',
    found: '{{count}}/{{total}} sealed voices freed',
    footerHint: 'enter to speak · esc to close',
    categories: {
      core: 'The Sworn',
      sealed: 'The Sealed Voices',
    },
    request: {
      section: 'Summon',
      cta: 'Summon another voice',
      ctaSub: 'Would you have another narrate this? Name them, and make your case. I have always respected a well-argued petition.',
      back: 'Back',
      persona: 'Whose voice?',
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
    more: '{{count}} more voices wait in the wings.',
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
    text: 'Seen enough?',
    cta: 'Send a raven',
    resume: 'Take my résumé',
    dismiss: 'Not now',
  },

  makingOf: {
    back: 'Back to the tale',
  },
};
