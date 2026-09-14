export type ArchitectureLayer = {
  name: string;
  tech: string;
  description: string;
};

export type Highlight = {
  title: string;
  description: string;
};

export type TestSuite = {
  name: string;
  count: number;
  note: string;
};

export type ImpactItem = {
  title: string;
  description: string;
};

export type RepoLink = {
  label: string;
  url: string;
};

export type Figure = {
  src: string;
  alt: string;
  caption: string;
  /** Photographs fill their frame; screenshots and diagrams default to contain. */
  fit?: "cover" | "contain";
  /** Flip black-on-white line art so it sits in the dark theme like the other diagrams. */
  tone?: "invert";
};

export type Gallery = {
  kicker: string;
  title: string;
  /** "phone" renders tall 9:19.5 frames, "wide" renders 4:3 ones. */
  layout: "phone" | "wide";
  /** Columns at lg. Defaults to 4 for phone, 3 for wide; drop to 2 for dense diagrams. */
  cols?: 2 | 3 | 4;
  items: Figure[];
};

export type CaseStudyExtra = {
  tagline: string;
  /*
   * Labels for a project with two repositories, in [githubUrl, liveUrl] order.
   * Presence of this field is what opts a project into reading liveUrl as a
   * second repo — without it liveUrl keeps its normal meaning and is ignored.
   */
  repoLabels?: [string, string];
  cover?: Figure[];
  architectureDiagram?: Figure;
  galleries?: Gallery[];
  stats: { value: string; label: string }[];
  architecture: ArchitectureLayer[];
  highlights: Highlight[];
  testing?: TestSuite[];
  evaluation: string[];
  impact: ImpactItem[];
  futureWork: string[];
};

export const caseStudyExtras: Record<string, CaseStudyExtra> = {
  "healthguard-pro": {
    tagline:
      "A final-year IoT project that pairs wearable-style fall and heart-rate sensors with an on-device facial recognition door camera, giving carers a live, remote view of an elderly relative's safety without taking away their independence.",
    repoLabels: ["Backend & IoT", "Mobile app"],
    cover: [
      {
        src: "/images/healthguard-pro/app-dashboard.png",
        alt: "HealthGuard Pro dashboard showing linked devices and the latest readings",
        caption: "Dashboard",
      },
      {
        src: "/images/healthguard-pro/app-device-linking.jpg",
        alt: "Device linking screen with an input for a device ID and a list of linked devices",
        caption: "Device linking",
      },
      {
        src: "/images/healthguard-pro/app-live-feed-streaming.jpg",
        alt: "Live camera feed from the door camera with mute and talkback controls",
        caption: "Live feed",
      },
    ],
    architectureDiagram: {
      src: "/images/healthguard-pro/diagram-system-architecture.png",
      alt: "System architecture diagram from sensors through the Raspberry Pi and Nginx to FastAPI, MySQL and the Flutter app",
      caption:
        "Sensors and camera feed the Pi; Nginx fronts FastAPI and the WebRTC signalling channel; the Flutter app talks to one domain.",
    },
    galleries: [
      {
        kicker: "Screens",
        title: "The carer's view.",
        layout: "phone",
        items: [
          {
            src: "/images/healthguard-pro/app-dashboard.png",
            alt: "Dashboard listing four devices and the most recent heart-rate and SpO2 readings",
            caption: "Dashboard",
          },
          {
            src: "/images/healthguard-pro/app-device-linking.jpg",
            alt: "Device linking screen with an input for a device ID and a list of linked devices",
            caption: "Linking a device by ID",
          },
          {
            src: "/images/healthguard-pro/app-heart-rate-history.png",
            alt: "Graph of recent heart rate, SpO2 and temperature readings for a monitored person",
            caption: "Heart-rate and SpO₂ history",
          },
          {
            src: "/images/healthguard-pro/app-live-feed-connecting.png",
            alt: "Live camera feed screen waiting for the WebRTC video stream to connect",
            caption: "Live feed, connecting",
          },
          {
            src: "/images/healthguard-pro/app-live-feed-streaming.jpg",
            alt: "Live camera feed screen showing video from the door camera with mute and talkback controls",
            caption: "Live feed, streaming",
          },
        ],
      },
      {
        kicker: "Hardware",
        title: "Off-the-shelf parts, on a desk.",
        layout: "wide",
        items: [
          {
            src: "/images/healthguard-pro/hardware-enclosure.jpg",
            alt: "The assembled sensor unit and camera module inside a black enclosure",
            caption: "Assembled unit in its enclosure",
            fit: "cover",
          },
          {
            src: "/images/healthguard-pro/hardware-sensor-board.jpg",
            alt: "M5 Stamp Pico wired to the MPU-6050 and MAX30102 breakout boards",
            caption: "M5 Stamp Pico wired to both sensors",
            fit: "cover",
          },
          {
            src: "/images/healthguard-pro/hardware-battery-pack.jpg",
            alt: "The sensor board mounted on top of a lithium polymer battery pack",
            caption: "Battery-backed wearable prototype",
            fit: "cover",
          },
          {
            src: "/images/healthguard-pro/hardware-in-hand.jpg",
            alt: "The finished sensor and battery assembly held in one hand for scale",
            caption: "Small enough to carry",
            fit: "cover",
          },
          {
            src: "/images/healthguard-pro/hardware-pi-camera-speaker.jpg",
            alt: "Raspberry Pi 5 connected to the NoIR camera ribbon, a speaker and a microphone",
            caption: "Pi 5 with camera, speaker and mic",
            fit: "cover",
          },
          {
            src: "/images/healthguard-pro/hardware-pi-breadboard.jpg",
            alt: "Raspberry Pi 5 wired to a breadboard during development",
            caption: "Breadboard stage",
            fit: "cover",
          },
        ],
      },
      {
        kicker: "Diagrams",
        title: "How the pieces fit together.",
        layout: "wide",
        cols: 2,
        items: [
          {
            src: "/images/healthguard-pro/diagram-sensor-wiring.png",
            alt: "Wiring diagram mapping M5 Stamp Pico pins to the MPU-6050 and MAX30102 over I2C",
            caption: "I2C wiring, Stamp Pico to both sensors",
            tone: "invert",
          },
          {
            src: "/images/healthguard-pro/diagram-webrtc-handshake.png",
            alt: "Flow chart of the WebRTC handshake: SDP offer over secure WebSocket, STUN, ICE candidates, then media streaming",
            caption: "WebRTC handshake, offer to first frame",
          },
          {
            src: "/images/healthguard-pro/diagram-database-schema.png",
            alt: "Entity relationship diagram of the seven MySQL tables including the device-user link table",
            caption: "Seven tables, foreign keys throughout",
            tone: "invert",
          },
        ],
      },
    ],
    stats: [
      { value: "6", label: "system layers, sensor to mobile app" },
      { value: "17", label: "REST API endpoints, JWT + device-key secured" },
      { value: "30%", label: "of over-65s fall at least once a year (WHO)" },
      { value: "100%", label: "on-device facial recognition, no cloud upload" },
    ],
    architecture: [
      {
        name: "Sensor layer",
        tech: "M5 Stamp Pico · MPU-6050 · MAX30102",
        description:
          "Reads acceleration and gyro data for fall detection (~6.7 samples/sec) and heart-rate/SpO₂ (1Hz) over I2C, with noise filtering and an automatic soft-reset after repeated invalid reads.",
      },
      {
        name: "Edge layer",
        tech: "Raspberry Pi 5 · Pi NoIR camera · IR LED",
        description:
          "Runs facial recognition and the WebRTC video stream entirely on-device, with an infrared light that switches on automatically for low-light identification at the door.",
      },
      {
        name: "Network layer",
        tech: "Nginx reverse proxy",
        description:
          "Terminates HTTPS/WSS with Let's Encrypt and routes sensor traffic, API calls, and WebRTC signalling to the right internal service behind one domain.",
      },
      {
        name: "Backend layer",
        tech: "FastAPI (Python, async)",
        description:
          "It's the only service allowed to touch the database. It validates every payload against a typed data model, authenticates via JWT (users) or a device API key (hardware), and runs a background worker that turns fall readings into alerts.",
      },
      {
        name: "Database layer",
        tech: "MySQL · SQLAlchemy",
        description:
          "Seven relational tables, including a many-to-many device-user link table, with foreign keys and timestamps enforcing data integrity end to end.",
      },
      {
        name: "Application layer",
        tech: "Flutter · iOS & Android",
        description:
          "The carer-facing app: link devices, watch a live camera feed with mute/talkback controls, and graph recent heart-rate and SpO₂ history.",
      },
    ],
    highlights: [
      {
        title: "Multi-stage fall detection",
        description:
          "A free-fall dip below 5 m/s² arms the detector, a spike above 25 m/s² flags a possible impact, and a tilt change over 30° within a 1-second window confirms it. Chaining three thresholds instead of one cuts false positives from ordinary movement while staying light enough to run entirely on a microcontroller.",
      },
      {
        title: "Resilient heart-rate sensing",
        description:
          "1Hz sampling with duplicate-reading suppression, rejection of clearly invalid values, and an automatic soft-reset after 40 consecutive failed reads. The sensor recovers from a bad state on its own instead of needing a manual power cycle.",
      },
      {
        title: "Facial recognition, rebuilt for the hardware",
        description:
          "Originally scoped around a CNN, but early testing showed it was too resource-heavy for sustained real-time inference on a Pi 5. Switching to OpenCV Haar Cascade + face_recognition, and only running the full pipeline on every 5th frame, kept identification near-instant and fully on-device.",
      },
      {
        title: "Low-latency two-way video",
        description:
          "WebRTC (aiortc) with STUN-based NAT traversal and SDP/ICE candidates exchanged over a secure WebSocket relayed through Nginx. The result is near real-time video plus two-way talkback audio, with the device's own microphone muted during talkback to prevent echo.",
      },
      {
        title: "Defence in depth on the API",
        description:
          "Every write is validated against a typed data model before it reaches MySQL, users authenticate with Firebase-issued JWTs while hardware authenticates with a separate device API key, and the database itself is never exposed to the public internet.",
      },
    ],
    testing: [
      { name: "Fall detection sensor", count: 7, note: "movement, drop, impact, tilt, repeat falls, sensor noise" },
      { name: "Heart-rate sensor", count: 9, note: "BPM ranges, invalid/duplicate readings, failure recovery" },
      { name: "Facial recognition", count: 7, note: "known/unknown/no face, multiple faces, low light" },
      { name: "FastAPI & SQL", count: 17, note: "auth, CRUD, and alert-creation logic per endpoint" },
      { name: "Integration", count: 6, note: "device linking, live feed, login, talkback, readings" },
    ],
    evaluation: [
      "Fall detection relies on tuned thresholds rather than a trained classifier; it's reliable for typical elderly movement, but a gyro-assisted or ML-based model would cut false positives further.",
      "Swapping the planned CNN for Haar Cascade + face_recognition traded a little accuracy in poor lighting or awkward angles for something that actually runs in real time on the hardware available.",
      "The mobile app polls the API rather than receiving push updates; that's fine at current latency, but real-time push notifications would be a meaningful next step.",
      "Everything depends on a stable home Wi-Fi connection, which isn't guaranteed for every household this system is meant to help.",
    ],
    impact: [
      {
        title: "Societal",
        description:
          "Faster response to falls thanks to the alerts pipeline, and a way for carers to step back without stepping away, supporting independent living instead of replacing it.",
      },
      {
        title: "Industrial",
        description:
          "Built on affordable, off-the-shelf hardware with a horizontally scalable backend, so cost isn't the barrier to adoption; reliable home internet is the bigger one.",
      },
      {
        title: "Technical",
        description:
          "Most of the recognition pipeline runs at the edge instead of in the cloud, which is unusual for consumer health-monitoring systems and pays off in both latency and privacy.",
      },
    ],
    futureWork: [
      "Retrain facial recognition on a CNN with a purpose-built dataset to improve accuracy in poor lighting and off-angle shots.",
      "Add gyro-assisted fall detection alongside the accelerometer to further reduce false positives.",
      "Move from API polling to real-time push notifications for alerts.",
    ],
  },
  "black-country-beats": {
    tagline:
      "A cross-platform Flutter app that gives independent artists and music venues in the Black Country a shared space to find each other, message directly, and turn conversations into booked gigs, replacing scattered social-media DMs with one dedicated platform.",
    cover: [
      {
        src: "/images/black-country-beats/app-home.png",
        alt: "Black Country Beats home screen with latest news, quick search and recent messages",
        caption: "Home",
      },
      {
        src: "/images/black-country-beats/app-search-results.jpg",
        alt: "Search results showing matching artist profiles as image cards",
        caption: "Search results",
      },
      {
        src: "/images/black-country-beats/app-public-profile.jpg",
        alt: "Public profile for an artist with rating, follow and message buttons",
        caption: "Public profile",
      },
    ],
    galleries: [
      {
        kicker: "Screens",
        title: "The shipped app.",
        layout: "phone",
        items: [
          {
            src: "/images/black-country-beats/app-login.jpg",
            alt: "Login screen with email and password fields plus Google, Facebook and Apple sign-in buttons",
            caption: "Sign in",
          },
          {
            src: "/images/black-country-beats/app-register.jpg",
            alt: "Registration screen collecting username, email and password",
            caption: "Register",
          },
          {
            src: "/images/black-country-beats/app-home.png",
            alt: "Home screen showing latest news articles, quick search chips and latest messages",
            caption: "Home",
          },
          {
            src: "/images/black-country-beats/app-search.png",
            alt: "Search screen prompting for three or more characters or a filter",
            caption: "Search",
          },
          {
            src: "/images/black-country-beats/app-search-results.jpg",
            alt: "Search results showing two matching artist profiles as image cards",
            caption: "Results",
          },
          {
            src: "/images/black-country-beats/app-public-profile.jpg",
            alt: "Public profile for TheMarkBlackBand with rating, follow and message buttons, location, genre and price",
            caption: "A public profile",
          },
          {
            src: "/images/black-country-beats/app-chat-thread.png",
            alt: "One-to-one chat thread with messages delivered over Socket.IO",
            caption: "Chat thread",
          },
          {
            src: "/images/black-country-beats/app-profile-map.jpg",
            alt: "Embedded Google map with a pin on a geocoded profile address in Wolverhampton",
            caption: "Address geocoded to a map",
          },
        ],
      },
      {
        kicker: "Design",
        title: "Mockups the build was measured against.",
        layout: "wide",
        items: [
          {
            src: "/images/black-country-beats/mockup-auth-screens.jpg",
            alt: "Three mockup screens covering log in and the two registration steps",
            caption: "Auth flow",
          },
          {
            src: "/images/black-country-beats/mockup-home-and-search.png",
            alt: "Mockups of the home feed and the empty search state side by side",
            caption: "Home and search",
          },
          {
            src: "/images/black-country-beats/mockup-search-filters.jpg",
            alt: "Mockup of the search filter sheet with profile type, genre, rating, price and member count",
            caption: "Filter sheet",
          },
          {
            src: "/images/black-country-beats/mockup-search-results.jpg",
            alt: "Mockups of search results in grid and list layouts",
            caption: "Results, grid and list",
          },
          {
            src: "/images/black-country-beats/mockup-venue-profile.jpg",
            alt: "Mockup of a venue profile with rating, details and posts",
            caption: "Venue profile",
          },
          {
            src: "/images/black-country-beats/mockup-messaging.png",
            alt: "Mockups of the messaging home, new message sheet and a chat thread",
            caption: "Messaging",
          },
          {
            src: "/images/black-country-beats/mockup-watch-notifications.jpg",
            alt: "Apple Watch mockups showing new message and post like notifications",
            caption: "Watch notifications, scoped out",
          },
        ],
      },
      {
        kicker: "Diagrams",
        title: "The model behind it.",
        layout: "wide",
        cols: 2,
        items: [
          {
            src: "/images/black-country-beats/diagram-use-case.png",
            alt: "Use case diagram covering solo artist, band member, user and venue owner actors",
            caption: "Use cases across four actor types",
          },
          {
            src: "/images/black-country-beats/diagram-class.png",
            alt: "Class diagram of the app's domain model",
            caption: "Domain model",
          },
          {
            src: "/images/black-country-beats/diagram-erd.jpg",
            alt: "Entity relationship diagram of the Firestore collections and their links",
            caption: "Firestore collections and links",
          },
        ],
      },
    ],
    stats: [
      { value: "3", label: "account types: Band, Solo Artist, Venue" },
      { value: "2", label: "sign-in methods: email/password & Google" },
      { value: "5", label: "Firestore collections powering the app" },
      { value: "Live", label: "presence & chat via Socket.IO + Firestore" },
    ],
    architecture: [
      {
        name: "Presentation layer",
        tech: "Flutter · Shell page + bottom nav",
        description:
          "A single shell page keeps Home, Search, Messages and Profile alive behind a persistent bottom nav, swapping a selected index in a Stack rather than re-navigating, for smoother transitions between sections.",
      },
      {
        name: "Authentication layer",
        tech: "Firebase Auth · Google Sign-In",
        description:
          "Email/password and Google sign-in share one SDK with Firestore. Registration is split across two screens, mirrors the account into a Firestore user record, and blocks login until the email address is verified.",
      },
      {
        name: "Real-time messaging layer",
        tech: "Node.js · Socket.IO",
        description:
          "A Socket.IO server delivers chat messages instantly, while Firestore tracks chat metadata: last message, per-user unread counts, and a live isOnline flag that drives the presence dot next to followed users.",
      },
      {
        name: "Data layer",
        tech: "Cloud Firestore",
        description:
          "Public profiles, users, following links, news and chat/message documents, chosen over SQLite specifically for its shared SDK with Auth, real-time updates, and free-tier headroom at this scale.",
      },
      {
        name: "Location services layer",
        tech: "Google Maps SDK · geocoding",
        description:
          "A profile's free-text address is geocoded into coordinates on demand and dropped onto an embedded map, with a friendly error instead of a crash if the address can't be resolved.",
      },
    ],
    highlights: [
      {
        title: "Firebase-first identity & data",
        description:
          "SQLite and Firebase were weighed directly against each other for persistence. Firebase won because Auth and Firestore share one SDK (Google Sign-In, account creation, and real-time profile updates all come for free), and a project this size will never reach the usage tier where its pricing bites.",
      },
      {
        title: "Presence-aware messaging, hybrid by design",
        description:
          "Chat delivery runs over a dedicated Node.js Socket.IO server for instant messages, while Firestore separately tracks unread counts per user and an isOnline flag on each profile, so the messaging home page can show who's currently online without polling.",
      },
      {
        title: "Search that respects context",
        description:
          "searchPublicProfiles() combines free-text matching (3+ characters) with structured filters (genre, profile type, minimum rating, max price, member count) in a single Firestore query, and always excludes the logged-in user's own profile from their own results.",
      },
      {
        title: "Social graph with atomic counters",
        description:
          "Following a profile writes a followingLinks join document and increments a denormalised followerCount on the target's profile in the same operation, so follower counts stay accurate without a separate aggregation step.",
      },
      {
        title: "Address-to-map, gracefully",
        description:
          "Profile locations are stored as plain text and geocoded on demand via the geocoding package, opening the embedded map only on a successful match, with a clear error message, not a crash, when a location can't be found.",
      },
    ],
    evaluation: [
      "Posts and Calendar integration were both scoped in the original proposal but cut under time pressure to prioritise the messaging system. The platform currently has no way for users to broadcast updates outside of direct messages.",
      "The app talks to Firestore directly from the client for almost everything; a dedicated API layer in front of it would give far more control over validation and access rules than Firestore's own rule system alone.",
      "Location-based discovery (finding artists or venues nearest to you) never made it in, so the search page can filter by genre and rating but not by distance.",
      "Push notifications were left out largely due to added complexity on iOS, so users only see new messages when they open the app.",
    ],
    impact: [
      {
        title: "For artists",
        description:
          "A single place to be discovered by venues and reach out directly, instead of relying on scattered social-media DMs and word of mouth to find live performance opportunities.",
      },
      {
        title: "For venues",
        description:
          "A searchable, filterable pool of local bands and solo artists (by genre, rating, and price) for booking acts without chasing contacts across multiple platforms.",
      },
      {
        title: "For the scene",
        description:
          "A centralised, open communication channel between artists and venues that the presentation's own research ties directly to fairer, more visible opportunities in the local live-music market.",
      },
    ],
    futureWork: [
      "Build out the Posts feature so artists and venues can broadcast updates beyond direct messages.",
      "Add location-based search so users can find artists or venues nearest to them.",
      "Introduce push notification alerts, working around the added iOS restrictions.",
      "Put a dedicated API in front of Firestore for more secure, controlled data access than direct client queries.",
    ],
  },
};

/**
 * A project's source links, read from the database. `githubUrl` is always the
 * first; `liveUrl` is treated as a second repository only for projects that
 * declare `repoLabels`.
 */
export function projectRepos(project: {
  slug: string;
  githubUrl: string | null;
  liveUrl: string | null;
}): RepoLink[] {
  const labels = caseStudyExtras[project.slug]?.repoLabels;
  const links: RepoLink[] = [];

  if (project.githubUrl) {
    links.push({ label: labels?.[0] ?? "Source on GitHub", url: project.githubUrl });
  }
  if (labels && project.liveUrl) {
    links.push({ label: labels[1], url: project.liveUrl });
  }

  return links;
}
