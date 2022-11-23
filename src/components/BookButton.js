import React from "react"

const BookButton = ({
  bookTimeStamp,
  timestamp,
  showBookModal,
  setShowBookModal
}) => {
  // Update todo in firebase

  return (
    <>
      <button
        type="submit"
        className="bg-green-200 text-green-600 font-bold w-20 hover:bg-green-100 rounded-md"
        onClick={() => {
          setShowBookModal(!showBookModal)
          bookTimeStamp(timestamp)
        }}
      >
        book
      </button>
    </>
  )
}

export default BookButton
