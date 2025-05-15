import React from 'react'
import {Routes,Route} from "react-router-dom"
import MoviesList from './components/MoviesList'


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element ={<MoviesList/>}/>


    </Routes>
    
    </>
  )
}

export default App