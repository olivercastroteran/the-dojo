import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../../../components';
import { useAuthContext, useFirestore } from '../../../../hooks';
import './ProjectSummary.css';

const ProjectSummary = ({ project }) => {
  const { response, deleteDocument, cleanup } = useFirestore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate('/');
  };

  useEffect(() => {
    return () => {
      if (response.isPending) {
        cleanup();
      }
    };
  });

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
