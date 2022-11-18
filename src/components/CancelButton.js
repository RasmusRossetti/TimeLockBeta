import React from "react";

const CancelButton = ({
  cancelTimeStamp,
  timestamp,
  setShowCancelModal,
  showCancelModal
}) => {
  return (
    <>
      <button
        className='text-red-400 w-20 font-bold rounded-md hover:bg-gray-400'
        onClick={() => {
          cancelTimeStamp(timestamp);
          setShowCancelModal(!showCancelModal);
        }}
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
