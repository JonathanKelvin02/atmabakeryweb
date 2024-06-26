import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './Route/index.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css"
import { ProSidebarProvider } from 'react-pro-sidebar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AppRouter />
  </React.StrictMode>,
)
