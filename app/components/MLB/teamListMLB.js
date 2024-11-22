import React from 'react';
import { Typography } from '@mui/material';

export default function TeamList({
  teamNames, // Array of MLB teams with name, id, etc.
  mlbTeams,  // Array of MLB teams with additional details like logo, division, etc.
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

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'left',
        marginRight: '40px',
        marginLeft: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      {Object.entries(
        teamNames.reduce((acc, teamObj) => {
          const division = mlbTeams.find(
            (mlbTeam) => mlbTeam.name === teamObj.market
          )?.division;
          if (!acc[division]) acc[division] = [];
          acc[division].push(teamObj);
          return acc;
        }, {})
      ).map(([division, teams]) => (
        <div key={division} style={{ marginBottom: '20px' }}>
          <Typography variant="h6">{division}</Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {teams.map((teamObj) => {
              const matchedTeam = mlbTeams.find(
                (mlbTeam) => mlbTeam.name === teamObj.market
              );
              return (
                <div
                  key={teamObj.id}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <img
                    src={matchedTeam?.logo}
                    alt={`${teamObj.name} logo`}
                    style={{
                      width: '24px',
                      height: '24px',
                      marginRight: '8px',
                    }}
                  />
                  <Typography
                    key={teamObj.id}
                    variant="body1"
                    component="a"
                    href="#"
                    onClick={() => handleTeamChangeFromList(teamObj.name)}
                    style={{
                      margin: '5px 0',
                      cursor: 'pointer',
                      color: '#1e88e5',
                      textDecoration: 'none',
                    }}
                  >
                    {teamObj.market} {teamObj.name}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
