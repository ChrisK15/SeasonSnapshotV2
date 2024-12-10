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
} from '../../data/NFL/tableNFLPlayerColumns';

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
          let receiving_yards;
          let rushing_yards;
          let rushing_tds;
          let receiving_tds;
          if (key === 'tackles') {
            value = row.defense?.tackles || 0;
        } else if (key === 'assists') {
            value = row.defense?.assists || 0;
        }else if (key === 'sacks') {
          value = row.defense?.sacks || 0;
        }else if (key === 'receptions') {
          value = row.receiving?.receptions || 0; 
        }else if (key === 'yards') {
          receiving_yards = row.receiving?.yards || 0;
          rushing_yards = row.rushing?.yards || 0;
          value = receiving_yards + rushing_yards; 
        }else if (key === 'attempts') {
          value = row.passing?.attempts || 0; 
        }else if (key === 'completions') {
          value = row.passing?.completions || 0; 
        }else if (key === 'touchdowns') {
          receiving_tds = row.receiving?.touchdowns || 0;
          rushing_tds = row.rushing?.touchdowns || 0;
          value = receiving_tds + rushing_tds;
        }else {
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