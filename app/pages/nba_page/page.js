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

import TeamTable from '../../components/TeamTable';
import PlayerTable from '../../components/PlayerTable';
import useTeamData from '../../hooks/useTeamData';
import usePlayerData from '../../hooks/usePlayerData';
import useTeamNamesData from '../../hooks/useTeamNamesData';
import { nbaTeams } from '../../data/teams';
import TeamList from '@/app/components/teamList';

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

      <div style={{ display: 'flex', width: '100%' }}>
        {!teamID || !year ? (
          <TeamList
            teamNames={teamNames}
            nbaTeams={nbaTeams}
            year={year}
            setTeam={setTeam}
            setTeamID={setTeamID}
            setOpenTable={setOpenTable}
          />
        ) : null}

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
