import React, {useState} from 'react'
import 'boxicons'
import './header.scss'
import Datepicker from '../datepicker/datepicker'
import Select from 'react-select'
import { useContext } from 'react'
import { TimeReserv } from '../../App'


const Header = () => {
    const [show, setShow] = useState(false)
    const options = [
        { value: 'breakfast', label: 'Breakfast Service'},
        { value: 'lunch', label: 'Lunch Service'},
        { value: 'dinner', label: 'Dinner Service'}
    ]
    const {time, setTime} = useContext(TimeReserv)
    return (
        <div className="header" style={show ? { display:'none'} : {}}>
            <div className="header-icon">
                <box-icon color='#869AB8'name='menu' size='md' type='logo' ></box-icon>
                <p>Home</p>
            </div>
            <div className="header-navbar">
                <div className="header-date nav-item">
                    <Datepicker />
                </div>
                <div className="header-type-service nav-item">
                <Select 
                options={options} 
                defaultValue={options[1]}
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
                </div>
                <div className="time-system" style={{color: time >= "12:00" && time <= "14:00" ? "#27ca27" : null, border: time >= "12:00"  && time <= "14:00" ? "1px solid #27ca27" : null }}>
                    <box-icon type='solid' name='circle' color={time >= "12:00" && time <= "14:00" ? "#27ca27" : "#e0e5ec"} style={{marginRight: "5px"}}></box-icon>
                    <p>NOW</p>
                </div>
                <div className="header-status nav-item"><box-icon name='note' color="#1B2A4E"></box-icon></div>
                <div className="header-merchant nav-item">Vu Bui
                    <span className="icon-merchant"></span>
                </div>
            </div>
        </div>
    )
}

export default Header