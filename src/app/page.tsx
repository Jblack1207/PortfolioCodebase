import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-5xl flex-1 px-6 py-16 sm:px-10">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Joel Blackham
          </h1>
          <p className="mt-2 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Projects I&apos;ve built over the past year.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                {project.category}
              </span>
              <Link href={`/projects/${project.slug}`} className="mt-2">
                <h2 className="text-xl font-semibold text-zinc-950 hover:underline dark:text-zinc-50">
                  {project.title}
                </h2>
              </Link>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {project.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-zinc-500 dark:text-zinc-400">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="hover:text-zinc-950 dark:hover:text-zinc-50"
                  >
                    <FiGithub size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live site`}
                    className="hover:text-zinc-950 dark:hover:text-zinc-50"
                  >
                    <FiExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}