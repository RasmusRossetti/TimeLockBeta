import React, { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"

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

  const date = new Date()
  const months = date.getMonth()
  const { dbMonth, setDbMonth } = UserAuth()
  console.log(dbMonth)
  useEffect(() => {
    setDbMonth(months)
  }, [months])
  const incrementMonth = () => {
    if (dbMonth == 11) {
      setDbMonth(11)
    } else {
      setDbMonth(dbMonth + 1)
    }
  }
  const decrementMonth = () => {
    if (dbMonth == 0) {
      setDbMonth(0)
    } else {
      setDbMonth(dbMonth - 1)
    }
  }
  return (
    <header className=" sticky top-24 z-50 font-extrabold text-green-50  text-3xl py-10 flex justify-center items-center sm:text-5xl">
      <button onClick={decrementMonth} className="text-xs mr-6 bg-[#1A1A1A]">
        previous month{" "}
      </button>
      <h1 className="bg-[#1A1A1A] shadow-lg border-b-8 border-blue-300 tracking-wide">
        {month[dbMonth].d}
      </h1>
      {/* {date.getDate()}, {day[days].dy} */}
      <button onClick={incrementMonth} className="text-xs ml-6 bg-[#1A1A1A]">
        next month
      </button>
    </header>
  )
}

export default Header
