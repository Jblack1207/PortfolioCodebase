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

export type CaseStudyExtra = {
  tagline: string;
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
    stats: [
      { value: "6", label: "system layers, sensor to mobile app" },
      { value: "17", label: "REST API endpoints, JWT + device-key secured" },
      { value: "30%", label: "of over-65s fall at least once a year (WHO)" },
      { value: "100%", label: "on-device facial recognition — no cloud upload" },
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
          "The only service allowed to touch the database — validates every payload against a typed data model, authenticates via JWT (users) or a device API key (hardware), and runs a background worker that turns fall readings into alerts.",
      },
      {
        name: "Database layer",
        tech: "MySQL · SQLAlchemy",
        description:
          "Seven relational tables, including a many-to-many device–user link table, with foreign keys and timestamps enforcing data integrity end to end.",
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
          "1Hz sampling with duplicate-reading suppression, rejection of clearly invalid values, and an automatic soft-reset after 40 consecutive failed reads — the sensor recovers from a bad state on its own instead of needing a manual power cycle.",
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
      "Fall detection relies on tuned thresholds rather than a trained classifier — reliable for typical elderly movement, but a gyro-assisted or ML-based model would cut false positives further.",
      "Swapping the planned CNN for Haar Cascade + face_recognition traded a little accuracy in poor lighting or awkward angles for something that actually runs in real time on the hardware available.",
      "The mobile app polls the API rather than receiving push updates — fine at current latency, but real-time push notifications would be a meaningful next step.",
      "Everything depends on a stable home Wi-Fi connection, which isn't guaranteed for every household this system is meant to help.",
    ],
    impact: [
      {
        title: "Societal",
        description:
          "Faster response to falls thanks to the alerts pipeline, and a way for carers to step back without stepping away — supporting independent living instead of replacing it.",
      },
      {
        title: "Industrial",
        description:
          "Built on affordable, off-the-shelf hardware with a horizontally scalable backend, so cost isn't the barrier to adoption — reliable home internet is the bigger one.",
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
      "A cross-platform Flutter app that gives independent artists and music venues in the Black Country a shared space to find each other, message directly, and turn conversations into booked gigs — replacing scattered social-media DMs with one dedicated platform.",
    stats: [
      { value: "3", label: "account types — Band, Solo Artist, Venue" },
      { value: "2", label: "sign-in methods — email/password & Google" },
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
          "A Socket.IO server delivers chat messages instantly, while Firestore tracks chat metadata — last message, per-user unread counts, and a live isOnline flag that drives the presence dot next to followed users.",
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
          "SQLite and Firebase were weighed directly against each other for persistence. Firebase won because Auth and Firestore share one SDK — Google Sign-In, account creation, and real-time profile updates all come for free — and a project this size will never reach the usage tier where its pricing bites.",
      },
      {
        title: "Presence-aware messaging, hybrid by design",
        description:
          "Chat delivery runs over a dedicated Node.js Socket.IO server for instant messages, while Firestore separately tracks unread counts per user and an isOnline flag on each profile — so the messaging home page can show who's currently online without polling.",
      },
      {
        title: "Search that respects context",
        description:
          "searchPublicProfiles() combines free-text matching (3+ characters) with structured filters — genre, profile type, minimum rating, max price, member count — in a single Firestore query, and always excludes the logged-in user's own profile from their own results.",
      },
      {
        title: "Social graph with atomic counters",
        description:
          "Following a profile writes a followingLinks join document and increments a denormalised followerCount on the target's profile in the same operation, so follower counts stay accurate without a separate aggregation step.",
      },
      {
        title: "Address-to-map, gracefully",
        description:
          "Profile locations are stored as plain text and geocoded on demand via the geocoding package, opening the embedded map only on a successful match — with a clear error message, not a crash, when a location can't be found.",
      },
    ],
    evaluation: [
      "Posts and Calendar integration were both scoped in the original proposal but cut under time pressure to prioritise the messaging system — the platform currently has no way for users to broadcast updates outside of direct messages.",
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
          "A searchable, filterable pool of local bands and solo artists — by genre, rating, and price — for booking acts without chasing contacts across multiple platforms.",
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
