import React from "react"

export const cancelScript = () => {
  const cancelOldTimestamps = async () => {
    const currentDate = new Date()
    // if (currentDate.getDate() !== 1) {
    //   console.log("Not the first day of the month. Cancelling script.")
    //   return
    // }

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
  return <button onClick={cancelOldTimestamps}>cancelScript</button>
}
