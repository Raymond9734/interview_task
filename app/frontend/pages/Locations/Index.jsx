import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import LocationPin from '../../components/LocationPin';
import Map from '../../components/Map';

export default function Locations({ locations, user }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { delete: destroy, processing } = useForm();

  const handleEdit = (location) => {
    // Navigate to edit page
    window.location.href = `/locations/${location.id}/edit`;
  };

  const handleDelete = (location) => {
    if (confirm('Are you sure you want to delete this location?')) {
      destroy(`/locations/${location.id}`);
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <Head title="My Locations" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">My Locations</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-amber-900">Your Pinned Locations</h3>
                      <p className="mt-1 max-w-2xl text-sm text-amber-700">
                        Manage your locations and add new ones.
                      </p>
                    </div>
                    <Link
                      href="/locations/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      Add New Location
                    </Link>
                  </div>
                  
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="text-md font-medium text-amber-900 mb-4">Location List</h4>
                        {locations.length > 0 ? (
                          <div>
                            {locations.map((location) => (
                              <LocationPin
                                key={location.id}
                                location={location}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-amber-50/20 rounded-xl">
                            <svg
                              className="mx-auto h-12 w-12 text-amber-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                              />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-amber-900">No locations</h3>
                            <p className="mt-1 text-sm text-amber-700">
                              Get started by creating a new location.
                            </p>
                            <div className="mt-6">
                              <Link
                                href="/locations/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                              >
                                Add New Location
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium text-amber-900 mb-4">Map View</h4>
                        <div className="rounded-xl overflow-hidden shadow-lg">
                          <Map
                            locations={locations}
                            onMarkerClick={handleMarkerClick}
                            center={selectedLocation ? [selectedLocation.latitude, selectedLocation.longitude] : [51.505, -0.09]}
                            zoom={selectedLocation ? 15 : 13}
                          />
                        </div>
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