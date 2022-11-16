import React from "react";

const Loader = () => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current   rounded-full";

  return (
    <div className='h-screen text-white align-middle justify-center  flex mt-40'>
      <div
        className={`${circleCommonClasses} mr-1 animate-bounce w-14 h-14 mr-6 shadow-lg`}
      ></div>
      <div
        className={`${circleCommonClasses} mr-1 animate-bounce200 w-14 h-14 mr-6 shadow-lg`}
      ></div>
      <div
        className={`${circleCommonClasses} animate-bounce400 w-14 h-14 shadow-lg`}
      ></div>
    </div>
  );
};

export default Loader;
