import React from 'react'

const Footer = () => (
  <>
    <div className="pb-10">
      <div className="mx-auto container pt-20 lg:pt-48 flex flex-col items-center justify-center">
        <div className="w-9/12  h-0.5 bg-gray-100 rounded-full" />
        <div className="flex flex-col md:items-center">
          <div className="my-6 text-sm text-black dark:text-white">
            <ul className="md:flex items-center">
              <li className="md:mr-6 cursor-pointer pt-4 lg:py-0 hover:text-blue-500">About</li>
              <li className="md:mr-6 cursor-pointer pt-4 lg:py-0 hover:text-blue-500">Terms of Service</li>
              <li className="cursor-pointer pt-4 lg:py-0 hover:text-blue-500">Privacy Policy</li>
            </ul>
          </div>
          <div className="text-xs text-black dark:text-white f-f-l">
            <p>© 2021 Ichi. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Footer
