import React, {useEffect, useState, useContext} from "react"
import Table from '../table/table'
import reservationAPI from '../../api/reservationAPI'
import { ResetContext, TimeReserv } from "../../App"
import { DatesReserv, TableClashed, TableFlow, Skeleton } from "../../App"
import { DateObject } from "react-multi-date-picker";



const Tables = () => {
    const [reservations, setReservations] = useState(null)
    const [containerTable, setContainerTable] = useState(null)
    const {reset, setReset} = useContext(ResetContext)
    const {time} = useContext(TimeReserv)
    const {datesReserv} = useContext(DatesReserv)
    const [idxSelect, setIdxSelect] = useState([])
    const {tableClashed} = useContext(TableClashed)
    const {tableFlow, setTableFlow} = useContext(TableFlow)
    const {skeleton} = useContext(Skeleton)
    const date = new DateObject()

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
        const fetchReservations = async () =>  {
        try {
            const response = await reservationAPI.get(datesReserv)
            setReservations(response)
            setContainerTable(document.getElementsByClassName("table"))
            if(containerTable !== null) {
                handleTable()
                handleOver()
            }
        } catch(error) {
            console.log(error)
        }
        }
        fetchReservations()
    },[containerTable, tableFlow, datesReserv, reset])

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
                if(reservation.table === numberTable && time >= "12:00" && time <= "14:00" &&
                   (reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Seated")) {
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
                            } else if(addMinutes(timeReserv, 30) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 66.666%, #d4f4ff 66.666%, #d4f4ff)`
                            } else if(addMinutes(timeReserv, 20) <= time) {
                                containerTable[tableIdx].style.backgroundImage=`linear-gradient(to top,#a9eaff 50%, #d4f4ff 50%, #d4f4ff)`
                            } else if(addMinutes(timeReserv, 10) <= time) {
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

                    if (reset === true) {
                        for(let i=0; i<containerChair.length; i++) {
                            containerChair[i].style.background="#747281"
                        }
                        setReset(!reset)
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
                    }
                } 
                if(containerTable[tableIdx].outerText[4] !== "1" && containerTable[tableIdx].style.background !== "rgb(255, 255, 255)") {
                    setReset(false)
                    containerTable[tableIdx].style.background = "#fff"
                    for(let i=0; i<containerChair.length; i++) {
                        containerChair[i].style.background="#747281"
                    }
                }
                if(reservation.statusReservation === "Booked" && containerTable[tableIdx].style.background === "rgb(223, 71, 89)" && tableClashed.includes(!numberTable)) {
                    containerTable[tableIdx].style.background = "#fff"
                    for(let i=0; i<containerChair.length; i++) {
                        containerChair[i].style.background="#747281"
                    }
                }
                if(reservation.statusReservation === "Booked" && containerTable[tableIdx].style.color === "rgb(255,255,255)") {
                    containerTable[tableIdx].style.color="#869AB8"
                }
                if(datesReserv !== date.day + " " + date.month.shortName + " " + date.year) {
                    containerTable[tableIdx].style.color="#869AB8"
                }
            })
        })
    }


    return (
        <div className="tables">
            <Table keyIndex="1" numberTable="105" top="14" right="66" height="124" numChair={6}/>
            <Table keyIndex="2" numberTable="106" top="14" right="56" height="86" numChair={4} margin="5px 0"/>
            <Table keyIndex="3" numberTable="107" top="38" right="57" height="95" width="95" numChair={14} borderRadius="50%"/>
            <Table keyIndex="4" numberTable="108" top="21" right="43" height="270" numChair={14}/>
            <Table keyIndex="5" numberTable="109" top="56" right="65" height="80" width="80" numChair={8} borderRadius="50%"/>
            <Table keyIndex="6" numberTable="110" top="56" right="51" height="80" width="80" numChair={8} borderRadius="50%"/>
            <Table keyIndex="7" numberTable="111" top="80" right="66" height="65" width="65" numChair={6} borderRadius="50%"/>
            <Table keyIndex="8" numberTable="112" top="80" right="52" height="65" width="65" numChair={6} borderRadius="50%"/>
            <Table keyIndex="9" numberTable="113" top="78" right="42" height="80" width="80" numChair={8} borderRadius="50%"/>
            <Table keyIndex="10" numberTable="114" top="64" right="33" height="124" numChair={6}/>
            <Table keyIndex="11" numberTable="115" top="34" right="33" height="124" numChair={6}/>
            <Table keyIndex="12" numberTable="116" top="14" right="24" height="58" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="13" numberTable="117" top="14" right="16" height="58" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="14" numberTable="118" top="14" right="8" height="58" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="15" numberTable="120" top="34" right="18" height="58" numChair={2} margin="-18px 30px"/>
            <Table keyIndex="16" numberTable="121" top="34" right="8" height="58" width="86" numChair={4} margin="-18px 30px"/>
            <Table keyIndex="17" numberTable="122" top="55" right="8" height="58" width="200" numChair={12} margin="-18px 30px"/>
            <Table keyIndex="18" numberTable="123" top="77" right="8" height="58" width="200" numChair={12} margin="-18px 30px" />
        </div>
    )
}

export default Tables