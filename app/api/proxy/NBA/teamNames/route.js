import { NextResponse } from "next/server";
import axios from "axios";

/*
This GET request fetches the list of teams from the API

headers: needed to properly fetch from the API server
apiKey: our secret API key to communicate with sports radar
teamListResponse: raw JSON data from API
teams: gets only what we need from the team list, this is not to be confused with the filter we do on the front-end
*/
export async function GET() {
  try {
    const headers = {
      accept: "application/json",
    };
    // eslint-disable-next-line no-undef
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
