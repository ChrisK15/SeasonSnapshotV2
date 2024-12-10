import { NextResponse } from 'next/server';
import axios from 'axios';

/*
This POST request takes year input from the front-end and makes a request to the API to get the standings for that current year/season
input: year that is selected from the dropdown menu

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

        const { year } = await req.json();
        // eslint-disable-next-line no-undef
        const apiKey = process.env.SPORTS_RADAR_API_KEY;

        const teamStandingsResponse = await axios.get(
            `https://api.sportradar.com/nba/trial/v8/en/seasons/${year}/REG/standings.json?api_key=${apiKey}`, { headers }
        );

        const teamStandings = teamStandingsResponse.data;
        console.log(teamStandings);
        return NextResponse.json(teamStandings);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data', error: error.message },
            { status: 500 }
        );
    }
}