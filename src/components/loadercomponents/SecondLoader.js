import React from "react";

const SecondLoader = () => {
  return (
    <div className='border-spacing-6  shadow-lg rounded-md p-4 w-64  '>
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-6 py-1'>
          <div className='h-2 bg-slate-700 rounded'></div>
          <div className='space-y-3'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='h-2 bg-slate-700 rounded'></div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>

              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>

              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>

              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='h-2 bg-slate-700 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondLoader;
