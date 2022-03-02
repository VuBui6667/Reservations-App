import React, {useState, createContext} from 'react'
// import { Routes, Route } from "react-router-dom"

import Sidebar from './components/sidebar/sidebar.js'
import Home from './pages/Home.js'
import Header from './components/header/header.js'
import './App.css'
import ModalCancel from './components/modalCancel/modalCancel.js'
import { IconContext } from 'react-icons'
import TimeSystem from './components/timeSystem/timeSystem.js'


export const ResetContext = createContext("")
export const NotifyContext = createContext("")
export const ReservNotify = createContext("")
export const CancelReserv = createContext("")
export const TimeReserv = createContext("")


function App() {
  const [reset, setReset] = useState(false)
  const [notify, setNotify] = useState(false)
  const [reservEdit, setReservEdit] = useState()
  const [cancelReserv, setCancelReserv] = useState(false)
  const [time, setTime] = useState()

  return (
    <div className="app">
    <TimeReserv.Provider value={{time, setTime}}>
    <IconContext.Provider value={{color: "#506690", className: "global-class-name"}}>
    <ResetContext.Provider value={{reset, setReset}}>
    <NotifyContext.Provider value={{notify, setNotify}}>
    <ReservNotify.Provider value={{reservEdit, setReservEdit}}>
    <CancelReserv.Provider value={{cancelReserv, setCancelReserv}}>
      <Header/>
      <div>
      <Sidebar/>
      {reservEdit ? <ModalCancel/> : null}
      <TimeSystem />
      <Home />
      </div>
    </CancelReserv.Provider>
    </ReservNotify.Provider>
    </NotifyContext.Provider>
    </ResetContext.Provider>
    </IconContext.Provider>
    </TimeReserv.Provider>
    </div>
  )
}


export default App;

// json-server.cmd --watch db.json --port 4000
// npm start

