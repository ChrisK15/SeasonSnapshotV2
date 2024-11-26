import { useState, useEffect } from 'react';
import axios from 'axios';

const useNHLPlayerData = (teamID, year) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
        setLoading(true);
        try {
          const response = await axios.post('/api/proxy/NHL/nhlTeamStats', {
            teamID: teamID,
            year: year,
          });
          const players = response.data.nhlTeamStats.players;
          setPlayerStats(players);
          console.log("Player stats set:", players);
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

export default useNHLPlayerData;
