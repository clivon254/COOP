import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import ThemeProvider from './components/ThemeProvider.jsx'
import { persistor, store } from './redux/store.js'
import StoreContextProvider from './context/store.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>

    <PersistGate persistor={persistor} >

      <Provider store={store}>

          <StoreContextProvider>

            <ThemeProvider>

              <App />

            </ThemeProvider>

          </StoreContextProvider>  

      </Provider>

    </PersistGate>

  </StrictMode>,
)
