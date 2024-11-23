import React from 'react';
import { Typography } from '@mui/material';

export default function TeamList({
  teamNames,
  mlbTeams,
  year,
  setTeam,
  setTeamID,
  setOpenTable,
}) {
  const handleTeamChangeFromList = (teamName) => {
    if (!year) {
      alert('Choose a year.');
    } else {
      setTeam(teamName);
      const selectedTeamObj = teamNames.find(
        (teamObj) => teamObj.name === teamName
      );
      if (selectedTeamObj) {
        setTeamID(selectedTeamObj.id);
        setOpenTable(true);
      }
    }
  };

  // Specify the order of divisions
  const divisionOrder = ['AL East', 'AL Central', 'AL West', 'NL East', 'NL Central', 'NL West'];


  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Three columns
        gap: '20px',
        textAlign: 'left',
      }}
    >
      {divisionOrder.map((division) => {
        // Filter and group teams by the division
        const teamsInDivision = teamNames.reduce((acc, teamObj) => {
          const matchedTeam = mlbTeams.find(
            (mlbTeam) => mlbTeam.id === teamObj.id
          );

          if (matchedTeam && matchedTeam.division === division) {
            acc.push({
              ...teamObj,
              logo: matchedTeam.logo,
              market: matchedTeam.market || 'Unknown',
            });
          }
          return acc;
        }, []);

        if (teamsInDivision.length === 0) return null; // Skip empty divisions

        return (
          <div key={division} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography
              variant="h6"
              style={{
                textAlign: 'center',
                marginBottom: '10px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {division}
            </Typography>
            {teamsInDivision.map((teamObj) => (
              <div
                key={teamObj.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {teamObj.logo ? (
                  <img
                    src={teamObj.logo}
                    alt={`${teamObj.market} ${teamObj.name} logo`}
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#ddd',
                    }}
                  />
                )}
                <Typography
                  variant="body1"
                  component="a"
                  href="#"
                  onClick={() => handleTeamChangeFromList(teamObj.name)}
                  style={{
                    color: '#1e88e5',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {teamObj.market ? `${teamObj.market} ${teamObj.name}` : teamObj.name}
                </Typography>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
