import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Dashboard  />
      <Toaster position="top-right" />
    </>
  );
}

export default App;