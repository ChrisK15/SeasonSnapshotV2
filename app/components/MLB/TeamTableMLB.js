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
} from '../data/MLB/tableTeamColumnsMLB';

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
    if (!data || data.length === 0) {
      return null;
    }
    return data.map((row, index) => (
      <TableRow key={index}>
        {displayedTeamColumns.map((key) => {
          if (key === 'season') {
            let s = year + '-' + (parseInt(year) + 1);
            return (
              <TableCell key={key} align="right">
                {s}
              </TableCell>
            );
          } else if (key === 'batting_avg') {
            let avg = (row.hits / row.at_bats).toFixed(3);
            return (
              <TableCell key={key} align="right">
                {avg}
              </TableCell>
            );
          } else if (key === 'on_base_pct') {
            let obp = (
              (row.hits + row.walks + row.hit_by_pitch) /
              (row.at_bats + row.walks + row.hit_by_pitch + row.sacrifice_flies)
            ).toFixed(3);
            return (
              <TableCell key={key} align="right">
                {obp}
              </TableCell>
            );
          } else if (key === 'slugging_pct') {
            let slg = (
              (row.hits + row.doubles + 2 * row.triples + 3 * row.home_runs) /
              row.at_bats
            ).toFixed(3);
            return (
              <TableCell key={key} align="right">
                {slg}
              </TableCell>
            );
          } else if (key === 'on_base_plus_slugging') {
            let obp = (
              (row.hits + row.walks + row.hit_by_pitch) /
              (row.at_bats + row.walks + row.hit_by_pitch + row.sacrifice_flies)
            ).toFixed(3);
            let slg = (
              (row.hits + row.doubles + 2 * row.triples + 3 * row.home_runs) /
              row.at_bats
            ).toFixed(3);
            let ops = (parseFloat(obp) + parseFloat(slg)).toFixed(3);
            return (
              <TableCell key={key} align="right">
                {ops}
              </TableCell>
            );
          } else {
            return (
              <TableCell key={key} align="right">
                {row[key]}
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
          <TableRow>{generateTeamTableColumn(teamStats)}</TableRow>
        </TableHead>
        <TableBody>{generateTeamTableRows(teamStats)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
