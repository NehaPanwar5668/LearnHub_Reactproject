import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const VideoCard = ({ video }) => {
  const { state, addBookmark, removeBookmark } = useContext(AppContext);
  
  const isBookmarked = state.bookmarks.some((b) => b.videoId === video.id.videoId);

  const handleBookmarkToggle = useCallback(() => {
    if (isBookmarked) {
      removeBookmark(video.id.videoId);
    } else {
      addBookmark(
        video.id.videoId,
        video.snippet.title,
        video.snippet.thumbnails.medium.url,
        video.snippet.channelTitle,
        video.snippet.description
      );
    }
  }, [isBookmarked, video, addBookmark, removeBookmark]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      <Link to={`/video/${video.id.videoId}`} className="block relative overflow-hidden bg-gray-200 h-40">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
            ▶ Watch
          </button>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/video/${video.id.videoId}`} className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 text-sm mb-2">
          {video.snippet.title}
        </Link>

        <p className="text-xs text-gray-500 mb-3 flex-1">{video.snippet.channelTitle}</p>

        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{video.snippet.description}</p>

        <button
          onClick={handleBookmarkToggle}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
            isBookmarked
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
