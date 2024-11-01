import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeamDataMLB = (teamID, year) => {
  const [teamStats, setTeamStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        // Fetch team-specific statistics
        const teamStatsResponse = await axios.post('/api/proxy/MLB/teamStatsMLB', {
          teamID: teamID,
          year: year,
        });

        const { teamStats } = teamStatsResponse.data; // Ensure response structure matches MLB data

        // Fetch team standings for the specific year
        const standingsResponse = await axios.post('/api/proxy/MLB/teamStandingsMLB', {
          year: year,
        });

        // Assuming `standingsResponse.data` contains an array of teams with wins and losses
        const standings = standingsResponse.data.teams.find((team) => team.id === teamID);

        if (standings) {
          // Calculate standings-related data for MLB
          const standingsData = {
            games_played: standings.wins + standings.losses,
            wins: standings.wins,
            losses: standings.losses,
            win_percentage: (
              standings.wins /
              (standings.wins + standings.losses)
            ).toFixed(3),
          };

          // Merge team stats with standings data
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

export default useTeamDataMLB;
