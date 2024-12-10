'use client';
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TeamTableMLB from '../../components/MLB/TeamTableMLB';
import PlayerTableMLB from '../../components/MLB/PlayerTableMLB';
import useTeamDataMLB from '../../hooks/MLB/useTeamDataMLB';
import usePlayerDataMLB from '../../hooks/MLB/usePlayerDataMLB';
import useTeamNamesDataMLB from '../../hooks/MLB/useTeamNamesDataMLB';
import TeamList from '@/app/components/MLB/teamList';
import { mlbTeams } from '../../data/MLB/teamsMLB';

export default function Home() {
  // STATES
  const [team, setTeam] = useState('');
  const [teamID, setTeamID] = useState('');
  const [year, setYear] = useState('');
  const [openTable, setOpenTable] = useState(false);

  const {
    teamStats,
    loading: teamLoading,
    error: teamError,
  } = useTeamDataMLB(teamID, year);
  const {
    playerStats,
    loading: playerLoading,
    error: playerError,
  } = usePlayerDataMLB(teamID, year);

  const { teamNames, yearNumbers, error: teamNameError } = useTeamNamesDataMLB();

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

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

      <Typography variant="h1" style={{ color: 'white' }}>Season Snapshot - MLB</Typography>

      {!teamID || !year ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center the content horizontally
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '30px',
            width: 'fit-content', // Prevent it from stretching across the screen
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

          <div style={{ width: '100%' }}>
            <TeamList
              teamNames={teamNames}
              mlbTeams={mlbTeams}
              year={year}
              setTeam={setTeam}
              setTeamID={setTeamID}
              setOpenTable={setOpenTable}
            />
          </div>
        </div>
      ) : null}

      {/* Use CSS Grid to layout tables */}
      <div
        style={{
          display: 'grid', // Use grid layout for better responsiveness
          gridTemplateColumns: '1fr', // Stack tables vertically by default
          gap: '20px', // Add spacing between tables
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box', // Ensure padding is included in width/height calculations
        }}
      >
        {teamLoading || playerLoading ? (
          <CircularProgress />
        ) : (
          openTable && (
            <>
              {/* Team Table */}
              <Box
                style={{
                  width: '100%',
                  overflowX: 'auto', // Allow horizontal scrolling if content overflows
                  borderRadius: '6px',
                  border: 'solid 1px',
                  boxSizing: 'border-box',
                }}
              >
                <TeamTableMLB teamStats={teamStats} year={year} />
              </Box>
              
              {/* Player Table */}
              
              <Box
                style={{
                  width: '100%',
                  overflowX: 'auto', // Allow horizontal scrolling if content overflows
                  borderRadius: '6px',
                  border: 'solid 1px',
                  boxSizing: 'border-box',
                }}
              >
                <PlayerTableMLB playerStats={playerStats} />
              </Box>
            </>
          )
        )}
      </div>
    </div>
  );
}
