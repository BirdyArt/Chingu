import React, { Component, useState, useEffect } from 'react';

const Sidebar = ({ width, height, children }) => {
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
  }, []);

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
        
        <div className="content">{children}</div>
      </div>
    </>
  );
}


export default Sidebar;