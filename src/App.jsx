import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create, Dashboard, Login, Project, Signup } from './views';
import { Navbar, Sidebar } from './components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/projects/:id/*" element={<Project />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
