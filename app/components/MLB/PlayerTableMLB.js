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
  displayedPlayerColumns,
  playerColumnNameMap,
} from '../data/MLB/tablePlayerColumnsMLB';

const PlayerTable = ({ playerStats }) => {
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="player table" size="small">
        <TableHead>
          <TableRow>{generatePlayerTableColumn(playerStats)}</TableRow>
        </TableHead>
        <TableBody>{generatePlayerTableRows(playerStats)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
