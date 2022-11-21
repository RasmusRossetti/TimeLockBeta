import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore"
import { UserAuth } from "../context/AuthContext"
import SecondLoader from "./loadercomponents/SecondLoader"
import BookModal from "./modals/BookModal"
import CancelModal from "./modals/CancelModal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Timestamp = ({ date }) => {
  const [timestamps, setTimestamps] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [showBookModal, setShowBookModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [timestampId, setTimestampId] = useState()
  const [timestampCopy, setTimestampCopy] = useState()

  const { user } = UserAuth()
  const { userInfo, setUserInfo } = UserAuth()

  const setUserData = async () => {
    if (user.uid) {
      const addDoc = await setDoc(doc(db, "usersData", `${user.uid}`), {
        amountBooked: 0,
        name: `${user.email}`
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
        console.log(docSnap.data().amountBooked)
        setUserInfo(docSnap.data().amountBooked)
      } else {
        setUserData()
        console.log("Document does not exist added new user")
      }
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const fetchTimestamps = async () => {
    const collectionRef = await collection(db, `dates/${date}/timestamps`)
    const q = await query(collectionRef)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let timeStampArr = []
      querySnapshot.forEach((doc) => {
        timeStampArr.push({ ...doc.data(), id: doc.id })
      })
      setIsLoading(false)
      setTimestamps(timeStampArr)
      return () => unsubscribe()
    })
  }

  useEffect(() => {
    fetchUserData()
    fetchTimestamps()
  }, [])
  const handleIncrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo + 1
    })
    console.log(userInfo)
  }
  const handleDecrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo - 1
    })
  }
  const cancelTimeStamp = async (timestamp) => {
    await updateDoc(doc(db, `dates/${date}/timestamps`, timestamp.id), {
      booked: !timestamp.booked,
      bookingid: ""
    })
    if (userInfo === 0) {
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

  const bookTimeStamp = async (timestamp) => {
    await updateDoc(doc(db, `dates/${date}/timestamps`, timestamp.id), {
      booked: !timestamp.booked,
      bookingid: user.uid
    })
    if (userInfo >= 2) {
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
    if (userInfo >= 1) {
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
                      if (timestamp.booked == true) {
                        handleShowBookModal()
                        setTimestampId(timestamp.id)
                        setTimestampCopy(timestamp)
                      } else {
                        setShowCancelModal(!showCancelModal)
                        setTimestampId(timestamp.id)
                        setTimestampCopy(timestamp)
                      }
                    }}
                    className={
                      timestamp.booked
                        ? `cursor-pointer bg-gray-800 hover:animate-pulse hover:bg-green-300  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center transition ease-in-out  duration-100`
                        : "cursor-pointer bg-red-400  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center transition ease-in-out  duration-100"
                    }
                    key={timestamp.id}
                  >
                    <p className=" font-bold text-gray-50  p-6">
                      {timestamp.id}
                    </p>
                    {console.log(timestamp)}

                    {timestamp.booked ? (
                      <>
                        <p className="text-green-800 font-bold mt-6">book</p>
                      </>
                    ) : (
                      <h1 className="text-red-200 font-bold flex items-center text-sm">
                        {timestamp.bookingid === user.uid ? (
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
                />
              ) : null}
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
            </>
          )}
        </div>
      }
    </div>
  )
}

export default Timestamp
