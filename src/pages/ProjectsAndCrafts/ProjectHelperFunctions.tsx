import type {
  ProjectStatus,
  ProjectWorker
} from "../../types/project-types";
import { 
  faUser, 
  faUsers, 
  faClock, 
  faCheckCircle, 
  faPauseCircle, 
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

// Create a slug from project id for URL-friendly ID
const createSlug = (id: string): string => {
  return id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const getStatusIcon = (status: ProjectStatus) => {
  switch (status) {
    case 'Completed':
      return faCheckCircle;
    case 'In Progress':
      return faClock;
    case 'On Hold':
      return faPauseCircle;
    case 'Planning':
      return faLightbulb;
    default:
      return faClock;
  }
};

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'Completed':
      return '#4CAF50';
    case 'In Progress':
      return '#2196F3';
    case 'On Hold':
      return '#FF9800';
    case 'Planning':
      return '#9C27B0';
    default:
      return '#757575';
  }
};

const getWorkerIcon = (worker: ProjectWorker) => {
  return worker === 'Both' ? faUsers : faUser;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export {
  createSlug,
  getStatusIcon,
  getStatusColor,
  getWorkerIcon,
  formatDate
};
