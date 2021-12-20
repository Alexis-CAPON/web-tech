import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ContextProvider } from './Context';
import 'typeface-roboto'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
  }
});


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
