import '@repo/ui/styles.css';
import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Button } from '@repo/ui/button';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      <h1>Hello, World!</h1>
      <Button />
    </div>
  </React.StrictMode>
);
