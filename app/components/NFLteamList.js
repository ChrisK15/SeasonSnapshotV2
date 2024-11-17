import React from 'react';
import { Typography } from '@mui/material';
import { nflTeams } from '@/app/data/nflTeams';

const NFLTeamList = ({ teamNames, handleTeamChangeFromList }) => {
  // Group the divisions
  const divisionsWithTeams = Object.entries(
    teamNames.reduce((acc, teamObj) => {
      const division = nflTeams.find(
        (nflTeam) => nflTeam.id === teamObj.id
      )?.division;
      if (!acc[division]) acc[division] = [];
      acc[division].push(teamObj);
      return acc;
    }, {})
  );

  // Split divisions into rows of four
  const divisionsPerRow = 4;
  const divisionRows = [];
  for (let i = 0; i < divisionsWithTeams.length; i += divisionsPerRow) {
    divisionRows.push(divisionsWithTeams.slice(i, i + divisionsPerRow));
  }

  return divisionRows.map((divisionRow, rowIndex) => (
    <div
      key={rowIndex}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        width: '100%',
      }}
    >
      {divisionRow.map(([division, teams]) => (
        <div
          key={division}
          style={{ margin: '0 20px', textAlign: 'center' }}
        >
          <Typography variant="h6">{division}</Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {teams.map((teamObj) => (
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
            ))}
          </div>
        </div>
      ))}
    </div>
  ));
};

export default NFLTeamList;
