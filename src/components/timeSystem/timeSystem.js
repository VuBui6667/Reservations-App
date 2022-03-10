import React from 'react'
import { useEffect, useState, useContext } from 'react'
import reservationAPI from '../../api/reservationAPI'
import { ResetContext, TimeReserv } from '../../App'

export default function TimeSystem() {
    const {time, setTime} = useContext(TimeReserv)
    const [reservations, setReservations] = useState([])
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
    },[])


    useEffect(() => {
        setInterval(() => {
            let today = new Date()
            let timeToday = ('0'+today.getHours()).slice(-2) + ':' + ('0'+today.getMinutes()).slice(-2)
            setTime("12:40")        
          })
    }, 5000)



    function getTwentyFourHourTime(paramTime) { 
        var t = new Date("1/1/2022 " + paramTime); 
        return t.getHours() + ':' + ('0'+t.getMinutes()).slice(-2); 
    }

    function addMinutes(paramTime, minute) {
      var t1 = new Date("1/1/2022 " + paramTime);
      var t2 = new Date(t1.getTime() + minute*60000)
      return t2.getHours() + ':' + ('0'+t2.getMinutes()).slice(-2); 
    }

    // console.log(addMinutes("1:30 PM"));


    const handleTimeReserv = async(index, status) => {
        try {
            await reservationAPI.patch(index+1, {statusReservation: status})
            setReset(!reset)
        } catch(error) {
            console.log(error)
        }
      }

    
    useEffect(() => {
        reservations.map((reservation, index) => {
          let timeReserv = reservation.timeReservation
            if(getTwentyFourHourTime(timeReserv) < time && (reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Booked") && reservation.statusReservation !== "No Show") {
                handleTimeReserv(index, "Late")
            }
            if (reservation.statusReservation === "Late") {
              let timeCompare1 = addMinutes(timeReserv, 15)
              if(timeCompare1 < time) {
                handleTimeReserv(index, "No Show")
              }
            }
            if (reservation.statusReservation === "Seated") {
              let timeCompare2 = addMinutes(timeReserv, 60)
              if(timeCompare2 < time) {
                handleTimeReserv(index, "Completed")
              }
            }
        })
    })
    


  return (
    <div>
    </div>
  )
}
