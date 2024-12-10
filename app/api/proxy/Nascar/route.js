import axios from 'axios';

export async function POST(req) {
  const { teamID, year } = await req.json();  
  const api_key = process.env.SPORTS_RADAR_API_KEY;  

  console.log('Received teamID:', teamID, 'Year:', year);

  try {
    const url = `https://api.sportradar.com/nascar-ot3/mc/drivers/${year}/drivers.json?api_key=${api_key}`;

    const response = await axios.get(url, {
      headers: { accept: 'application/json' }
    });

    if (!response.data) {
      throw new Error('No data returned from SportsRadar API');
    }

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return new Response(
      JSON.stringify({ message: "Error fetching data from Sports Radar", error: error.message }),
      { status: 500 }
    );
  }
}
