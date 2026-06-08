import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { AppContext } from '../context/AppContext';
import { useSearch } from '../hooks';
import { usePagination } from '../hooks';
import { SearchBar, CategoryFilter, Pagination } from '../components';

const BookmarksPage = () => {
  const { isAuthenticated } = useAuth();
  const { state, removeBookmark } = useContext(AppContext);
  const { filteredItems } = useSearch(state.bookmarks);
  const { currentItems, currentPage, totalPages, setPage } = usePagination(filteredItems);

  const handleRemoveBookmark = useCallback(
    (videoId) => {
      if (window.confirm('Remove this bookmark?')) {
        removeBookmark(videoId);
      }
    },
    [removeBookmark]
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Please login to view your bookmarks</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⭐ My Bookmarks</h1>
          <p className="text-gray-600">Your saved videos for quick access</p>
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
            {state.bookmarks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-2">⭐ No bookmarks yet</p>
                <p className="text-gray-500">Click the bookmark button on videos to save them here</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                  Browse Videos
                </Link>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-2">🔍 No bookmarks found</p>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((bookmark) => (
                    <div key={bookmark.videoId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      <Link
                        to={`/video/${bookmark.videoId}`}
                        className="block relative overflow-hidden bg-gray-200 h-40"
                      >
                        <img
                          src={bookmark.thumbnail}
                          alt={bookmark.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                          <span className="text-white text-2xl">▶</span>
                        </div>
                      </Link>

                      <div className="p-4">
                        <Link
                          to={`/video/${bookmark.videoId}`}
                          className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 block mb-2"
                        >
                          {bookmark.title}
                        </Link>

                        <p className="text-xs text-gray-500 mb-3">{bookmark.channelTitle}</p>

                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{bookmark.description}</p>

                        <button
                          onClick={() => handleRemoveBookmark(bookmark.videoId)}
                          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                        >
                          Remove Bookmark
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
