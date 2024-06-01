import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Docs from './pages/Docs';
import Home from "./pages/Home";
import { OpenFolderDialog } from "./components/dialogs";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import { useState, useEffect } from "react";
import { UserPreference } from "./types/definitions";
import { invoke } from "@tauri-apps/api/tauri"
import { socket } from "./ws"
import { GlobalContext } from "./context"

function App() {
  let API_URL=`http://localhost:80`
      let [ws,setWs]=useState<any>(null)
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

  async function startAnvel(){
    await invoke("serve_anvel")
  }

  useEffect(()=>{
    startAnvel()
    socket.onopen = () => {
      console.log('WebSocket connection established',socket);
      setWs(socket)
    };

    socket.onmessage=(event:any)=>{
        console.log(event)
    }

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(socket);
    };
  },[])

  //function sendMessage(){
    //if(ws){
     //   ws.send("hello")
    //}
  //}
  return (
    <BrowserRouter>
        <GlobalContext.Provider value={{ws,API_URL}}> 
            <Routes>
                <Route path="/welcome" element={path===null?<LandingPage data={{backgroundImage}}/>:<Navigate to="/"/>} />
                <Route path="/" element={path!==null?<Layout/>:<Navigate to="/welcome"/>}>
                    <Route index element={<Home data={{backgroundImage, changeBackground}}/>} />
                    <Route path="docs" element={<Docs />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </GlobalContext.Provider>
        <OpenFolderDialog/>
    </BrowserRouter>
  )
}

export default App
