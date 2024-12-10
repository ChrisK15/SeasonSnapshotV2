'use client';

import TeamTable from '../../components/NFL/NFLTeamTable';
import NFLPlayerTable from '@/app/components/NFL/NFLPlayerTable';
import NFLTeamList from '@/app/components/NFL/NFLteamList';
import React, { useState, useEffect } from 'react';
import useNFLTeamData from '../../hooks/NFL/useNFLTeamData';
import useNFLTeamNamesData from '../../hooks/NFL/useNFLTeamNamesData';
import useNFLTeamStandingsData from '../../hooks/NFL/useNFLTeamStandingsData';
import useNFLPlayerData from '../../hooks/NFL/useNFLPlayerData';
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
  const { playerStats, loading: playerloading, error: playerError} = useNFLPlayerData(teamID, year)

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <Button
        variant="contained"
        size="medium"
        onClick={() => (window.location.href = '/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        Home
      </Button>
  
      <Typography variant="h1" style={{ color: 'white' }}>Season Snapshot - NFL</Typography>
  
      {!teamID || !year ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <FormControl sx={{ minWidth: 120, borderColor: 'white', borderWidth: 1, borderStyle: 'solid', borderRadius: 1, color: 'white', backgroundColor: 'black' }}>
            <InputLabel id="year-select-label" style={{ color: 'white' }}>Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              onChange={handleYearChange}
              label="Year"
              style={{ color: 'white', backgroundColor: 'black', borderBottom: '1px solid white' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }
                }
              }}
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <MenuItem key={year} value={year} style={{ color: 'white', backgroundColor: 'black', '&:hover': { backgroundColor: '#555' } }}>
                  {year}
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
        </div>
      ) : null}

      {!teamID || !year ? (
        <NFLTeamList
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
            <NFLPlayerTable playerStats={playerStats} />
          </Box>
        </div>
      ) : null}
    </div>
  );
  
}
