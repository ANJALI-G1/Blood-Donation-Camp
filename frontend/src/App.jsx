import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';
import { Navbar } from './components/Navbar';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
};

export default App;
