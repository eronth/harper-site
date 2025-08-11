import { Link } from "react-router-dom";
import type { Project } from "../../../types/project-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
// Functions
import {
  createSlug,
  formatDate,
  getStatusColor,
  getStatusIcon,
  getWorkerIcon
} from '../ProjectHelperFunctions';
import './SmallProjectCard.css';

type Props = {
  project: Project;
};
export default function SmallProjectCard({ project }: Props) {
  return (
    <Link
      key={project.id} 
      to={`/passions/project/${createSlug(project.id)}`} 
      className="project-card"
    >
      {/* Project image */}
      <div className="project-image">
        {project.images.length > 0 ? (
          <img 
            src={project.images[0].src} 
            alt={project.images[0].alt}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = '/images/placeholder-project.jpg';
            }}
          />
        ) : (
          <div className="image-placeholder">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>
        )}
      </div>

      {/* Project info */}
      <div className="project-info">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-meta">
            <span className="project-worker">
              <FontAwesomeIcon icon={getWorkerIcon(project.worker)} />
              {project.worker}
            </span>
            <span 
              className="project-status"
              style={{ color: getStatusColor(project.status) }}
            >
              <FontAwesomeIcon icon={getStatusIcon(project.status)} />
              {project.status}
            </span>
          </div>
        </div>

        <p className="project-description">{project.shortDescription}</p>

        <div className="project-footer">
          <span className="project-category">{project.category}</span>
          <div className='project-dates-container'>
            <div className="project-date">
              Started - {formatDate(project.startDate)}
            </div>
            {project.lastUpdated && (
              <div className="project-date">
                Last Updated - {formatDate(project.lastUpdated)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
