/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import Manual from './components/Manual';
import Navigation from './components/Navigation';

export default function App() {
  const [page, setPage] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Flashlight Automate</h1>
        <p className="text-zinc-400">OCT 24, 2023 • 14:42 GMT • <span className="text-emerald-400">● LIVE</span></p>
      </header>
      
      <Navigation current={page} setPage={setPage} />

      <main>
        {page === 'Dashboard' && <Dashboard />}
        {page === 'Gallery' && <Gallery />}
        {page === 'Manual' && <Manual />}
      </main>
    </div>
  );
}
