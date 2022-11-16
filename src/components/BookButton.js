import React from "react";

const BookButton = ({ bookTimeStamp, timestamp }) => {
  // Update todo in firebase

  return (
    <>
      <button
        className='text-green-800 font-bold'
        onClick={() => bookTimeStamp(timestamp)}
      >
        book
      </button>
    </>
  );
};

export default BookButton;
