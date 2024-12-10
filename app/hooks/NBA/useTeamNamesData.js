import { useState, useEffect } from 'react';
import axios from 'axios';

import { nbaTeams } from '../../data/NBA/teams';
import { yearList } from '../../data/years';

const useTeamNamesData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [yearNumbers, setYearNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/NBA/teamNames/');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.some((nbaTeam) => nbaTeam.name === team.market)
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

export default useTeamNamesData;
