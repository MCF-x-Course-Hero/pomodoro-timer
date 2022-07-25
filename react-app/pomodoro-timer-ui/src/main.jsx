import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/auth'
import AppContainer from './Components/App/App'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppContainer />
    </AuthContextProvider>
  </React.StrictMode>
)
