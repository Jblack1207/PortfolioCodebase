import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CaseStudy from "@/components/projects/CaseStudy";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} · Joel Blackham`,
    description: project.shortDescription,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    notFound();
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <Navbar />
      <CaseStudy project={project} />
      <Footer />
    </div>
  );
}
