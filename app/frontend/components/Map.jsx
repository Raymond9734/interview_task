import React, { useState, useEffect, useRef, use } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom marker icons
const userIcon = new L.Icon({
  iconUrl: '/images/markers/marker-amber.png',
  shadowUrl: '/images/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const otherUserIcon = new L.Icon({
  iconUrl: '/images/markers/marker-blue.png',
  shadowUrl: '/images/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const adminIcon = new L.Icon({
  iconUrl: '/images/markers/marker-red.png',
  shadowUrl: '/images/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const currentUserIcon = new L.Icon({
  iconUrl: '/images/markers/marker-green.png',
  shadowUrl: '/images/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// MapClickHandler component to handle map clicks
function MapClickHandler({ onMapClick }) {
  const map = useMap();
  
  useEffect(() => {
    if (onMapClick) {
      map.on('click', onMapClick);
      return () => {
        map.off('click', onMapClick);
      };
    }
  }, [map, onMapClick]);
  
  return null;
}

// Add a new component to handle bounds
function BoundsHandler({ locations, selectedLocation, isNewLocationMap }) {
  const map = useMap();

  useEffect(() => {
    // For new location map, don't adjust bounds
    if (isNewLocationMap) {
      return;
    }

    if (locations && locations.length > 0) {
      // If there's a selected location, prioritize it
      if (selectedLocation) {
        const lat = parseFloat(selectedLocation.latitude);
        const lng = parseFloat(selectedLocation.longitude);
        map.setView([lat, lng], 16, {
          animate: true,
          duration: 1
        });
        return;
      }

      // Create bounds for all valid locations
      const bounds = new L.LatLngBounds();
      let hasValidLocations = false;

      locations.forEach(location => {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        
        if (!isNaN(lat) && !isNaN(lng) && 
            lat >= -90 && lat <= 90 && 
            lng >= -180 && lng <= 180) {
          bounds.extend([lat, lng]);
          hasValidLocations = true;
        }
      });

      if (hasValidLocations) {
        // Add padding to bounds for better visibility
        const paddingTopLeft = [50, 50];
        const paddingBottomRight = [50, 50];
        
        // Fit bounds with padding and animate the transition
        map.fitBounds(bounds, {
          padding: paddingTopLeft,
          animate: true,
          duration: 1,
          maxZoom: 16 // Prevent excessive zoom when markers are very close
        });
      } else {
        // Default view of Kenya if no valid locations
        map.setView([-0.0236, 37.9062], 6, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [locations, selectedLocation, map, isNewLocationMap]);

  return null;
}

const Map = React.forwardRef(({ 
  locations = [], 
  onMapClick, 
  center = [-0.0236, 37.9062],
  zoom = 6, 
  user, 
  selectedLocation,
  currentPosition: externalCurrentPosition = null,
  isNewLocationMap = false
}, ref) => {
  const [currentPosition, setCurrentPosition] = useState(externalCurrentPosition);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  // Calculate initial bounds based on locations
  const calculateInitialBounds = () => {
    // For new location map, don't calculate bounds
    if (isNewLocationMap) {
      return null;
    }

    if (locations && locations.length > 0) {
      const bounds = new L.LatLngBounds();
      let hasValidLocations = false;

      locations.forEach(location => {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        
        if (!isNaN(lat) && !isNaN(lng) && 
            lat >= -90 && lat <= 90 && 
            lng >= -180 && lng <= 180) {
          bounds.extend([lat, lng]);
          hasValidLocations = true;
        }
      });

      if (hasValidLocations) {
        return bounds;
      }
    }
    return null;
  };

  const initialBounds = calculateInitialBounds();
  const initialCenter = isNewLocationMap ? center : (initialBounds ? initialBounds.getCenter() : center);
  const initialZoom = isNewLocationMap ? zoom : (initialBounds ? null : zoom); // Let fitBounds handle zoom if we have bounds

  // Check for saved location permission on mount
  useEffect(() => {
    const locationPermission = localStorage.getItem('locationPermission');
    
    // Only show prompt if permission hasn't been set
    if (!locationPermission) {
      setShowLocationPrompt(true);
    } else if (locationPermission === 'granted') {
      const savedPosition = localStorage.getItem('userPosition');
      if (savedPosition) {
        try {
          const position = JSON.parse(savedPosition);
          setCurrentPosition(position);
        } catch (error) {
          // Error parsing saved position
        }
      }
    }
  }, []);

  // Update current position when external position changes
  useEffect(() => {
    if (externalCurrentPosition) {
      setCurrentPosition(externalCurrentPosition);
    }
  }, [externalCurrentPosition]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newPosition = { lat, lng };
          setCurrentPosition(newPosition);
          localStorage.setItem('userPosition', JSON.stringify(newPosition));
          localStorage.setItem('locationPermission', 'granted');
        },
        (error) => {
          localStorage.setItem('locationPermission', 'denied');
        }
      );
    }
  };

  const handleLocationPrompt = (accept) => {
    setShowLocationPrompt(false);
    if (accept) {
      requestLocation();
    } else {
      localStorage.setItem('locationPermission', 'denied');
    }
  };

  // Function to determine which icon to use for a location
  const getLocationIcon = (location) => {
    // If location has no user_id or user, use other user icon
    if (!location.user) {
      return otherUserIcon;
    }
    
    // Check if this is the current user's location
    if (location.user.id === user?.id) {
      return userIcon;
    }
    
    // Check if this is an admin's location
    if (location.user.role === 'admin') {
      return adminIcon;
    }
    
    return otherUserIcon;
  };

  // Helper function to parse coordinates
  const parseCoordinates = (lat, lng) => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    return [parsedLat, parsedLng];
  };

  // Add this helper function at the top of your Map component
  const validateCoordinates = (lat, lng) => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    
    return !isNaN(parsedLat) && 
           !isNaN(parsedLng) && 
           parsedLat >= -90 && 
           parsedLat <= 90 && 
           parsedLng >= -180 && 
           parsedLng <= 180;
  };

  // Effect to handle map centering when selectedLocation changes
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      const lat = parseFloat(selectedLocation.latitude);
      const lng = parseFloat(selectedLocation.longitude);
      
      const map = mapRef.current;
      map.setView([lat, lng], 16, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedLocation]);

  const resetView = () => {
    if (mapRef.current) {
      // Create bounds for all locations when resetting view
      const bounds = new L.LatLngBounds();
      let hasValidLocations = false;

      locations.forEach(location => {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        
        if (!isNaN(lat) && !isNaN(lng) && 
            lat >= -90 && lat <= 90 && 
            lng >= -180 && lng <= 180) {
          bounds.extend([lat, lng]);
          hasValidLocations = true;
        }
      });

      if (hasValidLocations) {
        mapRef.current.fitBounds(bounds, {
          padding: [50, 50],
          animate: true,
          duration: 1,
          maxZoom: 16
        });
      } else {
        mapRef.current.setView([-0.0236, 37.9062], 6, {
          animate: true,
          duration: 1
        });
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="h-full w-full"
        ref={mapRef}
        whenReady={() => {
          setMapReady(true);
          
          // If we have initial bounds, fit to them after the map is ready
          if (initialBounds && mapRef.current && !isNewLocationMap) {
            mapRef.current.fitBounds(initialBounds, {
              padding: [50, 50],
              animate: false,
              maxZoom: 16
            });
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add the BoundsHandler component */}
        <BoundsHandler 
          locations={locations} 
          selectedLocation={selectedLocation} 
          isNewLocationMap={isNewLocationMap}
        />
        
        {/* View All button - only show if not a new location map */}
        {!isNewLocationMap && (
          <div className="absolute top-4 right-4 z-[1000]">
            <button
              onClick={resetView}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm text-amber-900 rounded-lg shadow-lg hover:bg-amber-50 transition-colors"
            >
              View All Locations
            </button>
          </div>
        )}

        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
        
        {/* Render location markers */}
        {locations && locations.map((location) => {
          const position = parseCoordinates(location.latitude, location.longitude);
          
          if (!validateCoordinates(location.latitude, location.longitude)) {
            return null;
          }

          const isSelected = selectedLocation && selectedLocation.id === location.id;

          return (
            <Marker
              key={location.id}
              position={position}
              icon={getLocationIcon(location)}
            >
              <Popup>
                <div className={`text-amber-900 ${isSelected ? 'font-bold' : ''}`}>
                  <strong>{location.name}</strong>
                  <br />
                  Added by: {location.user?.username || 'Unknown'}
                  <br />
                  <span className="text-xs text-amber-700">
                    {location.latitude}, {location.longitude}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Render current position marker */}
        {currentPosition && mapReady && (
          <Marker
            key={`current-${currentPosition.lat}-${currentPosition.lng}`}
            position={[currentPosition.lat, currentPosition.lng]}
            icon={currentUserIcon}
          >
            <Popup>
              <div className="text-amber-900">
                <strong>Your Current Location</strong>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {/* Location prompt */}
      {showLocationPrompt && (
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-[1000]">
          <p className="text-amber-900 mb-2">Would you like to use your current location?</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleLocationPrompt(true)}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => handleLocationPrompt(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Map; 