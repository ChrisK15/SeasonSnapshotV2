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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*
These are the imported data sets that we manually created:

nbaTeams: List of teams to filter out the weird teams that the API returns
createData: Not implemented yet, but these are the columns of the table that will be returned for out team stats
yearList: List of years
*/
import { nbaTeams } from './data/teams';
import { createData } from './data/tableStuff';
import { yearList } from './data/years';

export default function Home() {
  // STATES
  const [team, setTeam] = useState('');
  const [teamNames, setTeamNames] = useState([]);
  const [teamID, setTeamID] = useState('');
  const [year, setYear] = useState('');
  const [yearNumbers, setYearNumbers] = useState([]);
  const [open, setOpen] = useState(false);

  // API stuff, everything happening here is in unison with the route.js files in the app/api/proxy folder
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get('/api/proxy/teamNames/');

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.includes(team.market),
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

  // FUNCTIONS
  const handleTeamChange = (e) => {
    const teamName = e.target.value;
    setTeam(teamName);

    // Tracks whichever team is selected in the dropdown
    const selectedTeamObj = teamNames.find(
      (teamObj) => teamObj.name === teamName,
    );
    setTeamID(selectedTeamObj.id);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  const handleClick = () => {
    if (teamID && year) {
      console.log(teamID);
      console.log(year);
      setOpen(!open);
      axios
        .post('/api/proxy/teamStats', {
          teamID: teamID,
          year: year,
        })
        .then((response) => {
          console.log('Team stats fetched successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching team stats:', error);
        });
    } else {
      console.log('Both team and year must be selected.');
    }
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

        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={handleClick}
        >
          Open
        </Button>
      </div>

      {open && (
        <div style={{ marginTop: '20px' }} overflow="auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1500 }} aria-label="team table">
              <TableHead>
                <TableRow>
                  <TableCell>Averages</TableCell>
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
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
