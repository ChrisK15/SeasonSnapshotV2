"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";  // Import useRouter

import { nbaTeams } from "../data/teams";
import { yearList } from "../data/years";

export default function Home() {
  // STATES
  const [team, setTeam] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const [year, setYear] = useState("");
  const [yearNumbers, setYearNumbers] = useState([]);
  const [teamStats, setTeamStats] = useState(null);  // State for team stats
  const [players, setPlayers] = useState([]);  // State for player data
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState("asc");  // Sorting order (asc/desc)
  const [orderBy, setOrderBy] = useState("points");  // Column to sort by
  const router = useRouter();  // Initialize useRouter

  // API stuff, everything happening here is in unison with the route.js files in the app/api/proxy folder
  useEffect(() => {
    const getTeamNames = async () => {
      try {
        const response = await axios.get("/api/proxy/teamNames/");

        const filteredTeams = response.data.filter((team) =>
          nbaTeams.includes(team.market)
        );
        setTeamNames(filteredTeams);
      } catch (err) {
        console.error("Error fetching team names:", err);
      }
    };

    const getYearNumbers = async () => {
      setYearNumbers(yearList);
    };

    getYearNumbers();
    getTeamNames();
  }, []);

  // Fetch team stats and players from backend API
  const fetchTeamStats = (selectedTeamObj, selectedYear) => {
    if (selectedTeamObj && selectedYear) {
      axios
        .post("/api/proxy/teamStats", {
          teamID: selectedTeamObj.id,
          year: selectedYear,
        })
        .then((response) => {
          console.log("Team and player stats fetched successfully:", response.data);
          setTeamStats(response.data.teamStats);  // Update team stats state
          setPlayers(response.data.players);  // Update player data state
        })
        .catch((error) => {
          console.error("Error fetching team stats:", error);
        });
    } else {
      console.log("Both team and year must be selected.");
    }
  };

  const handleTeamChange = (e) => {
    const teamName = e.target.value;
    setTeam(teamName);

    const selectedTeamObj = teamNames.find(
      (teamObj) => teamObj.name === teamName
    );

    fetchTeamStats(selectedTeamObj, year);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    const selectedTeamObj = teamNames.find((teamObj) => teamObj.name === team);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  // Sorting function
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  // Handle navigation to the home page
  const goToHomePage = () => {
    router.push("/");  // Redirect to the home page (or any other path you define as the home)
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", padding: "20px" }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Home Button */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="medium"
            onClick={goToHomePage}
            style={{
              color: "white",
              borderColor: "white",
              marginBottom: "10px",
            }}
          >
            Home
          </Button>
        </Grid>

        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h1" align="center" style={{ color: "white" }}>
            Find Your Snapshot
          </Typography>

          {/* Display selected team and year underneath the title */}
          {team && year && (
            <Typography variant="h6" align="center" style={{ color: "white", marginTop: "10px" }}>
              {team} ({year})
            </Typography>
          )}
        </Grid>

        {/* Dropdowns */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="team-select-label" style={{ color: "white" }}>
              Team
            </InputLabel>
            <Select
              labelId="team-select-label"
              id="team-select"
              value={team}
              onChange={handleTeamChange}
              label="Team"
              sx={{ color: "white", borderColor: "white" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "black",
                    color: "white",
                  },
                },
              }}
            >
              {teamNames.map((teamObj) => (
                <MenuItem key={teamObj.id} value={teamObj.name}>
                  {teamObj.market} {teamObj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="year-select-label" style={{ color: "white" }}>
              Year
            </InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              onChange={handleYearChange}
              label="Year"
              sx={{ color: "white", borderColor: "white" }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "black",
                    color: "white",
                  },
                },
              }}
            >
              {yearNumbers.map((yearObj) => (
                <MenuItem key={yearObj} value={yearObj}>
                  {yearObj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth size="large" onClick={handleClick}>
            Open
          </Button>
        </Grid>

        {/* Table for team and player stats  - to update table*/}
        {open && (
          <Grid item xs={12}>
            <Box
              p={2}
              border={1}
              borderRadius={8}
              borderColor="grey.300"
              bgcolor="grey.100"
              style={{
                height: "auto",
                maxWidth: "100%",
                overflow: "auto",
                marginTop: "20px",
              }}
            >
              {teamStats ? (
                <div>
                  <Typography variant="h5">Player Stats:</Typography>

                  {/* Table */}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "full_name"}
                            direction={orderBy === "full_name" ? order : "asc"}
                            onClick={() => handleSort("full_name")}
                          >
                            Player Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "games_played"}
                            direction={orderBy === "games_played" ? order : "asc"}
                            onClick={() => handleSort("games_played")}
                          >
                            Games Played
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "points"}
                            direction={orderBy === "points" ? order : "asc"}
                            onClick={() => handleSort("points")}
                          >
                            Points
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "assists"}
                            direction={orderBy === "assists" ? order : "asc"}
                            onClick={() => handleSort("assists")}
                          >
                            Assists
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "rebounds"}
                            direction={orderBy === "rebounds" ? order : "asc"}
                            onClick={() => handleSort("rebounds")}
                          >
                            Rebounds
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "steals"}
                            direction={orderBy === "steals" ? order : "asc"}
                            onClick={() => handleSort("steals")}
                          >
                            Steals
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "blocks"}
                            direction={orderBy === "blocks" ? order : "asc"}
                            onClick={() => handleSort("blocks")}
                          >
                            Blocks
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedPlayers.map((player) => (
                        <TableRow key={player.full_name}>
                          <TableCell>{player.full_name}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>{player.games_played}</TableCell>
                          <TableCell>{player.points}</TableCell>
                          <TableCell>{player.assists}</TableCell>
                          <TableCell>{player.rebounds}</TableCell>
                          <TableCell>{player.steals}</TableCell>
                          <TableCell>{player.blocks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Typography variant="h6">No stats available</Typography>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
