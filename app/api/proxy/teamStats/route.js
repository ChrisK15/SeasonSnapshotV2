import { NextResponse } from 'next/server';
import axios from 'axios';

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

    // eslint-disable-next-line no-undef
    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    // TEAM STATS
    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/nba/trial/v8/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers }
    );
    const teamStats = teamStatsResponse.data.own_record.average;

    // PLAYER STATS
    const playerStats = teamStatsResponse.data.players;

    const players = playerStats.map((player) => ({
      id: player.id,
      full_name: player.full_name,
      position: player.primary_position,
      games_played: player.total.games_played,
      points: player.average.points,
      assists: player.average.assists,
      rebounds: player.average.rebounds,
      steals: player.average.steals,
      blocks: player.average.blocks,
      field_goals_pct: player.average.field_goals_pct,
      three_points_pct: player.average.three_points_pct,
      free_throws_pct: player.average.free_throws_pct,
    }));

    return NextResponse.json({ teamStats, players });
    //return NextResponse.json(teamStats);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}
