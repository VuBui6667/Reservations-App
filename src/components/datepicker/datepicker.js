import DatePicker, { DateObject } from "react-multi-date-picker"
import React, {useState, useEffect} from 'react'
import 'boxicons'
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import './datepicker.scss'
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import { useContext } from 'react'
import { DatesReserv, TableFlow, ResetContext, Skeleton } from "../../App"
import "react-multi-date-picker/styles/layouts/mobile.css"
import Icon from "react-multi-date-picker/components/icon"

export default function Datepicker() {
  const {datesReserv, setDatesReserv} = useContext(DatesReserv)
  const {setTableFlow} = useContext(TableFlow)
  const {reset, setReset} = useContext(ResetContext)
  const {setSkeleton} = useContext(Skeleton)
  const [value, setValue] = useState({ 
    value: new Date(),
    format: "dddd, D MMM YYYY",
    onChange: (date) => (setDatesReserv(date.day + " " + date.month.shortName + " " + date.year), setReset(!reset), setSkeleton(true), setTableFlow(null)),
  });

  const [width, setWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);



  return (
    <>
    <div className="date-picker">
        <div className="date-prevArrow" style={{display: width < 600 ? "none" : null}}><box-icon name='chevron-left' ></box-icon></div>
        <DatePicker
        plugins={[
            <DatePickerHeader style={{backgroundColor: "#7C69EF"}} />
          ]}
        {...value}
        render={width < 600 ? <Icon/> : null}
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
        className={`${width < 600 ? "rmdp-mobile" : "rmdp-prime"}`}
        />
        <div className="date-nextArrow" style={{display: width < 600 ? "none" : null}}><box-icon name='chevron-right' ></box-icon></div>
        <div className="date-icon" style={{display: width < 600 ? "none" : null}}><box-icon name='calendar'></box-icon></div>
    </div>
    {/* <div className="date-picker" style={{display: width < 600 ? "block" : "none"}}>
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
        className="rmdp-mobile"
        />
        <div className="date-nextArrow">
          <box-icon name='chevron-right' ></box-icon></div>
        <div className="date-icon"><box-icon name='calendar'></box-icon></div>
    </div> */}
    </>
  )
}