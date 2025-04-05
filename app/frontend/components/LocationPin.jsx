import React from 'react';
import { Link } from '@inertiajs/react';

export default function LocationPin({ location, onEdit, onDelete }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-amber-900">{location.name}</h3>
          <p className="text-sm text-amber-700">
            Coordinates: {location.latitude}, {location.longitude}
          </p>
          <p className="text-sm text-amber-700">
            Added by: {location.user?.username || 'Unknown'}
          </p>
          {location.user?.role === 'admin' && (
            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
              Admin
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(location)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-xl text-amber-800 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(location)}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-xl text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={`/locations/${location.id}`}
          className="text-amber-800 hover:text-amber-600 text-sm font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-amber-600"
        >
          View details →
        </Link>
      </div>
    </div>
  );
} 