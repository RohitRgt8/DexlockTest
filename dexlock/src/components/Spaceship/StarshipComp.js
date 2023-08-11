import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/styles.css";
import Modal from '../Modal';
import ReactPaginate from 'react-paginate';

const StarshipComp = () => {
  const [starshipsData, setStarshipsData] = useState({
    totalCount: 0,
    starships: [],
  });
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    fetchStarships(currentPage);
  }, [currentPage]);

  // Function to fetch starships
  const fetchStarships = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    axios.get(`https://swapi.dev/api/starships/?page=${page}`)
      .then(response => {
        setStarshipsData({
          totalCount: response.data.count,
          starships: response.data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  // Function to open the modal and set the selected starship
  const openModal = starship => {
    setSelectedStarship(starship);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedStarship(null);
  };

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchStarships(selectedPage.selected + 1); // Update starships data for the new page
  };

  return (
    <div className="starship-container">
      <h1>Star Wars Starships</h1>
      <div className="starship-grid">
        {starshipsData.starships.map((starship, index) => (
          <div key={index} className="starship-box" onClick={() => openModal(starship)}>
            {starship.name}
          </div>
        ))}
      </div>
      {selectedStarship && (
        <Modal
          starship={selectedStarship}
          onClose={closeModal}
        />
      )}
      <ReactPaginate
        pageCount={Math.ceil(starshipsData.totalCount / itemsPerPage)}
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

export default StarshipComp;
