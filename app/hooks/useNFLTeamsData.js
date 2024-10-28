import { useState, useEffect } from 'react';
import axios from 'axios';

const useNFLTeamsData = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/nflTeams/');
        setTeamNames(response.data); // Store the NFL teams in state
      } catch (error) {
        console.error('Error fetching NFL teams:', error.message);
        setError(error);
      }
    };

    fetchTeamNames();
  }, []);

  return { teamNames, error };
};

export default useNFLTeamsData;