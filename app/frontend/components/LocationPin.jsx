import React from 'react';
import { Link } from '@inertiajs/react';

export default function LocationPin({ location, onEdit, onDelete, isSelected = false, onClick, showActions = false }) {
  return (
    <div 
      className={`bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:bg-white/80 cursor-pointer ${isSelected ? 'ring-2 ring-amber-500 bg-amber-50/80' : ''}`}
      onClick={onClick}
    >
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
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(location);
              }}
              className="text-amber-600 hover:text-amber-800 transition-colors duration-300"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(location);
              }}
              className="text-red-600 hover:text-red-800 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Link
          href={`/locations/${location.id}`}
          className="text-amber-800 hover:text-amber-600 text-sm font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-amber-600"
          onClick={(e) => e.stopPropagation()}
        >
          View details →
        </Link>
      </div>
    </div>
  );
} 