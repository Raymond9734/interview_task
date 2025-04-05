import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import Map from '../../components/Map';

export default function Edit({ location, user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const [selectedPosition, setSelectedPosition] = useState([location.latitude, location.longitude]);

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
    put(`/locations/${location.id}`);
  };

  return (
    <>
      <Head title="Edit Location" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">Edit Location</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
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
                            />
                            {errors.longitude && (
                              <p className="mt-2 text-sm text-red-500">{errors.longitude}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-amber-800">
                            Select Location on Map
                          </label>
                          <div className="mt-1 h-96 rounded-xl overflow-hidden shadow-lg">
                            <Map
                              locations={[location]}
                              onMapClick={handleMapClick}
                              center={selectedPosition}
                              zoom={15}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-amber-50/20 text-right sm:px-6">
                      <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
                      >
                        {processing ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
} 