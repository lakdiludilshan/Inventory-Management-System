import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
// import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:5000";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
