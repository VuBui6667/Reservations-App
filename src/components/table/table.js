import React, {useEffect, useState, useContext} from 'react'
// import Draggable from 'react-draggable'
import './table.scss'
import reservationAPI from '../../api/reservationAPI'
import { ResetContext } from "../../App"

const Chair = (props) => {
    return (
        <div className="chair" style={props.styleChair}></div>
    )
}

const Table = (props) => {
    const styleTable = {
        top: props.top + "%",
        right: props.right + "%",
        height: props.height + "px",
        width: props.width + "px",
        borderRadius: props.borderRadius
    }
    const styleChairs = {
        margin: props.margin
    }

    const numberChair = props.numChair

    const [reservations, setReservations] = useState(null)
    // const [containerTable, setContainerTable] = useState(null)
    const {reset, setReset} = useContext(ResetContext)

    useEffect(() => {
        const fetchReservations = async () =>  {
        try {
            const response = await reservationAPI.getAll()
            setReservations(response)
        } catch(error) {
            console.log(error)
        }
        }
        fetchReservations()
    },[reset])

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
                            <Chair key={i} styleChair={styleChairs} idxKey={i}/>
                        )
                    }        
                    {
                        reservations.map((reservation) => ( 
                            <>
                            {reservation.table === props.numberTable ?
                            // style={{display: reservation.table === props.numberTable ? "flex" : "none"}}
                            <div className="time-table" 
                                style={{background: reservation.statusReservation === "Late" ? "#FFEFE5" : null,
                                        color: reservation.statusReservation === "Late" ? "#FF5C00" : null}}>
                                {reservation.timeReservation}</div>
                            :null}</>
                        ))
                    }
                </div>
        // </Draggable>
    )
}

export default Table