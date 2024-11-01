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

import TeamTable from '../../components/TeamTable';
import PlayerTable from '../../components/PlayerTable';
import useTeamData from '../../hooks/useTeamData';
import usePlayerData from '../../hooks/usePlayerData';
import useTeamNamesData from '../../hooks/useTeamNamesData';
import { nbaTeams } from '../../data/teams';

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
              width: '100%',
              textAlign: 'left',
              marginRight: '40px',
              marginLeft: '40px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            {Object.entries(
              teamNames.reduce((acc, teamObj) => {
                const division = nbaTeams.find(
                  (nbaTeam) => nbaTeam.name === teamObj.market
                )?.division;
                if (!acc[division]) acc[division] = [];
                acc[division].push(teamObj);
                return acc;
              }, {})
            ).map(([division, teams]) => (
              <div key={division} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{division}</Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {teams.map((teamObj) => {
                    // FOR FINDING LOGOS
                    const matchedTeam = nbaTeams.find(
                      (nbaTeam) => nbaTeam.name === teamObj.market
                    );
                    return (
                      <div
                        key={teamObj.id}
                        style={{ display: 'flex', flexDirection: 'row' }}
                      >
                        <img
                          src={matchedTeam?.logo}
                          alt={`${teamObj.name} logo`}
                          style={{
                            width: '24px',
                            height: '24px',
                            marginRight: '8px',
                          }}
                        />
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
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
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
