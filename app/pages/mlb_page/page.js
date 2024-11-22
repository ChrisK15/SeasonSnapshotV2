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

// new color here
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
            flexDirection: 'column',
            alignItems: 'center', // Center the content horizontally
            justifyContent: 'center',
            marginBottom: '20px',
            width: 'fit-content', // Prevent it from stretching across the screen
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

      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {teamLoading || playerLoading ? (
            <CircularProgress />
          ) : (
            openTable && (
              <div>
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
                  <TeamTableMLB teamStats={teamStats} year={year} />
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
                  <PlayerTableMLB playerStats={playerStats} />
                </Box>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}