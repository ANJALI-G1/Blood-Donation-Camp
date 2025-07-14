import { useEffect, useState } from 'react';
import useCampStore from '../store/campStore';

export default function HomePage() {
  const { camps, loading, error, fetchAllCamps, getSearchedCamps } = useCampStore();

  const [searchType, setSearchType] = useState("keyword");
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    fetchAllCamps();
  }, [fetchAllCamps]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = {};

    if (searchType === "keyword" && searchValue.trim()) {
      params.keyword = searchValue.trim();
    }
    if (searchType === "location" && searchValue.trim()) {
      params.location = searchValue.trim();
    }
    if (searchType === "date" && dateValue) {
      params.date = dateValue;
    }

    if (Object.keys(params).length > 0) {
      await getSearchedCamps(params);
    }
  };

  const handleReset = async () => {
    setSearchValue("");
    setDateValue("");
    setSearchType("keyword");
    await fetchAllCamps();
  };

  return (
    <div>
      <h1>Blood Donation Camps</h1>

      {/* Search Section */}
      <form onSubmit={handleSearch}>
        <label>
          Search by:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="keyword">Name/Organization</option>
            <option value="location">Location</option>
            <option value="date">Date</option>
          </select>
        </label>

        {searchType === "date" ? (
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder={`Enter ${searchType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}

        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {/* Loading & Error */}
      {loading && <p>Loading camps...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Camps List */}
      {(!loading && camps.length === 0) ? (
        <p>No camps found</p>
      ) : (
        camps.map((camp) => (
          <div key={camp._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h2>{camp.name}</h2>
            <p><strong>Organization:</strong> {camp.organization}</p>
            <p><strong>Date:</strong> {new Date(camp.startDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(camp.startDate).toLocaleTimeString()}</p>
            <p><strong>Location (Coordinates):</strong> {camp.location.coordinates.join(', ')}</p>
            <p><strong>Contact:</strong> {camp.contact}</p>
            <a href={camp.registrationLink} target="_blank" rel="noreferrer">Register</a>
          </div>
        ))
      )}
    </div>
  );
}
