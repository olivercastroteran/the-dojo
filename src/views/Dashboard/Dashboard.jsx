import { useState } from 'react';
import { ProjectList } from '../../components';
import { useAuthContext, useCollection } from '../../hooks';
import { ProjectFilter } from './components';
import './Dashboard.css';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currentFilter;
          default:
            return documents;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
