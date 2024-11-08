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
        const teamStatsResponse = await axios.post('/api/proxy/teamStats', {
          teamID: teamID,
          year: year,
        });

        const { teamStats } = teamStatsResponse.data;

        const standingsResponse = await axios.post('/api/proxy/teamStandings', {
          year: year,
        });

        const standings = standingsResponse.data.leagues
          .flatMap((league) =>
            league.divisions.flatMap((division) => division.teams)
          )
          .find((team) => team.id === teamID);

        if (standings) {
          const standingsData = {
            games_played: standings.win + standings.loss,
            wins: standings.win,
            losses: standings.loss,
            win_percentage: (
              standings.win /
              (standings.win + standings.loss)
            ).toFixed(3),
          };

          const updatedTeamStats = {
            ...teamStats,
            ...standingsData,
          };

          setTeamStats([updatedTeamStats]);
        } else {
          setTeamStats([teamStats]);
        }
      } catch (error) {
        console.error('Error fetching team data:', error.message);
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
