'use client';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';

import { mlbTeams } from '../../data/MLB/teamsMLB'; // Import the MLB teams with divisions

export default function MLBPage() {
  const [teamID, setTeamID] = useState('');
  const [year, setYear] = useState('2023'); // Default year selection
  const [loading, setLoading] = useState(false);
  const [teamStats, setTeamStats] = useState(null);

  // Group teams by division for displaying in sections
  const teamsByDivision = mlbTeams.reduce((acc, team) => {
    if (!acc[team.division]) acc[team.division] = [];
    acc[team.division].push(team);
    return acc;
  }, {});

  const handleTeamClick = async (teamName) => {
    setTeamID(teamName);
    setLoading(true);

    // Simulate fetching team stats (replace with actual API call if needed)
    setTimeout(() => {
      setTeamStats({ name: teamName, year: year, stats: 'Example stats data' });
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Sidebar for teams */}
      <Box sx={{ width: '250px', padding: 2, backgroundColor: '#f5f5f5', overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          MLB Teams
        </Typography>
        {Object.entries(teamsByDivision).map(([division, teams]) => (
          <Box key={division} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {division}
            </Typography>
            {teams.map((team) => (
              <Typography
                key={team.name}
                variant="body2"
                onClick={() => handleTeamClick(team.name)}
                sx={{
                  cursor: 'pointer',
                  color: teamID === team.name ? 'primary.main' : 'text.primary',
                  mb: 1,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {team.name}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>

      {/* Main content area */}
      <Box sx={{ flex: 1, padding: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = '/')}
          sx={{ mb: 3 }}
        >
          Home
        </Button>

        <Typography variant="h4" gutterBottom>
          MLB Season Snapshot
        </Typography>

        <Typography variant="h6" gutterBottom>
          Year: {year}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : teamStats ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">{teamStats.name} - {teamStats.year}</Typography>
            <Typography variant="body1">Stats: {teamStats.stats}</Typography>
          </Box>
        ) : (
          <Typography variant="body1">Select a team from the sidebar to view stats.</Typography>
        )}
      </Box>
    </Box>
  );
}
