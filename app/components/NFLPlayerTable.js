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
} from '../data/tableNFLPlayerColumns';

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
          let value;
          // Check if the key is 'tackles' and access nested value accordingly
          if (key === 'tackles') {
            value = row.defense?.tackles || 0; // Use 0 if undefined
          } else {
            value = row[key];
          }
          return (
            <TableCell key={key} align="right">
              {value}
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