import React from "react"

const CancelButton = ({
  cancelTimeStamp,
  timestamp,
  setShowCancelModal,
  showCancelModal
}) => {
  return (
    <>
      <button
        className="bg-red-200 text-red-600 w-20 h-10 font-bold rounded-md hover:bg-red-100"
        onClick={() => {
          cancelTimeStamp(timestamp)
          setShowCancelModal(!showCancelModal)
        }}
      >
        Cancel
      </button>
    </>
  )
}

export default CancelButton
