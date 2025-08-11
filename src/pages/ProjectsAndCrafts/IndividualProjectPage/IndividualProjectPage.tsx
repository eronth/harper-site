import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faCheckCircle,
  faCalendarAlt,
  faTag,
  faTools,
  faList,
  faExclamationTriangle,
  faGraduationCap,
  faArrowRight,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import projects from '../ProjectData/project-data';
import './IndividualProjectPage.css';
import { createSlug, formatDate, getStatusColor, getStatusIcon, getWorkerIcon } from '../ProjectHelperFunctions';

export default function IndividualProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Find the project by matching the slug
  const project = projects.find(p => createSlug(p.id) === projectId);
  
  if (!project) {
    return (
      <div className="page-content">
        <div className="individual-project-page">
          <button 
            className="back-button"
            onClick={() => navigate('/projects')}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Projects & Crafts
          </button>
          <div className="error-message">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="individual-project-page">
        <button 
          className="back-button"
          onClick={() => navigate('/projects')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Projects & Crafts
        </button>
        
        <div className="project-container">
          {/* Project header */}
          <div className="project-header">
            <div className="project-title-section">
              <h1>{project.title}</h1>
              <div className="project-meta-info">
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
                <span className="project-category">
                  <FontAwesomeIcon icon={faTag} />
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="project-dates">
              <div className="date-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Started: {formatDate(project.startDate)}</span>
              </div>
              {project.lastUpdated && (
                <div className="date-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Last Updated: {formatDate(project.lastUpdated)}</span>
                </div>
              )}
              {project.completedDate && (
                <div className="date-item">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Completed: {formatDate(project.completedDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project images */}
          {project.images.length > 0 && (
            <div className="project-images">
              {project.images.map((image, index) => (
                <div key={index} className="project-image-item">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-project.jpg';
                      e.currentTarget.alt = 'Project image placeholder';
                    }}
                  />
                  {image.caption && (
                    <p className="image-caption">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Project description */}
          <div className="project-description">
            <h2>About This Project</h2>
            <div className="description-content">
              {project.detailedDescription}
            </div>
          </div>

          {/* Project details grid */}
          <div className="project-details-grid">
            {/* Materials */}
            {project.materials && project.materials.length > 0 && (
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faList} />
                  Materials
                </h3>
                <ul>
                  {project.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faTools} />
                  Tools
                </h3>
                <ul>
                  {project.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {project.steps && project.steps.length > 0 && (
              <div className="detail-section full-width">
                <h3>
                  <FontAwesomeIcon icon={faList} />
                  Process Steps
                </h3>
                <ol className="steps-list">
                  {project.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Challenges */}
            {project?.summary?.challenges && project.summary.challenges.length > 0 && (
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  Challenges
                </h3>
                <ul>
                  {project.summary.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learnings */}
            {project?.summary?.learnings && project.summary.learnings.length > 0 && (
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  What I Learned
                </h3>
                <ul>
                  {project.summary.learnings.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {project?.summary?.nextSteps && project.summary.nextSteps.length > 0 && (
              <div className="detail-section full-width">
                <h3>
                  <FontAwesomeIcon icon={faArrowRight} />
                  Next Steps
                </h3>
                <ul>
                  {project.summary.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Links */}
            {project?.summary?.relatedLinks && project.summary.relatedLinks.length > 0 && (
              <div className="detail-section full-width">
                <h3>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  Related Links
                </h3>
                <div className="related-links">
                  {project.summary.relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="related-link"
                    >
                      {link.title}
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
