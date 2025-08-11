import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import type {
  ProjectCategory,
  ProjectStatus,
  ProjectWorker
} from "../../../types/project-types";
import './ProjectPageFilters.css';

type Props = {
  filterWorkerReactState: [
    filterWorker: ProjectWorker | "All",
    setFilterWorker:  React.Dispatch<React.SetStateAction<ProjectWorker | "All">>
  ];
  filterStatusReactState: [
    filterStatus: ProjectStatus | "All",
    setFilterStatus: React.Dispatch<React.SetStateAction<ProjectStatus | "All">>
  ];
  filterCategoryReactState: [
    filterCategory: ProjectCategory | "All",
    setFilterCategory: React.Dispatch<React.SetStateAction<ProjectCategory | "All">>
  ];
}

export default function ProjectPageFilters({
  filterWorkerReactState,
  filterStatusReactState,
  filterCategoryReactState
}: Props) {
  const [filterWorker, setFilterWorker]
    = filterWorkerReactState;
  const [filterStatus, setFilterStatus]
    = filterStatusReactState;
  const [filterCategory, setFilterCategory]
    = filterCategoryReactState;

  // Get unique values for filter dropdowns
  const uniqueWorkers: ProjectWorker[] = ['Nic', 'Leslie', 'Both'];
  const uniqueStatuses: ProjectStatus[] = ['Planning', 'In Progress', 'Completed', 'On Hold'];
  const uniqueCategories: ProjectCategory[] = [
    'Electronics', 'Crafts', 'Woodworking', 'Leatherwork', 'Cooking', 
    'Gardening', 'Home Improvement', 'Technology', 'Art', 'Music', 'Other'
  ];

  return (
    <div className="project-filters">
      <div className="filter-section">
        <FontAwesomeIcon icon={faFilter} />
        <span className="filter-label">Filter by:</span>
        
        <select 
          value={filterWorker} 
          onChange={(e) => setFilterWorker(e.target.value as ProjectWorker | 'All')}
          className="filter-select"
        >
          <option value="All">All Workers</option>
          {uniqueWorkers.map(worker => (
            <option key={worker} value={worker}>{worker}</option>
          ))}
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'All')}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value as ProjectCategory | 'All')}
          className="filter-select"
        >
          <option value="All">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
