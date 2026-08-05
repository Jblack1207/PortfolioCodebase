import { prisma } from "../src/lib/prisma";

const projects = [
  {
    title: "Black Country Beats",
    slug: "black-country-beats",
    shortDescription: "A Local Artist and Venue discovery platform for the Black Country and surrounding West Midlands regions.",
    description: "The Black Country Beats project is a Flutter based Mobile application that allows users to discover local artists and venues in the Black Country and surrounding areas. It provides a platform for artists to showcase their work and for venues to promote events, fostering a vibrant local music scene.",
    problem: "After extensive research for a university project, I identified a gap in the local music scene discovery process, where there was a lack of technical advancement in that sector in relation to advertising and promotion of local artists and venues. The research led me to believe that new and upcoming bands and artists were struggling to get their music heard and venues were struggling to fill their events. I wanted to create a solution that would help bridge this gap and provide a platform for local artists and venues to connect with their audience.",
    solution: "Using Flutter and Firebase, I created a multi platform based mobile application that allows users to discover local artists and venues in the Black Country and other local areas. The application provides a platform for artists to showcase their work and for venues to promote events to help increase visibility.",
    techStack: ["Flutter", "Firebase Authentication", "Cloud Firestore", "Firebase Storage", "Google Maps API", "Dart", "Node.js", "Socket.io"],
    category: "Mobile Application",
    githubUrl: "https://github.com/your-username/your-repo",
    liveUrl: "https://your-project.com",
    imageUrl: null,
    featured: false,
    displayOrder: 0,
  },
  {
    title: "HealthGuard PRO",
    slug: "healthguard-pro",
    shortDescription: "A Health Protection application for monitoring elderly care remotely.",
    description: "HealthGuard PRO is a Flutter based Mobile application designed to help users track Elderly relatives or Carehome residents in relation to fall incidents or increases in Heart Rate activity. It provides a comprehensive platform for monitoring health metrics, as well as using IoT Camera Devices and Fall Detection Sensors to monitor falls within designated areas.",
    problem: "For my Final Year Project, I took it upon myself to help solve an issue that I had experienced previously with elderly relatives and their care. I wanted to create a solution that would help monitor the health of elderly relatives or carehome residents, and increase the safety within their living environment.",
    solution: "Using Flutter as the frontend framework, on top of other key backend technologies, I created a easy to use multi platform based mobile application that allows users to track and monitor their Elderly relatives or Carehome residents key metrics.",
    techStack: ["M5 Stamp Pico", "Raspberry Pi 5", "OpenCV", "WebRTC", "aiortc", "FastAPI", "SQLAlchemy", "MySQL", "Firebase", "Nginx", "Flutter", "Python", "Dart"],
    category: "Mobile Application",
    githubUrl: "https://github.com/your-username/your-repo",
    liveUrl: "https://your-project.com",
    imageUrl: null,
    featured: false,
    displayOrder: 1,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
