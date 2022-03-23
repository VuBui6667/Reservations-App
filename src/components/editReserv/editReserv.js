import React, {useState, useRef, useContext, useEffect} from 'react'
import DatePicker from 'react-multi-date-picker'
import './editReserv.scss'
import Select from 'react-select'
import reservationAPI from '../../api/reservationAPI'
import { NotifyContext, ReservNotify, CancelReserv, TableFlow, TableClashed, WarnContext, ResetContext } from "../../App"
import {MdOutlineChair} from "react-icons/md"
import warningSign from '../../image/warning-sign.png'
import { DateObject } from "react-multi-date-picker";
// import { useSelector, useDispatch } from "react-redux";
// import { reset } from "../../actions/reset" 

const EditReserv = (props) => {
    const reserv = props.editReserv
    const toggleEdit = props.toggleEdit
    const setToggleEdit = props.setToggleEdit
    const idxReserv = props.idxReserv
    const [dateValue, setDateValue] = useState(false)
    const datePickerRef = useRef()
    const {tableClashed} = useContext(TableClashed)
    const date = new DateObject()

    const [reservation, setReservartion] = useState(reserv)
    const [occasionSelect, setOccasionSelect] = useState(reserv.occasion)

    const {setNotify} = useContext(NotifyContext)
    const {setReservEdit} = useContext(ReservNotify)
    const {cancelReserv, setCancelReserv} = useContext(CancelReserv)
    const {setTableFlow} = useContext(TableFlow)
    const {setWarning} = useContext(WarnContext)
    const {reset, setReset} = useContext(ResetContext)


    // const dispatch = useDispatch()
    // const resetStatus = useSelector((state) => state.resetReducer.reset)

    const occasions = [
        'Casual',
        'Birthday',
        'Anniversary',
        'Couple Date',
        'Business',
        'Others'
    ]

    const statusReserv = [
        {value: 1, label: "Booked"},
        {value: 2, label: "Confirmed"},
    ]

    const timeReserv = [
        { value: '1', label: '12:00 PM', id:'timeReservation'},
        { value: '2', label: '12:15 PM', id:'timeReservation'},
        { value: '3', label: '12:30 PM', id:'timeReservation'},
        { value: '4', label: '12:45 PM', id:'timeReservation'},
        { value: '5', label: '1:00 PM', id:'timeReservation'},
        { value: '6', label: '1:15 PM', id:'timeReservation'},
        { value: '7', label: '1:30 PM', id:'timeReservation'},
        { value: '8', label: '1:45 PM', id:'timeReservation'},
    ]

    const adultsReserv = [
        { value: '0', label: 0, id:'adultsReservation'},
        { value: '1', label: 1, id:'adultsReservation'},
        { value: '2', label: 2, id:'adultsReservation'},
        { value: '3', label: 3, id:'adultsReservation'},
        { value: '4', label: 4, id:'adultsReservation'},
        { value: '5', label: 5, id:'adultsReservation'},
        { value: '6', label: 6, id:'adultsReservation'},
        { value: '7', label: 7, id:'adultsReservation'},
        { value: '8', label: 8, id:'adultsReservation'},
        { value: '9', label: 9, id:'adultsReservation'}
        
    ]
    const childrenReserv = [
        { value: '0', label: 0, id:'childrenReservation'},
        { value: '1', label: 1, id:'childrenReservation'},
        { value: '2', label: 2, id:'childrenReservation'},
        { value: '3', label: 3, id:'childrenReservation'},
        { value: '4', label: 4, id:'childrenReservation'},
        { value: '5', label: 5, id:'childrenReservation'},
        { value: '6', label: 6, id:'childrenReservation'},
        { value: '7', label: 7, id:'childrenReservation'},
        { value: '8', label: 8, id:'childrenReservation'},
        { value: '9', label: 9, id:'childrenReservation'}
    ]

    const tablesReserv = [
        {value: '1', label: '105', id:'table'},
        {value: '2', label: '106', id:'table'},
        {value: '3', label: '107', id:'table'},
        {value: '4', label: '108', id:'table'},
        {value: '5', label: '109', id:'table'},
        {value: '6', label: '110', id:'table'},
        {value: '7', label: '111', id:'table'},
        {value: '8', label: '112', id:'table'},
        {value: '9', label: '113', id:'table'},
        {value: '10', label: '114', id:'table'},
        {value: '11', label: '115', id:'table'},
        {value: '12', label: '116', id:'table'},
        {value: '13', label: '117', id:'table'},
        {value: '14', label: '118', id:'table'},
        {value: '15', label: '120', id:'table'},
        {value: '16', label: '121', id:'table'},
        {value: '17', label: '122', id:'table'},
        {value: '18', label: '123', id:'table'},
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

    const handleSelect = (options) => {
        const newReservation={...reservation}
        newReservation[options.id] = options.label
        setReservartion(newReservation)
    }

    const handleChairs = (options) => {
        const newReservation={...reservation}
        newReservation["numberChairs"] = chairs[options.value]
        setReservartion(newReservation)
        newReservation["table"] = options.label
        setReservartion(newReservation)
    }

    function handleChange(e) {
        const newReservation={...reservation}
        newReservation[e.target.id] = e.target.value
        setReservartion(newReservation)
    }

    const handleOccasion = (occasion) => {
        if (occasionSelect.includes(occasion) === false) {
            setOccasionSelect(prev => [...prev, occasion])
          } else {
            setOccasionSelect((currentArray) => currentArray.filter((remainElement) => remainElement !== occasion))
          }
    }

    useEffect(() => {
        const newReservation={...reservation}
        newReservation["occasion"] = occasionSelect
        setReservartion(newReservation)
    }, [occasionSelect])

    const saveReserv = async() => {
        try {
        await reservationAPI.patch(idxReserv, reservation)
        setReset(!reset)
        setToggleEdit(!toggleEdit)
        setNotify(true)
        setReservEdit(reservation.customerReservation)
        } catch(error) {
          console.log(error)
        }
    }

    const prepareCancel = () => {
        setReservEdit(reservation)
    }


    let numberPeople = reserv.adultsReservation + reserv.childrenReservation
    return (
        <div className="edit-reserv">
            <div className="header-edit-reserv">
                <div className="navigate-edit-reserv">
                    <div className="back-reserv" onClick={() => (setToggleEdit(!toggleEdit), setTableFlow(null))}><box-icon name='arrow-back'></box-icon></div>
                    {
                    tableClashed.includes(reservation.table) && !(reservation.numberChairs < reservation.adultsReservation + reservation.childrenReservation) ?
                    <div className="save-edit-reserv" style={{display: reserv.statusReservation === "Cancelled" ? "none" : null}}
                        onClick={() => (prepareCancel(), setWarning("clashes with an ongoing reservation."))}>
                        <box-icon name='save' color='#7C69EF'></box-icon> 
                    Save Changes</div> :
                    reservation.numberChairs < reservation.adultsReservation + reservation.childrenReservation && !tableClashed.includes(reservation.table) ?
                    <div className="save-edit-reserv" style={{display: reserv.statusReservation === "Cancelled" ? "none" : null}}
                        onClick={() => (prepareCancel(), setWarning("total pax exceeds table’s capacity."))}>
                        <box-icon name='save' color='#7C69EF'></box-icon> 
                    Save Changes</div> :
                    reservation.numberChairs < reservation.adultsReservation + reservation.childrenReservation && tableClashed.includes(reservation.table) ?
                    <div className="save-edit-reserv" style={{display: reserv.statusReservation === "Cancelled" ? "none" : null}}
                        onClick={() => (prepareCancel(), setWarning("total pax exceeds table’s capacity and clashes with an ongoing reservation."))}>
                        <box-icon name='save' color='#7C69EF'></box-icon> 
                    Save Changes</div> :
                    <div className="save-edit-reserv" style={{display: reserv.statusReservation === "Cancelled" ? "none" : null}}
                        onClick={() => (saveReserv(), setTableFlow(null))}>
                        <box-icon name='save' color='#7C69EF'></box-icon> 
                    Save Changes</div>
                    }
                    {/* onClick={saveReserv, notifyEditReserv} */}
                </div>
                <div className="info-reserv">
                    <div className="title-reserv">
                        <span>{reserv.customerReservation.firstName} </span>
                        <span>{reserv.customerReservation.lastName}</span>
                    </div>
                    <div className="reserv-id">Reservation ID: #R{reserv.customerReservation.contact[5]}{reserv.customerReservation.contact[6]}{reserv.customerReservation.contact[7]}{reserv.customerReservation.contact[8]}{reserv.customerReservation.firstName[0]}{reserv.customerReservation.lastName[0]}</div>
                    <div className="reserv-contact">
                        <div>
                        <box-icon name='phone' color='#506690'></box-icon>
                        <span>{reserv.customerReservation.contact}</span>
                        </div>
                        <div>View Profile</div>
                    </div>
                </div>
                <div className="reserv-status" style={{color: reserv.statusReservation === "Booked" ? "#506690" : "#358970"}}>
                    <>
                    { reserv.statusReservation === "Seated" ?
                    <>
                        <MdOutlineChair style={{fontSize: "20px", color: "#275EFE", marginRight: "10px"}}/>
                        <div className="lock-content-detail" style={{color: "#275EFE"}}>Seated</div>
                    </>
                    : reserv.statusReservation === "Cancelled"?
                    <>
                        <box-icon name='x-circle' color='#df4759' style={{marginRight: "10px"}}></box-icon>
                        <div className="lock-content-detail" style={{color: "#df4579", backgroundColor: "#FFF6F5"}}>Cancelled</div>
                    </>
                    : reserv.statusReservation === "Completed"?
                    <>
                        <box-icon name='check-circle' color="#358970" style={{marginRight: "10px"}}></box-icon>
                        <div className="lock-content-detail" style={{color: "#358970", backgroundColor: "#F0FFF6"}}>Completed</div>
                    </>
                    : reserv.statusReservation === "No Show"?
                    <>
                        <img src={warningSign} style={{marginRight: "10px"}} alt=""/>
                        <div className="lock-content-detail" style={{color: "#df4579", backgroundColor: "#FFF6F5"}}>No Show</div>
                    </>
                    :
                    <>
                    <box-icon name='check' color="#506690"></box-icon>
                    <Select     
                        onChange={handleSelect}
                        options={statusReserv} 
                        placeholder={reserv.statusReservation}
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
                        }}
                    />
                    </>
                    }</>
                </div>
                <div className="details-edit-reserv">
                    <div className="detail-edit-reserv">
                        <div className="title-detail">
                        <box-icon name='calendar' color='#506690'> </box-icon>
                        <span>Date</span>
                        </div>
                        <>
                        { reserv.statusReservation === "Seated" || reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-content-detail">{reserv.dates}</div>
                        :
                        <div className="content-detail"               
                            onClick={() => (
                                datePickerRef.current.openCalendar()
                        )}>
                        {dateValue ? dateValue.day + " " + dateValue.month.shortName + " " + dateValue.year : reserv.dates}
                        <DatePicker 
                            style={{
                                height: "40px",
                                border: "1px solid rgba(0, 40, 100, 0.25)",
                            }}
                            ref={datePickerRef} 
                            value={dateValue}
                            onChange={(value) => {
                                setDateValue(value)
                            }}
                            minDate={new Date().setDate(date.day)}
                        />
                        </div>
                        }
                        </>
                    </div>
                    <div className="detail-edit-reserv">
                        <div className="title-detail">
                        <box-icon name='time-five' color='#506690' ></box-icon>
                        <span>Time</span>
                        </div>
                        <>
                        { reserv.statusReservation === "Seated" || reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-content-detail">{reserv.timeReservation}</div>
                        :
                        <Select     
                                // value={reservation.adultsReservation}
                            onChange={handleSelect}
                            options={timeReserv} 
                            placeholder={reserv.timeReservation}
                            className="select-edit-reserv"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused && "rgba(0, 40, 100, 0.25)",
                                }),
                                option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                color: `${tableClashed.includes(reservation.table) && state.data.label === reserv.timeReservation ? "red" : "#506690"}`,
                                fontWeight: "400"
                                }),
                                container: (provided) => ({
                                    ...provided,
                                    width: "150px",
                                    height: "40px",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: `${tableClashed.includes(reservation.table) ? "red" : "#506690"}`,
                                }),
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    color: `${tableClashed.includes(reservation.table) && state.data.label === reserv.timeReservation ? "red" : "#506690"}`,
                                })
                            }}
                        />
                        }
                        </>
                    </div>
                    <div className="detail-edit-reserv">
                        <div className="title-detail">
                        <box-icon type='solid' name='face' color="#506690"></box-icon>
                        <span>Adults</span>
                        </div>
                        { reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-content-detail">{reserv.adultsReservation}</div>
                        :
                        <Select     
                                // value={reservation.adultsReservation}
                            onChange={handleSelect}
                            options={adultsReserv} 
                            placeholder={reserv.adultsReservation}
                            className="select-edit-reserv"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused && "rgba(0, 40, 100, 0.25)",
                                }),
                                option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                color: `${state.value > reservation.numberChairs - reservation.childrenReservation ? "red" : "#506690"}`,
                                fontWeight: "400"
                                }),
                                container: (provided) => ({
                                    ...provided,
                                    width: "150px",
                                    height: "40px",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: `${reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) ? "red" : "#506690"}`,
                                }),
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    color: `${reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) && state.data.label === reservation.adultsReservation ? "red" : "#506690"}`,
                                })
                            }}
                        />
                        }
                    </div>
                    <div className="detail-edit-reserv">
                        <div className="title-detail">
                        <box-icon name='face' color='#506690' ></box-icon>
                        <span>Children</span>
                        </div>
                        { reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-content-detail">{reserv.childrenReservation}</div>
                        :
                        <Select     
                                // value={reservation.adultsReservation}
                            onChange={handleSelect}
                            options={childrenReserv} 
                            placeholder={reserv.childrenReservation}
                            className="select-edit-reserv"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused && "rgba(0, 40, 100, 0.25)",
                                }),
                                option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                color: `${state.value > reservation.numberChairs - reservation.adultsReservation ? "red" : "#506690"}`,
                                fontWeight: "400"
                                }),
                                container: (provided) => ({
                                    ...provided,
                                    width: "150px",
                                    height: "40px",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: `${reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) ? "red" : "#506690"}`,
                                }),
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    color: `${reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) && state.data.label === reservation.childrenReservation ? "red" : "#506690"}`,
                                })
                            }}
                        />
                        }
                    </div>
                    <div className="detail-edit-reserv">
                        <div className="title-detail">
                        <MdOutlineChair style={{fontSize: "24px"}}/>
                        <span>Table</span>
                        </div>
                        { reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-content-detail">{reserv.table}</div>
                        :
                        <Select     
                                // value={reservation.adultsReservation}
                            onChange={handleChairs}
                            options={tablesReserv} 
                            placeholder={reserv.table}
                            className="select-edit-reserv"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused && "rgba(0, 40, 100, 0.25)",
                                }),
                                option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused && "rgba(124, 105, 239, 0.1)",
                                color: `${tableClashed.includes(state.data.label) || 
                                        chairs[state.value] < reservation.adultsReservation + reservation.childrenReservation
                                        ? "red" : "#506690"}`,
                                fontWeight: "400"
                                }),
                                container: (provided) => ({
                                    ...provided,
                                    width: "150px",
                                    height: "40px",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: `${(tableClashed.includes(reservation.table) || 
                                            reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation)) ? 
                                            "red" : "#506690"}`,
                                }),
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    color: `${(tableClashed.includes(reservation.table) || 
                                            reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation)) &&
                                            state.data.label === reservation.table ? "red" : "#506690"}`,
                                })
                            }}
                        />}
                    </div>
                    <div className="warn-field" style={{display: tableClashed.includes(reservation.table) ? "flex" : "none"}}>
                        <box-icon name='error-circle' color="#DF4759" style={{marginRight: "5px"}}></box-icon>
                        Clashes with an ongoing reservation.</div>
                    <div className="warn-field" style={{display: reservation.numberChairs < (reservation.adultsReservation + reservation.childrenReservation) ? "flex" : "none"}}>
                        <box-icon name='error-circle' color="#DF4759" style={{marginRight: "5px"}}></box-icon>
                        Total pax exceeds table's capacity.
                    </div>
                    <div className="field-edit-reserv">
                        <div>
                        <box-icon name='purchase-tag' color='#506690'></box-icon>
                        <span>Occasion</span>
                        </div>
                        <>
                        { reserv.statusReservation === "Seated" || reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                                <div className="lock-occasion-container">
                                {
                                    occasions.map((occasion, idx) => (
                                        <div className="occasion-item" key={idx}
                                        style={{background: occasionSelect.includes(occasion) ? "rgba(0, 40, 100, 0.12)" : null,
                                                border: occasionSelect.includes(occasion) ? "none" : null}}
                                        >{occasion}</div>
                                    ))
                                }
                            </div>
                        :
                        <div className="occasion-container">
                            {
                                occasions.map((occasion, idx) => (
                                    <div className="occasion-item" key={idx}
                                    style={{background: occasionSelect.includes(occasion) ? "#7C69EF" : null,
                                            color: occasionSelect.includes(occasion) ? "#fff" : null}}
                                    onClick={() => handleOccasion(occasion)}
                                    >{occasion}</div>
                                ))
                            }
                        </div>
                        }</>
                    </div>
                    <div className="field-edit-reserv">
                        <div>
                        <box-icon name='purchase-tag' color='#506690'></box-icon>
                        <span>Special Req.</span>
                        </div>
                        <>
                        { reserv.statusReservation === "Seated" || reserv.statusReservation === "Cancelled" || reserv.statusReservation === "No Show" || reserv.statusReservation === "Completed"?
                            <div className="lock-input">{reserv.request || "None"}</div>
                        :
                        <input type="text" 
                            value={reservation.request || "None"}
                            id="request"
                            onChange={(e) => handleChange(e)}
                            placeholder="If any"/>
                        }
                        </>
                    </div>
                    <div className="field-edit-reserv">
                        <div>
                        <box-icon name='note' color="#506690"></box-icon>
                        <span>Staff Notes</span>
                        </div>
                        <input type="text"
                            value={reservation.note}
                            id="note"
                            onChange={(e) => handleChange(e)}
                            placeholder="If any"/>
                    </div>
                    <div className="reserv-payment">
                        <div>
                        <box-icon name='dollar-circle' color='#506690' ></box-icon>
                        <span>Deposit</span>
                        </div>
                        <div>{numberPeople} x $50 = ${numberPeople*50}</div>
                    </div>
                    <div className="reserv-payment">
                        <div>
                        <box-icon name='shopping-bag' color='#506690' ></box-icon>
                        <span>Package</span>
                        </div>
                        <div>None</div>
                    </div>
                </div>
                <div className="footer-edit-reserv" style={{display: reserv.statusReservation === "Cancelled" || reserv.statusReservation === "Completed" ? "none" : "flex"}}>
                    <div className="cancel-reserv" onClick={() => (setCancelReserv(!cancelReserv), prepareCancel())}>Cancel Reservation</div>
                </div>
            </div>
        </div>
    )
}

export default EditReserv