import React, { useState, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import LocationPin from '../../components/LocationPin';
import Map from '../../components/Map';
import Flash from '../../components/Flash';

export default function MyLocations({ user_locations, user }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-0.0236, 37.9062]);
  const [mapZoom, setMapZoom] = useState(6);
  const mapRef = useRef(null);
  const { delete: destroy, processing } = useForm();

  const handleEdit = (location) => {
    window.location.href = `/locations/${location.id}/edit`;
  };

  const handleDelete = (location) => {
    if (confirm('Are you sure you want to delete this location?')) {
      destroy(`/locations/${location.id}`);
    }
  };

  const handleLocationClick = (location) => {
    const lat = parseFloat(location.latitude);
    const lng = parseFloat(location.longitude);

    setSelectedLocation(location);
    setMapCenter([lat, lng]);
    setMapZoom(16);
  };

  return (
    <>
      <Flash />
      <Head title="My Locations" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-6">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">My Locations</h1>
                <Link
                  href="/locations/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                >
                  Add New Location
                </Link>
              </div>
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
                            locations={user_locations}
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
                        <h3 className="text-lg leading-6 font-medium text-amber-900">Your Locations</h3>
                        <p className="mt-1 max-w-2xl text-sm text-amber-700">
                          Click on a location to zoom to it on the map.
                        </p>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        {user_locations.length > 0 ? (
                          <div className="space-y-4">
                            {user_locations.map((location) => (
                              <LocationPin
                                key={location.id}
                                location={location}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isSelected={selectedLocation && selectedLocation.id === location.id}
                                onClick={() => handleLocationClick(location)}
                                showActions={true}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-sm text-amber-700">
                              You haven't added any locations yet.
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