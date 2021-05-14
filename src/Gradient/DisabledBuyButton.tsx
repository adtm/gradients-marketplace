import React from 'react'

const DisabledBuyButton = () => (
  <div>
    <h3 className="text-3xl font-semibold py-1">XXXX{" "}<span className="text-sm">ONE</span></h3>
    <button disabled className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black bg-gray-700 cursor-not-allowed">
      Not listed
    </button>
  </div>
)

export default DisabledBuyButton;