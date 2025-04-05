import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Map from './Map';

export default function CreateLocation({ errors = {} }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const { data, setData, post, processing, reset } = useForm({
    name: '',
    latitude: '',
    longitude: '',
  });

  const handleMapClick = (latlng) => {
    setSelectedPosition(latlng);
    setData({
      ...data,
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/locations', {
      onSuccess: () => {
        reset();
        setSelectedPosition(null);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add a new location</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Click on the map to select coordinates or enter them manually.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Location Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      id="latitude"
                      value={data.latitude}
                      onChange={(e) => setData('latitude', e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                  </div>

                  <div>
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      id="longitude"
                      value={data.longitude}
                      onChange={(e) => setData('longitude', e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Location on Map
                  </label>
                  <Map
                    onMapClick={handleMapClick}
                    center={selectedPosition ? [selectedPosition.lat, selectedPosition.lng] : [51.505, -0.09]}
                    zoom={selectedPosition ? 15 : 13}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {processing ? 'Saving...' : 'Save Location'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 