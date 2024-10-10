import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoteComponent = () => {
    const [results, setResults] = useState({ manhwa: 0, anime: 0 });
    const [error, setError] = useState(null);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:5001/results'); // Updated to use port 5001
            setResults(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error fetching results");
        }
    };

    useEffect(() => {
        fetchResults();
        const interval = setInterval(fetchResults, 5000); 
        return () => clearInterval(interval); 
    }, []);

    const handleVote = async (version) => {
        try {
            await axios.post('http://localhost:5001/vote', { version });
            fetchResults(); 
        } catch (err) {
            console.error(err);
            setError(err.message || "Error submitting your vote");
        }
    };

    return (
        <div>
            <h1>Vote for Your Favorite Version of Tower of God</h1>
            <div>
                <button onClick={() => handleVote('manhwa')}>Vote for Manhwa</button>
                <button onClick={() => handleVote('anime')}>Vote for Anime</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Results:</h2>
            <p>Manhwa Votes: {results.manhwa}</p>
            <p>Anime Votes: {results.anime}</p>
        </div>
    );
};

export default VoteComponent;
