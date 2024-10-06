import { NextResponse } from "next/server";
import axios from "axios";

/*
This POST request takes input from the front-end and makes a request to the API to get the right stats for the right team
input: teamID of the team that is selected from the dropdown menu
*/

export async function POST(req) {
  try {
    const headers = {
      accept: "application/json",
    };

    // Extracting teamID and year from the request body
    const { teamID, year } = await req.json();

    // Your Sports Radar API key (stored in environment variables)
    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // Fetch team statistics and players from the Sports Radar API
    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers }
    );

    // Extract team stats
    const teamStats = teamStatsResponse.data.own_record.total;

    // Extract player data
    const playersData = teamStatsResponse.data.players;

    // Map through player data to return essential stats
    const players = playersData.map((player) => ({
      id: player.id,
      full_name: player.full_name,
      position: player.primary_position,
      games_played: player.total.games_played,
      points: player.total.points,
      assists: player.total.assists,
      rebounds: player.total.rebounds,
      steals: player.total.steals,
      blocks: player.total.blocks,
      field_goals_pct: player.total.field_goals_pct,
      three_points_pct: player.total.three_points_pct,
      free_throws_pct: player.total.free_throws_pct,
    }));

    // Return both team stats and player data as a JSON response
    return NextResponse.json({
      teamStats,
      players,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}
