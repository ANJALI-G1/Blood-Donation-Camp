import { useEffect } from 'react';
import useCampStore from '../store/campStore';

export default function HomePage() {
  const { camps, loading, error, fetchAllCamps } = useCampStore();

  // Fetch camps on component mount
  useEffect(() => {
    fetchAllCamps();
  }, [fetchAllCamps]);

  const handleSearch=async (e)=>{
    e.preventDefault();
    
  }

  if (loading) return <div className="text-center py-8">Loading camps...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blood Donation Camps</h1>
      
      {camps.length === 0 ? (
        <p className="text-center text-gray-500">No camps found</p>
      ) : (
        <div className="space-y-6">
          {camps.map((camp) => (
            <div key={camp._id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-semibold">{camp.name}</h2>
              <div className="mt-2 space-y-1 text-gray-600">
                <p><span className="font-medium">Organization:</span> {camp.organization}</p>
                <p><span className="font-medium">Date:</span> {new Date(camp.startDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {new Date(camp.startDate).toLocaleTimeString()}</p>
                <p><span className="font-medium">Location:</span> {camp.location.coordinates.join(', ')}</p>
                <p><span className="font-medium">Contact:</span> {camp.contact}</p>
              </div>
              <a
                href={camp.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
              >
                Register Now
              </a>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSearch}>
       
        <input type='text'></input>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}