import React, {useState, useContext, useEffect} from 'react';
import './pages.scss'
import Tables from '../components/tables/tables'
import StatusTable from '../components/statusTable/statusTable'
import ModalBooking from '../components/modalBooking/modalBooking'
import '../components/zoom/zoom.scss'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";  
// import notifyEditAPI from '../api/notifyEditAPI';
import { NotifyContext, ReservNotify, Skeleton, TimeReserv } from '../App'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home() {
  const [showModal, setShowModal] = useState(false)
  // const {reset, setReset} =   useContext(ResetContext)
  const {notify, setNotify} = useContext(NotifyContext)
  const {reservEdit} = useContext(ReservNotify)
  const {time} = useContext(TimeReserv)

  const {skeleton, setSkeleton} = useContext(Skeleton)

  setTimeout(
    function() {
        setNotify(false)
    },4000
  )


  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      setSkeleton(false)
    }, 1500);

    return () => window.clearTimeout(timeoutID );
  }, [skeleton])

  return (
    <div className="main-container">
      {skeleton ? 
        <Box sx={{ position: "absolute", right: "580px", bottom: "400px" }}>
          <CircularProgress />
        </Box> 
      : null}
      <div style={{opacity: skeleton ? 0 : 1}}>
      <div className="notify-update-reserv" 
      style={{height: notify ? "44px" : "0", opacity: notify ? 1 : 0
              }}>
        {reservEdit ? 
          reservEdit.statusReservation === "Confirmed" ? `Reservation confirm for Mr ${reservEdit.customerReservation.firstName}!` :
          reservEdit.statusReservation === "Seated" ? `${reservEdit.customerReservation.firstName} seated at Table ${reservEdit.table}.` :
          reservEdit.statusReservation === "Cancelled" ? `${reservEdit.customerReservation.firstName} ${reservEdit.customerReservation.lastName}'s Reservation has been cancelled.` :
          reservEdit.firstName ? `${reservEdit.firstName}  ${reservEdit.lastName}'s Reservation Successfully Updated!` : null
        : null}
        <box-icon name='x' color="white" size="md" style={{marginLeft: "5px"}} onClick={() => setNotify(false)}></box-icon>
      </div>
      <TransformWrapper
        initialScale={1}
        alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
          <div className="zoom">
            <div className="zoom-in zoom-item" onClick={() => zoomIn()}><box-icon name='zoom-in' color='#7C69EF' size="md"></box-icon></div>
            <div className="zoom-out zoom-item" onClick={() => zoomOut()}><box-icon name='zoom-out' color='#7C69EF' size="md"></box-icon></div>
            <div className="full-screen zoom-item" onClick={() => resetTransform()}><box-icon name='fullscreen' color='#7C69EF' size="md"></box-icon></div>
          </div>
            <TransformComponent>
              <div className="sub-container">
                <Tables />
              </div> 
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      <StatusTable />
      {/* {showModal ? <ModalBooking showModal={showModal} setShowModal={setShowModal}/>: null} */}
      <ModalBooking showModal={showModal} setShowModal={setShowModal}/>
      {time > "09:00" ?
        <div className="add-new" onClick={() => setShowModal(!showModal)}>{showModal ? <box-icon name='x' size="md" color="white" style={{marginTop: "10px"}}></box-icon> : "+"}</div>
      : <div className="add-new" style={{opacity: "0.5"}}>+</div>}
      </div>
      </div>
  )
}

export default Home