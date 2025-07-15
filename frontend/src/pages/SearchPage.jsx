import { useEffect, useState } from 'react';
import useCampStore from '../store/campStore';
import Card from '../components/Card';

const SearchPage = () => {
  const {
    camps,
    loading,
    error,
    fetchAllCamps,
    getSearchedCamps
  } = useCampStore();

  const [searchType, setSearchType] = useState('keyword');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchAllCamps();
  }, [fetchAllCamps]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const searchParams = {};
    if (searchType === 'keyword') searchParams.keyword = trimmed;
    if (searchType === 'location') searchParams.location = trimmed;
    if (searchType === 'date') searchParams.date = trimmed;

    await getSearchedCamps(searchParams);
  };

  const handleReset = () => {
    setQuery('');
    setSearchType('keyword');
    fetchAllCamps();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Search Blood Donation Camps
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10"
      >
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
        >
          <option value="keyword">Name / Organization</option>
          <option value="location">Location</option>
          <option value="date">Date (YYYY-MM-DD)</option>
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search..."
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring focus:ring-red-300"
        />

        <button
          type="submit"
          className="bg-red-600 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="text-gray-600 hover:underline"
        >
          Reset
        </button>
      </form>

      {/* Results */}
      {loading && <p className="text-center text-gray-500">Loading camps...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && camps.length === 0 && (
        <p className="text-center text-gray-500">No camps found</p>
      )}

      {/* Camp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {camps.map((camp) => (
          <Card key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
