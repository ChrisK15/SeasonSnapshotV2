import { useState, useEffect } from 'react';
import axios from 'axios';

const useStandings = (teamID, year) => {
  const [loading, setLoading] = useState(false);
  const [standingsData, setStandingsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/proxy/teamStandings', {
          year: year,
        });
        const standings = response.data.conferences
          .flatMap((conference) =>
            conference.divisions.flatMap((division) => division.teams)
          )
          .find((team) => team.id === teamID);
        if (standings) {
          setStandingsData({
            games_played: standings.wins + standings.losses,
            wins: standings.wins,
            losses: standings.losses,
            win_percentage: (
              standings.losses /
              (standings.wins + standings.losses)
            ).toFixed(3),
          });
        } else {
          setStandingsData(null);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (teamID && year) {
      fetchStandings();
    }
  }, [teamID, year]);

  return { standingsData, loading, error };
};

export default useStandings;
