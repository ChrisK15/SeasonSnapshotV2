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
    const nflStandingsResponse = await axios.get(
      `https://api.sportradar.com/nfl/official/trial/v7/en/seasons/${year}/REG/standings/season.json?api_key=${apiKey}`,
      { headers }
    );

    const nflStandings = nflStandingsResponse.data;

    return NextResponse.json({ nflStandings });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching NFL standings data', error: error.message },
      { status: 500 }
    );
  }
}