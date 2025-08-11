export type ProjectWorker = 'Nic' | 'Leslie' | 'Both';

export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'On Hold';

export type ProjectCategory = 
  | 'Electronics'
  | 'Crafts'
  | 'Home Assistant'
  | 'Woodworking'
  | 'Leatherwork'
  | 'Cooking'
  | 'Gardening'
  | 'Home Improvement'
  | 'Technology'
  | 'Art'
  | 'Music'
  | 'Other';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
};

export interface Project {
  id: string;
  title: string;
  worker: ProjectWorker;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string; // ISO date string
  lastUpdated: string; // ISO date string
  completedDate?: string; // ISO date string

  shortDescription: string;
  detailedDescription: React.ReactNode;
  
  images: ProjectImage[];
  materials?: string[];

  tools?: string[];
  steps?: string[];
  walkthrough: React.ReactNode;

  summary: {
    challenges?: string[];
    learnings?: string[];
    nextSteps?: string[];
    relatedLinks?: { title: string; url: string }[];
  };
};
