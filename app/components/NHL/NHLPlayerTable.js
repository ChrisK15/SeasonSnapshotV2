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
} from '../../data/NHL/tableNHLPlayerColumns';

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
          // Map NHL-specific data points to the keys
          if (key === 'games_played') {
            value = row.statistics?.total?.games_played || 0;
          } else if (key === 'goals') {
            value = row.statistics?.total?.goals || 0;
          } else if (key === 'assists') {
            value = row.statistics?.total?.assists || 0;
          } else if (key === 'points') {
            value = row.statistics?.total?.points || 0;
          } else if (key === 'shots') {
            value = row.statistics?.total?.shots || 0;
          } else if (key === 'blocked_shots') {
            value = row.statistics?.total?.blocked_shots || 0;
          } else if (key === 'missed_shots') {
            value = row.statistics?.total?.missed_shots || 0;
          } else if (key === 'hits') {
            value = row.statistics?.total?.hits || 0;
          } else if (key === 'giveaways') {
            value = row.statistics?.total?.giveaways || 0;
          } else if (key === 'takeaways') {
            value = row.statistics?.total?.takeaways || 0;
          } else if (key === 'plus_minus') {
            value = row.statistics?.total?.plus_minus || 0;
          } else if (key === 'penalty_minutes') {
            value = row.statistics?.total?.penalty_minutes || 0;
          } else if (key === 'faceoffs_won') {
            value = row.statistics?.total?.faceoffs_won || 0;
          } else if (key === 'faceoffs_lost') {
            value = row.statistics?.total?.faceoffs_lost || 0;
          } else if (key === 'faceoffs') {
            value = row.statistics?.total?.faceoffs || 0;
          } else if (key === 'faceoff_win_pct') {
            value = row.statistics?.total?.faceoff_win_pct || 0;
          } else if (key === 'powerplay_goals') {
            value = row.statistics?.powerplay?.goals || 0;
          } else if (key === 'powerplay_assists') {
            value = row.statistics?.powerplay?.assists || 0;
          } else if (key === 'powerplay_shots') {
            value = row.statistics?.powerplay?.shots || 0;
          } else if (key === 'shorthanded_goals') {
            value = row.statistics?.shorthanded?.goals || 0;
          } else if (key === 'shorthanded_assists') {
            value = row.statistics?.shorthanded?.assists || 0;
          } else if (key === 'shorthanded_shots') {
            value = row.statistics?.shorthanded?.shots || 0;
          } else if (key === 'overtime_goals') {
            value = row.statistics?.total?.overtime_goals || 0;
          } else if (key === 'overtime_assists') {
            value = row.statistics?.total?.overtime_assists || 0;
          } else if (key === 'games_scratched') {
            value = row.statistics?.total?.games_scratched || 0;
          } else if (key === 'games_started') {
            value = row.statistics?.total?.games_started || 0;
          } else if (key === 'winning_goals') {
            value = row.statistics?.total?.winning_goals || 0;
          } else if (key === 'emptynet_goals') {
            value = row.statistics?.total?.emptynet_goals || 0;
          } else if (key === 'penalties_minor') {
            value = row.statistics?.total?.penalties_minor || 0;
          } else if (key === 'penalties_major') {
            value = row.statistics?.total?.penalties_major || 0;
          } else {
            // Default case for undefined keys
            value = row[key] || 0;
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

export default PlayerTable