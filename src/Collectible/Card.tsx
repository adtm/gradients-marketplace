
import React from 'react'

const Card = ({ collectible }: any) => {
  return (
    <div className="sm:w-56 m-3" >
      <img className="rounded-md rounded-b-none sm:h-56 bg-gray-300" src={collectible.image || 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1020.9375&fit=crop&crop=faces'} />
      <div className="shadow-xl rounded-t-none rounded-md">
        <div className="px-4 py-4">
          <span className="text-xs text-gray-500 font-bold">{collectible.quantity.number} of {collectible.quantity.from}</span>
          <h3 className="text-xl font-semibold pb-2">{collectible.name}</h3>
          <div className="pb-1">
            <div className="flex items-center">
              <img className="w-5 h-5 rounded-3xl mr-2" src={collectible.owner.profileImage} />
              <h3 className="text-sm font-semibold">of @{collectible.owner.name}</h3>
            </div>
          </div>
        </div>
        <button className="rounded-t-none w-full px-4 py-2 font-semibold rounded-lg text-sm shadow-md text-white bg-black hover:bg-gray-700">
          {collectible.price.one.toLocaleString()} <span className="text-xs">ONE</span>
        </button>
      </div>
    </div>
  )
}

export default Card;