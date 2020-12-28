import React, { useState, useEffect } from 'react';
import Sidebar from './SidebarComponent';
import Map from './MapComponent';
import {iLoveVan} from './geojsondata';

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setFilteredData(
      iLoveVan.features.map(place => {
        return {
        ...place,
        visibility: place.properties.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ?
          place.properties.visibility = "yes" : place.properties.visibility = "none"
        }
      })
    )
  }, [searchTerm]);

  return (
   <>
    <Sidebar width={250} height={"70vh"} geodata={filteredData}>
      <h3 className="text-center">My Neighbourhood</h3>
      <input className="col-10 offset-1" type="text" id="location-input" placeholder="Filter locations..." value={searchTerm} onChange={handleChange} /> 
    </Sidebar>
    <Map geodata={filteredData} />
  </>
  );
}

export default Main;
