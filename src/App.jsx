import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Create, Dashboard, Login, Project, Signup } from './views';
import { Loader, Navbar, Sidebar } from './components';
import { useAuthContext } from './hooks';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady ? (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/projects/:id/*"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
