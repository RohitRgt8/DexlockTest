import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PlanetComp = () => {
  const [planetsData, setPlanetsData] = useState({
    totalCount: 0,
    planets: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    fetchPlanets(currentPage);
  }, [currentPage]);

  const fetchPlanets = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    axios.get(`https://swapi.dev/api/planets/?page=${page}`)
      .then(response => {
        setPlanetsData({
          totalCount: response.data.count,
          planets: response.data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchPlanets(selectedPage.selected + 1); // Update planets data for the new page
  };

  return (
    <div className="planet-container">
      <h1>Star Wars Planets</h1>
      <div className="planet-grid">
        {planetsData.planets.map((planet, index) => (
          <div key={index} className="planet-box">
            {planet.name}
          </div>
        ))}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(planetsData.totalCount / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination-container"
        pageClassName="pagination-page"
        activeClassName="pagination-active"
        previousLabel="Previous"
        nextLabel="Next"
      />
    </div>
  );
};

export default PlanetComp;
