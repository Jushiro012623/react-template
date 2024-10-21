import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './routes/ErroBoundary.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  // {/* </StrictMode> */}
)