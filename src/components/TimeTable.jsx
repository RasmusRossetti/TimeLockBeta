import React from "react"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { query, collection, onSnapshot, orderBy } from "firebase/firestore"
import Loader from "./loadercomponents/Loader"
import { UserAuth } from "../context/AuthContext"
import Timestamp from "./timestamp/Timestamp"

const TimeTable = () => {
  const [dates, setDates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  const { dbMonth } = UserAuth()

  const fetchDates = async () => {
    const collectionRef = await collection(db, `${month[dbMonth]}`)
    const q = await query(collectionRef, orderBy("date", "asc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      setIsLoading(false)
      setDates(todosArr)
    })

    return () => unsubscribe()
  }
  useEffect(() => {
    fetchDates()
  }, [])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-wrap pt-6 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-center ">
          {dates?.map((date) => (
            <div
              className="bg-[#1A1A1A]shadow-lg p-4 rounded-2xl m-2"
              key={date.id}
            >
              <p className="text-white text-3xl font-bold border-b-4 border-green-300 w-10 m-auto">
                {date.id}
              </p>

              <div className="flex justify-center items-center">
                <Timestamp date={date.date} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TimeTable
