'use client';
import React, { useState, useEffect } from 'react';
import NHLTeamList from '@/app/components/NHL/NHLteamList';
import useNHLTeamNamesData from '../../hooks/NHL/useNHLTeamNamesData';
import TeamTable from '../../components/NHL/NHLTeamTable';
import useNHLTeamData from '../../hooks/NHL/useNHLTeamData';
import useNHLTeamStandingsData from '../../hooks/NHL/useNHLTeamStandingsData';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from '@mui/material';

export default function NHLPage() {
  const [year, setYear] = useState('');
  const { teamNames, yearNumbers, error: teamNamesError } = useNHLTeamNamesData();
  const [teamID, setTeamID] = useState('');
  const { teamStats, loading, error } = useNHLTeamData(teamID, year);
  const { teamStandings, loading2, error: standingsError } = useNHLTeamStandingsData(year);

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
    return <div>Error loading NHL teams: {teamNamesError.message}</div>;
  }

  if (!teamNames.length) {
    return <div>Loading NHL teams...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
      }}
    >
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
  
      {!teamID || !year ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 40px',
            width: '100%',
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '10px', textAlign: 'center' }}>
            NHL
          </Typography>
          
        </div>
      ) : null}

      {!teamID || !year ? (
        <NHLTeamList
          teamNames={teamNames}
          handleTeamChangeFromList={handleTeamChangeFromList}
        />
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
            <TeamTable
              teamStats={teamStats}
              teamStandings={teamStandings}
              year={year}
              teamID={teamID}
            />
          </Box>
        </div>
      ) : null}

    </div>
  );
  
}
