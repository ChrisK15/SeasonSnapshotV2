import { useState, useEffect } from 'react';
import axios from 'axios';

const usePlayerData = (teamID, year) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/proxy/NBA/teamStats', {
          teamID: teamID,
          year: year,
        });
        const { players } = response.data;
        setPlayerStats(players);
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

export default usePlayerData;
