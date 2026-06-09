import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  }, [logout, navigate]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-blue-200 transition">
            <span className="text-3xl">📚</span>
            LearnHub
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-blue-200 transition font-medium">
              Dashboard
            </Link>
            <Link to="/notes" className="hover:text-blue-200 transition font-medium">
              My Notes
            </Link>
            <Link to="/bookmarks" className="hover:text-blue-200 transition font-medium">
              Bookmarks
            </Link>

            {isAuthenticated ? (
              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold">👤 {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-medium"
              >
                Login
              </Link>
            )}
          </nav>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-blue-400 space-y-3">
            <Link
              to="/"
              className="block hover:text-blue-200 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/notes"
              className="block hover:text-blue-200 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              My Notes
            </Link>
            <Link
              to="/bookmarks"
              className="block hover:text-blue-200 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Bookmarks
            </Link>
            {isAuthenticated ? (
              <>
                <div className="text-sm font-semibold py-2">👤 {user?.username}</div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-medium text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
