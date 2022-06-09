import { useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { useDocument } from '../../hooks';
import { ProjectComments, ProjectSummary } from './components';
import './Project.css';

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <Loader />;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export default Project;
