import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const headers = {
      accept: "application/json",
    };

    const { teamID } = await req.json();

    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // TEAM STATS
    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/2023/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers },
    );

    const teamStats = teamStatsResponse.data.own_record.average;

    return NextResponse.json(teamStats);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }
}
