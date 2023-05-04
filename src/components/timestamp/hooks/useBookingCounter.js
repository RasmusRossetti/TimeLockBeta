import { UserAuth } from "../../../context/AuthContext"
import { db } from "../../../firebase"
import { updateDoc, doc } from "firebase/firestore"

const useBookingCounter = () => {
  const { userInfo, user } = UserAuth()

  const handleIncrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo.amountBooked + 1
    })
  }
  const handleDecrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo.amountBooked - 1
    })
  }
  return [handleDecrementBooking, handleIncrementBooking]
}

export default useBookingCounter
