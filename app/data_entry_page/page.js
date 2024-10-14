'use client';
import {
  Box,
  Button,
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
import { createData } from '../data/tableStuff';
import { yearList } from '../data/years';

export default function Home() {
  // STATES
  const [team, setTeam] = useState('');
  const [teamNames, setTeamNames] = useState([]);
  const [teamID, setTeamID] = useState('');
  const [year, setYear] = useState('');
  const [yearNumbers, setYearNumbers] = useState([]);
  const [openTable, setOpenTable] = useState(false);
  const [newRow, setNewRow] = useState([]);

  // API stuff, everything happening here is in unison with the route.js files in the app/api/proxy folder
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/teamNames');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.includes(team.market)
        );
        setTeamNames(filteredTeams);
      } catch (err) {
        console.error('Error fetching team names:', err);
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
          setNewRow(makeRow(response));
          console.log(newRow);
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

  function makeRow(response) {
    const rows = [
      createData(
        team,
        response.data.points,
        response.data.three_points_made,
        response.data.field_goals_made,
        response.data.assists,
        response.data.rebounds,
        response.data.steals,
        response.data.blocks,
        response.data.turnovers,
        response.data.fast_break_pts,
        response.data.second_chance_pts,
        response.data.bench_points
      ),
    ];
    return rows;
  }

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
        {/*
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={handleClick}
        >
          Open
        </Button>
        */}
      </div>

      {openTable && (
        <div
          style={{ marginTop: '20px', marginBottom: '20px' }}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1500 }} aria-label="team table">
              <TableHead>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">PTS</TableCell>
                  <TableCell align="right">3PM</TableCell>
                  <TableCell align="right">FGM</TableCell>
                  <TableCell align="right">AST</TableCell>
                  <TableCell align="right">REB</TableCell>
                  <TableCell align="right">STL</TableCell>
                  <TableCell align="right">BLK</TableCell>
                  <TableCell align="right">TO</TableCell>
                  <TableCell align="right">FB-PTS</TableCell>
                  <TableCell align="right">SC-PTS</TableCell>
                  <TableCell align="right">BNCH-PTS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newRow.map((row) => (
                  <TableRow
                    key={row.team_name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.team_name}
                    </TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                    <TableCell align="right">{row.three_points_made}</TableCell>
                    <TableCell align="right">{row.field_goals_made}</TableCell>
                    <TableCell align="right">{row.assists}</TableCell>
                    <TableCell align="right">{row.rebounds}</TableCell>
                    <TableCell align="right">{row.steals}</TableCell>
                    <TableCell align="right">{row.blocks}</TableCell>
                    <TableCell align="right">{row.turnovers}</TableCell>
                    <TableCell align="right">{row.fast_break_pts}</TableCell>
                    <TableCell align="right">{row.second_chance_pts}</TableCell>
                    <TableCell align="right">{row.bench_points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
