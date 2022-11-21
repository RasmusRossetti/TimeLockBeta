import React from "react"
import BookButton from "../BookButton"

export default function BookModal({
  setShowBookModal,
  showBookModal,
  timestampId,
  error,
  timestamp,
  bookTimeStamp
}) {
  return (
    <>
      {showBookModal ? (
        <div className="sm:w-3/6 w-4/6 m-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className=" relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className=" bg-gray-800 text-center border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/*header*/}
              <div className="justify-between p-5 border-b border-solid  rounded-t">
                <h3 className=" text-3xl font-bold text-white">
                  Are you sure you want to book {timestampId}?
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowBookModal(false)}
                ></button>
              </div>
              {/*body*/}

              {/*footer*/}
              <div className=" p-6 rounded- w-60 flex justify-between align-middle m-auto">
                <BookButton
                  error={error}
                  timestamp={timestamp}
                  bookTimeStamp={bookTimeStamp}
                  setShowBookModal={setShowBookModal}
                  showBookModal={showBookModal}
                />

                <button
                  className="bg-red-200 text-red-600 w-20 h-10 hover:bg-red-100 rounded-md"
                  onClick={() => setShowBookModal(!showBookModal)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
