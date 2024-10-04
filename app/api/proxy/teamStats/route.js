import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const headers = {
      accept: 'application/json',
    };
    const apiKey = process.env.SPORTS_RADAR_API_KEY;
    // TEAM STATS
    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/2023/REG/teams/583eca2f-fb46-11e1-82cb-f4ce4684ea4c/statistics.json?api_key=${apiKey}`,
      { headers }
    );
    const teamStats = teamStatsResponse.data.own_record.average;

    return NextResponse.json(teamStats);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching data' },
      { status: 500 }
    );
  }
}
