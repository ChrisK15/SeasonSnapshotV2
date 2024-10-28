import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const headers = {
      accept: 'application/json',
    };

    const { teamID, year } = await req.json();

    // eslint-disable-next-line no-undef
    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // TEAM STATS
    const nflTeamStatsResponse = await axios.get(
      `https://api.sportradar.com/nfl/official/trial/v7/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers }
    );

    const nflTeamStats = nflTeamStatsResponse.data.record;

    return NextResponse.json({ nflTeamStats });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching NFL data', error: error.message },
      { status: 500 }
    );
  }
}
