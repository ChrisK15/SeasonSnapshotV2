import { useState, useEffect } from 'react';
import axios from 'axios';

import { nflTeams } from '../data/nflTeams';
import { yearList } from '../data/years';

const useNFLTeamsData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [yearNumbers, setYearNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/nflTeams/');
        const filteredTeams = response.data.filter((team) =>
          nflTeams.some((NFLTeam) => NFLTeam.ID === team.ID)
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

export default useNFLTeamsData;