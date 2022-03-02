import React from 'react'
import { useState, useEffect, useContext} from 'react'
import './sidebar.scss'
import 'boxicons'
import ToggleButton from 'react-toggle-button'
import Select from 'react-select'
import reservationAPI from '../../api/reservationAPI'
import EditReserv from '../editReserv/editReserv'
import {ResetContext, ReservNotify, NotifyContext} from '../../App'
import {MdOutlineChair} from "react-icons/md"
import holdReserv from '../../image/holdReserv.png'
import warningSign from '../../image/warning-sign.png'
import { TimeReserv } from '../../App'

const Sidebar = () => {
  
    const [value, setValue] = useState(false)
    const [toggleReserv, setToggleReserv] = useState(false)
    // const [editReserv, setEditReserv] = useState("false")
    const [showDetail, setShowDetail] = useState([])
    // const [showConfirm, setShowConfirm] = useState([])
    // const [showSeat, setShowSeat] = useState([])
    const [showEdit, setShowEdit] = useState()
    const {reset, setReset} =   useContext(ResetContext)
    const {reservEdit, setReservEdit} = useContext(ReservNotify)
    const {notify, setNotify} = useContext(NotifyContext)
    const [search, setSearch] = useState("")
    const [filterSearch, setFilterSearch] = useState([])
    const [filterService, setFilterService] = useState("all")
    const {time, setTime} = useContext(TimeReserv)


    const options = [
        { value: "all", label: "All Service"},
        { value: 'upcomming', label: 'Upcomming'},
        { value: 'seated', label: 'Seated' },
        { value: 'completed', label: 'Completed' },
        { value: 'absent', label: 'Absent'},
    ]

    const statusReserv = [
      'Booked',
      'Confirmed',
      'Seated'
    ]

    const [reservations, setReservations] = useState([])

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
  
    const updateStatusReserv = async(StatusReserv, id) => {
      try {
      const response = await reservationAPI.patch(id+1, {statusReservation: StatusReserv})
      setReset(!reset)
      setReservEdit(response)
      setNotify(true)
      } catch(error) {
        console.log(error)
      }
    }



    const handleShowReserv = (index) => {
      if (showDetail.includes(index) === false) {
        setShowDetail((oldArray) => [...oldArray, index])
      } else {
        setShowDetail((currentArray) => currentArray.filter((remainElement) => remainElement !== index))
      }
      // if (reservations[index].statusReservation === "Confirmed") {
      //   setShowConfirm((oldArray) => [...oldArray, index])
      // }
      // if (reservations[index].statusReservation === "Seated") {
      //   setShowSeat((oldArray) => [...oldArray, index])
      // }
    }


    const handleShowEdit = (index) => {
      if (showEdit === index) {
        setShowEdit(-1)
      } else {
        setShowEdit(index)
      }
    }

    const [subReserv, setSubReserv] = useState([])


    // useEffect(() => {
    //   reservations.map(reservation => {
    //     if(filterService === "all") {
    //       setSubReserv((oldArray) => [...oldArray, reservation])
    //     } else if (filterService === "upcomming") {
    //       if(reservation.statusReservation === "Booked" || reservation.statusReservation === "Confirmed") {
    //         setSubReserv((oldArray) => [...oldArray, reservation])
    //       }
    //     } else if (filterService === "seated") {
    //       if(reservation.statusReservation === "Seated") {
    //         setSubReserv((oldArray) => [...oldArray, reservation])
    //       }
    //     } else if (filterService === "completed") {
    //       if(reservation.statusReservation === "Completed") {
    //         setSubReserv((oldArray) => [...oldArray, reservation])
    //       }
    //     } else if (filterService === "absent") {
    //       if(reservation.statusReservation === "Cancelled") {
    //         setSubReserv((oldArray) => [...oldArray, reservation])
    //       }
    //     }
    //   })
    // }, [filterService, reservations])

    useEffect(() => {
      setFilterSearch(
        reservations.filter(reservation => {
          let nameReserv = reservation.customerReservation.firstName + reservation.customerReservation.lastName
          return (
            nameReserv.toLowerCase().includes( search.toLowerCase() ) || 
            reservation.table.includes(search)
          )
        })
      )
    }, [search, reservations])


    
    return (
    <div id="sidebar">
        <div className="sidebar-info">
            <div>
                <p className="info-item">
                  <box-icon name='book-open' color='white'></box-icon>
                Bookings</p>
                <p className="info-item">
                  <box-icon name='group' color='white'></box-icon>
                Covers</p>
            </div>
            <input className="search-info" placeholder='Search by name or table number' 
                  value={search} onChange={e => setSearch(e.target.value)}>  
            </input>
            <div className="clear-search" style={{display: search ? "block" : "none"}}>
              <box-icon name='x-circle' type='solid' color='#d9d9d9' 
                onClick={() => setSearch("")}>
              </box-icon>
            </div>
        </div>
        <div className="sidebar-sub-info">
            <Select 
                options={options} 
                defaultValue={options[0]}
                onChange={(e) => setFilterService(e.label)}
                className="sidebar-info-type"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    border: state.isFocused && "none",
                    backgroundColor: "#F1F4F8"
                  }),
                  option: (provided, state) => ({
                     ...provided,
                     backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                     color: "#506690 !important",
                     fontWeight: "400"
                  })
                }}
            />
            <span className="sidebar-show-detail">
            <div className="show-detail">Show Details</div>
            <ToggleButton
              inactiveLabel={''}
              activeLabel={''}
              onClick={() => setToggleReserv(!toggleReserv)}
              colors={{
                activeThumb: {
                    base: '#7C69EF',
                  },
                  inactiveThumb: {
                    base: '#E8EBFB',
                  },
                  active: {
                    base: '#ccc',
                    hover: 'rgb(177, 191, 215)',
                  },
                  inactive: {
                    base: '#ccc',
                    hover: 'rgb(177, 191, 215)',
                  }
              }}
                value={ value }
                onToggle={(value) => {
                    setValue(!value)
            }} />
          
            </span>
        </div>
        <div className="container-customers">
          {
            filterSearch.map((reservation, index) => {
              let numberPeople = reservation.adultsReservation + reservation.childrenReservation
              return (
                <>
                <div className="container-reservation" key={index} onClick={() => handleShowReserv(index)}>
                  <span className="first-name">{reservation.customerReservation.firstName} </span>
                  <span className="last-name">{reservation.customerReservation.lastName}</span>
                  <span className="time-booking">
                    <box-icon name='phone' color='#506690'></box-icon>
                    {reservation.timeReservation}</span>
                  <div>
                    <p className="number-people">
                      <box-icon name='group' color='#506690' style={{marginRight: "4px"}}></box-icon> 
                      {numberPeople}</p>
                    <p className="number-table" 
                      style={{color: reservation.table === "Unassigned" && 
                                     reservation.statusReservation !== "Cancelled" ? "#DF4759" 
                            : null}}>
                      {reservation.table === "Unassigned" && reservation.statusReservation !== "Cancelled" ?
                        <MdOutlineChair style={{color: "#DF4759", fontSize: "20px", marginRight: "5px"}}/> :
                        <MdOutlineChair style={{fontSize: "20px", marginRight: "5px"}}/>
                      }
                      {reservation.table}</p>
                    <p className="reservation-status" style={{color: 
                                                                reservation.statusReservation === "Cancelled"  || reservation.statusReservation === "No Show" ? "#DF4759" :
                                                                reservation.statusReservation === "Seated" ? "#275EFE" :
                                                                reservation.statusReservation === "Late" ? "#FF5C00" :
                                                                reservation.statusReservation === "Completed" ? "#358970" :
                                                                "#506690",
                                                              background:
                                                                reservation.statusReservation === "Cancelled" || reservation.statusReservation === "No Show" ? "#FFF6F5" : 
                                                                reservation.statusReservation === "Completed" ? "#F1FFF6" :
                                                                reservation.statusReservation === "Late" ? "#FFF3EC" : null}}>
                      {reservation.statusReservation === "Booked" ? 
                         <box-icon name='check' color="#506690" style={{marginRight:"5px"}}></box-icon> :
                         reservation.statusReservation === "Confirmed" ?
                         <box-icon name='check-double' color="#506690" style={{marginRight:"5px"}}></box-icon> :
                         reservation.statusReservation === "Seated" ?
                         <MdOutlineChair style={{fontSize: "20px", color: "#275EFE", marginRight: "5px"}}/> :
                        //  <box-icon name='chair'color="#275EFE" style={{marginRight:"5px"}}></box-icon> :
                         reservation.statusReservation === "Cancelled" ?
                         <box-icon name='x-circle' color="#DF4759" style={{marginRight:"5px"}}></box-icon> :
                         reservation.statusReservation === "Late" ?
                         <box-icon name='time-five' color='#ff5c00' style={{marginRight: "5px"}}></box-icon> : 
                         reservation.statusReservation === "No Show" ?
                         <img src={warningSign} style={{marginRight: "5px"}} alt=""/> :
                         reservation.statusReservation === "Completed" ?
                         <box-icon name='check-circle' color="#358970" style={{marginRight: "5px"}}></box-icon> :
                         null
                      }
                      {reservation.statusReservation}</p>
                  </div>
                  <div className="reservation-required" style={{display: toggleReserv || showDetail.includes(index) ? "none" : "flex"}}>
                    <div className="required-title">
                      {reservation.request && reservation.occasion ? 
                        <box-icon name='purchase-tag' color='#506690' size="sm"></box-icon> 
                      : null}
                      <p>
                        {
                          reservation.occasion.map((occasionItem, idx) => (
                            <>{idx === 0 ? occasionItem : (", "+occasionItem)}</>
                          ))
                        }
                        {reservation.request ? ", Special Req." : null}</p>
                    </div>
                  </div>
                  <div className="reservation-more" 
                  style={{display: (showDetail.includes(index) || toggleReserv) ? 'block' : 'none'}}>
                    <div className="reservation-contact">
                      <box-icon name='phone' color='#506690' size="sm"></box-icon>
                      <p>{reservation.customerReservation.contact}</p>
                    </div>
                    <div className="reservation-req">
                    <div className="req-title">
                      <box-icon name='purchase-tag' color='#506690' ></box-icon>
                      <p>
                        {
                          reservation.occasion.map((occasionItem, idx) => (
                            <>{idx === 0 ? occasionItem : (", "+occasionItem)}</>
                          ))
                        }
                        {reservation.request ? ", Special Req" : null}</p>
                    </div>
                    </div>
                    {reservation.request ?
                    <div className="req"><p>{reservation.request}</p></div>
                    : null}
                    <div className="reservation-deposit">
                      <div className="deposit-title">
                        <box-icon name='dollar-circle' color='#506690' ></box-icon> 
                        <p>Deposit</p>
                      </div>
                    </div>
                    <div className="deposit">{numberPeople} x $50 = ${numberPeople*50}</div>
                    <div className="controls-reservation" style={{display: showDetail.includes(index) ? 'flex' : 'none'}}>
                      <div className="control-reservation" 
                      onClick={() => updateStatusReserv(statusReserv[1], index)}
                      style={{display: (reservation.statusReservation !== "Booked") ? "none" : "flex"}}>
                        <box-icon name='check-double' color="#fff" size='md'></box-icon>
                        <p>{statusReserv[1]}</p>
                      </div> 
                      <div className="control-reservation" 
                      onClick={() => updateStatusReserv(statusReserv[2], index)}
                      style={{width: reservation.statusReservation === "Confirmed" ||
                                     reservation.statusReservation === "No Show" ? "50%" : null, 
                              display: reservation.statusReservation === "Seated" || 
                                       reservation.statusReservation === "Cancelled" ||
                                       reservation.statusReservation === "Completed" ||
                                       (reservation.statusReservation === "No Show" && time >= "14:00")
                                       ? "none" : "flex"}}>
                        <MdOutlineChair style={{fontSize: "36px", color: "#fff"}}/>
                        <p>Seat</p>
                      </div>
                      <div className="control-reservation" 
                      onClick={() => handleShowEdit(index)}
                      style={{width: reservation.statusReservation === "Seated" ||
                                     reservation.statusReservation === "Cancelled" ||
                                     reservation.statusReservation === "Completed" ||
                                     (reservation.statusReservation === "No Show" && time >= "14:00") ? "100%" : 
                                     reservation.statusReservation === "Confirmed" || 
                                     (reservation.statusReservation === "No Show" && time <= "14:00") ? "50%" : null}}>
                        <box-icon name='edit' color="#fff" size="md"></box-icon>
                        <p>Edit</p>
                      </div>
                      <div className="control-reservation" 
                      
                      style={{width: reservation.statusReservation === "Late" ? "33.33%" : null, 
                              display: reservation.statusReservation === "Seated" || 
                                       reservation.statusReservation === "Cancelled" || 
                                       reservation.statusReservation === "Completed" ||
                                       reservation.statusReservation === "No Show" ? "none" : "flex"}}>
                        <img src={holdReserv} style={{width: "40px"}} alt=""/>
                        <p>Hold</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* style={{display: editReserv ? "block" : "none"}} */}
                <div className="container-edit-reserv"
                style={{display: showEdit === index ? 'block' : 'none'}}> 
                {showEdit === index ?
                  <EditReserv 
                  idxReserv={index} editReserv={reservation} 
                  toggoleEdit={showEdit} setToggleEdit={setShowEdit}
                  setReset={setReset} reset={reset}/>
                :null}
                </div>
                </>
                )
            })
          }
        </div>
    </div>
    )
}

export default Sidebar;