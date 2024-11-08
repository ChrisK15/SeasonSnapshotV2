import { useState, useEffect } from 'react';
import axios from 'axios';

import { mlbTeams } from '../../data/MLB/teamsMLB'; // Import MLB teams
import { yearList } from '../../data/years'; // Assuming `yearList` is shared or MLB-specific

const useTeamNamesDataMLB = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [yearNumbers, setYearNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/MLB/teamNamesMLB'); // MLB-specific endpoint

        // Filter response data to include only MLB teams, matching by name
        const filteredTeams = response.data.teams.filter((team) =>
          mlbTeams.some((mlbTeam) => mlbTeam.name === team.market)
        );

        setTeamNames(filteredTeams);
      } catch (error) {
        console.error('Error fetching team names:', error.message);
        setError(error);
      }
    };

    const fetchYearNumbers = async () => {
      setYearNumbers(yearList);
    };

    fetchTeamNames();
    fetchYearNumbers();
  }, []);

  return { teamNames, yearNumbers, error };
};

export default useTeamNamesDataMLB;
