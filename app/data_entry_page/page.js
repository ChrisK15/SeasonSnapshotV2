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

/*
These are the imported data sets that we manually created:
/Testing
nbaTeams: List of teams to filter out the weird teams that the API returns
createData: Not implemented yet, but these are the columns of the table that will be returned for out team stats
yearList: List of years
*/
import { nbaTeams } from "../data/teams";
import { createData } from "../data/tableStuff";
import { yearList } from "../data/years";

export default function Home() {
  // STATES
  const [team, setTeam] = useState("");
  const [teamNames, setTeamNames] = useState([]);
  const [year, setYear] = useState("");
  const [yearNumbers, setYearNumbers] = useState([]);
  const [open, setOpen] = useState(false);

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

  // FUNCTIONS
  //This function is weird and not working
  const fetchTeamStats = (selectedTeamObj, selectedYear) => {
    if (selectedTeamObj && selectedYear) {
      axios
        .post("/api/proxy/teamStats", {
          teamID: selectedTeamObj.id,
          year: selectedYear,
        })
        .then((response) => {
          console.log("Team stats fetched successfully:", response.data);
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

    // Tracks whichever team is selected in the dropdown
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

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "20 px"
      }}>
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
      variant='h1'
      style={{
        color: "white",
      }}>
        Find Your Snapshot
      </Typography>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel 
          id='team-select-label'
          style={{ color: "white" }}
          >
            Team
          </InputLabel>

          <Select
            labelId='team-select-label'
            id='team-select'
            value={team}
            onChange={handleTeamChange}
            autoWidth
            label='Team'
            sx={{ color: "white", borderColor: "white" }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "black", // Dropdown background color
                  color: "white", // Dropdown text color
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

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel 
          id='year-select-label'
          style={{ color: "white" }}
          >
          Year
          </InputLabel>
          <Select
            labelId='year-select-label'
            id='year-select'
            value={year}
            onChange={handleYearChange}
            autoWidth
            label='Years'
            sx={{ color: "white", borderColor: "white" }} // Make dropdown text white
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "black", // Dropdown background color
                  color: "white", // Dropdown text color
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

        <Button
          variant='contained'
          size='small'
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
          borderColor='grey.300'
          bgcolor='grey.100'
          height={1000} // Fixed height
          width={1000} // Fixed width
          overflow='auto' // Scrollable content
        ></Box>
      )}
    </div>
      </div>
  );
}