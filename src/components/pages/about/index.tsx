import { Box, Stack } from '@mui/material';
import { UserProfileHeader, BioSection, SkillsSection } from '@/components/organisms/user';
import { ExperienceSection } from '@/components/organisms/experience';
import { EducationSection } from '@/components/organisms/education';
import { AnimatedBackground } from '@/components/molecules/AnimatedBackground';

export default function AboutPageContent() {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'HTML',
    'CSS',
    'MongoDB',
    'PostgreSQL',
    'Git',
    'AWS',
    'Docker',
    'Material-UI',
  ];

  const bioParagraphs = [
    "Hello! I'm a passionate full-stack developer with a strong background in web development and software engineering. I love creating applications that solve real-world problems and provide excellent user experiences.",
    "My journey in programming started several years ago, and since then I've been constantly learning and exploring new technologies. I enjoy working on both frontend and backend development, with a particular interest in modern web technologies like React, Next.js, and Node.js.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge with the developer community. I believe in continuous learning and am always excited to take on new challenges.",
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Current Position',
      duration: '2023 - Present',
      description:
        'Developing and maintaining web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.',
      isCurrent: true,
    },
    {
      title: 'Frontend Developer',
      company: 'Previous Role',
      duration: '2022 - 2023',
      description:
        'Focused on creating responsive and user-friendly interfaces using React and modern CSS frameworks. Implemented best practices for performance optimization and accessibility.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of the Philippines - Cebu',
      duration: '2019 - 2023',
      description:
        'Graduated Magna Cum Laude. Specialized in software engineering and web development. ',
    },
    {
      degree: 'Master of Engineering in Artificial Intelligence',
      institution: 'University of the Philippines - Diliman',
      duration: '2024 - PRESENT (CURRENT)',
      description:
        "Currently pursuing a Master's degree in Artificial Intelligence, focusing on machine learning and natural language processing.",
    },
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatedBackground />

      <Box
        sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto', position: 'relative' }}
      >
        <Stack spacing={4}>
          <UserProfileHeader
            name="Your Name"
            title="About Me"
            subtitle="Passionate developer with a love for creating innovative solutions and beautiful user experiences."
            avatarSrc="/assets/profile-picture.jpg"
            initials="JP"
          />

          <BioSection paragraphs={bioParagraphs} />

          <SkillsSection skills={skills} />

          <ExperienceSection experiences={experiences} />

          <EducationSection education={education} />
        </Stack>
      </Box>
    </Box>
  );
}
