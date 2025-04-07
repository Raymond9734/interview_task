import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import LocationPin from '../../components/LocationPin';
import Map from '../../components/Map';

export default function OtherLocations({ other_locations, user }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-0.0236, 37.9062]);
  const [mapZoom, setMapZoom] = useState(6);
  const mapRef = useRef(null);

  const handleLocationClick = (location) => {
    const lat = parseFloat(location.latitude);
    const lng = parseFloat(location.longitude);

    setSelectedLocation(location);
    setMapCenter([lat, lng]);
    setMapZoom(16);
  };

  return (
    <>
      <Head title="Other Users' Locations" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-6">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">Other Users' Locations</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map Section */}
                  <div className="lg:col-span-2">
                    <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl h-full">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-amber-900">Map View</h3>
                        <p className="mt-1 max-w-2xl text-sm text-amber-700">
                          Click on a location in the list to zoom to it on the map.
                        </p>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
                          <Map
                            ref={mapRef}
                            locations={other_locations}
                            center={mapCenter}
                            zoom={mapZoom}
                            user={user}
                            selectedLocation={selectedLocation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Locations List Section */}
                  <div>
                    <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-amber-900">Other Users' Locations</h3>
                        <p className="mt-1 max-w-2xl text-sm text-amber-700">
                          Click on a location to zoom to it on the map.
                        </p>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        {other_locations.length > 0 ? (
                          <div className="space-y-4">
                            {other_locations.map((location) => (
                              <LocationPin
                                key={location.id}
                                location={location}
                                isSelected={selectedLocation && selectedLocation.id === location.id}
                                onClick={() => handleLocationClick(location)}
                                showActions={false}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-sm text-amber-700">
                              No locations from other users yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}