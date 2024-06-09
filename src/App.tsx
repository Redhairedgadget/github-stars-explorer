import {useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import RepoList from './pages/RepoList';
import OwnerDetails from './pages/OwnerDetails';
import RepoDetails from './pages/RepoDetails';
import Header from './components/layout/Header'
import Content from './components/layout/Content';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Router>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<RepoList currentPage={currentPage} setCurrentPage={setCurrentPage}/>} />
          <Route path="/repository/:owner/:repoName" element={<RepoDetails/>} />
          <Route path="/owner/:owner" element={<OwnerDetails/>} />
        </Routes>
      </Content>
    </Router>
  )
};

export default App;
