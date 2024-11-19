import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';

const MapSelector = ({ onUpdate }) => {
  const [startingPlace, setStartingPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

  const handleMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    if (!startingPlace) {
      setStartingPlace({ longitude, latitude });
      onUpdate({ startingPlace: { longitude, latitude } });
    } else if (!destinationPlace) {
      setDestinationPlace({ longitude, latitude });
      onUpdate({ destinationPlace: { longitude, latitude } });
    }
  };

  return (
    <div>
      <h2>Select Places</h2>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3,
        }}
        style={{ width: '100%', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={handleMapClick}
      >
        {startingPlace && (
          <Marker longitude={startingPlace.longitude} latitude={startingPlace.latitude} color="blue" />
        )}
        {destinationPlace && (
          <Marker longitude={destinationPlace.longitude} latitude={destinationPlace.latitude} color="red" />
        )}
      </Map>
    </div>
  );
};

export default MapSelector;
