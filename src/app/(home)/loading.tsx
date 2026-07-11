'use client'

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c]">
      <div className="flex flex-col items-center gap-6">
        <span className="font-display text-2xl font-light tracking-tight text-[#ebe9e2]">
          Al Noman<span className="text-[#c9a876]">.</span>
        </span>
        <div className="h-px w-32 overflow-hidden bg-[rgba(235,233,226,0.08)]">
          <div className="loader-bar h-full w-1/3 bg-[#c9a876]" />
        </div>
      </div>
      <style jsx>{`
        .loader-bar {
          animation: slide 1.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  )
}

export default Loader
