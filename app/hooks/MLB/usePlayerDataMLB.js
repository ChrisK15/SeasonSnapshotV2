import { useState, useEffect } from 'react';
import axios from 'axios';

const usePlayerDataMLB = (teamID, year) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/proxy/MLB/teamStatsMLB', {
          teamID: teamID,
          year: year,
        });
        const { playerStats } = response.data; // Ensure the response structure matches MLB data
        setPlayerStats(playerStats);
      } catch (error) {
        console.error('Error fetching player stats:', error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (teamID && year) {
      fetchPlayerData();
    }
  }, [teamID, year]);

  return { playerStats, loading, error };
};

export default usePlayerDataMLB;
