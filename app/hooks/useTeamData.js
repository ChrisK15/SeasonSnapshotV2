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

        const standings = standingsResponse.data.conferences
          .flatMap((conference) =>
            conference.divisions.flatMap((division) => division.teams)
          )
          .find((team) => team.id === teamID);

        if (standings) {
          const standingsData = {
            games_played: standings.wins + standings.losses,
            wins: standings.wins,
            losses: standings.losses,
            win_percentage: (
              standings.wins /
              (standings.wins + standings.losses)
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
