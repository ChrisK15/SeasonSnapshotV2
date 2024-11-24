import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const headers = {
      accept: 'application/json',
    };

    const { year } = await req.json();

    // eslint-disable-next-line no-undef
    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // TEAM STATS
    const nhlStandingsResponse = await axios.get(
      `https://api.sportradar.com/nhl/trial/v7/en/seasons/${year}/REG/standings/season.json?api_key=${apiKey}`,
      { headers }
    );

    const nhlStandings = nhlStandingsResponse.data;

    return NextResponse.json({ nhlStandings });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching NHL standings data', error: error.message },
      { status: 500 }
    );
  }
}