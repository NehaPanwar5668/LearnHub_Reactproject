import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const VideoPage = () => {
  const { videoId } = useParams();
  const { state, addNote } = useContext(AppContext);
  const [noteContent, setNoteContent] = useState('');
  const [category, setCategory] = useState('DSA');
  const [noteAdded, setNoteAdded] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    const newVideoTitle = `Video ${videoId.slice(0, 8)}`;
    setVideoTitle(newVideoTitle);
  }, [videoId]);

  const handleAddNote = useCallback(() => {
    if (!noteContent.trim()) {
      alert('Please write a note');
      return;
    }

    addNote(videoId, videoTitle, noteContent, category);
    setNoteContent('');
    setNoteAdded(true);
    setTimeout(() => setNoteAdded(false), 3000);
  }, [noteContent, category, videoId, videoTitle, addNote]);

  const categories = ['DSA', 'Web Development', 'Machine Learning', 'Database', 'System Design', 'React', 'JavaScript'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-6">{videoTitle}</h1>
            <p className="text-gray-600 mt-2">Educational content on engineering topics</p>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Add Note</h2>

              {noteAdded && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                  ✓ Note added successfully!
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Note</label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="6"
                  />
                </div>

                <button
                  onClick={handleAddNote}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  💾 Save Note
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">📊 Stats</h3>
                <p className="text-sm text-gray-600 mb-2">
                  📝 <span className="font-semibold">{state.notes.length}</span> Total Notes
                </p>
                <p className="text-sm text-gray-600">
                  ⭐ <span className="font-semibold">{state.bookmarks.length}</span> Bookmarks
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
