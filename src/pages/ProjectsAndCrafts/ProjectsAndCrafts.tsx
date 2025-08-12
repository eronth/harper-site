
import { useMemo, useState } from 'react';
// Componenets
import ProjectPageFilters from './ProjectPageFilters/ProjectPageFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import SmallProjectCard from './SmallProjectCard/SmallProjectCard';
// Types
import type { Project, ProjectWorker, ProjectStatus, ProjectCategory } from '../../types/project-types';
// Data
import projects from './ProjectData/project-data';
// Css
import './ProjectsAndCrafts.css';

export default function ProjectsAndCrafts() {
  const [filterWorker, setFilterWorker] = useState<ProjectWorker | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | 'All'>('All');

  // Filter projects based on selected filters
  const filteredProjects: Project[] = useMemo(() => {
    return projects.filter(project => {
      const matchesWorker = filterWorker === 'All' || project.worker === filterWorker;
      const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
      const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
      return matchesWorker && matchesStatus && matchesCategory;
    });
  }, [filterCategory, filterStatus, filterWorker]);

  // Sort projects by start date (most recent first)
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }, [filteredProjects]);

  const filters = useMemo(() =>
    <ProjectPageFilters
      filterWorkerReactState={[filterWorker, setFilterWorker]}
      filterStatusReactState={[filterStatus, setFilterStatus]}
      filterCategoryReactState={[filterCategory, setFilterCategory]}
    />,
  [filterCategory, filterStatus, filterWorker]);

  const resultCount = useMemo(() =>
    <div className="results-info">
      Showing {sortedProjects.length} of {projects.length} projects
    </div>,
  [sortedProjects.length]);

  const projectsGrid = useMemo(() =>
    <div className="projects-grid">
      {sortedProjects.map((project) => (
        <SmallProjectCard key={project.id} project={project} />
      ))}
    </div>,
  [sortedProjects]);

  const noProjects = useMemo(() =>
    <div className="no-projects">
      <FontAwesomeIcon icon={faLightbulb} />
      <h3>No projects match your filters</h3>
      <p>Try adjusting your filter criteria to see more projects.</p>
    </div>,
  []);

  return (
    <div className="page-content">
      <div className="projects-header">
        <h1>Projects & Crafts</h1>
        <p>Our creative projects, repairs, and experiments - where curiosity meets craftsmanship!</p>
      </div>

      {/* Filters */}
      {filters}

      {/* Results count */}
      {resultCount}

      {/* Project grid */}
      {projectsGrid}

      {sortedProjects.length === 0 && (noProjects)}
    </div>
  );
};
