import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Docs from './pages/Docs';
import Home from "./pages/Home";
import { OpenFolderDialog } from "./components/dialogs";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import { useState } from "react";
import { UserPreference } from "./types/definitions";

function App() {
  let userPreference:UserPreference={
    backgroundImage:"default"
  }
  let user_preference:any=localStorage.getItem("user_preference")!==null?localStorage.getItem("user_preference"):""
  let userPreferenceParsed:UserPreference=user_preference.length!==0?JSON.parse(user_preference):userPreference;
  let [backgroundImage,setBackgroundImage]=useState(userPreferenceParsed.backgroundImage)
  let path=localStorage.getItem("path")

  function changeBackground(background:string){
    userPreference["backgroundImage"]=background
    localStorage.setItem("user_preference",JSON.stringify(userPreference))
    setBackgroundImage(background)
  }

  window.oncontextmenu=(e:any)=>{
    e.preventDefault()
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={path===null?<LandingPage data={{backgroundImage}}/>:<Navigate to="/"/>} />
        <Route path="/" element={path!==null?<Layout/>:<Navigate to="/welcome"/>}>
          <Route index element={<Home data={{backgroundImage, changeBackground}}/>} />
          <Route path="docs" element={<Docs />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <OpenFolderDialog/>
    </BrowserRouter>
  )
}

export default App
