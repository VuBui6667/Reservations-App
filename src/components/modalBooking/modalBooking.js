import React, {useState, useRef, useEffect, useContext} from "react";
import './modalBooking.scss'
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import Select from 'react-select'
import userAPI from "../../api/userAPI";
import reservationAPI from "../../api/reservationAPI"
import { ResetContext } from '../../App'

const ModalBooking = (props) => {
    const [methodAdd, setMethodAdd] = useState(true)
    const [dateSelect, setDateSelect] = useState(0)
    const [dateValue, setDateValue] = useState(false)
    const [method, setMethod] = useState(3)
    const [type, setType] = useState([])
    const date = new DateObject()
    const [customers, setCustomers] = useState([])
    const [occasionSelect, setOccasionSelect] = useState([])
    const setShowModal = props.setShowModal
    const showModal = props.showModal
    const {reset, setReset} = useContext(ResetContext)
    const [checkReserv, setCheckReserv] = useState([])
    const [handleExcept, setHandleExcept] = useState(true)


    const [width, setWidth]   = useState(window.innerWidth);
    const updateDimensions = () => {
      setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);
 
    const [reservation, setReservation] = useState({
        adultsReservation: "",
        childrenReservation: "",
        timeReservation: "",
        table: "Unassigned",
        numberChairs: "",
        request: "",
        note: "",
        dates: date.day + " " + date.month.shortName + " " + date.year,
        customerReservation: "",
        statusReservation: "Booked",
        occasion: ""
    })
    useEffect(() => {
        const fetchCustomers = async () =>  {
          try {
            const response = await userAPI.getAll()
            setCustomers(response)
          } catch(error) {
            console.log(error)
          }
        }
        fetchCustomers()
      }, [])
    
    const fetchReservations = async () => {
        if(checkReserv.includes(1) && checkReserv.includes(2) && checkReserv.includes(3) && checkReserv.includes(4)) {
            try {
                await reservationAPI.post(reservation)
                setShowModal(!showModal)
                setReset(!reset)
            } catch(error) {
                console.log(error)
            }
        } else {
            setHandleExcept(false)
        }
    }

    const customerValue = 
        customers.map((customer) => (
            // { value: customer.id, label: customersValue(customer.firstName, customer.lastName, customer.contact)}
            { value: customer.id, label: customer.firstName + " " + customer.lastName + " - " + customer.contact}
        ))
    // diner.firstName+" "+ diner.lastName +"<br>" + diner.contact


    const adults = [
        { value: '0', label: 0, id:'adultsReservation'},
        { value: '1', label: 1, id:'adultsReservation'},
        { value: '2', label: 2, id:'adultsReservation'},
        { value: '3', label: 3, id:'adultsReservation'},
        { value: '4', label: 4, id:'adultsReservation'},
        { value: '5', label: 5, id:'adultsReservation'},
        { value: '6', label: 6, id:'adultsReservation'}
    ]
    const children = [
        { value: '0', label: 0, id:'childrenReservation'},
        { value: '1', label: 1, id:'childrenReservation'},
        { value: '2', label: 2, id:'childrenReservation'},
        { value: '3', label: 3, id:'childrenReservation'},
        { value: '4', label: 4, id:'childrenReservation'},
        { value: '5', label: 5, id:'childrenReservation'},
        { value: '6', label: 6, id:'childrenReservation'}
    ]
    const time = [
        { value: '1', label: '12:00 PM', id:'timeReservation'},
        { value: '2', label: '12:15 PM', id:'timeReservation'},
        { value: '3', label: '12:30 PM', id:'timeReservation'},
        { value: '4', label: '12:45 PM', id:'timeReservation'},
        { value: '5', label: '1:00 PM', id:'timeReservation'},
        { value: '6', label: '1:15 PM', id:'timeReservation'},
        { value: '7', label: '1:30 PM', id:'timeReservation'},
        { value: '8', label: '1:45 PM', id:'timeReservation'},

    ]
    const tables = [
        {value: 1, label: '105', id:'table'},
        {value: 2, label: '106', id:'table'},
        {value: 3, label: '107', id:'table'},
        {value: 4, label: '108', id:'table'},
        {value: 5, label: '109', id:'table'},
        {value: 6, label: '110', id:'table'},
        {value: 7, label: '111', id:'table'},
        {value: 8, label: '112', id:'table'},
        {value: 9, label: '113', id:'table'},
        {value: 10, label: '114', id:'table'},
        {value: 11, label: '115', id:'table'},
        {value: 12, label: '116', id:'table'},
        {value: 13, label: '117', id:'table'},
        {value: 14, label: '118', id:'table'},
        {value: 15, label: '120', id:'table'},
        {value: 16, label: '121', id:'table'},
        {value: 17, label: '122', id:'table'},
        {value: 18, label: '123', id:'table'},
    ]

    const chairs = [
        '0',
        '6',
        '4',
        '14',
        '14',
        '8',
        '8',
        '6',
        '6',
        '8',
        '6',
        '6',
        '2',
        '2',
        '2',
        '2',
        '4',
        '12',
        '12',
    ]
    const weekdays = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
    ]
    const weekdaysShort = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ]

    const occasions = [
        'Casual',
        'Birthday',
        'Anniversary',
        'Couple Date',
        'Business',
        'Others'
    ]

    const datePickerRef = useRef()
    function handleChange(e) {
        const newReservation={...reservation}
        newReservation[e.target.id] = e.target.value
        setReservation(newReservation)
    }
    const handleSelect = (options) => {
        const newReservation={...reservation}
        newReservation[options.id] = options.label
        setReservation(newReservation)
        if(options.id === "adultsReservation" && !checkReserv.includes(1)) {
            setCheckReserv(prev => [...prev, 1])
        }
        if(options.id === "childrenReservation" && !checkReserv.includes(2)) {
            setCheckReserv(prev => [...prev, 2])
        }
        if(options.id === "timeReservation" && !checkReserv.includes(3)) {
            setCheckReserv(prev => [...prev, 3])
        }
    }

    const handleChairs = (options) => {
        const newReservation={...reservation}
        newReservation["numberChairs"] = chairs[options.value]
        setReservation(newReservation)
        newReservation["table"] = options.label
        setReservation(newReservation)
    }

    const handleDate = (value) => {
        const newReservation={...reservation}
        if(value.year) {
            newReservation["dates"] = value.day + " " + value.month.shortName + " " + value.year   
        } else {
            newReservation["dates"] = date.day+value + " " + date.month.shortName + " " + date.year
        }
        setReservation(newReservation)
    }

    const handleCustomer = (options) => {
        const newReservation={...reservation}
        newReservation["customerReservation"] = customers[options.value-1]
        setReservation(newReservation)
        if(!checkReserv.includes(4)) {
            setCheckReserv(prev => [...prev, 4])
        }
    }

    const handleOccasion = (index) => {
        if (occasionSelect.includes(occasions[index]) === false) {
            setOccasionSelect(occasionSelect => [...occasionSelect, occasions[index]])
          } else {
            setOccasionSelect((currentArray) => currentArray.filter((remainElement) => remainElement !== occasions[index]))
          }
    }
    useEffect(() => {
        const newReservation={...reservation}
        newReservation["occasion"] = occasionSelect
        setReservation(newReservation)
    }, [occasionSelect])

    const handleTypeNotify = (number) => {
        if (type.includes(number) === false) {
            setType(prev => [...prev, number])
          } else {
            setType((currentArray) => currentArray.filter((remainElement) => remainElement !== number))
          }
    }

    return (
        <div className={`modalBooking animate__animated ${showModal ? "animate__fadeInUp" : "animate__fadeOutDown"}`} style={{zIndex: showModal ? null : 0}}>
            <div className="booking-header">
                <div className="booking-title">Add New</div>
                <div className="booking-close" onClick={() => props.setShowModal(!props.showModal)}>
                    <box-icon name='x' size="md" color="#506690"></box-icon>
                </div>
            </div>
            <div className="method-add-booking">
                <div className="reservation-add"
                    onClick={() => setMethodAdd(true)}
                    style={{
                        backgroundColor: methodAdd ? '#7C69EF' : '#fff',
                        color: methodAdd ? '#fff' : '#7C69EF'
                    }}
                >Reservation</div>
                <div className="walk-in-add"
                    onClick={() => setMethodAdd(false)}
                    style={{
                        backgroundColor: !methodAdd ? '#7C69EF' : '#fff',
                        color: !methodAdd ? '#fff' : '#7C69EF'
                    }}
                >Walk In</div>
            </div>
            <div className="booking-containers">
                <div className="booking-container1">
                    <div className="reservation-details">
                        <div className="containers-title">RESERVATION DETAILS</div>
                        <div className="reservation-date">
                            <span className="reservation-date-title">Date</span>
                            <div className="container-dates">
                            {
                                weekdaysShort.map((weekday, idx) => {
                                    if(weekday === date.weekDay.shortName) {
                                        return (
                                            <>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(0), handleDate(date))}
                                            style={{
                                                color: dateSelect === 0 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 0 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>Today</p>
                                                <p>{date.day}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(1), handleDate(1))}
                                            style={{
                                                color: dateSelect === 1 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 1 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>{weekdays[idx+1]}</p>
                                                <p>{date.day+1}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(2), handleDate(2))}
                                            style={{
                                                color: dateSelect === 2 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 2 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>{weekdays[idx+2]}</p>
                                                <p>{date.day+2}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(3), handleDate(3))}
                                            style={{
                                                color: dateSelect === 3 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 3 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>{weekdays[idx+3]}</p>
                                                <p>{date.day+3}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(4), handleDate(4))}
                                            style={{
                                                color: dateSelect === 4 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 4 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>{weekdays[idx+4]}</p>
                                                <p>{date.day+4}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            <div className="reservation-date-item"
                                            onClick = {() => (setDateSelect(5), handleDate(1))}
                                            style={{
                                                color: dateSelect === 5 ? '#fff' : '#1B2A4E',
                                                backgroundColor: dateSelect === 5 ? '#7C69EF' : '#fff'
                                            }}>
                                                <p>{weekdays[idx+5]}</p>
                                                <p>{date.day+5}</p>
                                                <p>{date.month.shortName}</p>
                                            </div>
                                            </>
                                        )
                                    }
                                })
                            }
                            <div className="reservation-selectMore-date"
                            onClick={() => (
                                // eslint-disable-next-line no-sequences
                                datePickerRef.current.openCalendar(),
                                setDateSelect(6)
                            )}

                            style={{
                                color: dateSelect === 6 ? '#fff' : '#1B2A4E',
                                backgroundColor: dateSelect === 6 ? '#7C69EF' : '#fff'
                            }}>
                                <p className="select-date" 
                                    style={{padding: dateValue ? "0px" : "10px"}}>
                                    {dateValue ? null : "More Dates"}
                                </p>
                                <p>{dateValue ? dateValue.weekDay.shortName : null}</p>
                                <p>{dateValue ? dateValue.day : null}</p>
                                <p>{dateValue ? dateValue.month.shortName : null}</p>
                                <DatePicker 
                                    minDate={new Date().setDate(date.day)}
                                    animations={[
                                     opacity(), 
                                     transition({ from: 35, duration: 800 })
                                    ]} 
                                    plugins={[
                                    <DatePickerHeader position="right" />
                                    ]}
                                    ref={datePickerRef} 
                                    value={dateValue}
                                    onChange={(value) => {
                                        setDateValue(value)
                                        handleDate(value)
                                    }}
                                />
                            </div>
                            </div>
                        </div> 
                        <div className="reservation-numberPeople">
                            <div className="number-adults">
                                <p className="adults-title">Adults</p>
                                <Select     
                                // value={reservation.adultsReservation}
                                onChange={handleSelect}
                                options={adults} 
                                placeholder={"Select Adults"}
                                className="type-service"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        border: state.isFocused && "rgba(0, 40, 100, 0.12)",
                                    }),
                                    option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                    color: "#506690 !important",
                                    fontWeight: "400"
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: `${handleExcept === false && !checkReserv.includes(1) ? "#DF4759" : "#a3a3a3"}`
                                    })
                                }}
                                />
                            </div>
                            <div className="number-children">
                                <p className="children-title">Children</p>
                                <Select     
                                // value={reservation.childrenReservation}
                                onChange={handleSelect}
                                options={children} 
                                placeholder={"Select Children"}
                                className="type-service"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        border: state.isFocused && "rgba(0, 40, 100, 0.12)",
                                    }),
                                    option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                    color: "#506690 !important",
                                    fontWeight: "400"
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: `${handleExcept === false && !checkReserv.includes(2) ? "#DF4759" : "#a3a3a3"}`
                                    })
                                }} 
                                />
                            </div>
                        </div>
                        <div className="reservation-timeAndtable">
                            <div className="reservation-time">
                                <div className="time-title">Time</div>
                                <Select     
                                    // value={reservation.timeReservation}
                                    onChange={handleSelect}
                                    options={time}
                                    placeholder={"Select Time"}
                                    className="type-service"
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused && "rgba(0, 40, 100, 0.12)",    
                                        }),
                                        option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                        color: "#506690 !important",
                                        fontWeight: "400",
                                        }),
                                        menuList: (provided, state) => ({
                                            ...provided,
                                            borderBottom: '1px dotted pink',
                                            color: state.selectProps.menuColor,
                                            padding: 10,
                                            width: 300,
                                            display: "flex"

                                        }),
                                        menu: (provided, state) => ({
                                            ...provided,
                                            width: 300,
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: `${handleExcept === false && !checkReserv.includes(3) ? "#DF4759" : "#a3a3a3"}`
                                        })
                                    }}
                                />
                            </div>
                            <div className="reservation-table">
                                <div className="table-title">Table</div>
                                <Select     
                                    onChange={handleChairs}
                                    options={tables} 
                                    placeholder={"Select Table"}
                                    className="type-service"
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused && "rgba(0, 40, 100, 0.12)",    
                                        }),
                                        option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                        color: "#506690 !important",
                                        fontWeight: "400",

                                        }),
                                        menuList: (provided, state) => ({
                                            ...provided,
                                            borderBottom: '1px dotted pink',
                                            color: state.selectProps.menuColor,
                                            padding: 10,
                                            display: "flex",
                                            width: 300,
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            width: 300,
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="additional-details">
                        <div className="containers-title">ADDITIONAL DETAILS</div>
                        <div className="occasion"   >
                            <div className="occasion-title">Occasion</div>
                            <div className="occasion-container">
                                    {
                                        occasions.map((occasion, index) => (
                                            <div className="occasion-item" key={index}
                                            onClick={() => handleOccasion(index)}
                                            style={{background: occasionSelect.includes(occasions[index]) ? "#7C69EF" : null,
                                                    color: occasionSelect.includes(occasions[index]) ? "white" : "#7C69EF"}}
                                            >{occasion}</div>
                                        ))
                                    }
                            </div>
                        </div>
                        <div className="reservation-request">
                            <div className="request-title">Special Request by Diner</div>
                            <input type="text" 
                            value={reservation.request}
                            id="request"
                            onChange={(e) => handleChange(e)}
                             placeholder="Specify if any"/>
                        </div>
                        <div className="reservation-notes">
                            <div className="notes-title">Reservation Notes by Staff</div>
                            <input type="text" 
                            value={reservation.note}
                            id="note"
                            onChange={(e) => handleChange(e)}
                             placeholder="Specify if any" />
                        </div>
                    </div>
                </div>
                <div className="booking-container2">
                    <div className="diner-details">
                        <div className="containers-title">DINER DETAILS</div>
                            <Select     
                                options={customerValue} 
                                onChange={handleCustomer}
                                placeholder={"Search by phone number or name"}
                                className="search-diner"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        width: 265,
                                        color: "#ABABAB",
                                        border: state.isFocused && "rgba(0, 40, 100, 0.12)",    
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                        color: "#506690 !important",
                                        fontWeight: "400",        
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        width: 265,
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: `${handleExcept === false && !checkReserv.includes(4) ? "#DF4759" : "#a3a3a3"}`
                                    })
                                }}
                        />
                    </div>
                    <div className="customer-notify">
                        <div className="containers-title">CUSTOMER NOTIFICATIONS</div>
                        <div className="methods-notify">
                            <div className="title-notify">Notify Via</div>
                            <p className={`method-notify ${method===1 ? " method-notify-select" : ''}`} onClick={() => setMethod(1)}>
                                <p  className={method===1 ? "method-select" : "method-selects"}></p>Email
                            </p>
                            <p className={`method-notify ${method===2 ? " method-notify-select" : ''}`} onClick={() => setMethod(2)}>
                                <p  className={method===2 ? "method-select" : "method-selects"}></p>SMS
                            </p>
                            <p className={`method-notify ${method===3 ? " method-notify-select" : ''}`} onClick={() => setMethod(3)}>
                                <p  className={method===3 ? "method-select" : "method-selects"}></p>Don't Notify
                            </p>
                        </div>
                        <div className="types-notify">
                            <div className="title-notify">Type of Notification</div>
                            <div className="type-notify" onClick={() => handleTypeNotify(1)}>
                                <p className="type-notify-btn" 
                                style={{backgroundColor: type.includes(1) ? "#7C69EF" : null}}>
                                    <box-icon name='check' size="lg" color="#fff"></box-icon></p>
                                Reservation Confirmation</div>
                            <div className="type-notify" onClick={() => handleTypeNotify(2)}>
                                <p className="type-notify-btn" 
                                style={{backgroundColor: type.includes(2) ? "#7C69EF" : null}}>
                                    <box-icon name='check' size="lg" color="#fff"></box-icon></p>
                                Reservation Reminder</div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="booking-footer">
            {/* this.forceUpdate() */}
                <div className="booking-cancel" onClick={() => {setShowModal(!showModal)}}>Cancel Reservation</div>
                <div className="booking-add" onClick={() => fetchReservations()}>Add Reservation</div>
            </div>
        </div>
    )
}

export default ModalBooking

// First Name
// Last Name
// Id Table
// people's number 
    // adults's number
    // children's number
// Phone number
// Occasion: d???p
    // eg: graduation, birthday
// Special Req: y??u c???u t??? kh??ch h??ng
// Staff Notes
// Set Time 
// Set Day
// Deposit based on people' number