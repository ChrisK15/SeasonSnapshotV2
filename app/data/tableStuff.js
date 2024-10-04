export function createData(
  points,
  three_points_made,
  field_goals_made,
  assists,
  rebounds,
  steals,
  blocks,
  turnovers,
  fast_break_pts,
  second_chance_pts,
  bench_points
) {
  return {
    points,
    three_points_made,
    field_goals_made,
    assists,
    rebounds,
    steals,
    blocks,
    turnovers,
    fast_break_pts,
    second_chance_pts,
    bench_points,
  };
}
