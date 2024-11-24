import { useState, useEffect } from 'react';
import axios from 'axios';

const useNHLTeamStandingsData = (year) => {
  const [teamStandings, setTeamStandings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStandings = async () => {
      setLoading(true);
      try {
        // Make an API request using axios
        const standingsResponse = await axios.post('/api/proxy/NHL/nhlTeamStandings', {
          year: year,
        });

        console.log("Response from API:", standingsResponse.data);

        const { nhlStandings } = standingsResponse.data;

        setTeamStandings(nhlStandings); // Set the fetched data

      } catch (error) {
        console.error('Error fetching NFL team standings:', error.message);
        setError(error); // Set error in case of failure
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    if (year) {
      fetchTeamStandings(); // Fetch only if the year is provided
    }
  }, [year]);

  return { teamStandings, loading, error };
};

export default useNHLTeamStandingsData;