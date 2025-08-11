
import { useMemo, useState } from 'react';
// Componenets
import ProjectPageFilters from './ProjectPageFilters/ProjectPageFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
// Types
import type { Project, ProjectWorker, ProjectStatus, ProjectCategory } from '../../types/project-types';
// Data
import projects from './ProjectData/project-data';
// Css
import './PassionsAndHobbies.css';
import SmallProjectCard from './SmallProjectCard/SmallProjectCard';

export default function PassionsAndHobbies() {
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

  return (
    <div className="page-content">
      <div className="passions-header">
        <h1>Passions & Hobbies</h1>
        <p>Our creative projects, repairs, and experiments - where curiosity meets craftsmanship!</p>
      </div>

      {/* Filters */}
      <ProjectPageFilters
        filterWorkerReactState={[filterWorker, setFilterWorker]}
        filterStatusReactState={[filterStatus, setFilterStatus]}
        filterCategoryReactState={[filterCategory, setFilterCategory]}
      />

      {/* Results count */}
      <div className="results-info">
        Showing {sortedProjects.length} of {projects.length} projects
      </div>

      {/* Project grid */}
      <div className="projects-grid">
        {sortedProjects.map((project) => (
          <SmallProjectCard key={project.id} project={project} />
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="no-projects">
          <FontAwesomeIcon icon={faLightbulb} />
          <h3>No projects match your filters</h3>
          <p>Try adjusting your filter criteria to see more projects.</p>
        </div>
      )}
    </div>
  );
};
