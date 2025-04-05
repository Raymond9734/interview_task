import { Head } from '@inertiajs/react'
import { useState } from 'react'

import inertiaSvg from '/assets/inertia.svg'
import reactSvg from '/assets/react.svg'
import viteRubySvg from '/assets/vite_ruby.svg'

export default function InertiaExample({ name }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <Head title="Inertia + Vite Ruby + React Example" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-2xl px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Hello {name}!</h1>

          <div className="max-w-md mx-auto mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <p className="text-center">
              If you can see this message with green background and styling, Tailwind CSS is working! 🎉
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://inertia-rails.dev" target="_blank">
              <img className="h-16 w-16 hover:scale-110 transition-transform" src={inertiaSvg} alt="Inertia logo" />
            </a>
            <a href="https://vite-ruby.netlify.app" target="_blank">
              <img
                className="h-16 w-16 hover:scale-110 transition-transform"
                src={viteRubySvg}
                alt="Vite Ruby logo"
              />
            </a>
            <a href="https://react.dev" target="_blank">
              <img
                className="h-16 w-16 hover:scale-110 transition-transform animate-spin-slow"
                src={reactSvg}
                alt="React logo"
              />
            </a>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-8">Inertia + Vite Ruby + React</h2>

          <div className="max-w-md mx-auto text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
              onClick={() => setCount((count) => count + 1)}
            >
              count is {count}
            </button>
            <p className="mb-4">
              Edit <code className="bg-gray-200 px-2 py-1 rounded">app/frontend/pages/InertiaExample.jsx</code> and save to
              test HMR
            </p>
          </div>
          <p className="text-center text-gray-600">
            Click on the Inertia, Vite Ruby, and React logos to learn more
          </p>
        </div>
      </div>
    </>
  )
}
