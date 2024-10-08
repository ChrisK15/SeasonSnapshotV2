import { NextResponse } from 'next/server';
import axios from 'axios';

import { createData } from '../../../data/tableStuff';

/*
This POST request takes input from the front-end and makes a request to the API to get the right stats for the right team
input: teamID of the team that is selected from the dropdown menu

teamID: special ID of team
apiKey: apiKey: our secret API key to communicate with sports radar
teamStatsResponse: raw JSON data of the team stats
teamStats: from JSON data, takes the average values. This is not mathematically done in our code, the data has an average section we take from
*/
export async function POST(req) {
  try {
    const headers = {
      accept: 'application/json',
    };

    const { teamID, year } = await req.json();

    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // TEAM STATS
    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers },
    );

    const teamStats = teamStatsResponse.data.own_record.average;

    return NextResponse.json(teamStats);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 },
    );
  }
}
