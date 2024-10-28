'use client';

// -------
// Imports
// -------

import React, { useEffect, useState } from 'react';
import useNFLTeamsData from '../../hooks/useNFLTeamsData';
import { nflTeams } from '@/app/data/nflTeams';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

export default function NFLPage() {
  // ---------------
  // State variables
  // ---------------
  const [year, setYear] = useState('');
  const { teamNames, yearNumbers, error } = useNFLTeamsData();
  const [team, setTeam] = useState('');
  const [teamID, setTeamID] = useState('');
  const [openTable, setOpenTable] = useState(false);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  if (error) {
    return <div>Error loading NFL teams: {error.message}</div>;
  }

  if (!teamNames.length) {
    return <div>Loading NFL teams...</div>;
  }

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
    }}>
      {/* Button to return to homepage. */}
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

      {/* Page Title Header */}
      <Typography variant="h1">Season Snapshot</Typography>

      {/* Year Drop-down Menu*/}
      {!teamID || !year ? (
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
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

      {/* NFL Teams List */}
      {!teamID || !year ? (
          <div
          style={{
            width: '200px',
            textAlign: 'left',
            marginRight: '40px',
            marginLeft: '40px',
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            NFL
          </Typography>

          {Object.entries(
            teamNames.reduce((acc, teamObj) => {
              const division = nflTeams.find(
                (nflTeam) => nflTeam.id === teamObj.id
              )?.division;
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
    
    </div>
  );
}