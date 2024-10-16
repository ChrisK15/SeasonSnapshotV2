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
import { displayedTeamColumns, teamColumnNameMap } from '../data/tableTeamColumns';
import { yearList } from '../data/years';

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

  // API stuff, everything happening here is in unison with the route.js files in the app/api/proxy folder
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/teamNames/');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.includes(team.market)
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

  // Renders table when both a teamID and year are selected
  useEffect(() => {
    if (teamID && year) {
      setOpenTable(true);
      axios
        .post('/api/proxy/teamStats', {
          teamID: teamID,
          year: year,
        })
        .then((response) => {
          console.log('Team stats fetched successfully:', response.data);
          const { teamStats, players } = response.data;
          //console.log(teamStats);
          setTeamStats([teamStats]);
          setPlayerStats(players);
        })
        .catch((error) => {
          console.error('Error fetching team stats:', error);
        });
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

  // const generatePlayerTableColumn = (data) => {
  //   if (!data || data.length === 0) {
  //     return null;
  //   }
  //   return displayedTeamColumns.map((key) => (
  //     <TableCell key={key} align="right">
  //       {teamColumnNameMap[key]}
  //     </TableCell>
  //   ));
  // };

  const generateTableRows = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return data.map((row, index) => (
      <TableRow key={index}>
        {displayedTeamColumns.map((key) => {
          if (key === 'season') {
            let s = year + '-' + (parseInt(year) + 1);
            return (
              <TableCell key={key} align='right'>{s}</TableCell>
            )
          }
          else if (key === 'field_goal_percentage') {
            let fgp = ((row.field_goals_made / row.field_goals_att) * 100).toFixed(1);
            return (
              <TableCell key={key} align='right'>{fgp}</TableCell>
            );
          }
          else if (key === 'three_point_percentage') {
            let tpp = ((row.three_points_made / row.three_points_att) * 100).toFixed(1);
            return (
              <TableCell key={key} align='right'>{tpp}</TableCell>
            );
          }
          else if (key === 'free_throw_percentage') {
            let ftp = ((row.free_throws_made / row.free_throws_att) * 100).toFixed(1);
            return (
              <TableCell key={key} align='right'>{ftp}</TableCell>
            );
          }
          else {
            return(<TableCell key={key} align='right'>{row[key]}</TableCell>);
          }
        })}
      </TableRow>
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Season Snapshot</Typography>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={team}
            onChange={handleTeamChange}
            autoWidth
            label="Team"
          >
            {teamNames.map((teamObj) => (
              <MenuItem key={teamObj.id} value={teamObj.name}>
                {teamObj.market} {teamObj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={year}
            onChange={handleYearChange}
            autoWidth
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

      {openTable && (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
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
              <Table aria-label="team table" size='small'>
                <TableHead>
                  <TableRow>{generateTeamTableColumn(teamStats)}</TableRow>
                </TableHead>
                <TableBody>{generateTableRows(teamStats)}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      )}
    </div>
  );
}
