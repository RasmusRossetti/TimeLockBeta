import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion
} from "firebase/firestore"
import { UserAuth } from "../../context/AuthContext"
import SecondLoader from "../loadercomponents/SecondLoader"
import BookModal from "../modals/BookModal"
import CancelModal from "../modals/CancelModal"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useBookingCounter from "./hooks/useBookingCounter"

const Timestamp = ({ date }) => {
  const [timestamps, setTimestamps] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [showBookModal, setShowBookModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [timestampId, setTimestampId] = useState()
  const [timestampCopy, setTimestampCopy] = useState()
  const [handleDecrementBooking, handleIncrementBooking] = useBookingCounter()
  const { user } = UserAuth()
  const { userInfo, setUserInfo, setDateResponse, setGlobalDate } = UserAuth()
  const { dbMonth } = UserAuth()

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
    fetchUserData()
    fetchTimestamps()
    cancelOldTimestamps()

    // const intervalId = setInterval(async () => {
    //   await fetchTimestamps()
    // }, 60000) // call fetchTimestamps every 60 seconds (or change as needed)
    // return () => clearInterval(intervalId)
  }, [dbMonth])

  const setUserData = async () => {
    if (user.uid) {
      const addDoc = await setDoc(doc(db, "usersData", `${user.uid}`), {
        amountBooked: 0,
        name: `${user.email}`,
        dateBooked: [],
        timeBooked: [],
        monthBooked: []
      })
      return addDoc
    } else {
      console.log("user not exist")
    }
  }

  const fetchUserData = async () => {
    const docRef = doc(db, `usersData/${user.uid}`)

    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const userData = docSnap.data()
        setUserInfo(userData)
      } else {
        setUserData()
        console.log("Document does not exist, added new user.")
        console.log(userInfo)
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

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
      setDateResponse(timeStampArr)
      setTimestamps(timeStampArr)
    })
    return () => unsubscribe()
  }
  const cancelTimeStamp = async (timestamp) => {
    await updateDoc(
      doc(db, `${month[dbMonth]}/${date}/timestamps`, timestamp.id),
      {
        booked: !timestamp.booked,
        bookingId: ""
      }
    )
    if (userInfo.amountBooked === 0) {
      return
    } else {
      await handleDecrementBooking()
      await fetchUserData()
      toast.success(
        ` Appointment successfully canceled!
           `,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        }
      )
    }
  }

  const cancelOldTimestamps = async () => {
    const currentDate = new Date()
    if (currentDate.getDate() !== 1) {
      console.log("Not the first day of the month. Cancelling script.")
      return
    }

    const previousMonth = month[dbMonth - 1]
    console.log(previousMonth)
    const timeslots = [
      "07:00 - 11:00",
      "11:00 - 15:00",
      "15:00 - 18:00",
      "18:00 - 22:00"
    ]

    for (let i = 1; i < 31; i++) {
      console.log(`Updating timestamps for ${previousMonth} ${i}`)
      // for (const timeslot of timeslots) {
      //   const docRef = doc(db, `${previousMonth}/${i}/timestamps`, timeslot)
      //   await updateDoc(docRef, { booked: false, bookingId: "" })
      // }
    }
  }

  const handleUserBookingDate = async (timestamp) => {
    const isAlreadyBooked = userInfo?.dateBooked?.includes(date)
    if (isAlreadyBooked) {
      return
    }
    const userRef = doc(db, "usersData", user.uid)

    const userDoc = await getDoc(userRef)

    const currentTimes = userDoc.data().timeBooked
    const currentMonths = userDoc.data().monthBooked

    const newTimes = currentTimes.concat(timestamp.id)
    const newMonth = currentMonths.concat(month[dbMonth])

    // Update the array with the new values
    await updateDoc(userRef, {
      dateBooked: arrayUnion(date),
      timeBooked: newTimes,
      monthBooked: newMonth
    })
  }

  const handleUserCancellation = async (timestamp) => {
    console.log(timestamp.id)
    const userDataRef = doc(db, `usersData`, `${user.uid}`)
    const userDataSnap = await getDoc(userDataRef)
    const userData = userDataSnap.data()
    const dateIndex = userData.dateBooked.indexOf(date)
    const timeIndex = userData.timeBooked.indexOf(timestamp.id)
    const monthIndex = userData.monthBooked.indexOf(month[dbMonth])

    if (dateIndex > -1) {
      userData.dateBooked.splice(dateIndex, 1)
    }
    if (timeIndex > -1) {
      userData.timeBooked.splice(timeIndex, 1)
    }
    if (monthIndex > -1) {
      userData.monthBooked.splice(monthIndex, 1)
    }
    await updateDoc(userDataRef, {
      dateBooked: userData.dateBooked,
      timeBooked: userData.timeBooked,
      monthBooked: userData.monthBooked
    })
  }

  const bookTimeStamp = async (timestamp) => {
    const isAlreadyBooked = userInfo.dateBooked.includes(date)
    if (isAlreadyBooked) {
      return
    }

    await updateDoc(
      doc(db, `${month[dbMonth]}/${date}/timestamps`, timestamp.id),
      {
        booked: !timestamp.booked,
        bookingId: user.uid
      }
    )
    if (userInfo.amountBooked >= 3) {
      return
    } else {
      await handleIncrementBooking()
      await fetchUserData()
      toast.success("Appointment successfully booked!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      })
    }
  }

  const handleShowBookModal = () => {
    if (userInfo.amountBooked >= 2) {
      toast.error("you have already booked your maximum appointments!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      })

      return
    } else {
      setShowBookModal(!showBookModal)
    }
  }

  return (
    <div>
      {
        <div>
          {isLoading ? (
            <SecondLoader />
          ) : (
            <>
              {timestamps?.map((timestamp) => {
                return (
                  <div
                    onClick={() => {
                      console.log(timestamp)
                      const isAlreadyBooked =
                        userInfo?.dateBooked?.includes(date) &&
                        !userInfo?.monthBooked?.includes(month[dbMonth])
                      const isCurrentUserBooking =
                        timestamp.bookingId === user.uid

                      if (isAlreadyBooked && !isCurrentUserBooking) {
                        toast.error(
                          "You have already booked a slot for this date",
                          {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark"
                          }
                        )
                        return
                      }

                      setGlobalDate(date)

                      if (timestamp.booked === true) {
                        handleShowBookModal()
                        setTimestampId(timestamp.id)
                        setTimestampCopy(timestamp)
                      }

                      if (isCurrentUserBooking) {
                        setShowCancelModal(!showCancelModal)
                        setTimestampId(timestamp.id)
                        setTimestampCopy(timestamp)
                      }
                    }}
                    className={
                      timestamp.booked
                        ? `cursor-pointer bg-[#343a40] hover:animate-pulse hover:bg-green-300  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center transition ease-in-out  duration-100`
                        : "cursor-pointer bg-red-400  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center transition ease-in-out  duration-100"
                    }
                    key={timestamp.id}
                  >
                    <p className=" font-bold text-gray-50  p-6">
                      {timestamp.id}
                    </p>

                    {timestamp.booked ? (
                      <>
                        <p className="text-green-300 font-bold mt-6">book</p>
                      </>
                    ) : (
                      <h1 className="text-red-200 font-bold flex items-center text-sm">
                        {timestamp.bookingId === user.uid ? (
                          <div>
                            <p>Your booking</p>
                            <p className="text-red-800">Cancel</p>
                          </div>
                        ) : null}
                      </h1>
                    )}
                  </div>
                )
              })}{" "}
              {showBookModal ? (
                <BookModal
                  timestampId={timestampId}
                  setShowBookModal={setShowBookModal}
                  showBookModal={showBookModal}
                  error={error}
                  timestamp={timestampCopy}
                  bookTimeStamp={bookTimeStamp}
                  handleUserBookingDate={handleUserBookingDate}
                />
              ) : null}
              {showCancelModal ? (
                <CancelModal
                  timestampId={timestampId}
                  setShowCancelModal={setShowCancelModal}
                  showCancelModal={showCancelModal}
                  error={error}
                  timestamp={timestampCopy}
                  cancelTimeStamp={cancelTimeStamp}
                  handleUserCancellation={handleUserCancellation}
                />
              ) : null}
            </>
          )}
        </div>
      }
    </div>
  )
}

export default Timestamp
