'use client';
import { Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import React, {useState} from 'react';

export default function Home() {
  // State to manage the visibility of the league buttons
  const [showCategories, setShowCategories] = useState(false);

  // Function to show the league buttons when "Get Started" is clicked
  const handleGetStartedClick = () => {
    setShowCategories(true);
  };

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

        {/* Get Started Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </Grid>

        {/* League Buttons (appear after Get Started is clicked) */}
        {showCategories && (
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
                  color="error"
                  startIcon={
                    <img
                      src='/images/NBA_logo.jpg'
                      alt= "NBA Logo"
                      style={{width: '24px', height: '24px'}}
                      />
                  }>
                  NBA
                </Button>
              </Link>
            </Grid>

            {/* MLB Button */}
            <Grid item>
              <Button variant="contained" size="large" color="success">
                MLB
              </Button>
            </Grid>

            {/* NFL Button */}
            <Grid item>
              <Button variant="contained" size="large" color="warning">
                NFL
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
