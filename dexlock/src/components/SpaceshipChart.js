import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import "./assets/styles.css"

const SpaceshipChart = () => {
  const [spaceships, setSpaceships] = useState([]);

  useEffect(() => {
    fetchAllSpaceships();
  }, []);

  // Fetch all spaceships from all pages
  const fetchAllSpaceships = async () => {
    let allSpaceships = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
        const newSpaceships = response.data.results;
        allSpaceships = allSpaceships.concat(newSpaceships);

        if (response.data.next) {
          page++;
        } else {
          hasNextPage = false;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        hasNextPage = false;
      }
    }

    setSpaceships(allSpaceships);
  };

  // Count the number of spaceships from each manufacturer
  const manufacturerCounts = spaceships.reduce((counts, spaceship) => {
    const manufacturer = spaceship.manufacturer;
    counts[manufacturer] = (counts[manufacturer] || 0) + 1;
    return counts;
  }, {});

  // Prepare data for the bar chart
  const data = Object.keys(manufacturerCounts).map(manufacturer => ({
    manufacturer,
    count: manufacturerCounts[manufacturer],
  }));
  console.log("data", data);

  return (
    <div className="chart-container">
      <h2>Spaceships by Manufacturer</h2>
      <div className="chart">
        <ResponsiveBar
          data={data}
          keys={['count']}
          indexBy="manufacturer"
          margin={{ top: 20, right: 30, bottom: 40, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'category10' }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisBottom={
            null
          }
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default SpaceshipChart;
