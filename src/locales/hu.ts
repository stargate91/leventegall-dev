import type { Dictionary } from "./dictionary.types";

export const hu: Dictionary = {
  brandName: "GÁLL LEVENTE // STARGATE91",
  personName: "Gáll Levente",
  nav: {
    journey: "RÓLAM",
    projects: "PROJEKTEK",
    skills: "STACK",
    services: "SZOLGÁLTATÁSOK",
    clients: "ÜGYFELEK",
    contact: "KAPCSOLAT",
    available: "Elérhető",
    sidebarBio: "Jelenleg a Swaya media manager backendjét írom át Pythonról TypeScriptre, tovább mélyítve a full-stack eszköztáramat.",
  },
  sections: {
    about: "01 // RÓLAM",
    projects: "02 // KIEMELT PROJEKTEK",
    skills: "03 // TECH STACK",
    services: "04 // MIBEN SEGÍTHETEK",
    reviews: "05 // VISSZAJELZÉSEK",
    contact: "06 // KAPCSOLAT",
  },
  hero: {
    titleMain: "Szia, Levente vagyok.",
    titleGradient: "Szoftvereket és márkákat építek.",
    description:
      "Full-stack fejlesztés, ELTE fizikus háttér, valamint márkanévadás és szlogentervezés.",
    stats: {
      fiverrValue: "1 100+ Ügyfél\n4.8★ Értékelés",
      fiverrLabel: "Márkanévadás & Szlogenek a Fiverr-en",
      stackValue: "Full-Stack\nFejlesztés",
      stackLabel: "FastAPI, Python, React & TypeScript",
      physicsValue: "Analitikus Fizikusi\nSzemlélet",
      physicsLabel: "ELTE Fizika & Csillagászat",
    },
  },
  story: {
    subtitle: "Történet",
    title: "Ahol a Fizika, a Márka és a Kód Találkozik",
    description: "Hogyan alkot egységet az analitikus gondolkodásmód, az 5 évnyi nemzetközi piaci tapasztalat a Fiverr-en és a full-stack szoftverfejlesztés.",
    timeline: [
      {
        sol: "01. FEJEZET",
        date: "2014 – 2019",
        title: "Fizika & Csillagászat Tanulmányok (ELTE)",
        desc: "Az ELTE fizika és csillagászat szakán találkoztam először a programozással. Itt tanultam meg a C programozás alapjait, valamint Python segítségével végeztem numerikus számításokat, szimulációkat és adatfeldolgozást. Ez a háttér nemcsak erős matematikai logikát adott, hanem megtanított arra is, hogyan bontsak le összetett problémákat elemi, átlátható részekre.",
        metrics: [
          "ELTE Fizika & Csillagászat",
          "C Programozási Alapok",
          "Python Numerikus Módszerek",
        ],
      },
      {
        sol: "02. FEJEZET",
        date: "2021 – 2026",
        title: "Startup Névadás & Szlogenek (Fiverr)",
        desc: "Öt év alatt egy kiemelkedő nemzetközi branding praxist építettem fel a Fiverr-en, több mint 1 100 külföldi alapítónak segítve a megfelelő név és pozicionálás megtalálásában. Megtanultam, hogyan gondolkodnak, döntenek és vásárolnak az emberek. A letisztult névadás és a tűpontos szöveg nem dísz: ez a figyelem megszerzésének eszköze a telített piacokon.",
        metrics: [
          "1 100+ Befejezett Projekt",
          "400+ 5★ Értékelés (4.8)",
          "Márkanévadás & Szlogenek",
        ],
      },
      {
        sol: "03. FEJEZET",
        date: "2023 – JELENLEG",
        title: "Backend Architektúra & Modern Frontendek",
        desc: "A kiváló branding hatástalan egy megbízható termék nélkül, és a tiszta kód is kárba vész, ha az üzenet zavaros. Robusztus backendeket építek FastAPI és Python alapokon, modern, reszponzív React és TypeScript frontendekkel párosítva. Ha egyetlen szakember látja át mindkét oldalt, nincs kommunikációs surlódás, és a termék az első főcímtől az utolsó API hívásig egységes élményt nyújt.",
        metrics: [
          "FastAPI & Python Backendek",
          "React & Next.js Frontendek",
          "Koncepciótól az Átadásig",
        ],
      },
    ],
  },
  projects: {
    subtitle: "Válogatott Projektek",
    title: "Kiemelt Munkák & Projektek",
    description: "Valós, működő szoftverek és rendszerek, az architektúra megtervezésétől a kész felhasználói felületig.",
    labels: {
      appOverview: "ALKALMAZÁS ÁTTEKINTÉS",
      viewGithub: "Forráskód a GitHubon",
      visitWebsite: "Termék Weboldala",
      discussWork: "Hasonló Munka Megbeszélése",
      caseStudy: "Esettanulmány",
      expandScreenshot: "Kattints a nagyításhoz",
      closeLightbox: "Előnézet bezárása",
    },
    simulators: {
      swayaOrganizerShot: "Média Rendszerező & Átnevező Folyamat",
      swayaLibraryShot: "Médiakönyvtár & Poszter Rács",
      swayaDetailShot: "Média Részletek & Metaadat Nézet",
      novaDashboardShot: "Kezdőlap & Interaktív Élő Előnézet",
      novaFeedsShot: "Szerverbeállítások & Platform Sablonok",
      novaBotShot: "Valós Idejű Discord Értesítés & Beágyazás",
      pillPlayerShot: "Lebegő HUD Audio Lejátszó & Spektrum-analizátor",
    },
    items: {
      swaya: {
        badge: "KIEMELT PROJEKT • KERESKEDELMI TERMÉK",
        title: "Swaya Média & Könyvtár Rendszer",
        tagline: "Nagy teljesítményű asztali médiakezelő és automatizált metaadat-feldolgozó Windowsra és Linuxra.",
        description:
          "Kereskedelmi asztali médiakezelő szoftver kliens-szerver hibrid architektúrával. Nagy átviteli sebességű Python FastAPI backendet ötvöz Electron és React felülettel, többforrásos metaadat-párosítással (TMDb, OMDb, StashDB, ThePornDB, FansDB), testreszabható átnevezési sablonokkal, kettős SFW/NSFW adatvédelmi móddal és szerveroldali képelhomályosítással, valamint szinkronizált beépített MPV videólejátszóval.",
        impactMetrics: [
          { label: "Architektúra", value: "Moduláris Monolit" },
          { label: "Adatszolgáltatók", value: "5+ Metaadat API" },
          { label: "Disztribúció", value: "Hordozható .EXE" },
        ],
      },
      nova: {
        badge: "KIEMELT PROJEKT • AUTOMATIZÁCIÓ & WEBAPP",
        title: "Nova - Discord Hírfolyam Bot & Irányítópult",
        tagline: "Automatizált tartalom-értesítő bot és webes kezelőfelület Discord közösségek számára.",
        description:
          "Valós idejű értesítő rendszer, amely manuális linkmegosztás nélkül tartja aktívan a Discord szervereket. Egy aszinkron Python adatgyűjtő háttérszolgáltatást (FastAPI & Discord.py) kapcsol össze egy letisztult React & Vite kezelőfelülettel. A rendszer élő adásokat (YouTube, Twitch, Kick), játékakciókat (Steam, Epic Games, GOG), GitHub frissítéseket és egyéni RSS hírfolyamokat figyel, majd Redis és PostgreSQL segítségével formázott, szerepkör-megjelöléses Discord üzeneteket kézbesít.",
        impactMetrics: [
          { label: "Értesítési Sebesség", value: "Közel Valós Idejű" },
          { label: "Tartalomforrások", value: "10+ Hírfolyam & API" },
          { label: "Feladatsor", value: "Redis & PostgreSQL" },
        ],
      },
      pillPlayer: {
        badge: "NYÍLT FORRÁSKÓDÚ • NPM CSOMAG",
        title: "Pill Player - HUD Cyberpunk Audio Komponens",
        tagline: "Futurisztikus lebegő HUD audiolejátszó és 16 sávos DSP spektrum-analizátor Reacthez.",
        description:
          "Futurisztikus, külső UI függőségektől mentes lebegő zenelejátszó komponens és kibontható HUD konzol Reacthez. Valós idejű 16 sávos Web Audio API DSP spektrumelemzővel, többforrásos lejátszással (HTML5 audio, SoundCloud, YouTube, Mixcloud), 8 beépített kibernetikus témával, folyamatos keresősávval és teljes billentyűzet-vezérléssel rendelkezik.",
        impactMetrics: [
          { label: "Függőségek", value: "Zero UI Deps" },
          { label: "Hangmotorok", value: "4 Provider" },
          { label: "Analizátor", value: "16-Sávos DSP" },
        ],
      },
    },
  },
  skills: {
    subtitle: "Fő Kompetenciák",
    title: "Készségek & Technikai Képességek",
    description: "Elsődleges fejlesztői eszköztáram és a munkám során használt technológiák áttekintése.",
    categories: [
      {
        id: "languages",
        title: "Nyelvek",
        description: "Elsődleges programozási nyelvek a logikától a webes felületekig és adatbázis-kezelésig.",
        skills: ["Python", "TypeScript", "JavaScript", "C", "SQL", "HTML / CSS"],
      },
      {
        id: "backend",
        title: "Backend",
        description: "Nagy átbocsátású, aszinkron API-k és háttérszolgáltatások építése moduláris felépítésben.",
        skills: ["FastAPI", "Node.js", "REST APIs", "GraphQL", "Asyncio"],
      },
      {
        id: "frontend",
        title: "Frontend",
        description: "Reaktív, típusbiztos és reszponzív webes felületek modern keretrendszerekkel.",
        skills: ["React", "Next.js", "Vite", "Vanilla CSS", "Zustand", "TanStack Query", "React Router", "Radix UI"],
      },
      {
        id: "database",
        title: "Adatbázis",
        description: "Relációs és memóriabeli perzisztencia, WAL-módú beágyazott tárak és típusbiztos ORM-ek.",
        skills: ["PostgreSQL", "SQLite", "Redis", "SQLAlchemy", "Drizzle ORM", "Alembic"],
      },
      {
        id: "devops",
        title: "Tesztelés & Kódminőség",
        description: "Kódegységesítés, szigorú statikus analízis és automatizált tesztelés a stabil működésért.",
        skills: ["ESLint", "Stylelint", "Vitest", "Playwright", "Pytest", "Ruff", "Pyright", "Pyrefly"],
      },
      {
        id: "desktop",
        title: "Asztali alkalmazások",
        description: "Többfolyamatos asztali GUI Electron alapokon, natív IPC vezérléssel és integrációval.",
        skills: ["Electron", "MPV IPC"],
      },
      {
        id: "mathematics",
        title: "Matematika & Modellezés",
        description: "Fizika szakos matematikai háttér, numerikus szimulációk és tudományos vizualizáció.",
        skills: [
          "Analízis",
          "Diff. egyenletek",
          "Valószínűségszámítás",
          "Vektoranalízis",
          "Komplex analízis",
          "MATLAB",
          "Jupyter Notebook",
          "Gnuplot",
          "LaTeX",
        ],
      },
      {
        id: "branding",
        title: "Márkaépítés & Kreatív",
        description: "5 év tapasztalat, 1 100+ Fiverr projekt: névalkotás, szlogenírás és marketing vizuálok.",
        skills: [
          "Márkanévadás",
          "Szlogenírás",
          "Fonetikai Elemzés",
          "USPTO / EUIPO Szűrés",
          ".com Audit",
          "UVP Szövegírás",
          "Canva",
          "Photoshop",
        ],
      },
    ],
  },
  services: {
    subtitle: "SZOLGÁLTATÁSOK",
    title: "Miben segíthetek?",
    description:
      "Akár új vállalkozást indítasz és karakteres márkanévre van szükséged, akár skálázható full-stack webalkalmazást vagy egyedi Discord botot szeretnél - építsünk együtt valami kiemelkedőt.",
    recommendedBadge: "LEGKERESETTEBB",
    customCalloutTitle: "EGYEDI IGÉNYED VAN?",
    customCalloutDesc:
      "Egyedi márkastratégiára, specializált Discord botra vagy skálázható webes platformra van szükséged? Beszéljük meg a céljaidhoz illeszkedő megoldást.",
    customCalloutButton: "Projekt Megbeszélése",
    tiers: {
      branding: {
        name: "Márkanévadás & Szlogenek",
        codename: "01 // BRANDING",
        description:
          "Védjegy-ellenőrzött márkanevek, hatásos szlogenek és tiszta értékajánlat, amelyek segítenek kitűnni és azonnali bizalmat építeni.",
      },
      development: {
        name: "Full-Stack & Webfejlesztés",
        codename: "02 // SZOFTVER & WEB",
        description:
          "Skálázható webalkalmazások, robusztus backend API-k és egyedi szoftverrendszerek tiszta architektúrával, modern felületekkel és megbízható adatbázisokkal.",
      },
      discordBot: {
        name: "Discord Bot Fejlesztés",
        codename: "03 // DISCORD BOTOK",
        description:
          "Egyedi eseményvezérelt botok valós idejű aktivitáskövetéssel, automatizált moderációval, rangrendszerekkel és igény szerint webes vezérlőpulttal (dashboard).",
      },
    },
    contactTierOptions: [
      { value: "branding", label: "Márkanévadás & Szlogenek" },
      { value: "development", label: "Full-Stack & Webfejlesztés" },
      { value: "discord-bot", label: "Discord Bot Fejlesztés" },
      { value: "custom", label: "Egyedi Architektúra / Konzultáció" },
    ],
    timelineOptions: [
      { value: "immediate", label: "Gyors Teljesítés (2 héten belül)" },
      { value: "2-3-weeks", label: "Normál Időtartam (2-4 hét)" },
      { value: "flexible", label: "Rugalmas Időtartam (1-2 hónap)" },
    ],
  },
  testimonials: {
    subtitle: "Ügyféltapasztalatok",
    title: "Mit mondanak, akikkel együtt dolgoztam?",
    labels: {
      prev: "Előző vélemények",
      next: "Következő vélemények",
      carousel: "Ügyfélvélemények karusszel",
    },
    feedback: [
      {
        id: "feedback-silur",
        quote:
          "Levente nemcsak a poszt-AI technológiai iparág folyamatosan változó környezetéhez való alkalmazkodóképességét bizonyította, de a marketing és adattudomány terén szerzett kiegészítő készségei is segítettek cégünknek a felhasználó-központú döntések kiegyensúlyozásában.",
        author: "Silur",
        role: "Just Silur",
        location: "UAE",
        initials: "S",
        avatar: "/testimonials/silur.webp",
      },
      {
        id: "feedback-tan-do",
        quote:
          "Nagyon segítőkész és profi. Amikor megrendeltem a szolgáltatást, még nem igazán tudtam, hogyan fogalmazzam meg az elvárásaimat a nevekkel kapcsolatban, de a segítségével sikerült mindent tisztázni, és sokkal jobban átlátni a saját igényeimet.",
        author: "Tan Do",
        role: "Visual Designer & Illustrator",
        location: "Egyesült Királyság",
        initials: "TD",
        avatar: "/testimonials/tan-do.webp",
      },
      {
        id: "feedback-aldo-scardovi",
        quote:
          "Tökéletes volt a közös munka Levvel! Nagyszerű szakember és nagyon kedves, kiváló kommunikációval és minőségi munkával. Igazi élmény volt vele dolgozni.",
        author: "Aldo Scardovi",
        role: "Független Pénzügyi Tanácsadó",
        location: "Olaszország",
        initials: "AS",
        avatar: "/testimonials/aldo-scardovi.webp",
      },
      {
        id: "feedback-mischa-sigtermans",
        quote:
          "Lev igazán remek nevekkel állt elő. Pontosan tudta, hogyan alkalmazza a tudását egy adott zsánerben. Amikor részletesebb magyarázatot kértem a nevekről, készségesen összefoglalta az elgondolásait. Ez rengeteget segített az egész folyamat során. Emellett a saját ötleteink továbbfejlesztésében is segített és rengeteg visszajelzést adott. Bátran ajánlom mindenkinek!",
        author: "Mischa Sigtermans",
        role: "Stagent | Break of Dawn",
        location: "Hollandia",
        initials: "MS",
        avatar: "/testimonials/mischa-sigtermans.webp",
      },
    ],
  },
  contact: {
    subtitle: "Projekt Megkeresés",
    title: "Beszéljünk a Projektedről",
    description: "Van egy konkrét ötleted, erős márkapozicionálást keresel, vagy megbízható full-stack webalkalmazást szeretnél építeni? Küldj üzenetet, és 24 órán belül válaszolok.",
    fields: {
      name: "A Neved *",
      namePlaceholder: "pl. Kovács Péter",
      email: "Az Email Címed *",
      emailPlaceholder: "peter@startup.hu",
      tier: "Projekt Terjedelme / Szolgáltatás",
      timeline: "Tervezett Időtartam",
      brief: "Projekt Részletei & Céljai *",
      briefPlaceholder: "Írd le röviden a termékedet, céljaidat, vagy hogy milyen márkaidentitást vagy szoftverrendszert szeretnél megvalósítani...",
    },
    errors: {
      nameRequired: "Kérlek, add meg a nevedet.",
      emailRequired: "Kérlek, add meg az email címedet.",
      emailInvalid: "Érvénytelen email cím formátum (pl. nev@ceg.hu).",
      briefRequired: "Kérlek, írd le a projekt céljait vagy terjedelmét.",
      transmissionFailedTitle: "Hiba történt a küldés során",
      transmissionFailed: "Nem sikerült elküldeni az üzenetet. Kérlek, próbáld újra, vagy írj közvetlen emailt.",
    },
    success: {
      title: "Üzenet Sikeresen Elküldve",
      desc: "Köszönöm a megkeresésedet! Megkaptam az üzenetedet, áttekintem a részleteket, és hamarosan felveszem veled a kapcsolatot.",
      button: "Újabb Üzenet Küldése",
    },
    submitButton: "Üzenet Küldése",
    transmittingButton: "Küldés folyamatban...",
    infoColumn: {
      directEmailTag: "KÖZVETLEN EMAIL",
      directEmailTitle: "Inkább emailt írnál?",
      directEmailDesc: "Írj bátran emailt bármikor. Munkanapokon általában néhány órán belül válaszolok.",
      atAGlanceTag: "RÖVIDEN",
      backendLabel: "Fő Backend:",
      backendValue: "Python / FastAPI / SQL",
      frontendLabel: "Frontend Stack:",
      frontendValue: "React / Next.js / TypeScript",
      personalLabel: "Személyes / Zene:",
      personalValue: "Drum & Bass & Techno DJ mixek",
      physicsLabel: "Akadémiai Háttér:",
      physicsValue: "Fizika & Csillagászat (ELTE)",
    },
  },
  footer: {
    subTitle: "FULL-STACK FEJLESZTŐ & MÁRKASTRATÉGA",
  },
  audioPlayer: {
    badge: "Zenelejátszó",
    subtitle: "Saját Drum & Bass és Techno DJ mixeim",
    openPlayer: "Zenelejátszó megnyitása",
    closePlayer: "Zenelejátszó bezárása",
    play: "Lejátszás",
    pause: "Szünet",
    mute: "Némítás",
    unmute: "Hang bekapcsolása",
    listenOnMixcloud: "Megnyitás Mixcloudon",
    frequenciesActive: "Lejátszás folyamatban",
    frequenciesStandby: "Szüneteltetve",
    prevTrack: "Előző szám",
    nextTrack: "Következő szám",
    selectTrack: "Számlista",
    directPlayHint: "Kattints a lejátszóra az indításhoz",
  },
  error: {
    title: "Váratlan hiba történt",
    description: "Váratlan hiba lépett fel az oldal betöltése közben. Kérlek, próbáld újra, vagy térj vissza a főoldalra.",
    errorReference: "Hiba azonosító",
    tryAgain: "Újrapróbálkozás",
    backHome: "Vissza a főoldalra",
  },
  notFound: {
    badge: "// TELEMETRIA: FELTÉRKÉPEZETLEN SZEKTOR",
    title: "A JEL ELVESZETT A MÉLYŰRBEN",
    description: "A megadott koordináták nem felelnek meg egyetlen ismert pályagörbének vagy aktív szektornak sem.",
    returnOrbit: "Vissza a pályára",
    directUplink: "Közvetlen kapcsolat",
  },
  swayaCaseStudy: {
    breadcrumbs: {
      home: "Főoldal",
      projects: "Projektek",
      caseStudy: "Swaya Esettanulmány",
    },
    hero: {
      badge: "PRODUKCIÓS ARTIFAKTUM",
      telemetry: "ASZTALI RENDSZERARCHITEKTÚRA",
      title: "Swaya Media Manager",
      tagline: "FastAPI & Electron asztali architektúra helyi médiakezeléshez",
      description:
        "A Swaya egy asztali médiagazdálkodási szoftver kliens-szerver hibrid felépítéssel. Egy helyi Python FastAPI backendet ötvöz Electron és React felhasználói felülettel, többforrásos automatizált metaadat-letöltéssel, rugalmas fájlátnevezéssel és beépített MPV videólejátszással.",
      metrics: {
        latencyValue: "Moduláris Monolit",
        latencyLabel: "Architektúra Minta",
        filesValue: "5+ Forrás",
        filesLabel: "Metaadat Adatszolgáltató",
        privacyValue: "100% Offline",
        privacyLabel: "Helyi Adattárolás & Adatvédelem",
      },
      visitWebsite: "Weboldal Megtekintése",
      backToOverview: "Vissza az Áttekintéshez",
    },
    gallery: {
      title: "Rendszerfelület & Interaktív Előnézetek",
      subtitle: "Többpaneles médiatár-virtualizáció, gyors keresési indexelés és szinkronizált videólejátszás.",
      previewCaption: "Swaya Media Manager Felület",
    },
    architecture: {
      title: "Főbb Architektúrális Kiemelések",
      subtitle: "Azonnali helyi végrehajtásra, atomi adatbázis-írásokra és nulla UI-szál késleltetésre optimalizálva.",
      cards: {
        hybridCore: {
          title: "Hibrid Kliens-Szerver Asztali Mag",
          description:
            "Egy keresztplatformos Electron asztali klienst ötvöz egy helyi Python FastAPI ASGI démonnal, amelyek belső loopback hálózaton, token-alapú hitelesítéssel (X-API-Token) kommunikálnak. Ez teljesen függetleníti a nagy terhelésű fájl I/O-t, scraper hívásokat és adatbázis-indexelést a React UI-száltól, garantálva a folyamatos 60fps sebességet.",
        },
        organizer: {
          title: "Intelligens Rendező & Átnevező Pipeline",
          description:
            "Automatizált médiafeldolgozás GuessIt regex motorral és egyedi sablonszintaxissal ({studio} - {date} - {performers} - {title}). Támogatja az iparági szabványokat (Plex, Jellyfin), a feliratok és extrák (.srt, .nfo) felismerését, az ütközéskezelési szabályokat, valamint az auditálható és visszavonható tranzakciós műveletnaplókat (ActionBatches).",
        },
        privacy: {
          title: "Kétmódú Adatvédelem & Képfeldolgozás",
          description:
            "Azonnali váltás a fősodorbeli (SFW) és a felnőtt (NSFW) médiatárak között közvetlenül az ablak fejlécéből. Szerveroldali Pillow képproxy végzi a poszterek és előnézetek dinamikus Gauss-homályosítását és a 18+ szűrést, automatikus visszairányítással védve a felhasználót az érzékeny tartalmak akaratlan megjelenésétől.",
        },
        player: {
          title: "Szinkronizált MPV IPC Médiamotor",
          description:
            "Alacsony szintű folyamatközi kommunikáció natív JSON-RPC socketeken (Node net.Socket) keresztül a beágyazott MPV médialejátszóval. Másodpercen belüli precíz képkocka-navigációt, hardveres videódekódolást, azonnali veszteségmentes képkivágást és valós idejű lejátszási pozíció-szinkronizációt biztosít az SQLite adatbázisba.",
        },
      },
    },
    telemetry: {
      title: "Technikai Telemetria & Rendszerspecifikációk",
      subtitle: "Részletes mérnöki paraméterek és megvalósítási stack.",
      specs: [
        {
          key: "Architektúra Minta",
          value: "Moduláris Monolit - Helyi Python FastAPI démon Electron és React klienssel párosítva",
        },
        {
          key: "Frontend Stack & Virtualizáció",
          value: "React 19, Electron 42, Vite 8, TanStack Query v5, TanStack Virtual (virtualizált médiatár-rács), Zustand 5 (perzisztens store-ok)",
        },
        {
          key: "Adatbázis & Perzisztencia",
          value: "Beágyazott SQLite Write-Ahead Logging (WAL) módban, SQLAlchemy ORM, automatikus indítási Alembic migrációk, egyedi összetett indexek",
        },
        {
          key: "Metaadat Scraper Pipeline",
          value: "Többforrásos aggregáció (TMDb, OMDb, StashDB GraphQL, ThePornDB, FansDB) + GuessIt intelligens fájlnév-felismerő",
        },
        {
          key: "IPC & Kommunikációs Protokollok",
          value: "Electron típusbiztos contextBridge (window.electronAPI) + Nyers JSON-RPC Named Pipe-okon / Unix Socketeken (MPV)",
        },
        {
          key: "Feladatkezelési & Párhuzamossági Modell",
          value: "Asyncio eseményhurok + Többszálas TaskManager feladat-megszakítással + ThreadPoolExecutor a CPU-igényes hasheléshez",
        },
        {
          key: "Fájlrendszer Eseménykezelés",
          value: "Watchdog valós idejű mappaváltozás-figyelés + 4 konfigurálható ütközési szabályzat (Mindkettő megtartása, Felülírás, Csere, Kihagyás)",
        },
        {
          key: "Bináris Csomagolás & Biztonság",
          value: "Electron Builder + PyInstaller önálló hordozható csomagolás • 100% offline, légmentes működés, nulla külső analitika",
        },
      ],
    },
    cta: {
      title: "Készen állsz egy csúcsteljesítményű architektúra felépítésére?",
      description:
        "Legyen szó alacsony késleltetésű asztali alkalmazásokról, nagy átviteli sebességű backend szolgáltatásokról vagy modern webes platformokról, tervezzünk valami kivételeset együtt.",
      discussButton: "Projekt Megbeszélése",
      exploreButton: "Összes Projekt Felfedezése",
    },
  },
};
