import React, {useState, useContext} from 'react';
import './pages.scss'
import Tables from '../components/tables/tables'
import StatusTable from '../components/statusTable/statusTable'
import ModalBooking from '../components/modalBooking/modalBooking'
import '../components/zoom/zoom.scss'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";  
// import notifyEditAPI from '../api/notifyEditAPI';
import { ResetContext, NotifyContext, ReservNotify } from '../App'

function Home() {
  const [showModal, setShowModal] = useState(false)
  // const [notify, setNotify] = useState(false)
  const [closeNotify, setCloseNotify] = useState(false)
  const {reset, setReset} =   useContext(ResetContext)
  const {notify, setNotify} = useContext(NotifyContext)
  const {reservEdit, setReservEdit} = useContext(ReservNotify)

  setTimeout(
    function() {
        setNotify(false)
    },4000
  )

  return (
    <div className="main-container">
      <div className="notify-update-reserv" 
      style={{height: notify ? "44px" : "0", opacity: notify ? 1 : 0
              }}>
        {reservEdit ? 
          reservEdit.statusReservation === "Confirmed" ? `Reservation confirm for Mr ${reservEdit.customerReservation.firstName}!` :
          reservEdit.statusReservation === "Seated" ? `${reservEdit.customerReservation.firstName} seated at Table ${reservEdit.table}.` :
          reservEdit.statusReservation === "Cancelled" ? `${reservEdit.customerReservation.firstName} ${reservEdit.customerReservation.lastName}'s Reservation has been cancelled.` :
          reservEdit.firstName ? `${reservEdit.firstName}  ${reservEdit.lastName}'s Reservation Successfully Updated!` : null
        : null}
        <box-icon name='x' color="white" size="md" style={{marginLeft: "10px"}} onClick={() => setNotify(false)}></box-icon>
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
          <div className="setting-tables"><div><box-icon name='move' color='#7C69EF' size="md"></box-icon></div></div>
            <TransformComponent>
              <div className="sub-container">
                <Tables />
              </div> 
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      <StatusTable />
      {showModal ? <ModalBooking showModal={showModal} setShowModal={setShowModal} styleName="animate__fadeInUp"/>: <ModalBooking styleName="animate__fadeOutDown"/>}
      <div className="add-new" onClick={() => setShowModal(!showModal)}>{showModal ? <box-icon name='x' size="md" color="white" style={{marginTop: "10px"}}></box-icon> : "+"}</div>
      </div>
  )
}

export default Home