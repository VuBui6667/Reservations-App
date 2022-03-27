import React, {useState} from "react"
import './statusTable.scss'

const StatusTable =  () => {
    const [show, setShow] = useState(false)
    const handleStatus = (ref) => {
      setShow(!show)
    }
    return (
        <div className="container-status">
        <div className="show-status" onClick={handleStatus}><box-icon name='list-ul' color='#7C69EF' size='md'></box-icon>
        <i className="status-close" style={show ? { opacity:'0'} : {opacity: '1'}}></i>
        </div>
        <div className={`status-details animate__animated ${show ? "animate__fadeInUp" : "animate__fadeOutDown"}`}>
        <div className="status-item">
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#A9EAFF'}}>
            </div>In Use
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#FFE0A4'}}>
              </div>Call for Cheque
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#FFD0EF'}}>
            </div>Cleaning Required
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#DCD0FF'}}>
            </div>Reserved
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#DFDFDF'}}>
            </div>Blocked
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#FFFFFF'}}>
            </div>Available
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#FFA4A4'}}>
            </div>Overstay
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#DF4759'}}>
            </div>Clash
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: 'rgb(0, 114, 150)', borderRadius: '50%'}}>
            </div>Seat Occupied
          </div>
          <div className="status-item">
            <div className="status-desc" style={{backgroundColor: '#747281', borderRadius: '50%'}}>
            </div>Seat Unoccupied
          </div>
          <div className="status-item">
            <div className="status-desc" 
            style={{backgroundColor: '#E9EDF3', width: '60px', color: '#506690'}}>1.30PM
          </div>Upcoming Reservation
          </div>
          <div className="status-item">
            <div className="status-desc" 
            style={{backgroundColor: '#FFEFE5', width: '50px', color: '#FF5C00'}}>1.30PM
          </div>Late
          </div>
          <div className="status-item">
            <div className="status-desc" 
            style={{backgroundColor: '#DF4759', width: '50px', color: '#FFFFFF'}}>1.30PM
          </div>Upcoming Clash
          </div>
      </div>
      </div>
    )
}

export default StatusTable