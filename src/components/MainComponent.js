import React, { Component } from 'react';
import Sidebar from './SidebarComponent';

function Main() {
  return (
    <div id="main">
      <Sidebar width={250} height={"70vh"}>
        <h3 className="text-center">My Neighbourhood</h3>
        <input className="col-10 offset-1" type="text" id="location-input" placeholder="Filter locations..." /> 
      </Sidebar>
    </div>
  );
}

export default Main;
