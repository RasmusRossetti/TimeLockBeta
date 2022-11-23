import React, { useState } from "react"

export const Footer = () => {
  const [month, setMonth] = useState([
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ])
  const [day, setDay] = useState([
    { dy: "Monday" },
    { dy: "Tuesday" },
    { dy: "Wednesday" },
    { dy: "Thursday" },
    { dy: "Friday" },
    { dy: "Saturday" },
    { dy: "Sunday" }
  ])
  const date = new Date()
  const months = date.getMonth()
  const days = date.getDay()
  return (
    <footer className="sticky bottom-2 bg-transparent shadow-lg ">
      <h2 className="p-1 rounded-lg bg-[#1A1A1A] font-bold text-center w-40 m-auto uppercase text-white tracking-widest sm:w-60 sm:p-4 ">
        <span className="text-blue-300">{month[months]}</span> ,{" "}
        {date.getDate()}, {day[days].dy}
      </h2>
    </footer>
  )
}
