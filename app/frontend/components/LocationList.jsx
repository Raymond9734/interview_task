import React from 'react';
import LocationPin from './LocationPin';

export default function LocationList({ locations, selectedLocation, onLocationClick }) {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4">
      {locations.map((location) => (
        <LocationPin
          key={location.id}
          location={location}
          isSelected={selectedLocation?.id === location.id}
          onClick={() => onLocationClick(location)}
        />
      ))}
    </div>
  );
} 