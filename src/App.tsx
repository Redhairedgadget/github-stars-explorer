import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepositoryList from './pages/RepositoryList';
import RepositoryPage from './pages/RepositoryPage';
import Owner from './pages/Owner';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RepositoryList/>} />
      <Route path="/repository/:owner/:repo" element={<RepositoryPage/>} />
      <Route path="/owner/:owner" element={<Owner/>} />
    </Routes>
  </Router>
);

export default App;
