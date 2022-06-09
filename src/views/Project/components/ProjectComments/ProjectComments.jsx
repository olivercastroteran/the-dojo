import { useEffect, useState } from 'react';
import { Avatar } from '../../../../components';
import { timestamp } from '../../../../firebase/config';
import { useAuthContext } from '../../../../hooks';
import useFireStore from '../../../../hooks/useFirestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './ProjectComments.css';

const ProjectComments = ({ project }) => {
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState('');
  const { response, updateDocument, cleanup } = useFireStore('projects');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewComment(value);
  };

  useEffect(() => {
    return () => {
      if (response.isPending) {
        cleanup();
      }
    };
  });

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            placeholder="Add comment"
            name="newComment"
            onChange={handleChange}
            value={newComment}
            required
          />
        </label>
        <button className="btn" disabled={response.isPending}>
          {response.isPending ? 'Adding comment...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default ProjectComments;
