import React, { useState } from "react"

const Header = () => {
  const [month, setMonth] = useState([
    { d: "January" },
    { d: "February" },
    { d: "March" },
    { d: "April" },
    { d: "May" },
    { d: "June" },
    { d: "July" },
    { d: "August" },
    { d: "September" },
    { d: "October" },
    { d: "November" },
    { d: "December" }
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
    <header className=" sticky top-24 z-50 font-extrabold text-green-50  text-3xl py-10 flex justify-center items-center sm:text-5xl">
      <h1 className="bg-[#1A1A1A] shadow-lg border-b-8 border-blue-300 tracking-wide">
        {month[months].d} {date.getDate()}, {day[days].dy}
      </h1>
    </header>
  )
}

export default Header
