"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollableCarousel from './ScrollableCarousel';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface ScrollableTeamProps {
  members: TeamMember[];
}

export default function ScrollableTeam({ members }: ScrollableTeamProps) {
  const renderTeamMember = (member: TeamMember, index: number) => (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative w-48 h-48 mx-auto mb-4 group overflow-hidden rounded-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
    </motion.div>
  );

  return (
    <ScrollableCarousel
      items={members}
      renderItem={renderTeamMember}
      itemsToShowDesktop={4}
      itemWidthDesktop="calc(25% - 1.5rem)"
      ariaLabels={{
        prev: 'Previous team members',
        next: 'Next team members',
        dot: 'Go to team member set',
      }}
    />
  );
}
