import { NextResponse } from "next/server";
import axios from "axios";

/*
This GET request fetches the list of MLB teams from the API and structures it according to the required fields.

Parameters:
- headers: needed to properly fetch from the API server
- apiKey: our secret API key to communicate with sports radar
- teamListResponse: raw JSON data from API
- teams: extracts and structures only the needed fields (id, name, market, abbreviation, division) from each team
*/
export async function GET() {
  try {
    const headers = {
      accept: "application/json",
    };
    // eslint-disable-next-line no-undef
    const apiKey = process.env.SPORTS_RADAR_API_KEY;
    
    // Fetch the list of teams
    const teamListResponse = await axios.get(
      `https://api.sportradar.com/mlb/trial/v7/en/league/teams.json?api_key=${apiKey}`,
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
