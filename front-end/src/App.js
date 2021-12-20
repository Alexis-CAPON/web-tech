
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
// Local

import Login from './Login'
import Context from './Context'


import {
  Route,
  Routes,

} from "react-router-dom"
import Homepage from './Homepage'
import Dashboard from './Dashboard'





export default function App() {
  const {oauth} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />}/>
        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/dashboard/*" element={oauth ? (<Dashboard />) : (<Login/>)}/>
        <Route path="/login" element = {oauth ? (<Dashboard />) : (<Login/>)}/>
      </Routes>
    </div>

  );
    
  
};