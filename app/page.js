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

        {/* Pick a Sport Message */}
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{ color: 'white', marginTop: '40px', marginBottom: '20px' }}
          >
            Pick a sport to get started.
          </Typography>
        </Grid>

        {/* League Buttons */}
        <Grid
          container
          item
          xs={12}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {/* NBA Button */}
          <Grid item>
            <Link href="/pages/nba_page" passHref>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#F57C00", color: "#FFFFFF" }}
              >
                NBA
              </Button>
            </Link>
          </Grid>

          {/* MLB Button */}
          <Grid item>
            <Link href="/pages/mlb_page" passHref>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#388E3C", color: "#FFFFFF" }}
              >
                MLB
              </Button>
            </Link>
          </Grid>

          {/* NFL Button */}
          <Grid item>
            <Link href="/pages/nfl_page" passHref>
              <Button
                variant="contained"
                size="large"
                color="secondary"
              >
                NFL
              </Button>
            </Link>
          </Grid>

          {/* NHL Button */}
          <Grid item>
            <Link href="/pages/nhl_page" passHref>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#00BFFF", color: "#FFFFFF" }}
              >
                NHL
              </Button>
            </Link>
          </Grid>

          {/* NASCAR Button */}
          <Grid item>
            <Link href="/pages/nascar_page" passHref>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
              >
                NASCAR
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
