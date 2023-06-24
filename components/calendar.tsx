import { useState } from "react";
import Calendar from "react-calendar";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <h2 className="font-bold text-lg text-neutral-500">Event Calender</h2>
      <div className="calendar-wrapper">
        <Calendar value={value} onChange={()=> onChange} defaultActiveStartDate={value}/>
      </div>
    </div>
  );
}
