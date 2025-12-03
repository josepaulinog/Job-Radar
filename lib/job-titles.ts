/**
 * Common job titles for autocomplete functionality
 * Organized by category for easier maintenance
 */

export const JOB_TITLES = [
  // Development & Engineering
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'React Developer',
  'Vue Developer',
  'Angular Developer',
  'Node.js Developer',
  'Python Developer',
  'Java Developer',
  'PHP Developer',
  'WordPress Developer',
  'Ruby Developer',
  'Go Developer',
  'Rust Developer',
  'C++ Developer',
  'C# Developer',
  '.NET Developer',
  'iOS Developer',
  'Android Developer',
  'Mobile Developer',
  'React Native Developer',
  'Flutter Developer',
  'Software Engineer',
  'Solutions Engineer',
  'Platform Engineer',
  'Embedded Systems Engineer',
  'Full Stack Engineer',

  // DevOps & Infrastructure
  'DevOps Engineer',
  'Site Reliability Engineer',
  'Cloud Engineer',
  'AWS Engineer',
  'Azure Engineer',
  'GCP Engineer',
  'Kubernetes Engineer',
  'Infrastructure Engineer',
  'System Administrator',
  'Network Engineer',
  'Security Engineer',
  'Cybersecurity Analyst',

  // Data & Analytics
  'Data Scientist',
  'Data Engineer',
  'Data Analyst',
  'Business Intelligence Analyst',
  'Machine Learning Engineer',
  'AI Engineer',
  'Analytics Engineer',
  'Database Administrator',
  'Big Data Engineer',

  // Design
  'UI Designer',
  'UX Designer',
  'UI/UX Designer',
  'Product Designer',
  'Graphic Designer',
  'Visual Designer',
  'Web Designer',
  'Interaction Designer',
  'User Researcher',
  'Design System Designer',

  // Product & Project Management
  'Product Manager',
  'Senior Product Manager',
  'Technical Product Manager',
  'Project Manager',
  'Program Manager',
  'Scrum Master',
  'Agile Coach',
  'Product Owner',

  // QA & Testing
  'QA Engineer',
  'Test Engineer',
  'Quality Assurance Analyst',
  'Automation Engineer',
  'SDET',
  'Performance Tester',

  // Marketing & Sales
  'Marketing Manager',
  'Digital Marketing Manager',
  'Content Marketing Manager',
  'SEO Specialist',
  'SEM Specialist',
  'Social Media Manager',
  'Growth Marketer',
  'Sales Development Representative',
  'Account Executive',
  'Business Development Manager',
  'Sales Engineer',

  // Content & Communication
  'Content Writer',
  'Technical Writer',
  'Copywriter',
  'Content Strategist',
  'Communications Manager',
  'Editor',

  // Customer Success & Support
  'Customer Success Manager',
  'Customer Support Specialist',
  'Technical Support Engineer',
  'Support Engineer',
  'Account Manager',
  'Client Success Manager',

  // HR & Operations
  'Human Resources Manager',
  'Recruiter',
  'Technical Recruiter',
  'Talent Acquisition Specialist',
  'People Operations Manager',
  'Operations Manager',
  'Business Analyst',

  // Finance & Accounting
  'Financial Analyst',
  'Accountant',
  'Controller',
  'CFO',
  'Finance Manager',

  // Leadership & Executive
  'Engineering Manager',
  'Director of Engineering',
  'VP of Engineering',
  'CTO',
  'Head of Product',
  'VP of Product',
  'CEO',
  'COO',
  'Technical Lead',
  'Team Lead',
  'Engineering Lead',
];

/**
 * Filter job titles based on search query
 */
export function filterJobTitles(query: string, limit: number = 10): string[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase().trim();

  // Exact prefix matches first
  const prefixMatches = JOB_TITLES.filter(title =>
    title.toLowerCase().startsWith(lowerQuery)
  );

  // Then partial matches
  const partialMatches = JOB_TITLES.filter(title =>
    !title.toLowerCase().startsWith(lowerQuery) &&
    title.toLowerCase().includes(lowerQuery)
  );

  return [...prefixMatches, ...partialMatches].slice(0, limit);
}
