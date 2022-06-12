import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import MyTerms from './MyTerms';
import CreateNewTerm from './CreateNewTerm';
import EditTerm from './EditTerm';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
     <BrowserRouter>
    <Routes> 
      
        <Route exact path="/dashboard" element={<App/>}/>
        <Route exact path="/create-new-term" element={<CreateNewTerm /> }/>
        <Route exact path="/my-terms" element={<MyTerms /> }/>
        <Route exact path="/edit-term" element={<EditTerm /> }/>
        
      </Routes>
     </BrowserRouter>
  </ThemeProvider>,
);
