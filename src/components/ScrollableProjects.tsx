"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollableCarousel from './ScrollableCarousel';

interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
}

interface ScrollableProjectsProps {
  projects: Project[];
}

export default function ScrollableProjects({ projects }: ScrollableProjectsProps) {
  const renderProject = (project: Project, index: number) => (
    <motion.div
      className="group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-[300px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
        <div>
          <p className="text-blue-400 text-sm">{project.category}</p>
          <h3 className="text-white text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <ScrollableCarousel
      items={projects}
      renderItem={renderProject}
      itemsToShowDesktop={3}
      itemWidthDesktop="calc(33.333% - 1.33rem)"
      ariaLabels={{
        prev: 'Previous projects',
        next: 'Next projects',
        dot: 'Go to project set',
      }}
    />
  );
}
