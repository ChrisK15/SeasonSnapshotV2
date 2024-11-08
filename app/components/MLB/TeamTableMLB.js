// TeamTableMLB.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TeamTableMLB = ({ teamStats, year }) => {
  if (!teamStats || teamStats.length === 0) {
    return <div>No stats available for this team.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Games Played</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Losses</TableCell>
            <TableCell>Win Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamStats.map((stat, index) => (
            <TableRow key={index}>
              <TableCell>{year}</TableCell>
              <TableCell>{stat.games_played}</TableCell>
              <TableCell>{stat.wins}</TableCell>
              <TableCell>{stat.losses}</TableCell>
              <TableCell>{stat.win_percentage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTableMLB;
