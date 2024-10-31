'use client';

import TeamTable from '../../components/NFLTeamTable';
import React, { useState, useEffect } from 'react';
import useNFLTeamData from '../../hooks/useNFLTeamData';
import useNFLTeamNamesData from '../../hooks/useNFLTeamNamesData';
import useNFLTeamStandingsData from '../../hooks/useNFLTeamStandingsData';
import { nflTeams } from '@/app/data/nflTeams';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from '@mui/material';

export default function NFLPage() {
  const [year, setYear] = useState('');
  const { teamNames, yearNumbers, error: teamNamesError } = useNFLTeamNamesData();
  const [teamID, setTeamID] = useState('');
  const { teamStats, loading, error } = useNFLTeamData(teamID, year);
  const { teamStandings, loading2, error: standingsError } = useNFLTeamStandingsData(year);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTeamChangeFromList = (teamName) => {
    if (!year) {
      alert('Choose a year.');
    } else {
      const selectedTeamObj = teamNames.find(
        (teamObj) => teamObj.name === teamName
      );
      if (selectedTeamObj) {
        setTeamID(selectedTeamObj.id);
      }
    }
  };

  if (teamNamesError) {
    return <div>Error loading NFL teams: {teamNamesError.message}</div>;
  }

  if (!teamNames.length) {
    return <div>Loading NFL teams...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        onClick={() => (window.location.href = '/')}
        style={{
          color: 'black',
          borderColor: 'black',
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        Home
      </Button>

      <Typography variant="h1">Season Snapshot</Typography>

      {!teamID || !year ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              onChange={handleYearChange}
              label="Years"
            >
              {yearNumbers.map((yearObj) => (
                <MenuItem key={yearObj} value={yearObj}>
                  {yearObj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : null}

      {!teamID || !year ? (
        <div style={{ width: '200px', textAlign: 'left', marginRight: '40px', marginLeft: '40px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>NFL</Typography>
          {Object.entries(
            teamNames.reduce((acc, teamObj) => {
              const division = nflTeams.find((nflTeam) => nflTeam.id === teamObj.id)?.division;
              if (!acc[division]) acc[division] = [];
              acc[division].push(teamObj);
              return acc;
            }, {})
          ).map(([division, teams]) => (
            <div key={division} style={{ marginBottom: '20px' }}>
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
      ) : null}

      {teamID && year && teamStats ? (
        <div style={{ marginTop: '20px', textAlign: 'left', width: '80%' }}>
          <Box
            style={{
              marginTop: '40px',
              marginBottom: '40px',
              marginLeft: '20px',
              marginRight: '20px',
              width: 'auto',
              overflowX: 'auto',
              borderRadius: '6px',
              border: 'solid 1px',
              boxSizing: 'border-box',
            }}
          >
            <TeamTable teamStats={teamStats} teamStandings={teamStandings} year={year} teamID={teamID}/>
          </Box>
        </div>
      ) : null}
    </div>
  );
}
