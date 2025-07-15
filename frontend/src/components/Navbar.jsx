import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
    {/* Navbar */}
      <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold">DonarBridge</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/camps" className="hover:underline">Camps</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>
    </>
  )
}