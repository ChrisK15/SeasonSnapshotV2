'use client';
import { Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/home-background.jpg')",
        backgroundSize: 'cover', // Ensures the image covers the whole screen
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents image from repeating
        minHeight: '100vh', // Full screen height
        display: 'flex', // Use flexbox for centering
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    >
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ textAlign: 'center' }}
      >
        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h1" style={{ color: 'white' }}>
            Season
          </Typography>
          <Typography variant="h1" style={{ color: 'white' }}>
            Snapshot
          </Typography>
          <Typography
            variant="h3"
            style={{ color: 'white', marginTop: '20px' }}
          >
            Every stat, every game, in a snap.
          </Typography>
        </Grid>

        {/* Button */}
        <Grid item xs={12}>
          <Link href="/pages/nba_page">
            <Button variant="contained" size="large">
              Get Started
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
