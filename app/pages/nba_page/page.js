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
import React, { useState } from 'react';

import TeamTable from '@/app/components/TeamTable';
import PlayerTable from '@/app/components/PlayerTable';
import useTeamData from '@/app/hooks/useTeamData';
import usePlayerData from '@/app/hooks/usePlayerData';
import useTeamNamesData from '@/app/hooks/useTeamNamesData';
import TeamList from '@/app/components/teamList';
import { nbaTeams } from '@/app/data/teams';

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
  } = useTeamData(teamID, year);
  const {
    playerStats,
    loading: playerLoading,
    error: playerError,
  } = usePlayerData(teamID, year);
  const { teamNames, yearNumbers, error: teamNameError } = useTeamNamesData();

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
            alignItems: 'center',
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

          <div style={{ width: '100%' }}>
            <TeamList
              teamNames={teamNames}
              nbaTeams={nbaTeams}
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
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
                  <TeamTable teamStats={teamStats} year={year} />
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
                  <PlayerTable playerStats={playerStats} />
                </Box>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
