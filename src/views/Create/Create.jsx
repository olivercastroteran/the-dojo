import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';
import { useAuthContext, useCollection } from '../../hooks';
import useFireStore from '../../hooks/useFirestore';
import './Create.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Create = () => {
  const { user } = useAuthContext();
  const [project, setProject] = useState({
    name: '',
    details: '',
    dueDate: '',
    category: '',
    assignedUsers: [],
  });
  const [users, setUsers] = useState([]);
  const { documents } = useCollection('users');
  const [formError, setFormError] = useState(null);
  const { response, addDocument, cleanup } = useFireStore('projects');
  const navigate = useNavigate();

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => ({
        value: user,
        label: user.displayName,
      }));
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!project.category) {
      setFormError('Please select a project category');
      return;
    }

    if (project.assignedUsers.length < 1) {
      setFormError('Please assign at least 1 person');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = project.assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const projectEdited = {
      name: project.name,
      details: project.details,
      category: project.category.value,
      dueDate: timestamp.fromDate(new Date(project.dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(projectEdited);

    if (!response.error) {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      if (response.isPending) {
        cleanup();
      }
    };
  });

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            onChange={handleChange}
            value={project.name}
            required
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            placeholder="Project Details"
            name="details"
            onChange={handleChange}
            value={project.details}
            required
          />
        </label>

        <label>
          <span>Set due date:</span>
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={project.dueDate}
            required
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) =>
              setProject((prevProject) => ({
                ...prevProject,
                category: option,
              }))
            }
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) =>
              setProject((prevProject) => ({
                ...prevProject,
                assignedUsers: option,
              }))
            }
            isMulti
          />
        </label>

        <button className="btn" disabled={response.isPending}>
          {response.isPending ? 'Adding Project...' : 'Add Project'}
        </button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
