import { useState, useEffect } from "react";
import axios from "axios";

const useTeamData = (teamID, year) => {
    const [teamStats, setTeamStats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeamData = async () => {
          setLoading(true);
          try {
            const response = await axios.post('/api/proxy/teamStats', {
              teamID: teamID,
              year: year,
            });
            const { teamStats } = response.data;
            setTeamStats([teamStats]);
          } catch (error) {
            console.error('Error fetching team stats:', error.message);
          } finally {
            setLoading(false);
          }
        };
    
        if (teamID && year) {
          fetchTeamData();
        }
      }, [teamID, year]);
    
      return { teamStats, loading };
    };

    export default useTeamData;