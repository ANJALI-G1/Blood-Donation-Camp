import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"
import SearchPage from "./pages/SearchPage"
import ContactPage from "./pages/ContactPage"

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}
export default App