'use client';
import { useState, useEffect } from 'react';
import { CircularProgress, Box, Button } from '@mui/material';
import axios from 'axios';
import '../styles-sheet/Nascar.css';

export default function UseMlsSeasonsData() {
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState('2024');
  const [showEntireTable, setShowEntireTable] = useState(true); // Show entire table by default
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/proxy/Nascar', {
          teamID: selectedCountry,
          year: year,
        });

        if (Array.isArray(response.data.drivers)) {
          setData(response.data.drivers);
          setSeries(response.data.series);
        } else {
          console.error('Expected drivers to be an array, but it was not:', response.data.drivers);
          setError('Data format error: drivers data is not an array');
        }

        if (year === '2024' && countries.length === 0) {
          const uniqueCountries = [
            ...new Set(response.data.drivers.map(driver => driver.country).filter(Boolean)),
          ];
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry, year]);

  useEffect(() => {
    if (selectedCountry && Array.isArray(data)) {
      setFilteredData(data.filter(driver => driver.country === selectedCountry));
    } else {
      setFilteredData(data);
    }
  }, [selectedCountry, data]);

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    setSelectedDriver('');
    setShowEntireTable(true); 
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleDriverSelect = (driverId) => {
    setSelectedDriver(driverId);
    setShowEntireTable(false); 
  };

  const handleReset = () => {
    setSelectedCountry('');
    setSelectedDriver('');
    setYear('2024');
    setShowEntireTable(true); 
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="stats-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!selectedCountry ? (
        <>
          <Box display="flex" justifyContent="center" marginBottom="20px">
            <h1 style={{ paddingTop: '350px' }}>Pick Your Favorite NASCAR Team Here</h1>
          </Box>
              <Box>
              <Button variant="contained" size="large" href=''>
                Home
              </Button>
              </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            width="80%"
            margin="0 auto"
            paddingTop="50px"
            paddingLeft="200px"
            gap="20px"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '20px',
            }}
          >
            {countries.map((countryName, index) => (
              <Box
                key={index}
                onClick={() => handleCountryClick(countryName)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#007bff',
                  textDecoration: 'underline',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`/images/nascar_logos/${countryName.toLowerCase()}.jpg`}
                  alt={`${countryName} logo`}
                  style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '10px',
                  }}
                />
                {countryName}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px" marginTop="50px">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReset}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                borderRadius: '50px',
                backgroundColor: '#007bff',
                color: 'white',
              }}
            >
              Reset Filters
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" marginTop="20px">
            <select onChange={handleYearChange} value={year}>
              {[...Array(25).keys()].map(i => {
                const yearOption = 2015 + i;
                if (yearOption <= 2024) {
                  return (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </Box>

          {filteredData.length > 0 && (
            <Box display="flex" justifyContent="center" marginTop="20px">
              <select onChange={(e) => handleDriverSelect(e.target.value)} value={selectedDriver}>
                <option value="">Select Driver</option>
                {filteredData.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.full_name}
                  </option>
                ))}
              </select>
            </Box>
          )}

          <Box display="flex" justifyContent="center" marginTop="50px">
            <h2 className="table-title">{`${selectedCountry} Driver Information for ${year}`}</h2>
          </Box>

          <div className="table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Country</th>
                  <th>Birth Place</th>
                  <th>Status</th>
                  <th>Series Cup</th>
                  <th>Starts</th>
                  <th>Wins</th>
                  <th>Top 5</th>
                  <th>Top 10</th>
                  <th>Poles</th>
                  <th>Avg Finish Position</th>
                  <th>Avg Start Position</th>
                  <th>Laps Completed</th>
                  <th>Miles Completed</th>
                  <th>Money</th>
                  <th>Race</th>
                  <th>Running Finish</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter(driver => showEntireTable || driver.id === selectedDriver)
                  .map((driver, index) => {
                    const raceSplits = driver.race_splits && driver.race_splits[0] ? driver.race_splits[0] : {};
                    return (
                      <tr key={index}>
                        <td>{driver.full_name || 'n/a'}</td>
                        <td>{driver.country || 'n/a'}</td>
                        <td>{driver.birth_place || 'n/a'}</td>
                        <td>{driver.status === 'ACT' ? 'Active' : 'Inactive'}</td>
                        <td>{series.name}</td>
                        <td>{raceSplits.starts || 'n/a'}</td>
                        <td>{raceSplits.wins || 'n/a'}</td>
                        <td>{raceSplits.top_5 || 'n/a'}</td>
                        <td>{raceSplits.top_10 || 'n/a'}</td>
                        <td>{raceSplits.poles || 'n/a'}</td>
                        <td>{raceSplits.avg_finish_position || 'n/a'}</td>
                        <td>{raceSplits.avg_start_position || 'n/a'}</td>
                        <td>{raceSplits.laps_completed || 'n/a'}</td>
                        <td>{raceSplits.miles_completed || 'n/a'}</td>
                        <td>{raceSplits.money || 'n/a'}</td>
                        <td>{raceSplits.race?.name || 'n/a'}</td>
                        <td>{raceSplits.running_at_finish || 'n/a'}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
