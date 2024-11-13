import { useState, useEffect } from 'react';
import axios from 'axios';

const useNFLPlayerData = (teamID, year) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
        setLoading(true);
        try {
          const response = await axios.post('/api/proxy/nflTeamStats', {
            teamID: teamID,
            year: year,
          });
          const players = response.data.nflTeamStats.players;
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

export default useNFLPlayerData;
