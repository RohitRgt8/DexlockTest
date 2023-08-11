import React from 'react';
import Navbar from '../Navbar';
import DataPieChart from '../DataPieChart';
import { useState, useEffect } from 'react';
import SpaceshipChart from '../SpaceshipChart';
import "../assets/styles.css";
import PeopleTable from '../PeopleTable';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [planets, people, spaceships, vehicles] = await Promise.all([
          fetch('https://swapi.dev/api/planets/').then((response) => response.json()),
          fetch('https://swapi.dev/api/people/').then((response) => response.json()),
          fetch('https://swapi.dev/api/starships/').then((response) => response.json()),
          fetch('https://swapi.dev/api/vehicles/').then((response) => response.json())
        ]);

        // console.log("planets data", planets);
        const planetCount = planets.count;
        const peopleCount = people.count;
        const spaceshipCount = spaceships.count;
        const vehicleCount = vehicles.count;

        setData([
          { id: 'planets', label: 'Planets', value: planetCount },
          { id: 'people', label: 'People', value: peopleCount },
          { id: 'spaceships', label: 'Spaceships', value: spaceshipCount },
          { id: 'vehicles', label: 'Vehicles', value: vehicleCount }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

    return (
      <div className="App">
        <Navbar />
        <h1>Data Visualizations</h1>
        <div className="grid-container">
          <div className="grid-item">
            <DataPieChart data={data} />
          </div>
          <div className="grid-item">
            <SpaceshipChart />
          </div>
        </div>
        <br />
        <br />
        <div className="scrollable-content">
          <PeopleTable />
        </div>
      </div>
    );
    

}

export default Home