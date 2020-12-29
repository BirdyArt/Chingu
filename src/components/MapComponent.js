import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Marker from './MarkerComponent';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = ({geodata}) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-123.12068939208986, 49.283259953761124],
      zoom: 12,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    setMap(map);

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMarkers([]);
    markers.forEach(marker => marker.remove())
    
    geodata.forEach((result,index) => {
      if (result.properties.visibility === "yes") {
        // create marker node
        const markerNode = document.createElement('div');
        ReactDOM.render(<Marker />, markerNode);
      
        // add marker to map
        const marker = new mapboxgl.Marker(markerNode).setLngLat(result.geometry.coordinates);
        setMarkers(markers => [...markers, marker]);

        // add popup to map
        const popup = new mapboxgl.Popup({offset:[0, -15]})
        .setHTML('<h5 class="text-center">' + result.properties.name + 
        '</h5><p class="text-center">' + result.properties.description + '</p>');

        // add event listeners for markers
        const markerDiv = marker.getElement();

        markerDiv.addEventListener('mouseenter', () => popup.addTo(map));
        markerDiv.addEventListener('mouseleave', () => popup.remove());
        
        marker.setPopup(popup);
        marker.addTo(map);

        // add event listeners for filtered list
        const listDiv = document.getElementById(index);
        
        listDiv.addEventListener('mouseenter', () => popup.addTo(map));
        listDiv.addEventListener('mouseleave', () => popup.remove());
      }
    });
  }, [geodata]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" id="map" />;
};

export default Map;