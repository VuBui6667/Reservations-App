import DatePicker from "react-multi-date-picker"
import React, {useState} from 'react'
import 'boxicons'
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import './datepicker.scss'
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import { useContext } from 'react'
import { DatesReserv, TableFlow, ResetContext, Skeleton } from "../../App"

//It is better to put this array outside the main component.
// const months = [
//   ["Jan", "January"], //[["name","shortName"], ... ]
//   ["Feb", "February"],
//   ["Mar", "March"],
//   ["Apr", "April"],
//   ["May", "May"],
//   ["Jun", "june"],
//   ["Jul", "July"],
//   ["Aug", "August"],
//   ["Sep", "September"],
//   ["Oct", "Octobrr"],
//   ["Nov", "November"],
//   ["Dec", "December"],
// ]
// const weekDays = [
//   ["Saturday", "Sun"],
//   ["Sunday", "Mon"], //[["name","shortName"], ... ]
//   ["Monday", "Tue"],
//   ["Tuesday", "Wed"],
//   ["Wednesday", "Thu"],
//   ["Thursday", "Fri"],
//   ["Friday", "Sat"],
// ]

export default function Datepicker() {
  const {setDatesReserv} = useContext(DatesReserv)
  const {setTableFlow} = useContext(TableFlow)
  const {reset, setReset} = useContext(ResetContext)
  const {setSkeleton} = useContext(Skeleton)
  const [value, setValue] = useState({ 
    value: new Date(),
    format: "dddd, D MMM YYYY",
    onChange: (date) => (setDatesReserv(date.day + " " + date.month.shortName + " " + date.year), setReset(!reset), setSkeleton(true), setTableFlow(null)),
  });
  return (
    <div className="date-picker">
        <div className="date-prevArrow"><box-icon name='chevron-left' ></box-icon></div>
        <DatePicker
        plugins={[
            <DatePickerHeader style={{backgroundColor: "#7C69EF"}} />
          ]}
        {...value}
        onValueChange={setValue} 
        onKeyDown={"return false"}
        animations={[
            opacity(), 
            transition({ from: 35, duration: 800 })
        ]} 
        // months={months}
        // weekDays={weekDays}
        // format="dddd, DD MMMM YYYY"
        inputClass="input-date"
        />
        <div className="date-nextArrow"><box-icon name='chevron-right' ></box-icon></div>
        <div className="date-icon"><box-icon name='calendar'></box-icon></div>
    </div>
  )
}