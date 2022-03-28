import React, {useEffect, useState, useContext} from "react"
import Table from '../table/table'
import { ResetContext, TimeReserv } from "../../App"
import { DatesReserv, TableClashed, TableFlow, ReservationsContext } from "../../App"
import { DateObject } from "react-multi-date-picker";
import reservationAPI from '../../api/reservationAPI'


const Tables = () => {
    const {reservations} = useContext(ReservationsContext)
    const [containerTable, setContainerTable] = useState(null)
    const {reset, setReset} = useContext(ResetContext)
    const {time} = useContext(TimeReserv)
    const {datesReserv} = useContext(DatesReserv)
    const [idxSelect, setIdxSelect] = useState([])
    const {tableClashed} = useContext(TableClashed)
    const {tableFlow} = useContext(TableFlow)
    const date = new DateObject()
    const dateCurrent = date.day + " " + date.month.shortName + " " + date.year

    const numberTables = [
        "105",
        "106",
        "107",
        "108",
        "109",
        "110",
        "111",
        "112",
        "113",
        "114",
        "115",
        "116",
        "117",
        "118",
        "120",
        "121",
        "122",
        "123"
    ]

    useEffect(() => {
        const handleTables = () =>  {
        try {
            setContainerTable(document.getElementsByClassName("table"))
            if(containerTable !== null) {
                handleTable()
                handleOver()
            }
        } catch(error) {
        }
        }
        handleTables()
<<<<<<< HEAD
    },[reservations, tableFlow, containerTable, datesReserv])
=======
    },[reservations, tableFlow, containerTable, datesReserv, tableClashed])
>>>>>>> 320312c (update code)

    // const [precentReserv, setPrecentReserv] = useState([0])
    // const [idx, setIdx] = useState(0)

    function addMinutes(paramTime, minute) {
        var t1 = new Date("1/1/2022 " + paramTime);
        var t2 = new Date(t1.getTime() + minute*60000)
        return t2.getHours() + ':' + ('0'+t2.getMinutes()).slice(-2); 
    }

    if(!reservations) {
        return <div>Loadding....</div>
    } 

    const handleOver = () => {
        numberTables.forEach((numberTable, tableIdx) => {
            const containerChair = containerTable[tableIdx].getElementsByClassName("chair")
            if(containerTable[tableIdx].style.background==="rgb(255, 255, 255)" || tableFlow.table === numberTable) {
                if(containerChair.length < (tableFlow.adultsReservation + tableFlow.childrenReservation)) {
                    if(tableFlow.table !== numberTable) {
                        setIdxSelect((prevIdx) => [...prevIdx, tableIdx])
                    }
                    for(let i=0; i<containerChair.length; i++) {
                        containerChair[i].style.background="rgba(223, 71, 89, 0.7)"
                    }
                    if(tableFlow.table !== numberTable) {
                        containerTable[tableIdx].style.color="rgba(223, 71, 89, 1)"
                    }
                }
            }
        })
    }

    const handleTable = () => {
        reservations.forEach((reservation, index) => {
            const numberPeople = reservation.adultsReservation + reservation.childrenReservation
            numberTables.forEach((numberTable, tableIdx) => {
                const containerChair = containerTable[tableIdx].getElementsByClassName("chair")
                if(tableFlow) {
                    if(tableFlow.table === numberTable) containerTable[tableIdx].style.boxShadow= "0 0 0 3px #FFA4A4"
                } 
                else {
                    containerTable[tableIdx].style.boxShadow=null
                    if(containerTable[tableIdx].style.color !== "rgb(255, 255, 255)") {
                        containerTable[tableIdx].style.color="#869AB8"
                    }
                    if(idxSelect.includes(tableIdx)) {
                        for(let i=0; i<containerChair.length; i++) {
                            containerChair[i].style.background=null
                        }
                    }
                }
                if(reservation.table === numberTable && time >= "12:00" && time <= "15:00" &&
                   (reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Seated" || reservation.statusReservation === "Late")) {
                    containerTable[tableIdx].style.color = "#869AB8"
                    if(reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Late") {
                        if(tableClashed.includes(reservation.table) || containerChair.length < numberPeople) {
                            containerTable[tableIdx].style.background="#DF4759"
                            containerTable[tableIdx].style.color="#fff"
                        } else {
                            containerTable[tableIdx].style.background="#A260DD"
                        }
                    } else if (reservation.statusReservation === "Seated") {
                            let timeReserv = reservation.timeReservation
                            if (addMinutes(timeReserv, 40) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 83.333%, #d4f4ff 83.333%, #d4f4ff)`
                            } 
                            if(addMinutes(timeReserv, 30) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 66.666%, #d4f4ff 66.666%, #d4f4ff)`
                            } 
                            if(addMinutes(timeReserv, 20) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 50%, #d4f4ff 50%, #d4f4ff)`
                            } 
                            if(addMinutes(timeReserv, 10) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 33.333%, #d4f4ff 33.333%, #d4f4ff)`
                            } else {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 16.666%, #d4f4ff 16.666%, #d4f4ff)`
                            }
                    }
                    if(containerChair.length < numberPeople) {
                        for(let i=0; i<containerChair.length; i++) {
                            containerChair[i].style.background="red"
                        }
                    } 
                    else {
                        for(let i=0; i<numberPeople; i++) {
                            containerChair[i].style.background="#007296"
                        }
                    }


                    if (reservation.numberChairs > reservation.adultsReservation + reservation.childrenReservation) {
                        for(let i=0; i<containerChair.length; i++) {
                            if(i < numberPeople) {
                                containerChair[i].style.background="#007296"
                            } else {
                                containerChair[i].style.background="#747281"
                            }
                        }
                    }
                    // if (reset === true) {
                    //     console.log(123)
                    //     for(let i=0; i<containerChair.length; i++) {
                    //         containerChair[i].style.background="#747281"
                    //     }
                    //     setReset(!reset)
                    //     if(containerChair.length < numberPeople) {
                    //         for(let i=0; i<containerChair.length; i++) {
                    //             containerChair[i].style.background="red"
                    //         }
                    //     }
                    //      else {
                    //         for(let i=0; i<numberPeople; i++) {
                    //             containerChair[i].style.background="#007296"
                    //         }
                    //     }
                    // }
                } 
                if(containerTable[tableIdx].outerText[4] !== "1" && containerTable[tableIdx].style.background !== "rgb(255, 255, 255)") {
                    setReset(false)
                    containerTable[tableIdx].style.background = "#fff"
                    for(let i=0; i<containerChair.length; i++) {
                        containerChair[i].style.background="#747281"
                    }
                }
                // if(reservation.statusReservation === "Booked" && containerTable[tableIdx].style.background === "rgb(223, 71, 89)" && tableClashed.includes(!numberTable)) {
                //     containerTable[tableIdx].style.background = "#fff"
                //     for(let i=0; i<containerChair.length; i++) {
                //         containerChair[i].style.background="#747281"
                //     }
                // }
                // if(reservation.statusReservation === "Booked" && containerTable[tableIdx].style.color === "rgb(255,255,255)") {
                //     containerTable[tableIdx].style.color="#869AB8"
                // }

                // Tắt hiện thị tình trạng bản của các ngày khác ngày hiện tại
                if(datesReserv !== dateCurrent) {
                    containerTable[tableIdx].style.color="#869AB8"
                    containerTable[tableIdx].style.background="#fff"
                    for(let i=0; i<containerChair.length; i++) {
                        containerChair[i].style.background="rgb(116, 114, 129)"
                    }
                }
            })
        })
    }


    return (
        <div className="tables">
            <Table keyIndex="1" numberTable="105" numChair={6}/>
            <Table keyIndex="2" numberTable="106" numChair={4} margin="5px 0"/>
            <Table keyIndex="3" numberTable="107" numChair={14} borderRadius="50%"/>
            <Table keyIndex="4" numberTable="108" numChair={14}/>
            <Table keyIndex="5" numberTable="109" numChair={8} borderRadius="50%"/>
            <Table keyIndex="6" numberTable="110" numChair={8} borderRadius="50%"/>
            <Table keyIndex="7" numberTable="111" numChair={6} borderRadius="50%"/>
            <Table keyIndex="8" numberTable="112" numChair={6} borderRadius="50%"/>
            <Table keyIndex="9" numberTable="113" numChair={8} borderRadius="50%"/>
            <Table keyIndex="10" numberTable="114" numChair={6}/>
            <Table keyIndex="11" numberTable="115" numChair={6}/>
            <Table keyIndex="12" numberTable="116" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="13" numberTable="117" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="14" numberTable="118" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="15" numberTable="120" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="16" numberTable="121" numChair={4} margin="-18px 30px"/>
            <Table keyIndex="17" numberTable="122" numChair={12} margin="-18px 30px"/>
            <Table keyIndex="18" numberTable="123" numChair={12} margin="-18px 30px" />
        </div>
    )
}

export default Tables