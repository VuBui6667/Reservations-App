import React from "react"
import {useEffect, useContext} from "react"
import { ReservationsContext, DatesReserv, ResetContext, Skeleton } from "../../App"
import reservationAPI from '../../api/reservationAPI'

export default function Reservations() {
    const {setReservations} = useContext(ReservationsContext)
    const {datesReserv} = useContext(DatesReserv)
    const {reset} = useContext(ResetContext)
    const {setSkeleton} = useContext(Skeleton)
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await reservationAPI.get(datesReserv)
                setReservations(response)
                setSkeleton(false)
            } catch(error) {
                console.log(error)
            }
        }
        fetchReservations()
    }, [datesReserv, reset])

    return (
        <></>
    )
}