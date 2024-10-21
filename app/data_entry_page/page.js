/* eslint-disable no-unused-vars */
'use client';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*
These are the imported data sets that we manually created: hi

nbaTeams: List of teams to filter out the weird teams that the API returns
createData: Not implemented yet, but these are the columns of the table that will be returned for out team stats
yearList: List of years
*/
import { nbaTeams } from '../data/teams';
import {
  displayedTeamColumns,
  teamColumnNameMap,
} from '../data/tableTeamColumns';
import { yearList } from '../data/years';
import { displayedPlayerColumns, playerColumnNameMap } from '../data/tablePlayerColumns';

export default function Home() {
  // STATES
  const [team, setTeam] = useState('');
  const [teamNames, setTeamNames] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [teamID, setTeamID] = useState('');
  const [year, setYear] = useState('');
  const [yearNumbers, setYearNumbers] = useState([]);
  const [openTable, setOpenTable] = useState(false);
  const [loading, setLoading] = useState(false);

  // API stuff, everything happening here is in unison with the route.js files in the app/api/proxy folder
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/teamNames/');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.some(nbaTeam => nbaTeam.name === team.market)
        );
        
        setTeamNames(filteredTeams);
      } catch (err) {
        console.error('Error fetching team names:', err.message);
      }
    };

    const getYearNumbers = async () => {
      setYearNumbers(yearList);
    };

    getYearNumbers();
    getTeamNames();
  }, []);

  // Posts and return stuff for table
  useEffect(() => {
    const postTeamStanding = async () => {
      axios
        .post('/api/proxy/teamStandings', {
          year: year,
        })
        .then((response) => {
          console.log('Standings fetched successfully', response.data);
          const standings = response.data.conferences
            .flatMap((conference) =>
              conference.divisions.flatMap((division) => division.teams)
            )
            .find((team) => team.id === teamID);
          if (standings) {
            setTeamStats((prevStats) => {
              return prevStats.map((stat) => ({
                ...stat,
                games_played: standings.wins + standings.losses,
                wins: standings.wins,
                losses: standings.losses,
                win_percentage: (
                  standings.losses /
                  (standings.wins + standings.losses)
                ).toFixed(3),
              }));
            })
          }
        })
        .catch((error) => {
          console.error('Error fetching standings:', error);
        });
    };

    const postTeamStats = async () => {
      try {
        const response = await axios.post('/api/proxy/teamStats', {
          teamID: teamID,
          year: year,
        });
        const { teamStats, players } = response.data;
        setTeamStats([teamStats]);
        setPlayerStats(players);
        postTeamStanding();

        setLoading(false);
        setOpenTable(true);
      } catch (error) {
        console.error('Error fetching team stats:', error.message);
        setLoading(false);
      }
    };

    if (teamID && year) {
      // postTeamStanding();
      setLoading(true);
      postTeamStats();
    } else {
      console.log('Both team and year must be selected.');
    }
  }, [teamID, year]);

  // FUNCTIONS
  const handleTeamChange = (e) => {
    const teamName = e.target.value;
    setTeam(teamName);

    // Tracks whichever team is selected in the dropdown
    const selectedTeamObj = teamNames.find(
      (teamObj) => teamObj.name === teamName
    );
    setTeamID(selectedTeamObj.id);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  const generateTeamTableColumn = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return displayedTeamColumns.map((key) => (
      <TableCell key={key} align="right">
        {teamColumnNameMap[key]}
      </TableCell>
    ));
  };

  const generatePlayerTableColumn = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return displayedPlayerColumns.map((key) => (
      <TableCell key={key} align="right">
        {playerColumnNameMap[key]}
      </TableCell>
    ));
  };

  // this function is painful to look at xD
  const generateTeamTableRows = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return data.map((row, index) => (
      <TableRow key={index}>
        {displayedTeamColumns.map((key) => {
          if (key === 'season') {
            let s = year + '-' + (parseInt(year) + 1);
            return (
              <TableCell key={key} align="right">
                {s}
              </TableCell>
            );
          } else if (key === 'field_goal_percentage') {
            let fgp = (
              (row.field_goals_made / row.field_goals_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {fgp}
              </TableCell>
            );
          } else if (key === 'three_point_percentage') {
            let tpp = (
              (row.three_points_made / row.three_points_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {tpp}
              </TableCell>
            );
          } else if (key === 'free_throw_percentage') {
            let ftp = (
              (row.free_throws_made / row.free_throws_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {ftp}
              </TableCell>
            );
          } else {
            return (
              <TableCell key={key} align="right">
                {row[key]}
              </TableCell>
            );
          }
        })}
      </TableRow>
    ));
  };

  const generatePlayerTableRows = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return data.map((row, index) => (
      <TableRow key={index}>
        {displayedPlayerColumns.map((key) => {
            return (
              <TableCell key={key} align="right">
                {row[key]}
              </TableCell>
            );
        })}
      </TableRow>
    ));
  };
  const handleTeamChangeFromList = (teamName) => {
    if(!year){
      alert("Choose a year.")
    }else{
      setTeam(teamName);
      const selectedTeamObj = teamNames.find((teamObj) => teamObj.name === teamName);
      if(selectedTeamObj){
        setTeamID(selectedTeamObj.id);
      }
    }
  }

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centers the entire main content
      paddingTop: '20px',
    }}
  >
    <Typography variant="h1">Season Snapshot</Typography>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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

    <div style={{ display: 'flex', width: '100%' }}>
      <div
        style={{
          width: '200px',
          textAlign: 'left',
          marginRight: '40px',
          marginLeft: '40px',
        }}
      >
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          NBA
        </Typography>

        {/* Group teams by division */}
        {Object.entries(
          teamNames.reduce((acc, teamObj) => {
            const division = nbaTeams.find((nbaTeam) => nbaTeam.name === teamObj.market)?.division;
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
                  style={{ margin: '5px 0', cursor: 'pointer', color: '#1e88e5', textDecoration: 'none' }}
                >
                  {teamObj.market} {teamObj.name}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Content section */}
      <div style={{ flexGrow: 1 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          openTable && (
            <div>
              <Box
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'auto',
                borderRadius: '6px',
                border: 'solid',
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="team table" size="small">
                  <TableHead>
                    <TableRow>{generateTeamTableColumn(teamStats)}</TableRow>
                  </TableHead>
                  <TableBody>{generateTeamTableRows(teamStats)}</TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'auto',
                borderRadius: '6px',
                border: 'solid',
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="player table" size="small">
                  <TableHead>
                    <TableRow>{generatePlayerTableColumn(playerStats)}</TableRow>
                  </TableHead>
                  <TableBody>{generatePlayerTableRows(playerStats)}</TableBody>
                </Table>
              </TableContainer>
            </Box>
            </div>
          )
        )}
      </div>
    </div>
  </div>
  );
}