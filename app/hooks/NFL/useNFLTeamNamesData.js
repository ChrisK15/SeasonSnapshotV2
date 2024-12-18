import { useState, useEffect } from 'react';
import axios from 'axios';

import { nflTeams } from '../../data/NFL/nflTeams';
import { yearList } from '../../data/years';

const useNFLTeamNamesData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [yearNumbers, setYearNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/NFL/nflTeams/');
        const filteredTeams = response.data.filter((team) =>
          nflTeams.some((NFLTeam) => NFLTeam.id === team.id)
        );
        setTeamNames(filteredTeams);
      } catch (error) {
        console.error('Error fetching NFL teams:', error.message);
        setError(error);
      }
    };

    const fetchYearNumbers = async () => {
      setYearNumbers(yearList);
    };

    fetchYearNumbers();
    fetchTeamNames();
  }, []);

  return { teamNames, yearNumbers, error };
};

export default useNFLTeamNamesData;