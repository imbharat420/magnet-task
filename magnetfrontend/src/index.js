import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {SnackbarProvider,enqueueSnackbar} from "notistack"
import {StoreProvider} from "./utils/Store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <StoreProvider>
     <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <App />
     </SnackbarProvider>
   </StoreProvider>
  </React.StrictMode>
);
