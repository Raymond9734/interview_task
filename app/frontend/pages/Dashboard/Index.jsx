import React, { useState, useEffect, useCallback } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import Navigation from '../../components/Navigation';
import { debounce } from 'lodash';

export default function AdminDashboard({ users, user, pagination }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { delete: destroy, processing } = useForm();

  const debouncedSearch = useCallback(
    debounce((value) => {
      router.get('/dashboard', {
        page: 1,
        per_page: pagination.per_page,
        search: value,
      }, {
        preserveScroll: true,
        preserveState: true,
        replace: true
      });
    }, 500),
    [] // Empty dependency array since we want this to be created only once
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page) => {
    router.get('/dashboard', { 
      page,
      per_page: pagination.per_page,
      search: searchTerm,
      preserveState: true,
      preserveScroll: true 
    }, {
      preserveScroll: true,
      preserveState: true,
      replace: true
    });
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Navigation user={user} />
        
        <div className="py-10">
     
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-4 sm:px-0">
                <div className="bg-white/60 backdrop-blur-md shadow-xl overflow-hidden sm:rounded-3xl transition-all duration-300 hover:shadow-2xl">
                  <div className="px-4 py-4 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-amber-900">User Management</h3>
                    <p className="mt-1 max-w-2xl text-sm text-amber-700">
                      Manage users and their locations.
                    </p>
                  </div>
                  
                  <div className="px-4 py-5 sm:p-6">
                    <div className="mb-4">
                      <label htmlFor="search" className="sr-only">
                        Search users
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <input
                          type="text"
                          name="search"
                          id="search"
                          className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                          placeholder="Search by username or email"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-amber-200/50">
                        <thead className="bg-amber-50/20">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                            >
                              Username
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider"
                            >
                              Locations
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white/60 divide-y divide-amber-200/50">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-amber-50/30 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-amber-900">{user.username}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-amber-700">{user.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.role === 'admin'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                                {user.locations_count || 0}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {user.role !== 'admin' && (
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={processing}
                                    className="text-red-600 hover:text-red-900 transition-colors duration-300"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-amber-200/50">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() => handlePageChange(pagination.current_page - 1)}
                          disabled={pagination.current_page === 1}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm
                            ${pagination.current_page === 1 
                              ? 'bg-amber-50 text-amber-400 cursor-not-allowed'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
                            }`}
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => handlePageChange(pagination.current_page + 1)}
                          disabled={pagination.current_page === pagination.total_pages}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm
                            ${pagination.current_page === pagination.total_pages
                              ? 'bg-amber-50 text-amber-400 cursor-not-allowed'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-4">
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                              onClick={() => handlePageChange(pagination.current_page - 1)}
                              disabled={pagination.current_page === 1}
                              className="relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium shadow-sm bg-white text-amber-700 hover:bg-amber-50 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-amber-50 disabled:text-amber-400 disabled:cursor-not-allowed"
                            >
                              <span className="sr-only">Previous</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <div className="flex items-center px-4 py-2 text-sm font-medium text-amber-700 bg-white border-t border-b border-amber-200">
                              Page {pagination.current_page} of {pagination.total_pages}
                            </div>
                            <button
                              onClick={() => handlePageChange(pagination.current_page + 1)}
                              disabled={pagination.current_page === pagination.total_pages}
                              className="relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium shadow-sm bg-white text-amber-700 hover:bg-amber-50 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-amber-50 disabled:text-amber-400 disabled:cursor-not-allowed"
                            >
                              <span className="sr-only">Next</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </nav>
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