import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PeopleComp = () => {
  const [peopleData, setPeopleData] = useState({
    totalCount: 0,
    people: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    fetchPeople(currentPage);
  }, [currentPage]);

  const fetchPeople = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    axios.get(`https://swapi.dev/api/people/?page=${page}`)
      .then(response => {
        setPeopleData({
          totalCount: response.data.count,
          people: response.data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    fetchPeople(selectedPage.selected + 1); // Update people data for the new page
  };

  return (
    <div className="character-container">
      <h1>Star Wars Characters</h1>
      <div className="character-grid">
        {peopleData.people.map((character, index) => (
          <div key={index} className="character-box">
            {character.name}
          </div>
        ))}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(peopleData.totalCount / itemsPerPage)}
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

export default PeopleComp;
