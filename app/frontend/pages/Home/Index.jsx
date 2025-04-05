import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import Map from '../../components/Map';

export default function Home({ locations, user }) {
  return (
    <>
      <Head title="Home" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-amber-900 font-[Poppins]">Location Pinner</h1>
              <p className="mt-2 text-sm text-amber-700">
                Pin your favorite locations on the map and explore locations pinned by others.
              </p>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {user ? (
                <div className="space-y-8">
                  {/* Map Section */}
                  <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-amber-900">All Locations</h3>
                      <p className="mt-1 max-w-2xl text-sm text-amber-700">
                        Explore all locations pinned by users.
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="h-[500px]">
                        <Map locations={locations} />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-amber-900">Quick Actions</h3>
                      <p className="mt-1 max-w-2xl text-sm text-amber-700">
                        Manage your pinned locations.
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link
                        href="/locations/new"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Add New Location
                      </Link>
                      <Link
                        href="/locations"
                        className="inline-flex items-center justify-center px-4 py-2 border border-amber-300/50 text-sm font-medium rounded-xl text-amber-800 bg-white/60 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        View My Locations
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Welcome Section */}
                  <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-amber-900">Welcome to Location Pinner</h3>
                      <p className="mt-1 max-w-2xl text-sm text-amber-700">
                        Sign in or create an account to start pinning your favorite locations.
                      </p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                          href="/login"
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="inline-flex items-center justify-center px-4 py-2 border border-amber-300/50 text-sm font-medium rounded-xl text-amber-800 bg-white/60 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                          </svg>
                          Create Account
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-amber-900">Features</h3>
                      <p className="mt-1 max-w-2xl text-sm text-amber-700">
                        What you can do with Location Pinner
                      </p>
                    </div>
                    <div className="border-t border-amber-200/50">
                      <dl>
                        <div className="bg-amber-50/20 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-amber-800">Pin Locations</dt>
                          <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                            Add your favorite locations to the map with custom names and descriptions.
                          </dd>
                        </div>
                        <div className="bg-white/60 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-amber-800">Interactive Map</dt>
                          <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                            Explore locations on an interactive map interface.
                          </dd>
                        </div>
                        <div className="bg-amber-50/20 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-amber-800">Location Management</dt>
                          <dd className="mt-1 text-sm text-amber-900 sm:mt-0 sm:col-span-2">
                            Edit and manage your pinned locations easily.
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
} 