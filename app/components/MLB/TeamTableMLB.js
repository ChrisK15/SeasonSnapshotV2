// TeamTableMLB.js
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
} from '../../data/MLB/tableTeamColumnsMLB';

const TeamTable = ({ teamStats, year }) => {
  // Generate table columns based on displayedTeamColumns
  const generateTeamTableColumn = () => {
    return displayedTeamColumns.map((key) => (
      <TableCell key={key} align="right">
        {teamColumnNameMap[key]}
      </TableCell>
    ));
  };

  // Generate table rows based on displayedTeamColumns and teamStats data
  const generateTeamTableRows = () => {
    return teamStats.map((row, index) => (
      <TableRow key={index}>
        {displayedTeamColumns.map((key) => {
          if (key === 'season') {
            // Format season as "year-year+1"
            const seasonYear = `${year}-${parseInt(year) + 1}`;
            return (
              <TableCell key={key} align="right">
                {seasonYear}
              </TableCell>
            );
          } else if (row[key] !== undefined) {
            // Display the data directly if available
            return (
              <TableCell key={key} align="right">
                {row[key]}
              </TableCell>
            );
          } else {
            // Handle missing or undefined data
            return (
              <TableCell key={key} align="right">
                N/A
              </TableCell>
            );
          }
        })}
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="team table" size="small">
        <TableHead>
          <TableRow>{generateTeamTableColumn()}</TableRow>
        </TableHead>
        <TableBody>{generateTeamTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
