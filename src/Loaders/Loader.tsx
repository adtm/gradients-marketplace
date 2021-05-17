import React from 'react'

const Loader = () => (
  <div className="text-center text-sm text-black dark:text-white">
    <div
      className="animate-pulse inline-block h-10 w-10 rounded-full mb-3"
      style={{ background: `linear-gradient(135deg, #17EAD9 0%, #6078EA 100%)` }}
    />
    <p>Loading...</p>
  </div>
)

export default Loader
