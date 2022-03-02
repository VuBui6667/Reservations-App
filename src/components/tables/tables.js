import React, {useEffect, useState, useContext} from "react"
import Table from '../table/table'
import reservationAPI from '../../api/reservationAPI'
import { ResetContext, TimeReserv } from "../../App"



const Tables = () => {
    const [reservations, setReservations] = useState(null)
    const [containerTable, setContainerTable] = useState(null)
    const {reset, setReset} = useContext(ResetContext)
    const {time, setTime} = useContext(TimeReserv)

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
            const response = await reservationAPI.getAll()
            setReservations(response)
            setContainerTable(document.getElementsByClassName("table"))
            if(containerTable[0] !== undefined) {
                handleTable()
            }
        } catch(error) {
            console.log(error)
        }
        }
        fetchReservations()
    },[reset, containerTable])

    if(!reservations) {
        return <div>Loadding....</div>
    } 

    const handleTable = () => {
        reservations.map((reservation, index) => {
            numberTables.map((numberTable, tableIdx) => {
                if(reservation.table === numberTable && time >= "12:00" && time <= "14:00" && reservation.statusReservation !== "No Show") {
                    if(reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Late") {
                        containerTable[tableIdx].style.background="#A260DD"
                    } else {
                        containerTable[tableIdx].style.background="#A9EAFF"
                    }
                    const numberPeople = reservation.adultsReservation + reservation.childrenReservation
                    const containerChair = containerTable[tableIdx].getElementsByClassName("chair")
                    for(let i=0; i<numberPeople; i++) {
                        containerChair[i].style.background="#007296"
                    }
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