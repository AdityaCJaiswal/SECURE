import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Header />
      <main className="relative">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;