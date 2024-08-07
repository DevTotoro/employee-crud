import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='min-h-screen bg-background font-sans antialiased'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </div>
  </React.StrictMode>
);
