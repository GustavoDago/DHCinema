import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './routes/home.jsx'
import ShowMore from './routes/ShowMore.jsx'
import MovieDetails from './routes/MovieDetails.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='home' element={<Home/>}/>
          <Route path='showmore' element={<ShowMore/>}/>
          <Route path='movie-details' element={<MovieDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
