import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const VehicleComp = () => {
  const [vehiclesData, setVehiclesData] = useState({
    totalCount: 0,
    vehicles: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  const fetchVehicles = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    axios.get(`https://swapi.dev/api/vehicles/?page=${page}`)
      .then(response => {
        setVehiclesData({
          totalCount: response.data.count,
          vehicles: response.data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchVehicles(selectedPage.selected + 1); // Update vehicles data for the new page
  };

  return (
    <div className="vehicle-container">
      <h1>Star Wars Vehicles</h1>
      <div className="vehicle-grid">
        {vehiclesData.vehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-box">
            {vehicle.name}
          </div>
        ))}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(vehiclesData.totalCount / itemsPerPage)}
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

export default VehicleComp;
