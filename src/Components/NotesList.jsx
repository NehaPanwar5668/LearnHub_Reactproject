import React, { useCallback } from 'react';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { useSearch } from '../Hooks';
import { usePagination } from '../Hooks';

const NotesList = () => {
  const { state, deleteNote } = useContext(AppContext);
  const { filteredItems } = useSearch(state.notes);
  const { currentItems, currentPage, totalPages, setPage } = usePagination(filteredItems);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  }, [deleteNote]);

  if (state.notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-2">📝 No notes yet</p>
        <p className="text-gray-500">Start creating notes from video pages to see them here</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-2">🔍 No notes found</p>
        <p className="text-gray-500">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {currentItems.map((note) => (
          <div key={note.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{note.videoTitle}</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-2">
                  {note.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:text-red-800 font-bold text-xl transition"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 mb-3 whitespace-pre-wrap break-words">{note.content}</p>
            <p className="text-xs text-gray-500">
              📅 {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 transition"
          >
            ← Previous
          </button>
          <span className="text-gray-600 font-semibold">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesList;
