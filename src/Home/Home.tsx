//  @ts-nocheck
import React from 'react'
import Card from '../Collectible/Card';

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-auto justify-center">
          {Array.from({ length: 50 }).fill(0).map(_ => <Card collectibleId={"1"} />)}
        </div>
      </div>
    </>
  )
}

export default Home;