import React, {useContext} from "react"
import './modalWarning.scss'
import message_Error from '../../image/message_error.png'
import {ReservNotify, ResetContext, NotifyContext, WarnContext, TableFlow} from '../../App'
import reservationAPI from "../../api/reservationAPI"

const ModalWarning = () => {
    const {reset, setReset} = useContext(ResetContext)
    const {setNotify} = useContext(NotifyContext)
    const {reservEdit, setReservEdit} = useContext(ReservNotify)
    const {warning, setWarning} = useContext(WarnContext)
    const {setTableFlow} = useContext(TableFlow)
    // const [nameReserv, setNameReserv] = useState()


    const saveReserv = async() => {
        try {
        const response = await reservationAPI.put(reservEdit.id, reservEdit)
        setReset(!reset)
        setWarning(false)
        setNotify(true)
        setReservEdit(response.customerReservation)
        setTableFlow(null)
        } catch(error) {
          console.log(error)
        }
    }

    return (
        <div className="modal-warning" onClick={() => setWarning(false)} style={{display: warning ? "flex" : "none"}}>
            <div className="layout-modal"></div>
            <div className="container-modal-cancel" onClick={e => e.stopPropagation()}>
                <img src={message_Error}/>
                <div className="title-cancel">Warning</div>
                <div className="sub-title-cancel">This reservation's <span className="warn-title">{warning}</span></div>
                <div className="sub-title-cancel">Confirm to edit reservation ?</div>
                <div className="control-cancel">
                    <div className="deny-cancel" onClick={() => setWarning(false)}>Cancel</div>
                    <div className="accept-cancel" onClick={() => saveReserv()}>Save Changes</div>
                </div>
            </div>
        </div>
    )
}

export default ModalWarning