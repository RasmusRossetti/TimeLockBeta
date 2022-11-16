import React from "react";

const CancelButton = ({ cancelTimeStamp, timestamp }) => {
  return (
    <>
      <button
        className='text-red-800 font-bold'
        onClick={() => cancelTimeStamp(timestamp)}
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
