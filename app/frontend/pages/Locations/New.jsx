import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import Map from '../../components/Map';

export default function New({ user, allLocations = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    latitude: '',
    longitude: '',
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  // Get current position from local storage or request it
  useEffect(() => {
    const savedPermission = localStorage.getItem('locationPermission');
    setLocationPermission(savedPermission);
    
    if (savedPermission === 'granted') {
      const savedPosition = localStorage.getItem('userPosition');
      if (savedPosition) {
        try {
          const position = JSON.parse(savedPosition);
          setCurrentPosition(position);
          setSelectedPosition([position.lat, position.lng]);
          setData({
            ...data,
            latitude: position.lat,
            longitude: position.lng,
          });
        } catch (error) {
          // Error parsing saved position
        }
      }
    }
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedPosition([lat, lng]);
    setData({
      ...data,
      latitude: lat,
      longitude: lng,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/locations');
  };

  return (
    <>
      <Head title="Add New Location" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-6">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">Add New Location</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                {/* Form Section */}
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl mb-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-amber-800">
                            Location Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={data.name}
                              onChange={(e) => setData('name', e.target.value)}
                              className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                              required
                            />
                            {errors.name && (
                              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="latitude" className="block text-sm font-medium text-amber-800">
                            Latitude
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              step="any"
                              name="latitude"
                              id="latitude"
                              value={data.latitude}
                              onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                              className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                              required
                            />
                            {errors.latitude && (
                              <p className="mt-2 text-sm text-red-500">{errors.latitude}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="longitude" className="block text-sm font-medium text-amber-800">
                            Longitude
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              step="any"
                              name="longitude"
                              id="longitude"
                              value={data.longitude}
                              onChange={(e) => setData('longitude', parseFloat(e.target.value))}
                              className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                              required
                            />
                            {errors.longitude && (
                              <p className="mt-2 text-sm text-red-500">{errors.longitude}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-amber-50/30 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
                      >
                        {processing ? 'Saving...' : 'Save Location'}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Map Section */}
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-amber-900 mb-2">Select Location on Map</h2>
                    <p className="text-sm text-amber-700 mb-4">
                      Click on the map to set the location coordinates, or use your current position.
                    </p>
                    <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
                      <Map 
                        locations={allLocations}
                        onMapClick={handleMapClick} 
                        center={selectedPosition || [-0.0236, 37.9062]} 
                        zoom={selectedPosition ? 15 : 6} 
                        user={user}
                        currentPosition={currentPosition}
                      />
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