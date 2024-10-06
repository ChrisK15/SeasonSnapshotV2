"use client";
import {
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Home() {
  
  return (
    <div
    style={{
      backgroundImage: "url('/images/home-background.jpg')",
      backgroundSize: "cover",         // Ensures the image covers the whole screen
      backgroundPosition: "center",    // Centers the image
      backgroundRepeat: "no-repeat",   // Prevents image from repeating
      minHeight: "100vh",
      padding: "20px"
      }}>
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: "20%",
        }}
      >
        <Typography 
        variant='h1'
        style={{
          color: "white",
        }}>
          Season
        </Typography>
        <Typography 
        variant='h1'
        style={{
          color: "white"
        }}>
          Snapshot
        </Typography>

        <Typography 
        variant='h3'
        style={{
          color: "white",
          paddingTop: "5%"
        }}>
          Every stat, every game, in a snap.
        </Typography>
      </div>

      <div
        style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "20%",
        paddingTop: "10%",
        }}
        >
          <Link href="/data_entry_page">
              <Button variant="contained" size="large">
                Get Started
              </Button>
          </Link>
      </div>
    </div>
  );
}