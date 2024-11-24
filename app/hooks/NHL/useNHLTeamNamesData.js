import { useState, useEffect } from 'react';
import axios from 'axios';

import { nhlTeams } from '../../data/NHL/nhlTeams';
import { yearList } from '../../data/years';

const useNHLTeamNamesData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [yearNumbers, setYearNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/NHL/nhlTeams');
        const filteredTeams = response.data.filter((team) =>
          nhlTeams.some((NHLTeam) => NHLTeam.id === team.id)
        );
        setTeamNames(filteredTeams);
      } catch (error) {
        console.error('Error fetching NHL teams:', error.message);
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

export default useNHLTeamNamesData;