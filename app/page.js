"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { nbaTeams } from "./data/teams";
import { createData } from "./data/tableStuff";

export default function Home() {
  // STATES
  const [team, setTeam] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [teamStats, setTeamStats] = useState([]);
  // API stuff
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get("/api/proxy/teamNames/"); // calls API

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.includes(team.market),
        );
        setTeamNames(filteredTeams);
        //console.log(filteredTeams);
      } catch (err) {
        console.error("Error fetching team names:", err);
      }
    };

    const getTeamStats = async () => {
      try {
        const response = await axios.get("/api/proxy/teamStats/"); // calls API
        //setTeamStats(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching team names:", err);
      }
    };
    getTeamStats();
    getTeamNames();
  }, []);

  // FUNCTIONS
  const handleChange = (e) => {
    setTeam(e.target.value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">Season Snapshot</Typography>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={team}
            onChange={handleChange}
            autoWidth
            label="Team"
          >
            {teamNames.map((teamObj) => (
              <MenuItem key={teamObj.id} value={teamObj.name}>
                {teamObj.market} {teamObj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={handleClick}
        >
          Open
        </Button>
      </div>

      {open && (
        <Box
          mt={2}
          p={2}
          border={1}
          borderRadius={8}
          borderColor="grey.300"
          bgcolor="grey.100"
          height={1000} // Fixed height
          width={1000} // Fixed width
          overflow="auto" // Scrollable content
        ></Box>
      )}
    </div>
  );
}
