import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import { LoginPage, DashboardPage, VideoPage, NotesPage, BookmarksPage } from './pages';

function App() {
  return (
    <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
    </AppProvider>
  );
}

export default App;
