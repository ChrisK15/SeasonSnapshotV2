import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from '@mui/material';

import {
  displayedTeamColumns,
  teamColumnNameMap,
} from '../data/tableNFLTeamColumns';

const TeamTable = ({ teamStats, year }) => {
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

  const generateTeamTableRows = (data) => {
    if (!data || !data.record) {
      return null; // Return early if data or data.record is undefined
    }
  
    return (
      <TableRow>
        {displayedTeamColumns.map((key) => {
          if (key === 'season') {
            // Only display the year in the season column
            return (
              <TableCell key={key} align="right">
                {year}
              </TableCell>
            );
          } else if (key ==='games_played'){
            // You should provide some fallback for other columns (for now just return an empty cell)
            return (
              <TableCell key={key} align="right">
                {data.record.games_played}
              </TableCell>
            );
          } else if(key ==='wins'){
            return (
              <TableCell key={key} align="right">
                {'Need to integrate "Postgame Standings API'}
              </TableCell>)
          } else if(key ==='losses'){
            return (
              <TableCell key={key} align="right">
                {'Need to integrate "Postgame Standings API'}
              </TableCell>)
          }else if(key === 'touchdowns'){
            return (
              <TableCell key={key} align="right">
                {data.record.touchdowns.total}
              </TableCell>)
          }else if(key === 'rushing_yards'){
            return (
              <TableCell key={key} align="right">
                {data.record.rushing.yards}
              </TableCell>)
          }else if(key === 'passing_yards'){
            return (
              <TableCell key={key} align="right">
                {data.record.passing.yards}
              </TableCell>)
          }else if(key === 'penalties'){
            return (
              <TableCell key={key} align="right">
                {data.record.penalties.penalties}
              </TableCell>)
          }else if(key === 'penalty_yards'){
            return (
              <TableCell key={key} align="right">
                {data.record.penalties.yards}
              </TableCell>)
          }
        })}
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="player table" size="small">
        <TableHead>
          <TableRow>{generateTeamTableColumn(teamStats)}</TableRow>
        </TableHead>
        <TableBody>{generateTeamTableRows(teamStats)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;