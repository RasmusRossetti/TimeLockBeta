import { useState, useEffect } from "react"
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"

const useFetch = (dbMonth, date) => {
  const [timestamps, setTimestamps] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const month = [
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
  ]

  useEffect(() => {
    const fetchTimestamps = async () => {
      const collectionRef = await collection(
        db,
        `${month[dbMonth]}/${date}/timestamps`
      )
      const q = await query(collectionRef)
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let timeStampArr = []
        querySnapshot.forEach((doc) => {
          timeStampArr.push({ ...doc.data(), id: doc.id })
        })
        setIsLoading(false)
        setTimestamps(timeStampArr)
      })
      return () => unsubscribe()
    }

    fetchTimestamps()
  }, [month, date])

  return { timestamps, isLoading }
}

export default useFetch
