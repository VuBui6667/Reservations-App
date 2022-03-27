import React from 'react'
import { useEffect, useContext } from 'react'
import { ResetContext, TimeReserv, ReservationsContext } from '../../App'
import reservationAPI from '../../api/reservationAPI'
import { DateObject } from "react-multi-date-picker";

export default function TimeSystem() {
    const {time, setTime} = useContext(TimeReserv)
    const {reset, setReset} = useContext(ResetContext)
    const {reservations} = useContext(ReservationsContext)
    const date = new DateObject()
    const dateCurrent = date.day + " " + date.month.shortName + " " + date.year

    // useEffect(() => {
    //   const secondsTimer = setInterval(() => {
    //     let today = new Date()
    //     let timeToday = ('0'+today.getHours()).slice(-2) + ':' + ('0'+today.getMinutes()).slice(-2)
    //     setTime(addMinutes(timeToday, 150))
    //   }, 1000);
    //   return () => clearInterval(secondsTimer);
    // }, [time]);

    useEffect(() => {
      setInterval(() => {
          let today = new Date()
          let timeToday = ('0'+today.getHours()).slice(-2) + ':' + ('0'+today.getMinutes()).slice(-2)
          setTime(addMinutes(timeToday, 60))        
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


    const handleTimeReserv = async(reserv, status) => {
        try {
            await reservationAPI.patch(reserv.id, {statusReservation: status})
            setReset(!reset)
        } catch(error) {
            console.log(error)
        }
    }

    const handleNoShow = async(reserv) => {
      try {
        await reservationAPI.patch(reserv.id, {table: "Unassigned"})
        setReset(!reset)
      } catch(error) {
        console.log(error)
      }
    }


    useEffect(() => {
        reservations.forEach((reservation) => {
          if(dateCurrent === reservation.dates) {
            let timeReserv = reservation.timeReservation
            if(getTwentyFourHourTime(timeReserv) < time && (reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Booked") && reservation.statusReservation !== "No Show") {
                handleTimeReserv(reservation, "Late")
            }
            if (reservation.statusReservation === "Late") {
              let timeCompare1 = addMinutes(timeReserv, 15)
              if(timeCompare1 < time) {
                handleTimeReserv(reservation, "No Show")
              }
            }
            if (reservation.statusReservation === "Seated") {
              let timeCompare2 = addMinutes(timeReserv, 60)
              if(timeCompare2 < time) {
                handleTimeReserv(reservation, "Completed")
              }
            }
            if(reservation.statusReservation === "No Show") {
              if(time > "14:00") {
                handleNoShow(reservation)
              }
            }
          }
        })
    }, [time, reservations, reset])
    


  return (
    <div>
    </div>
  )
}
