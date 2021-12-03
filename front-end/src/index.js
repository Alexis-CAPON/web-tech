import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import 'typeface-roboto'
// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
