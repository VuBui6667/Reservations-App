import React from 'react'
import { useState, useEffect, useContext} from 'react'
import './sidebar.scss'
import 'boxicons'
import ToggleButton from 'react-toggle-button'
import Select from 'react-select'
import reservationAPI from '../../api/reservationAPI'
import EditReserv from '../editReserv/editReserv'
import {ResetContext, ReservNotify, NotifyContext, OpenRes} from '../../App'
import {MdOutlineChair} from "react-icons/md"
import holdReserv from '../../image/holdReserv.png'
import warningSign from '../../image/warning-sign.png'
import { TimeReserv, TableClashed, TableFlow } from '../../App'
import { DateObject } from "react-multi-date-picker";
import { ReservationsContext } from '../../App'
// import { useSelector, useDispatch } from "react-redux";
// import { reset } from "../../actions/reset" 

const Sidebar = () => {
  const [value, setValue] = useState(false)
  const [toggleReserv, setToggleReserv] = useState(false)
  const [showDetail, setShowDetail] = useState([])
  const [showEdit, setShowEdit] = useState(null)
  const {reset, setReset} =   useContext(ResetContext)
  const {setReservEdit} = useContext(ReservNotify)
  const {setNotify} = useContext(NotifyContext)
  const [search, setSearch] = useState("")
  const [filterSearch, setFilterSearch] = useState([])
  const [filterService, setFilterService] = useState("upcomming")
  const {time} = useContext(TimeReserv)
  const [newReserv, setNewReserv] = useState([])
  const [numberBooking, setnumberBooking] = useState(0)
  const [numberCover, setNumberCover] = useState(0)
  const [numberUpcomming, setNumberUpcomming] = useState(0)
  const [numberSeated, setNumberSeated] = useState(0)
  const [numberCompleted, setNumberCompleted] = useState(0)
  const [numberAbsent, setNumberAbsent] = useState(0)
  const {tableClashed, setTableClashed} = useContext(TableClashed)
  const {tableFlow, setTableFlow} = useContext(TableFlow)
  const {openRes, setOpenRes} = useContext(OpenRes)

  // const dispatch = useDispatch()
  // const resetStatus = useSelector((state) => state.resetReducer.reset)

  const date = new DateObject()
  

  const addMinutes = (paramTime, minute) => {
    var t1 = new Date("1/1/2022 " + paramTime);
    var t2 = new Date(t1.getTime() + minute*60000)
    return t2.getHours() + ':' + ('0'+t2.getMinutes()).slice(-2); 
  }

  const getTwentyFourHourTime = (paramTime) =>{ 
    var t = new Date("1/1/2022 " + paramTime); 
    return t.getHours() + ':' + ('0'+t.getMinutes()).slice(-2); 
  } 

  const statusReserv = [
    'Booked',
    'Confirmed',
    'Seated'
  ]

  const {reservations, setReservations} = useContext(ReservationsContext)

  const updateStatusReserv = async(id , StatusReserv) => {
    try {
      const response = await reservationAPI.put(id, {statusReservation: StatusReserv})
      setReset(!reset)
      setReservEdit(response)
      setNotify(true)
      setTableFlow(null)
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
  }

  const handleShowEdit = (index) => {
    if (showEdit === index) {
      setShowEdit(-1)
    } else {
      setShowEdit(index)
    }
  }

  const handleTableFlow = (reservation) => {
    if (reservation.dates === `${date.day + " " + date.month.shortName + " " + date.year}`) {
      setTableFlow(reservation)
    }
  }

  useEffect(() => {
    setNumberUpcomming(0)
    setNumberSeated(0)
    setNumberCompleted(0)
    setNumberAbsent(0)
    setNumberCover(0)
    reservations.forEach(reservation => {
      setNumberCover(prevNumber => prevNumber + (reservation.childrenReservation + reservation.adultsReservation))
      if(reservation.statusReservation === "Booked" || reservation.statusReservation === "Confirmed" || reservation.statusReservation === "Late") {
        setNumberUpcomming(prevNumber => prevNumber+1)
      } 
      if(reservation.statusReservation === "Seated") {
        setNumberSeated(prevNumber => prevNumber+1)
      } 
      if(reservation.statusReservation === "Completed") {
        setNumberCompleted(prevNumber => prevNumber+1)
      } 
      if(reservation.statusReservation === "No Show" || reservation.statusReservation === "Cancelled") {
        setNumberAbsent(prevNumber => prevNumber+1)
      }
    })
  }, [reservations])

  const options = [
    { value: 'upcomming', label: <div style={{display: "flex"}}>Upcomming <div className="number-type-service">{numberUpcomming}</div></div>},
    { value: 'seated', label: <div style={{display: "flex"}}>Seated <div className="number-type-service">{numberSeated}</div></div>},
    { value: 'completed', label: <div style={{display: "flex"}}>Completed <div className="number-type-service">{numberCompleted}</div></div>},
    { value: 'absent', label: <div style={{display: "flex"}}>Absent <div className="number-type-service">{numberAbsent}</div></div>}
  ] 

  useEffect(() => {
    setnumberBooking(0)
    setNewReserv(
      reservations.filter((reservation, idx) => {
        setnumberBooking(idx+1)
        if(filterService ===  "upcomming") {
          return (
            reservation.statusReservation === "Booked" ||
            reservation.statusReservation === "Confirmed" ||
            reservation.statusReservation === "Late"
          )
        } else if(filterService === "seated") {
          return (
            reservation.statusReservation === "Seated"
          )
        } else if(filterService === "completed") {
          return (
            reservation.statusReservation === "Completed"
          )
        } else if(filterService === "absent") {
          return (
            reservation.statusReservation === "No Show" ||
            reservation.statusReservation === "Cancelled"
          )
        } else {
          return false
        }
      })
    )
  }, [filterService, reservations])

  useEffect(() => {
    setFilterSearch(
      newReserv.filter(reservation => {
        let nameReserv = reservation.customerReservation.firstName + reservation.customerReservation.lastName
        return (
          nameReserv.toLowerCase().includes( search.toLowerCase() ) || 
          reservation.table.includes(search)
        )
      })
    )
  }, [search, newReserv])

  useEffect(() => {
    setTableClashed([])
    reservations.forEach((reservation, index) => {
      let count = 0
      reservations.forEach((reserv, idx) => {
        if(reservation.table === reserv.table && reservation.statusReservation !== "No Show" && 
          addMinutes(getTwentyFourHourTime(reservation.timeReservation),60) > getTwentyFourHourTime(reserv.timeReservation) && 
          getTwentyFourHourTime(reservation.timeReservation) < getTwentyFourHourTime(reserv.timeReservation)) 
        {
          count++
        }
      })
      if(count !== 0) {
        if(!tableClashed.includes(reservation.table) && reservation.table !== "Unassigned") {
          setTableClashed((prevTable) => [...prevTable, reservation.table])
        }
      }
    })
    if(tableFlow === null) {
      setShowEdit(null)
    }
  }, [reservations, reset])
  
  const [width, setWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [openRes]);


  
  return (
  <>
  <div id="sidebar" style={{display: openRes && width < 600 ? "block" : null}}>
      <div className="sidebar-info">
          <div>
              <p className="info-item">
                <box-icon name='book-open' color='white'></box-icon>
              {numberBooking} Bookings</p>
              <p className="info-item">
                <box-icon name='group' color='white'></box-icon>
              {numberCover} Covers</p>
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
              onChange={(e) => setFilterService(e.value)}
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
              <div key={index}>
              <div className="container-reservation" key={index} onClick={() => handleShowReserv(index)} 
              style={{background: tableClashed.includes(reservation.table) || reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) && reservation.table !== "Unassigned" ? "#FFEEEB" : null,
                      display: showEdit !== null ? "none" : "block"}}>
                <span className="first-name">{reservation.customerReservation.firstName} </span>
                <span className="last-name">{reservation.customerReservation.lastName}</span>
                <span className="time-booking" style={{color: tableClashed.includes(reservation.table) ? "#DF4759" : null}}>
                  <box-icon name='phone' color='#506690'></box-icon>
                  {reservation.timeReservation}</span>
                <div>
                  {reservation.numberChairs < reservation.adultsReservation + reservation.childrenReservation && reservation.table !== "Unassigned" ?
                    <p className="number-people" style={{color: "#DF4759"}}>
                      <box-icon name='group' color='#DF4759' style={{marginRight: "4px"}}></box-icon> 
                      {numberPeople}</p>
                  :
                    <p className="number-people">
                    <box-icon name='group' color='#506690' style={{marginRight: "4px"}}></box-icon> 
                    {numberPeople}</p>
                  }
                  <p className="number-table" 
                    style={{color: reservation.table === "Unassigned" && 
                                    reservation.statusReservation !== "Cancelled" &&
                                    reservation.statusReservation !== "No Show" ||
                                    tableClashed.includes(reservation.table) ? "#DF4759" 
                          : null}}>
                    {(reservation.table === "Unassigned" && reservation.statusReservation !== "Cancelled" && reservation.statusReservation !== "No Show") || tableClashed.includes(reservation.table) ?
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
                                                              reservation.statusReservation === "Late" ? "#FFF3EC" : null
                                                            }}>
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
                    {reservation.request || reservation.occasion[0] ? 
                      <box-icon name='purchase-tag' color='#506690' size="sm"></box-icon> 
                    : null}
                    <p style={{display: "flex"}}>
                    {reservation.occasion ?
                    <>
                      {
                        reservation.occasion.map((occasionItem, idx) => (
                          <div style={{margin: "0px"}} key={idx}>{idx === 0 ? occasionItem : (", "+occasionItem)}</div>
                        )) 
                      }
                    </> : null
                    }
                      {reservation.request && reservation.occasion[0] ? ", Special Req." : reservation.request ? "Special Req." : null}</p>
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
                    <p style={{display: "flex"}}>
                    {reservation.occasion[0] ?
                    <>
                      {
                        reservation.occasion.map((occasionItem, idx) => (
                          <div key={idx} style={{margin: "0px"}}>{idx === 0 ? occasionItem : (", "+occasionItem)}</div>
                        ))
                      }
                    </>: reservation.request ? null : "None"}
                    {reservation.request && reservation.occasion[0] ? ", Special Req" : reservation.request ? "Special Req" : null}</p>
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
                    onClick={() => updateStatusReserv(reservation.id, statusReserv[1])}
                    style={{display: (reservation.statusReservation !== "Booked") ? "none" : "flex"}}>
                      <box-icon name='check-double' color="#fff" size='md'></box-icon>
                      <p>Confirmed</p>
                    </div> 
                    <div className="control-reservation" 
                    onClick={() => updateStatusReserv(reservation.id, statusReserv[2])}
                    style={{width: reservation.statusReservation === "Confirmed" ||
                                    reservation.statusReservation === "No Show" ? "50%" : null, 
                            display: reservation.statusReservation === "Seated" || 
                                      reservation.statusReservation === "Cancelled" ||
                                      reservation.statusReservation === "Completed" ||
                                      (reservation.statusReservation === "No Show" && (time >= "14:00" || time <= "12:00"))
                                      ? "none" : "flex"}}>
                      <MdOutlineChair style={{fontSize: "36px", color: "#fff"}}/>
                      <p>Seated</p>
                    </div>
                    <div className="control-reservation" 
                    onClick={() => (
                      handleShowEdit(index),
                      handleTableFlow(reservation)
                    )}
                    style={{width: reservation.statusReservation === "Seated" ||
                                    reservation.statusReservation === "Cancelled" ||
                                    reservation.statusReservation === "Completed" ||
                                    (reservation.statusReservation === "No Show" && (time >= "14:00" || time <= "12:00")) ? "100%" : 
                                    reservation.statusReservation === "Confirmed" || 
                                    (reservation.statusReservation === "No Show" && time <= "14:00") ? "50%" : null}}>
                      <box-icon name='edit' color="#fff" size="md"></box-icon>
                      <p>Edit</p>
                    </div>
                    <div className="control-reservation" 
                    
                    style={{width: reservation.statusReservation === "Late" ? "33.33%" : null, 
                            display: reservation.statusReservation === "Late" ? "flex" : "none"}}>
                      <img src={holdReserv} style={{width: "40px"}} alt=""/>
                      <p>Hold</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-edit-reserv"> 
              {showEdit === index ?
                <EditReserv 
                idxReserv={reservation.id} editReserv={reservation} 
                toggoleEdit={showEdit} setToggleEdit={setShowEdit}
                />
              : null }
              </div>
              </div>
              )
          })
        }
      </div>
  </div>
  {openRes && width < 600 ?
  <div className="layout-sidebar" onClick={() => setOpenRes(false)}></div> :
  null}
  </>
  )
}

export default Sidebar;