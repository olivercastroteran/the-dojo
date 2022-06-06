import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, isPending, error, cleanup } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user.email, user.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
      <h2>Login</h2>

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

      <button className="btn" disabled={isPending}>
        {isPending ? 'loading...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
