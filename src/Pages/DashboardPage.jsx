const API_KEYS = import.meta.env.VITE_YOUTUBE_API_KEY;
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useSearch } from '../Hooks';
import { usePagination } from '../Hooks';
import { VideoCard, SearchBar, CategoryFilter, Pagination } from '../Components';

const DashboardPage = () => {
  const { state } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { filteredItems } = useSearch(videos);
  const { currentItems, currentPage, totalPages, setPage } = usePagination(filteredItems);
  console.log("Search Query:", state.searchQuery);
console.log("Total Videos:", videos.length);
console.log("Filtered Videos:", filteredItems.length);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError('');

        const queries = [
          'Data Structures Algorithms',
          'React JavaScript Tutorial',
          'Web Development',
          'Machine Learning',
          'System Design Interview',
          'Database Design',
        ];

        const allVideos = [];

        for (const query of queries) {
          try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
              params: {
                q: query,
                part: 'snippet',
                maxResults: 6,
                type: 'video',
                key: API_KEYS,
              },
            });

            if (response.data.items) {
              allVideos.push(...response.data.items);
            }
          }catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
console.log("DATA:", JSON.stringify(err.response?.data, null, 2));
}
        }

        setVideos(allVideos.slice(0, 36));
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Please login to access the dashboard</p>
          <a href="/login" className="text-blue-600 hover:underline text-lg">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {state.user?.username}! 👋</h1>
        <p className="text-gray-600 mb-6">Explore thousands of engineering tutorials and courses</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchBar />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-600">
                📺 <span className="font-semibold">{videos.length}</span> Videos
              </p>
              <p className="text-sm text-gray-600 mt-2">
                📝 <span className="font-semibold">{state.notes.length}</span> Notes
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ⭐ <span className="font-semibold">{state.bookmarks.length}</span> Bookmarks
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <CategoryFilter />
          </aside>

          <main className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Loading videos...</p>
                <div className="animate-spin text-4xl mt-4">⏳</div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No videos found</p>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((video) => (
                    <VideoCard key={video.id.videoId} video={video} />
                  ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
