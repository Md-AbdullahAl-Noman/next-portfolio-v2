import React from 'react'
import styled from 'styled-components'

const StackLoader = () => {
  return (
    <div className="card">
      <div className="group relative flex aspect-video w-[70px] items-center justify-center bg-red-500 transition-all duration-700 sm:w-[150px] rotate-[30deg]">
        <div className="absolute flex h-full w-full flex-col items-center justify-start bg-cyan-500 py-2 transition-all duration-300 group-hover:-translate-y-16 group-hover:duration-1000">
          <p className="text-center font-serif text-xs font-semibold text-black sm:text-xs">
            Our Bits = Your Imagination...
          </p>

          <p className="pt-2 font-sans text-[8px] text-black sm:text-xs">
            Thank You,Dear
          </p>
        </div>
        <button className="seal z-40 flex aspect-square w-8 items-center justify-center rounded-full border-4 border-rose-900 bg-rose-500 text-[8px] font-semibold text-black transition-all duration-1000 [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:rotate-180 group-hover:scale-0 group-hover:opacity-0">
          Hey!!
        </button>
        <div className="tp absolute h-full w-full bg-[#E1C16E] transition-all duration-1000 [clip-path:polygon(50%_50%,_100%_0,_0_0)] group-hover:duration-100 group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)]" />
        <div className="lft absolute h-full w-full bg-[#E1C16E] transition-all duration-700 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
        <div className="rgt absolute h-full w-full bg-[#E1C16E] transition-all duration-700 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
        <div className="btm absolute h-full w-full bg-[#E1C16E] transition-all duration-700 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
      </div>
    </div>
  )
}

export default StackLoader
