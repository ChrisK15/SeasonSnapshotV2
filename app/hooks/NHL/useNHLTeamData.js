import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeamData = (teamID, year) => {
  const [teamStats, setTeamStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const teamStatsResponse = await axios.post('/api/proxy/NHL/nhlTeamStats', {
          teamID: teamID,
          year: year,
        });

        console.log("Response from API:", teamStatsResponse.data);

        const { nhlTeamStats } = teamStatsResponse.data;

        setTeamStats(nhlTeamStats);

      } catch (error) {
        console.error('Error fetching NHL team data:', error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (teamID && year) {
      fetchTeamData();
    }
  }, [teamID, year]);

  return { teamStats, loading, error };
};

export default useTeamData;