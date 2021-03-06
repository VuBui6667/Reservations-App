import React, {useContext} from "react"
import './modalCancel.scss'
import message_Error from '../../image/message_error.png'
import {CancelReserv, ReservNotify, ResetContext, NotifyContext, TableFlow} from '../../App'
import reservationAPI from "../../api/reservationAPI"

const ModalCancel = () => {
    const {cancelReserv, setCancelReserv} = useContext(CancelReserv)
    const {reset, setReset} = useContext(ResetContext)
    const {setNotify} = useContext(NotifyContext)
    const {reservEdit, setReservEdit} = useContext(ReservNotify)
    const {tableFlow, setTableFlow} = useContext(TableFlow)
    // const [nameReserv, setNameReserv] = useState()

    const changeStatus = async() => {
        try {
        const response = await reservationAPI.put(reservEdit.id, {statusReservation: "Cancelled", table: "Unassigned"})
        setReset(!reset)
        setNotify(true)
        setReservEdit(response)
        setTableFlow(null)
        } catch(error) {
          console.log(error)
        }
    }

    // useEffect(() => {
    //     const fetchReservations = async () =>  {
    //       try {
    //         const response = await reservationAPI.get(reservEdit.id)
    //         setReservEdit(response)
    //         console.log(reservEdit);
    //       } catch(error) {
    //         console.log(error)
    //       }
    //     }
    //     fetchReservations()
    //   },[reset])

    return (
        <div className="modal-cancel" onClick={() => setCancelReserv(!cancelReserv)} style={{display: cancelReserv ? "flex" : "none"}}>
            <div className="layout-modal"></div>
            <div className="container-modal-cancel" onClick={e => e.stopPropagation()}>
                <img src={message_Error}/>
                {reservEdit.customerReservation ? 
                <>
                <div className="title-cancel">Cancel Reservation 
                    <span className="title-desktop"> #R{reservEdit.customerReservation.contact[5]}{reservEdit.customerReservation.contact[6]}{reservEdit.customerReservation.contact[7]}{reservEdit.customerReservation.contact[8]}{reservEdit.customerReservation.firstName[0]}{reservEdit.customerReservation.lastName[0]}</span>
                    <div className="title-mobile"> #R{reservEdit.customerReservation.contact[5]}{reservEdit.customerReservation.contact[6]}{reservEdit.customerReservation.contact[7]}{reservEdit.customerReservation.contact[8]}{reservEdit.customerReservation.firstName[0]}{reservEdit.customerReservation.lastName[0]}</div>
                </div>
                <div className="sub-title-cancel">for {reservEdit.customerReservation.firstName} {reservEdit.customerReservation.lastName}?</div>
                <div className="control-cancel">
                    <div className="deny-cancel" onClick={() => setCancelReserv(!cancelReserv)}>Not Now</div>
                    <div className="accept-cancel" onClick={() => (changeStatus(), setCancelReserv(!cancelReserv))}>Cancel Reservation</div>
                </div>
                </>
                : null }
            </div>
        </div>
    )
}

export default ModalCancel