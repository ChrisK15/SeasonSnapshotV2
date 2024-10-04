import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const headers = {
      accept: "application/json",
    };
    const apiKey = process.env.SPORTS_RADAR_API_KEY;
    // LIST OF TEAMS
    const teamListResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/league/teams.json?api_key=${apiKey}`,
      { headers },
    );
    const teams = teamListResponse.data.teams;

    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 },
    );
  }
}
