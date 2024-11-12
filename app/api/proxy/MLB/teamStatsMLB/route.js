import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const headers = {
      accept: 'application/json',
    };

    const { teamID, year } = await req.json();
    const apiKey = process.env.SPORTS_RADAR_API_KEY;

    const teamStatsResponse = await axios.get(
      `https://api.sportradar.com/mlb/trial/v7/en/seasons/${year}/REG/teams/${teamID}/statistics.json?api_key=${apiKey}`,
      { headers }
    );

    const teamData = teamStatsResponse.data.statistics || {};
    const hittingStats = teamData?.hitting?.overall || {};
    const pitchingStats = teamData?.pitching?.overall || {};

    const teamStats = {
      //games_played: hittingStats.ap || 'N/A',
      batting_avg: parseFloat(hittingStats.avg) || 'N/A', // Convert string avg to float
      on_base_pct: hittingStats.obp || 'N/A',
      slugging_pct: hittingStats.slg || 'N/A',
      on_base_plus_slugging: hittingStats.ops || 'N/A',
      runs_batted_in: hittingStats.rbi || 0,
      home_runs: hittingStats.onbase?.hr || 0,
      stolen_bases: hittingStats.steal?.stolen || 0,
      caught_stealing: hittingStats.steal?.caught || 0,
      walks: hittingStats.onbase?.bb || 0,
      strikeouts: (hittingStats.outcome?.kswing || 0) + (hittingStats.outcome?.klook || 0),
      earned_run_avg: pitchingStats.era || 'N/A',
      whip: pitchingStats.whip || 'N/A',
      errors: teamData.fielding?.overall?.errors?.total || 0,
    };

    const playerStats = teamStatsResponse.data.players.map((player) => ({
      id: player.id,
      full_name: player.full_name,
      position: player.primary_position,
      games_played: player.statistics.hitting?.overall?.ap || 0,
      at_bats: player.statistics.hitting?.overall?.ab || 0,
      hits: player.statistics.hitting?.overall?.onbase?.h || 0,
      doubles: player.statistics.hitting?.overall?.onbase?.d || 0,
      triples: player.statistics.hitting?.overall?.onbase?.t || 0,
      home_runs: player.statistics.hitting?.overall?.onbase?.hr || 0,
      runs_batted_in: player.statistics.hitting?.overall?.rbi || 0,
      batting_avg: parseFloat(player.statistics.hitting?.overall?.avg) || 'N/A',
      on_base_pct: player.statistics.hitting?.overall?.obp || 'N/A',
      slugging_pct: player.statistics.hitting?.overall?.slg || 'N/A',
      on_base_plus_slugging: player.statistics.hitting?.overall?.ops || 'N/A',
      stolen_bases: player.statistics.hitting?.overall?.steal?.stolen || 0,
      caught_stealing: player.statistics.hitting?.overall?.steal?.caught || 0,
      walks: player.statistics.hitting?.overall?.onbase?.bb || 0,
      strikeouts: (player.statistics.hitting?.overall?.outcome?.kswing || 0) +
                  (player.statistics.hitting?.overall?.outcome?.klook || 0),
      errors: player.statistics.fielding?.overall?.errors?.total || 0,
    }));

    return NextResponse.json({ teamStats, playerStats });
  } catch (error) {
    console.error('Error fetching MLB team data:', error.message);
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}
