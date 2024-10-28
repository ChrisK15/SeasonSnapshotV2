'use client';

import React from 'react';
import useNFLTeamsData from '../../hooks/useNFLTeamsData'; // Adjust the path to where the hook is saved

export default function NFLPage() {
  const { teamNames, error } = useNFLTeamsData();

  if (error) {
    return <div>Error loading NFL teams: {error.message}</div>;
  }

  if (!teamNames.length) {
    return <div>Loading NFL teams...</div>;
  }

  return (
    <div>
      <h1>NFL Teams</h1>
      <ul>
        {teamNames.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}