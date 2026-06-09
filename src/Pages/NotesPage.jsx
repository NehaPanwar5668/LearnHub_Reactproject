import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { SearchBar, CategoryFilter, NotesList } from '../components';

const NotesPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Please login to view your notes</p>
          <Link to="/login" className="text-blue-600 hover:underline text-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 My Notes</h1>
          <p className="text-gray-500">Manage and organize all your study notes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchBar />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <CategoryFilter />
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <NotesList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
