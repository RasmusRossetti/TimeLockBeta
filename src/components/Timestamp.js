import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import BookButton from "./BookButton";
import CancelButton from "./CancelButton";
import SecondLoader from "./loadercomponents/SecondLoader";

const Timestamp = ({ date }) => {
  const [timestamps, setTimestamps] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { user } = UserAuth();
  const { userInfo, setUserInfo } = UserAuth();
  const [state, setState] = useState(0);

  const setUserData = async () => {
    if (user.uid) {
      const addDoc = await setDoc(doc(db, "usersData", `${user.uid}`), {
        amountBooked: state
      });
      return addDoc;
    } else {
      console.log("user not exist");
    }
  };
  const fetchUserData = async () => {
    const docRef = doc(db, `usersData/${user.uid}`);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().amountBooked);
        setUserInfo(docSnap.data().amountBooked);
      } else {
        setUserData();
        console.log("Document does not exist added new user");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const fetchTimestamps = async () => {
    const collectionRef = await collection(db, `dates/${date}/timestamps`);
    const q = await query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let timeStampArr = [];
      querySnapshot.forEach((doc) => {
        timeStampArr.push({ ...doc.data(), id: doc.id });
      });
      setIsLoading(false);
      setTimestamps(timeStampArr);
      return () => unsubscribe();
    });
  };

  useEffect(() => {
    fetchUserData();
    fetchTimestamps();
  }, []);
  const handleIncrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo + 1
    });
    console.log(userInfo);
  };
  const handleDecrementBooking = async () => {
    await updateDoc(doc(db, `usersData`, `${user.uid}`), {
      amountBooked: userInfo - 1
    });
  };
  const cancelTimeStamp = async (timestamp) => {
    if (window.confirm(`Are you sure you want to cancel ${timestamp.id}?`)) {
      await updateDoc(doc(db, `dates/${date}/timestamps`, timestamp.id), {
        booked: !timestamp.booked,
        bookingid: ""
      });
      if (userInfo === 0) {
        return;
      } else {
        await handleDecrementBooking();
        await fetchUserData();
      }
    }
  };

  const bookTimeStamp = async (timestamp) => {
    if (userInfo >= 1) {
      alert("you have already booked your maximum appointments");
      return;
    }
    if (window.confirm(`Are you sure you want to book ${timestamp.id}?`)) {
      await updateDoc(doc(db, `dates/${date}/timestamps`, timestamp.id), {
        booked: !timestamp.booked,
        bookingid: user.uid
      });
      if (userInfo >= 2) {
        return;
      } else {
        await handleIncrementBooking();
        await fetchUserData();
      }
    }
  };

  return (
    <div>
      {
        <div>
          {isLoading ? (
            <SecondLoader />
          ) : (
            <>
              {timestamps?.map((timestamp) => {
                return (
                  <div
                    className={
                      timestamp.booked
                        ? `bg-green-400 hover:animate-pulse hover:bg-green-300  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center`
                        : "bg-red-400  shadow-2xl rounded-lg m-3 w-60 flex align-middle justify-center"
                    }
                    key={timestamp.id}
                  >
                    <p className=' font-bold text-gray-50  p-6'>
                      {timestamp.id}
                    </p>

                    {timestamp.booked ? (
                      <BookButton
                        error={error}
                        timestamp={timestamp}
                        bookTimeStamp={bookTimeStamp}
                      />
                    ) : (
                      <h1 className='text-red-200 font-bold flex items-center text-sm'>
                        {timestamp.bookingid === user.uid ? (
                          <div>
                            <p>Your booking</p>
                            <CancelButton
                              error={error}
                              timestamp={timestamp}
                              cancelTimeStamp={cancelTimeStamp}
                            />
                          </div>
                        ) : null}
                      </h1>
                    )}
                  </div>
                );
              })}{" "}
            </>
          )}
        </div>
      }
    </div>
  );
};

export default Timestamp;
