import { prisma } from "@/lib/prisma";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import IntroGroup from "@/components/home/IntroGroup";
import ProjectsSection from "@/components/home/ProjectsSection";
import Skills from "@/components/home/Skills";
import Marquee from "@/components/home/Marquee";
import Footer from "@/components/shared/Footer";
import ScrollProgress from "@/components/home/ScrollProgress";
import ScrollSnap from "@/components/home/ScrollSnap";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <ScrollProgress />
      <ScrollSnap />
      <div className="snap-section">
        <Navbar />
        <Hero />
      </div>
      <IntroGroup projectCount={projects.length} />
      <ProjectsSection projects={projects} />
      <Marquee />
      <Skills />
      <Footer />
    </div>
  );
}
