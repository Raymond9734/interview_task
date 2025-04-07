import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function LocationPin({ location, isSelected = false, onClick, showActions = false }) {
  const { delete: destroy } = useForm();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this location?')) {
      destroy(`/locations/${location.id}`);
    }
  };

  return (
    <div 
      className={`bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:bg-white/80 cursor-pointer ${isSelected ? 'ring-2 ring-amber-500 bg-amber-50/80' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-amber-900">
            {location.name.length > 30 
              ? `${location.name.substring(0, 30)}...` 
              : location.name}
          </h3>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link
          href={`/locations/${location.id}`}
          className="text-amber-800 hover:text-amber-600 text-sm font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-amber-600"
          onClick={(e) => e.stopPropagation()}
        >
          View details →
        </Link>
        {showActions && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
} 