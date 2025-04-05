import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for user locations
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-amber.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Custom marker icon for admin locations
const adminIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Component to handle map click events
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Map({ locations = [], onMapClick, center = [51.505, -0.09], zoom = 13 }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={location.user?.role === 'admin' ? adminIcon : userIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg text-amber-900">{location.name}</h3>
                <p className="text-sm text-amber-700">
                  Added by: {location.user?.username || 'Unknown'}
                </p>
                {location.user?.role === 'admin' && (
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                    Admin
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
      </MapContainer>
    </div>
  );
} 