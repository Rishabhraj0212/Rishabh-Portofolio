import { projects } from '../data/resume';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading
            tag="Projects"
            title="Things I've"
            gradientWord="built"
            subtitle="Production and personal projects spanning secure mobile apps and full-stack MERN systems."
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
