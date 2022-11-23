import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import React from "react"
import { db } from "../firebase"

export const AddDock = () => {
  const addData = async (number) => {
    // const data = { date: number }
    const data = { bookingId: "", booked: true }
    const docRef = doc(db, "december", `${number}`)
    const colRef = collection(docRef, "timestamps")
    await setDoc(doc(colRef, "07:00 - 11:00"), data)
    // await setDoc(doc(db, "december", `${number}`, "timestamps"))
  }
  const loop = () => {
    for (let i = 1; i < 31; i++) {
      addData(i)
    }
  }

  return (
    <div className="text-white h-screen  justify-center flex">
      {/* <button onClick={loop} className="bg-blue-500 align-middle h-10 mt-52">
        add DOCK
      </button> */}
    </div>
  )
}
