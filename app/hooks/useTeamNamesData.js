import { useState, useEffect } from 'react';
import axios from 'axios';

const useTeamNamesData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/teamNames/');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.some((nbaTeam) => nbaTeam.name === team.market)
        );

        setTeamNames(filteredTeams);
      } catch (error) {
        console.error('Error fetching team names:', error.message);
        setError(error);
      }
    };

    const getYearNumbers = async () => {
      setYearNumbers(yearList);
    };

    getYearNumbers();
    getTeamNames();
  }, []);
};
