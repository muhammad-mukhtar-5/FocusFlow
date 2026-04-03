import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter } from "react-router-dom"
import './styles-copy.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <AuthProvider>        
        <App /> 
        </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
