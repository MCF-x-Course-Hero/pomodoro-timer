import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App'
import './index.css';
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)

