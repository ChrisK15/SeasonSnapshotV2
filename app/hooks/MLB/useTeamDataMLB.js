import { useState, useEffect } from 'react';
import axios from 'axios';

const useMLBTeamData = (teamID, year) => {
  const [teamStats, setTeamStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const teamStatsResponse = await axios.post('/api/proxy/MLB/teamStatsMLB', {
          teamID: teamID,
          year: year,
        });

        const { teamStats } = teamStatsResponse.data;

        // Fetch team standings for additional fields
        const standingsResponse = await axios.post('/api/proxy/MLB/teamStandingsMLB', {
          year: year,
        });

        console.log("standingsResponse.data:", standingsResponse.data); // Log to inspect structure

        // Check if league -> season -> leagues array exists in the response
        const leagues = standingsResponse.data?.league?.season?.leagues;
        if (!leagues) {
          throw new Error("Leagues data is missing in standings response");
        }

        // Access the teams using flatMap if leagues exist
        const standings = leagues
          .flatMap((league) => league.divisions.flatMap((division) => division.teams))
          .find((team) => team.id === teamID);

        if (standings) {
          const standingsData = {
            games_played: standings.win + standings.loss,
            wins: standings.win,
            losses: standings.loss,
            win_percentage: (
              standings.win / (standings.win + standings.loss)
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
        console.error('Error fetching MLB team data:', error.message);
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

export default useMLBTeamData;
