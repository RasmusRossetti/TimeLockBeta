import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import CancelModal from "./modals/CancelModal"
import { db } from "../firebase"
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore"
import useBookingCounter from "./timestamp/hooks/useBookingCounter"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function DropDown() {
  const [isOpen, setisOpen] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [error, setError] = useState()
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null)
  const [selectedDateIndex, setSelectedDateIndex] = useState()
  const { dateResponse, user, globalDate, dbMonth, userInfo, setUserInfo } =
    UserAuth()
  const [handleDecrementBooking] = useBookingCounter()

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

  console.log(userInfo)

  const cancelTimeStamp = async (timestamp) => {
    console.log(timestamp)

    await updateDoc(
      doc(
        db,
        `${month[selectedTimeIndex]}/${selectedDateIndex}/timestamps`,
        timestamp
      ),
      {
        booked: showCancelModal,
        bookingId: ""
      }
    )
    if (userInfo.amountBooked === 0) {
      return
    } else {
      await handleDecrementBooking()
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

  const handleUserCancellation = async (timestamp) => {
    const userDataRef = doc(db, `usersData`, `${user.uid}`)
    const userDataSnap = await getDoc(userDataRef)
    const userData = userDataSnap.data()
    const dateIndex = userData?.dateBooked.indexOf(selectedDateIndex)
    const timeIndex = userData?.timeBooked.indexOf(timestamp)
    const monthIndex = userData?.monthBooked.indexOf(month[selectedTimeIndex])

    if (dateIndex > -1) {
      userData?.dateBooked.splice(dateIndex, 1)
    }
    if (timeIndex > -1) {
      userData?.timeBooked.splice(timeIndex, 1)
    }
    if (monthIndex > -1) {
      userData?.monthBooked.splice(monthIndex, 1)
    }
    await updateDoc(userDataRef, {
      dateBooked: userData?.dateBooked,
      timeBooked: userData?.timeBooked,
      monthBooked: userData?.monthBooked
    })
  }

  function handleShowCancelModal(index, date) {
    setSelectedTimeIndex(index)
    setSelectedDateIndex(date)
    setShowCancelModal(true)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setisOpen(!isOpen)}
        data-dropdown-toggle="dropdown"
        className="text-white dark:bg-gray-700 hover:bg-gray-400  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        My bookings
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={
          isOpen || userInfo.amountBooked === 0
            ? "hidden"
            : "absolute w-56 mt-5 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        }
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {userInfo?.dateBooked?.map((date, index) => (
            <div
              onClick={() => handleShowCancelModal(index, date)}
              className="w-44 py-2 items-center flex justify-center m-auto dark:hover:bg-gray-600"
              key={index}
            >
              <div className="  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <div className="bg-gray-800 p-2">
                  <div className="flex w-44 justify-center items-center align-middle">
                    <p className="mr-2">
                      {date} {userInfo.monthBooked[index]}
                    </p>
                    <p>{userInfo.timeBooked[index]}</p>
                  </div>
                  <p className="text-red-700 ml-3 text-center">Cancel</p>
                </div>
              </div>
            </div>
          ))}
          {showCancelModal ? (
            <CancelModal
              timestampId={userInfo.timeBooked[selectedTimeIndex]}
              setShowCancelModal={setShowCancelModal}
              showCancelModal={showCancelModal}
              error={error}
              timestamp={userInfo.timeBooked[selectedTimeIndex]}
              cancelTimeStamp={cancelTimeStamp}
              handleUserCancellation={handleUserCancellation}
            />
          ) : null}
        </ul>
      </div>
    </div>
  )
}
