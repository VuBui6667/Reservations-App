import React, {useState, createContext} from 'react'
// import { Routes, Route } from "react-router-dom"

import Sidebar from './components/sidebar/sidebar.js'
import Home from './pages/Home.js'
import Header from './components/header/header.js'
import './App.css'
import ModalCancel from './components/modalCancel/modalCancel.js'
import { IconContext } from 'react-icons'
import TimeSystem from './components/timeSystem/timeSystem.js'
import ModalWarning from './components/modalWarning/modalWarning.js'


export const ResetContext = createContext("")
export const NotifyContext = createContext("")
export const ReservNotify = createContext("")
export const CancelReserv = createContext("")
export const TimeReserv = createContext("")
export const DatesReserv = createContext("")
export const TableClashed = createContext("")
export const TableFlow = createContext("")
export const Skeleton = createContext("")
export const WarnContext = createContext("")
 

function App() {
  const [reset, setReset] = useState(true)
  const [notify, setNotify] = useState(false)
  const [reservEdit, setReservEdit] = useState()
  const [cancelReserv, setCancelReserv] = useState(false)
  const [time, setTime] = useState()
  const [tableClashed, setTableClashed] = useState([])
  const [tableFlow, setTableFlow] = useState([])
  const [skeleton, setSkeleton] = useState(true)
  const [warning, setWarning] = useState(false)
    var today = new Date().toLocaleDateString('en-GB', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    }).split(' ').join(' ');
  const [datesReserv, setDatesReserv] = useState(today)

  return (
    <div className="app">
    <DatesReserv.Provider value={{datesReserv, setDatesReserv}}>
    <TimeReserv.Provider value={{time, setTime}}>
    <IconContext.Provider value={{color: "#506690", className: "global-class-name"}}>
    <ResetContext.Provider value={{reset, setReset}}>
    <NotifyContext.Provider value={{notify, setNotify}}>
    <ReservNotify.Provider value={{reservEdit, setReservEdit}}>
    <CancelReserv.Provider value={{cancelReserv, setCancelReserv}}>
    <TableClashed.Provider value={{tableClashed, setTableClashed}}>
    <TableFlow.Provider value={{tableFlow, setTableFlow}}>
    <Skeleton.Provider value={{skeleton, setSkeleton}}>
    <WarnContext.Provider value={{warning, setWarning}}>
      <Header/>
      <div>
      <Sidebar/>
      {reservEdit ? <ModalCancel/> : null}
      {warning ? <ModalWarning/> : null}
      <TimeSystem />
      <Home />
      </div>
    </WarnContext.Provider>
    </Skeleton.Provider>
    </TableFlow.Provider>
    </TableClashed.Provider>
    </CancelReserv.Provider>
    </ReservNotify.Provider>
    </NotifyContext.Provider>
    </ResetContext.Provider>
    </IconContext.Provider>
    </TimeReserv.Provider>
    </DatesReserv.Provider>
    </div>
  )
}


export default App;

// json-server.cmd --watch db.json --port 4000
// npm start
// react-scripts start

