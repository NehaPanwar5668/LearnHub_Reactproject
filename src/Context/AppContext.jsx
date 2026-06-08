import React, { createContext, useReducer, useCallback, useMemo } from 'react';

export const AppContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('learnhub_user')) || null,
  isAuthenticated: !!localStorage.getItem('learnhub_user'),
  notes: JSON.parse(localStorage.getItem('learnhub_notes')) || [],
  bookmarks: JSON.parse(localStorage.getItem('learnhub_bookmarks')) || [],
  searchQuery: '',
  selectedCategory: 'all',
  currentPage: 1,
  itemsPerPage: 9,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const userData = {
        id: Date.now(),
        username: action.payload.username,
        email: action.payload.email,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('learnhub_user', JSON.stringify(userData));
      return { ...state, user: userData, isAuthenticated: true };

    case 'LOGOUT':
      localStorage.removeItem('learnhub_user');
      return { ...state, user: null, isAuthenticated: false, notes: [], bookmarks: [] };

    case 'ADD_NOTE':
      const newNote = {
        id: Date.now(),
        videoId: action.payload.videoId,
        videoTitle: action.payload.videoTitle,
        content: action.payload.content,
        category: action.payload.category,
        createdAt: new Date().toISOString(),
      };
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem('learnhub_notes', JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes };

    case 'UPDATE_NOTE':
      const updated = state.notes.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload.data } : note
      );
      localStorage.setItem('learnhub_notes', JSON.stringify(updated));
      return { ...state, notes: updated };

    case 'DELETE_NOTE':
      const filtered = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem('learnhub_notes', JSON.stringify(filtered));
      return { ...state, notes: filtered };

    case 'ADD_BOOKMARK':
      const bookmark = {
        id: Date.now(),
        videoId: action.payload.videoId,
        title: action.payload.title,
        thumbnail: action.payload.thumbnail,
        channelTitle: action.payload.channelTitle,
        description: action.payload.description,
        addedAt: new Date().toISOString(),
      };
      const newBookmarks = [...state.bookmarks, bookmark];
      localStorage.setItem('learnhub_bookmarks', JSON.stringify(newBookmarks));
      return { ...state, bookmarks: newBookmarks };

    case 'REMOVE_BOOKMARK':
      const filteredBookmarks = state.bookmarks.filter((b) => b.videoId !== action.payload);
      localStorage.setItem('learnhub_bookmarks', JSON.stringify(filteredBookmarks));
      return { ...state, bookmarks: filteredBookmarks };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1 };

    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1 };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = useCallback((username, email) => {
    dispatch({ type: 'LOGIN', payload: { username, email } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const addNote = useCallback((videoId, videoTitle, content, category) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: { videoId, videoTitle, content, category },
    });
  }, []);

  const updateNote = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id, data } });
  }, []);

  const deleteNote = useCallback((id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  }, []);

  const addBookmark = useCallback((videoId, title, thumbnail, channelTitle, description) => {
    dispatch({
      type: 'ADD_BOOKMARK',
      payload: { videoId, title, thumbnail, channelTitle, description },
    });
  }, []);

  const removeBookmark = useCallback((videoId) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: videoId });
  }, []);

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const setCategory = useCallback((category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const value = useMemo(
    () => ({
      state,
      login,
      logout,
      addNote,
      updateNote,
      deleteNote,
      addBookmark,
      removeBookmark,
      setSearchQuery,
      setCategory,
      setPage,
    }),
    [
      state,
      login,
      logout,
      addNote,
      updateNote,
      deleteNote,
      addBookmark,
      removeBookmark,
      setSearchQuery,
      setCategory,
      setPage,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
