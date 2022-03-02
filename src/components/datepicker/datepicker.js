import DatePicker from "react-multi-date-picker"
import React, {useState} from 'react'
import 'boxicons'
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import './datepicker.css'
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"

//It is better to put this array outside the main component.
const months = [
  ["Jan", "January"], //[["name","shortName"], ... ]
  ["Feb", "February"],
  ["Mar", "March"],
  ["Apr", "April"],
  ["May", "May"],
  ["Jun", "june"],
  ["Jul", "July"],
  ["Aug", "August"],
  ["Sep", "September"],
  ["Oct", "Octobrr"],
  ["Nov", "November"],
  ["Dec", "December"],
]
const weekDays = [
  ["Saturday", "Sun"],
  ["Sunday", "Mon"], //[["name","shortName"], ... ]
  ["Monday", "Tue"],
  ["Tuesday", "Wed"],
  ["Wednesday", "Thu"],
  ["Thursday", "Fri"],
  ["Friday", "Sat"],
]

export default function Datepicker() {
  const [value, setValue] = useState(new Date())
  return (
    <div className="date-picker">
        <div className="date-prevArrow"><box-icon name='chevron-left' ></box-icon></div>
        <DatePicker
        plugins={[
            <DatePickerHeader style={{backgroundColor: "#7C69EF"}} />
          ]}
        value={value}
        onChange={setValue}
        onKeyDown={"return false"}
        animations={[
            opacity(), 
            transition({ from: 35, duration: 800 })
        ]} 
        months={months}
        weekDays={weekDays}
        format="dddd, DD MMMM YYYY"
        style={{ 
            width: "265px", 
            height: "40px", 
            textAlign: "start",
            border: "1px solid rgba(0, 40, 100, 0.12)",
            borderRadius: "3px",
            fontSize: "15px",
            lineHeight: "20px",
            paddingLeft: "50px"
        }}
        inputClass="input-date"
        />
        <div className="date-nextArrow"><box-icon name='chevron-right' ></box-icon></div>
        <div className="date-icon"><box-icon name='calendar'></box-icon></div>
    </div>
  )
}