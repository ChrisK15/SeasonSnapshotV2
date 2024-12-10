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
} from '../../data/NFL/tableNFLTeamColumns';

const TeamTable = ({ teamStats, teamStandings, year, teamID }) => {
  // Function to get Wins/Losses
  const getTeamRecord = (teamID) => {
    if (!teamStandings || !teamStandings.conferences) {
      return null; // Safely return null if teamStandings is not loaded
    }

    const conference = teamStandings.conferences.find((conf) =>
      conf.divisions.some((div) =>
        div.teams.some((team) => team.id === teamID)
      )
    );

    if (!conference) return null;

    const division = conference.divisions.find((div) =>
      div.teams.some((team) => team.id === teamID)
    );

    const team = division.teams.find((team) => team.id === teamID);
    return team ? { wins: team.wins, losses: team.losses } : null;
  };

  const teamRecord = getTeamRecord(teamID);

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
          } else if (key === 'games_played') {
            // Provide some fallback for other columns (for now just return an empty cell)
            return (
              <TableCell key={key} align="right">
                {data.record.games_played || "-"}
              </TableCell>
            );
          } else if (key === 'wins') {
            return (
              <TableCell key={key} align="right">
                {teamRecord ? teamRecord.wins : "Data Unavailable"}
              </TableCell>
            );
          } else if (key === 'losses') {
            return (
              <TableCell key={key} align="right">
                {teamRecord ? teamRecord.losses : "Data Unavailable"}
              </TableCell>
            );
          } else if (key === 'touchdowns') {
            return (
              <TableCell key={key} align="right">
                {data.record.touchdowns?.total || "-"}
              </TableCell>
            );
          } else if (key === 'rushing_yards') {
            return (
              <TableCell key={key} align="right">
                {data.record.rushing?.yards || "-"}
              </TableCell>
            );
          } else if (key === 'passing_yards') {
            return (
              <TableCell key={key} align="right">
                {data.record.passing?.yards || "-"}
              </TableCell>
            );
          } else if (key === 'penalties') {
            return (
              <TableCell key={key} align="right">
                {data.record.penalties?.penalties || "-"}
              </TableCell>
            );
          } else if (key === 'penalty_yards') {
            return (
              <TableCell key={key} align="right">
                {data.record.penalties?.yards || "-"}
              </TableCell>
            );
          }
          return (
            <TableCell key={key} align="right">
              {"-"}
            </TableCell>
          );
        })}
      </TableRow>
    );
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