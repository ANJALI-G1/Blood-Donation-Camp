import { useEffect } from "react";
import useCampStore from "../store/campStore";
const HomePage = () => {
    const { camps, loading, error, fetchAllCamps } = useCampStore();

    useEffect(() => {
        console.log('Initiating camps fetch...');
        fetchAllCamps();
    }, [fetchAllCamps]);

    // Enhanced debug logging
    console.log('Current state:', {
        loading,
        error,
        campsCount: camps?.length,
        campsData: camps
    });

    if (loading) return <div className="loading">Loading camps...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="home-page">
            <h1>Blood Donation Camps</h1>
            
            {camps?.length > 0 ? (
                <div className="camps-list">
                    {camps.map(camp => (
                        <div className="card" key={camp._id}>
                            <h2>{camp.name}</h2>
                            <p>Organization: {camp.organization}</p>
                            <p>Location: {camp.location?.coordinates?.join(', ')}</p>
                            <p>Dates: {new Date(camp.startDate).toLocaleString()} - {new Date(camp.endDate).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No camps found - Debug Info:</p>
                    <button onClick={() => {
                        console.log('Manual refresh initiated');
                        fetchAllCamps();
                    }}>
                        Retry Fetch
                    </button>
                    <div className="debug-output">
                        <h3>API Response Analysis</h3>
                        <pre>{JSON.stringify({
                            campsExist: camps?.length > 0,
                            firstCamp: camps?.[0],
                            loadingState: loading,
                            errorState: error
                        }, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};