import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'height', headerName: 'Height', width: 150 },
  { field: 'mass', headerName: 'Mass', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 150 },
];

const PeopleTable = () => {
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then(response => {
        setPeople(prevPeople => [...prevPeople, ...response.data.results]);
        if (response.data.next) {
          setCurrentPage(currentPage + 1);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const rows = people.map(person => ({
    id: person.url,
    name: person.name,
    height: person.height,
    mass: person.mass,
    gender: person.gender,
  }));

  return (
    <div style={{ height: 600, width: '50%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default PeopleTable;
