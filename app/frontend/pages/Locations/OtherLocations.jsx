import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import Navigation from '../../components/Navigation';
import LocationPin from '../../components/LocationPin';
import Map from '../../components/Map';
import Flash from '../../components/Flash';

export default function OtherLocations({ other_locations, user, pagination }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-0.0236, 37.9062]);
  const [mapZoom, setMapZoom] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);


  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      router.get('/locations/others', { search: value, page: 1 }, {
        preserveState: true,
        preserveScroll: true,
      });
    }, 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleLocationClick = (location) => {
    const lat = parseFloat(location.latitude);
    const lng = parseFloat(location.longitude);

    setSelectedLocation(location);
    setMapCenter([lat, lng]);
    setMapZoom(16);
  };

  const resetMapView = () => {
    if (mapRef.current && other_locations.length > 0) {
      // Create bounds for all locations
      const bounds = new L.LatLngBounds();
      other_locations.forEach(location => {
        const lat = parseFloat(location.latitude);
        const lng = parseFloat(location.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          bounds.extend([lat, lng]);
        }
      });

      // Fit map to show all locations
      mapRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12,
        animate: true,
        duration: 1
      });
    }
  };

  const handlePageChange = (page) => {
    setIsLoading(true);
    setSelectedLocation(null); // Clear selected location
    
    router.get(
      '/locations/others',
      { 
        search: searchTerm, 
        page: page 
      },
      {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          setIsLoading(false);
          resetMapView(); // Reset map view after page change
        },
      }
    );
  };

  // Reset map view when locations change
  useEffect(() => {
    resetMapView();
  }, [other_locations]);

  return (
    <>
      <Flash />
      <Head title="Other Users' Locations" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} className="fixed top-0 left-0 right-0 z-50" />
        
        <div className="pt-16">
          <header className="fixed top-16 left-0 right-0 z-10 bg-gradient-to-br from-amber-50 to-orange-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">Other Users' Locations</h1>
            </div>
          </header>
          <main className="pt-16">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Map Section */}
                  <div className="lg:col-span-2">
                    <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl h-[600px]">
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
                    <div className="bg-white/60 backdrop-blur-md shadow-xl h-[600px] overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-amber-900">Other Users' Locations</h3>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Search locations..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="px-3 py-4 sm:p-6 max-h-[400px] overflow-y-auto">
                        {other_locations.length > 0 ? (
                          <div className="space-y-4">
                            {other_locations.slice(0, 4).map((location) => (
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
                              No locations found.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pagination Controls */}
                {pagination && pagination.total > pagination.per_page && (
                  <div className="sticky bottom-4 mt-4">
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4">
                      <div className="flex justify-between items-center gap-4">
                        <button
                          onClick={() => handlePageChange(pagination.current_page - 1)}
                          disabled={pagination.current_page === 1 || isLoading}
                          className={"px-6 py-3 rounded-xl font-medium text-sm transform transition-all duration-200 flex items-center gap-2 shadow-sm"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>
                        <span className="px-4 py-2 bg-amber-100 text-amber-900 rounded-lg font-medium text-sm">
                          Page {pagination.current_page} of {Math.ceil(pagination.total / 4)}
                        </span>
                        <button
                          onClick={() => handlePageChange(pagination.current_page + 1)}
                          disabled={pagination.current_page >= Math.ceil(pagination.total / 4) || isLoading}
                          className={"px-6 py-3 rounded-xl font-medium text-sm transform transition-all duration-200 flex items-center gap-2 shadow-sm"}
                        >
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}