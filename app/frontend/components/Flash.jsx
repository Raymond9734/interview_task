import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Flash() {
  const { flash, errors } = usePage().props;
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (flash?.notice || flash?.alert || flash?.error || Object.keys(errors || {}).length > 0) {
      setShouldRender(true);
      // Trigger animation after component is rendered
      setTimeout(() => setIsVisible(true), 100);
      
      // Start hiding after 4.7s (to account for animation duration)
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Remove from DOM after animation completes
        setTimeout(() => setShouldRender(false), 300);
      }, 4700);
      
      return () => clearTimeout(timer);
    }
  }, [flash, errors]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 space-y-2 transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      style={{ 
        maxWidth: '320px',
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 999999 // Extremely high z-index to ensure it's above everything
      }}
    >
      {/* Success Message */}
      {flash?.notice && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-95" role="alert">
          <span className="block text-sm">{flash.notice}</span>
        </div>
      )}

      {/* Error Message */}
      {flash?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-95" role="alert">
          <span className="block text-sm">{flash.error}</span>
        </div>
      )}

      {/* Alert Message */}
      {flash?.alert && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-xl relative shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-95" role="alert">
          <span className="block text-sm">{flash.alert}</span>
        </div>
      )}

      {/* Validation Errors */}
      {Object.keys(errors || {}).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-95" role="alert">
          <ul className="list-disc list-inside text-sm">
            {Object.entries(errors).map(([field, messages]) => (
              Array.isArray(messages) ? messages.map((message, i) => (
                <li key={`${field}-${i}`}>{message}</li>
              )) : (
                <li key={field}>{messages}</li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}