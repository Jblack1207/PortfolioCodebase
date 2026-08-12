import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroGroup from "@/components/IntroGroup";
import ProjectsSection from "@/components/ProjectsSection";
import Skills from "@/components/Skills";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="relative flex flex-1 flex-col overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <IntroGroup projectCount={projects.length} />
      <ProjectsSection projects={projects} />
      <Marquee />
      <Skills />
      <Footer />
    </div>
  );
}
