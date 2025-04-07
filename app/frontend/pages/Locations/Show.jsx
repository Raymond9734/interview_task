import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import Map from '../../components/Map';

export default function Show({ location, user, allLocations = [] }) {
  const isOwner = user && user.id === location.user_id;
  const isAdmin = user && user.role === 'admin';
  const [currentPosition, setCurrentPosition] = useState(null);

  // Get current position from local storage
  React.useEffect(() => {
    const savedPermission = localStorage.getItem('locationPermission');
    
    if (savedPermission === 'granted') {
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

  return (
    <>
      <Head title={location.name} />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">{location.name}</h1>
                {(isOwner || isAdmin) && (
                  <div className="flex space-x-3">
                    <Link
                      href={`/locations/${location.id}/edit`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      Edit Location
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-amber-900">Location Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-amber-700">
                      Information about this location.
                    </p>
                  </div>
                  <div className="border-t border-amber-200/50">
                    <dl>
                      <div className="bg-amber-50/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-amber-800">Name</dt>
                        <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">{location.name}</dd>
                      </div>
                      <div className="bg-white/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-amber-800">Coordinates</dt>
                        <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                          {location.latitude}, {location.longitude}
                        </dd>
                      </div>
                      <div className="bg-amber-50/30 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-amber-800">Added By</dt>
                        <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                          {location.user?.username || 'Unknown'}
                        </dd>
                      </div>
                      <div className="bg-white/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-amber-800">Added On</dt>
                        <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                          {new Date(location.created_at).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-amber-900">Location on Map</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <Map
                          locations={allLocations}
                          center={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                          zoom={15}
                          user={user}
                          selectedLocation={location}
                          currentPosition={currentPosition}
                        />
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