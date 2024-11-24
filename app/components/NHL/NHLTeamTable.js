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
} from '../../data/NHL/tableNHLTeamColumns';

const TeamTable = ({ teamStats, teamStandings, year, teamID }) => {

  console.log("Year passed to TeamTable:", year);
  console.log("Displayed teamColumns: ", displayedTeamColumns)

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
    console.log("Data: ", data)
    if (!data || !data.own_record) {
      console.log("Data is null or missing own_record property:", data);
      return (
        <TableRow>
          <TableCell colSpan={displayedTeamColumns.length} align="center">
            No data available
          </TableCell>
        </TableRow>
      );
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
                {data.own_record.statistics.total.games_played || "-"}
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
          } else if (key === 'points') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.points || "-"}
              </TableCell>
            );
          } else if (key === 'goals') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.goals || "-"}
              </TableCell>
            );
          } else if (key === 'assists') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.assists || "-"}
              </TableCell>
            );
          } else if (key === 'goals_against') {
            return (
              <TableCell key={key} align="right">
                {data.opponents.goaltending.total?.goals_against || "-"}
              </TableCell>
            );
          } else if (key === 'shots') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.shots || "-"}
              </TableCell>
            );
          } else if (key === 'shooting_pct') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.shooting_pct || "-"}
              </TableCell>
            );
          } else if (key === 'hits') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.hits || "-"}
              </TableCell>
            );
          } else if (key === 'faceoff_win_pct') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.faceoff_win_pct || "-"}
              </TableCell>
            );
          } else if (key === 'penalty_minutes') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.statistics.total?.penalty_minutes || "-"}
              </TableCell>
            );
          } else if (key === 'shutouts') {
            return (
              <TableCell key={key} align="right">
                {data.own_record.goaltending.total?.shutouts || "-"}
              </TableCell>
            );
          }
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