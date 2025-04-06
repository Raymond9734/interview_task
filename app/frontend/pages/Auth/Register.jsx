import React from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Register({ errors = {}, user = {} }) {
  const { data, setData, post, processing } = useForm({
    email: user.email || '',
    username: user.username || '',
    password: '',
    password_confirmation: '',
    role: 'user', 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register', data);
  };

  return (
    <>
      <Head title="Register" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-900 font-[Poppins]">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-amber-700">
              Or{' '}
              <a 
                href="/login" 
                className="font-medium text-amber-800 hover:text-amber-600 transition-colors duration-300 border-b-2 border-transparent hover:border-amber-600"
              >
                sign in to your account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600/50 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="relative group">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                  placeholder="Choose a username"
                  value={data.username}
                  onChange={(e) => setData('username', e.target.value)}
                />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600/50 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="relative group">
                <select
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20  text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                >
                  <option value="" disabled selected className="text-amber-700/50">Choose your account type</option>
                  <option value="user" className="text-amber-950 ">Personal Account</option>
                  <option value="admin" className="text-amber-950 bg-amber-50">Administrative Account</option>
                </select>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600/50 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>

              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                  placeholder="Create a password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600/50 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="relative group">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 border-b-2 border-amber-300/50 bg-amber-50/20 placeholder-amber-700/50 text-amber-950 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600/50 focus:bg-amber-50/30 transition-all duration-300 ease-in-out sm:text-sm"
                  placeholder="Confirm your password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600/50 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
              >
                {processing ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 