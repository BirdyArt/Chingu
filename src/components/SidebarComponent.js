import React, { useState, useEffect } from 'react';

const Sidebar = ({ width, height, children, geodata }) => {
  const [xPosition, setX] = useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  useEffect(() => {
    setX(-width);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button onClick={() => toggleMenu()} className="toggle-menu">
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="15" rx="8"></rect>
          <rect y="30" width="100" height="15" rx="8"></rect>
          <rect y="60" width="100" height="15" rx="8"></rect>
        </svg>
      </button>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <div className="content">
          {children}
          {(geodata.some(place => place.properties.visibility === "yes")) ?
            geodata.map((place,index) => 
            place.properties.visibility === "yes" ?
              <h5 key={place.properties.name} id={index} className="text-center places">{place.properties.name}</h5> : null
            ) : 
            <h5 className="text-center notfound">Nothing is found 😟</h5>}
        </div>
      </div>
    </>
  );
}

export default Sidebar;