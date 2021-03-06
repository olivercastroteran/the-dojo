import { useEffect, useState } from 'react';
import { useSignup } from '../../hooks';
import './Signup.css';

const Signup = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { signup, isPending, error, cleanup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(user.email, user.password, user.name, thumbnail);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be les than 100Kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('thumbnail updated');
  };

  useEffect(() => {
    return () => {
      if (isPending) {
        cleanup();
      }
    };
  });

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        <span>email:</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
        />
      </label>

      <label>
        <span>password:</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
        />
      </label>

      <label>
        <span>name:</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={user.name}
          required
        />
      </label>

      <label>
        <span>profile thumbnail:</span>
        <input
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
          required
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      <button className="btn" disabled={isPending}>
        {isPending ? 'loading...' : 'Sign up'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
