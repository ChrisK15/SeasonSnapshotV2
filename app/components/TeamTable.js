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
} from '../data/tableTeamColumns';

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
          } else if (key === 'field_goal_percentage') {
            let fgp = (
              (row.field_goals_made / row.field_goals_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {fgp}
              </TableCell>
            );
          } else if (key === 'three_point_percentage') {
            let tpp = (
              (row.three_points_made / row.three_points_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {tpp}
              </TableCell>
            );
          } else if (key === 'free_throw_percentage') {
            let ftp = (
              (row.free_throws_made / row.free_throws_att) *
              100
            ).toFixed(1);
            return (
              <TableCell key={key} align="right">
                {ftp}
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