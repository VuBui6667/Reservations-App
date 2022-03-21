import React, {useContext} from 'react'
// import Draggable from 'react-draggable'
import './table.scss'
import { ResetContext } from "../../App"
import { DatesReserv, TableClashed, ReservationsContext } from '../../App'

const Chair = (props) => {
    return (
        <div className="chair" style={props.styleChair}></div>
    )
}

const Table = (props) => {
    const styleTable = {
        borderRadius: props.borderRadius
    }
    const styleChairs = {
        margin: props.margin
    }

    const numberChair = props.numChair

    const {reservations} = useContext(ReservationsContext)
    // const [containerTable, setContainerTable] = useState(null)
    const {tableClashed} = useContext(TableClashed)

    if(!reservations) {
        return <div></div>
    }

    // const numberTables = [
    //     "105",
    //     "106",
    //     "107",
    //     "108",
    //     "109",
    //     "110",
    //     "111",
    //     "112",
    //     "113",
    //     "114",
    //     "115",
    //     "116",
    //     "117",
    //     "118",
    //     "120",
    //     "121",
    //     "122",
    //     "123"
    // ]
    // const test = document.getElementsByClassName("table")


    // if (containerTable != null) {
    //     reservations.map((reservation, index) => {
    //         numberTables.map((numberTable, tableIdx) => {
    //             if(reservation.table === numberTable) {
    //                 test[tableIdx].style.background="red"
    //             }
    //         })
    //     })
    // }   

    return (
        // <Draggable
        // grid={[20, 20]}
        // defaultPosition={{x: 0, y: 0}}
        // scale={1}
        // className="drag"
        // >
                <div className="table" style={styleTable} key={props.indexKey}>{props.numberTable}
                    {
                        [...Array(numberChair)].map((i, idx) => 
                            <Chair key={idx} styleChair={styleChairs} idxKey={i}/>
                        )
                    }        
                    {
                        reservations.map((reservation, idx) => ( 
                            <div key={idx} style={{display: "flex", justifyContent: "center"}}>
                            {reservation.table === props.numberTable && 
                            (reservation.statusReservation === "Booked" || reservation.statusReservation === "Confirmed" ||
                            reservation.statusReservation === "Late" || reservation.statusReservation === "Seated")?
                            // style={{display: reservation.table === props.numberTable ? "flex" : "none"}}
                            <div className="time-table" 
                                style={{background: reservation.statusReservation === "Late" ? "#FFEFE5" : 
                                        tableClashed.includes(reservation.table) ? "#DF4759" : null,
                                        color: reservation.statusReservation === "Late" ? "#FF5C00" :
                                        tableClashed.includes(reservation.table) ? "#fff" : null}}>
                                {reservation.timeReservation}</div>
                            :null}
                            </div>
                        ))
                    }
                </div>
        // </Draggable>
    )
}

export default Table