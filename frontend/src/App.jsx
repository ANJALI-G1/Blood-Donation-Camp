import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
const App = () => {
  return (
    <Routes>
      <Route element={<HomePage/>} path='/'/>
    </Routes>
    
  )
}
export default App