import React from "react";

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
        className='text-green-500 font-bold w-20 hover:bg-gray-400 rounded-md'
        onClick={() => {
          setShowBookModal(!showBookModal);
          bookTimeStamp(timestamp);
        }}
      >
        book
      </button>
    </>
  );
};

export default BookButton;
