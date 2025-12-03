import {
  Code2,
  Paintbrush,
  Database,
  Headphones,
  FileText,
  Palette,
  Server,
  Users,
  TrendingUp,
  DollarSign,
  Lightbulb,
  CheckCircle,
  BarChart3,
  Asterisk,
  LucideIcon
} from 'lucide-react';

export interface JobCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  keywords: string[];
  color: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack Programming',
    icon: Code2,
    keywords: ['full-stack', 'full stack', 'fullstack', 'full-stack developer', 'full stack engineer'],
    color: '#00d4aa',
  },
  {
    id: 'frontend',
    name: 'Front-End Programming',
    icon: Paintbrush,
    keywords: ['frontend', 'front-end', 'front end', 'react', 'vue', 'angular', 'ui developer', 'javascript developer'],
    color: '#4A90E2',
  },
  {
    id: 'backend',
    name: 'Back-End Programming',
    icon: Database,
    keywords: ['backend', 'back-end', 'back end', 'api', 'server', 'node', 'python', 'java', 'go', 'rust'],
    color: '#50E3C2',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    icon: Headphones,
    keywords: ['customer support', 'support', 'customer service', 'help desk', 'technical support'],
    color: '#F5A623',
  },
  {
    id: 'content',
    name: 'Content',
    icon: FileText,
    keywords: ['content', 'writer', 'copywriter', 'content writer', 'editor', 'content creator'],
    color: '#BD10E0',
  },
  {
    id: 'designer',
    name: 'Designer',
    icon: Palette,
    keywords: ['designer', 'ui designer', 'ux designer', 'product designer', 'graphic designer', 'visual designer'],
    color: '#FF6B6B',
  },
  {
    id: 'devops',
    name: 'DevOps & SysAdmin',
    icon: Server,
    keywords: ['devops', 'sysadmin', 'system administrator', 'infrastructure', 'cloud', 'aws', 'azure', 'kubernetes'],
    color: '#7B68EE',
  },
  {
    id: 'hr',
    name: 'Human Resources (HR)',
    icon: Users,
    keywords: ['human resources', 'hr', 'recruiter', 'talent', 'people operations', 'hr manager'],
    color: '#4ECDC4',
  },
  {
    id: 'lead-director',
    name: 'Lead & Director',
    icon: TrendingUp,
    keywords: ['lead', 'director', 'head of', 'vp', 'vice president', 'cto', 'ceo', 'coo', 'manager'],
    color: '#FFD700',
  },
  {
    id: 'management-finance',
    name: 'Management & Finances',
    icon: DollarSign,
    keywords: ['finance', 'financial', 'accountant', 'accounting', 'controller', 'cfo', 'business analyst'],
    color: '#3CB371',
  },
  {
    id: 'products',
    name: 'Products',
    icon: Lightbulb,
    keywords: ['product manager', 'product', 'pm', 'product owner', 'product lead'],
    color: '#FF69B4',
  },
  {
    id: 'qa',
    name: 'Quality Assurance (QA)',
    icon: CheckCircle,
    keywords: ['qa', 'quality assurance', 'tester', 'test engineer', 'automation', 'quality engineer'],
    color: '#20B2AA',
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    icon: BarChart3,
    keywords: ['sales', 'marketing', 'business development', 'sdr', 'account executive', 'marketing manager'],
    color: '#FF8C00',
  },
  {
    id: 'wordpress',
    name: 'WordPress Developer',
    icon: Code2,
    keywords: ['wordpress', 'wp', 'wordpress developer', 'wordpress engineer', 'woocommerce'],
    color: '#21759B',
  },
  {
    id: 'other',
    name: 'Other',
    icon: Asterisk,
    keywords: [],
    color: '#808080',
  },
];

/**
 * Detect job category from title and description
 */
export function detectJobCategory(title: string, snippet: string = ''): string {
  const searchText = `${title} ${snippet}`.toLowerCase();

  // Check each category's keywords
  for (const category of JOB_CATEGORIES) {
    if (category.id === 'other') continue; // Skip "other" for now

    for (const keyword of category.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return category.id;
      }
    }
  }

  // Default to "other" if no match found
  return 'other';
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): JobCategory | undefined {
  return JOB_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get all category IDs
 */
export function getAllCategoryIds(): string[] {
  return JOB_CATEGORIES.map(cat => cat.id);
}
