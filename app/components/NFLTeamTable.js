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
  displayedNFLTeamColumns,
  nflTeamColumnNameMap,
} from '../data/tableNFLTeamColumns'; // New file for NFL columns

const NFLTeamTable = ({ nflTeamStats, year }) => {
  const generateTeamTableColumn = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return displayedNFLTeamColumns.map((key) => (
      <TableCell key={key} align="right">
        {nflTeamColumnNameMap[key]}
      </TableCell>
    ));
  };

  const generateTeamTableRows = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    return data.map((row, index) => (
      <TableRow key={index}>
        {displayedNFLTeamColumns.map((key) => (
          <TableCell key={key} align="right">
            {row[key]}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="team stats table" size="small">
        <TableHead>
          <TableRow>{generateTeamTableColumn(nflTeamStats)}</TableRow>
        </TableHead>
        <TableBody>{generateTeamTableRows(nflTeamStats)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default NFLTeamTable;