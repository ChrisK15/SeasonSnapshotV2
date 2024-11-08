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

import TeamTable from '../../components/MLB/TeamTableMLB';
import PlayerTable from '../../components/MLB/PlayerTableMLB';
import useTeamData from '../../hooks/MLB/useTeamDataMLB';
import usePlayerData from '../../hooks/MLB/usePlayerDataMLB';
import useTeamNamesData from '../../hooks/MLB/useTeamNamesDataMLB';
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
        console.log('Selected Team ID:', selectedTeamObj.id); // Check teamID
        console.log('Year:', year); // Check year
        console.log('openTable:', openTable); // Check openTable status
      }
    }
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
          <div
            style={{
              width: '200px',
              textAlign: 'left',
              marginRight: '40px',
              marginLeft: '40px',
            }}
          >
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
              MLB
            </Typography>

            {Object.entries(
              mlbTeams.reduce((acc, teamObj) => {
                const division = teamObj.division;

                if (!division) return acc; // Skip teams without a division
                
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
                      {teamObj.name}
                    </Typography>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div style={{ flexGrow: 1 }}>
          {teamLoading || playerLoading ? (
            <CircularProgress />
          ) : (
            openTable && teamStats && (
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
                {playerStats && (
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
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
