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

import TeamTable from '@/app/components/NBA/TeamTable';
import PlayerTable from '@/app/components/NBA/PlayerTable';
import useTeamData from '@/app/hooks/NBA/useTeamData';
import usePlayerData from '@/app/hooks/NBA/usePlayerData';
import useTeamNamesData from '@/app/hooks/NBA/useTeamNamesData';
import TeamList from '@/app/components/NBA/teamList';
import { nbaTeams } from '@/app/data/NBA/teams';

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

      <Typography variant="h1" style={{ color: 'white' }}>Season Snapshot - NBA</Typography>

      {!teamID || !year ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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