import { NextResponse } from 'next/server';
import axios from 'axios';

/*
This POST request takes input from the front-end and makes a request to the API to get the right stats for the selected MLB team.
Input: teamID of the team that is selected from the dropdown menu, year selected.

Parameters:
teamID: special ID of team
apiKey: secret API key to communicate with sports radar
teamStatsResponse: raw JSON data of the team stats
teamStats: from JSON data, takes the overall hitting and pitching statistics
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
      `https://api.sportradar.com/mlb/trial/v7/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers }
    );
    const teamData = teamStatsResponse.data.statistics;

    // Extract relevant team stats (hitting and pitching)
    const hittingStats = teamData.hitting.avg;
    const pitchingStats = teamData.pitching.overall;

    const teamStats = {
      games_played: hittingStats.ap, // plate appearances as an approximation for games played
      batting_avg: hittingStats.avg,
      on_base_pct: hittingStats.obp,
      slugging_pct: hittingStats.slg,
      on_base_plus_slugging: hittingStats.ops,
      runs_batted_in: hittingStats.rbi,
      home_runs: hittingStats.onbase.hr,
      stolen_bases: hittingStats.steal.stolen,
      caught_stealing: hittingStats.steal.caught,
      walks: hittingStats.onbase.bb,
      strikeouts: hittingStats.outcome.kswing + hittingStats.outcome.klook,
      earned_run_avg: pitchingStats.era,
      whip: pitchingStats.whip,
      errors: teamData.fielding.overall.errors.total,
    };

    // Extract relevant player stats for each player
    const playerStats = teamStatsResponse.data.players.map((player) => ({
      id: player.id,
      full_name: player.full_name,
      position: player.primary_position,
      games_played: player.statistics.hitting.overall.ap, // plate appearances as an approximation for games played
      at_bats: player.statistics.hitting.overall.ab,
      hits: player.statistics.hitting.overall.onbase.h,
      doubles: player.statistics.hitting.overall.onbase.d,
      triples: player.statistics.hitting.overall.onbase.t,
      home_runs: player.statistics.hitting.overall.onbase.hr,
      runs_batted_in: player.statistics.hitting.overall.rbi,
      batting_avg: player.statistics.hitting.overall.avg,
      on_base_pct: player.statistics.hitting.overall.obp,
      slugging_pct: player.statistics.hitting.overall.slg,
      on_base_plus_slugging: player.statistics.hitting.overall.ops,
      stolen_bases: player.statistics.hitting.overall.steal.stolen,
      caught_stealing: player.statistics.hitting.overall.steal.caught,
      walks: player.statistics.hitting.overall.onbase.bb,
      strikeouts:
        player.statistics.hitting.overall.outcome.kswing +
        player.statistics.hitting.overall.outcome.klook,
      errors: player.statistics.fielding?.overall?.errors?.total || 0,
    }));

    return NextResponse.json({ teamStats, playerStats });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}
