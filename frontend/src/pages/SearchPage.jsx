import { useEffect, useState } from 'react';
import useCampStore from '../store/campStore';
import Card from '../components/Card';
import { 
  Search, 
  RotateCw, 
  Frown,
  Loader2
} from 'lucide-react';

const SearchPage = () => {
  const { camps, loading, error, fetchCamps, campSearch } = useCampStore();
  const [searchType, setSearchType] = useState('keyword');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  useEffect(() => {
    fetchCamps();
  }, [fetchCamps]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const params = {};
    if (searchType === 'keyword' && searchQuery.trim()) {
      params.keyword = searchQuery.trim();
    } else if (searchType === 'location' && searchQuery.trim()) {
      params.address = searchQuery.trim();
    } else if (searchType === 'date' && dateQuery) {
      params.date = dateQuery;
    } else {
      await fetchCamps();
      return;
    }

    await campSearch(params);
  };

  const handleReset = () => {
    setSearchType('keyword');
    setSearchQuery('');
    setDateQuery('');
    fetchCamps();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
     
      <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Blood Donation Camps
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for upcoming blood donation events by location, date or organization
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="p-1 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 "></div>
          <form onSubmit={handleSearch} className="p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-end">
              <div className="w-full lg:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search By
                </label>
                <select
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchQuery('');
                    setDateQuery('');
                  }}
                  className="w-full lg:w-48 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent shadow-sm text-gray-600"
                >
                  <option value="keyword">Name / Organization</option>
                  <option value="location">Location</option>
                  <option value="date">Date</option>
                </select>
              </div>
              
              <div className="w-full flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {searchType === 'date' ? 'Select Date' : 'Search Query'}
                </label>
                {searchType === 'date' ? (
                  <input
                    type="date"
                    value={dateQuery}
                    onChange={(e) => setDateQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent shadow-sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      searchType === 'keyword' 
                        ? 'e.g. Red Cross, Rotary Club...' 
                        : 'e.g. Mumbai, Bangalore...'
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent shadow-sm text-gray-500"
                  />
                )}
              </div>
              
              <div className="flex gap-4 w-full lg:w-auto">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 lg:flex-none bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900  text-white font-semibold px-6 py-3 rounded-lg  transition disabled:opacity-70 flex items-center justify-center min-w-[120px] shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 lg:flex-none bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition min-w-[120px] shadow-sm hover:shadow-md"
                >
                  <RotateCw className="h-5 w-5 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center mb-4">
                <Loader2 className="animate-spin h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Searching for camps</h3>
              <p className="text-gray-500">Please wait while we find matching blood donation events...</p>
            </div>
          )}

          {(!loading && camps.length === 0) || error ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Frown className="h-16 w-16 mx-auto text-gray-300" />
              <h3 className="mt-4 text-2xl font-medium text-gray-700">No camps found</h3>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                {searchQuery || dateQuery 
                  ? "We couldn't find any camps matching your search criteria."
                  : "There are currently no upcoming blood donation camps."}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                >
                  {searchQuery || dateQuery ? "Reset Search" : "Refresh"}
                </button>
              </div>
            </div>
          ) : null}

          {!loading && camps.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {camps.length} Camp{camps.length !== 1 ? 's' : ''} Available
                </h2>
                <div className="text-sm text-gray-500">
                  Showing all matching results
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map((camp) => (
                  <Card key={camp._id || camp.id} camp={camp} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;