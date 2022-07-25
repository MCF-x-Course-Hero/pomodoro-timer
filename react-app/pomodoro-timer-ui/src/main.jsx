import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App'
import { AuthContextProvider } from './contexts/auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)

