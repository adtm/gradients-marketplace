//  @ts-nocheck
import React from 'react'
import Card from '../Collectible/Card';
import { Link } from 'react-router-dom';
import collectibles from '../data/collectibles';
import accounts from '../data/accounts';

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-auto justify-center">
          {Array.from({ length: 50 }).fill(0).map(_ => (
            <Link to={`/collectible/1`}>
              <Card collectible={{
                ...collectibles[1],
                owner: accounts[1]
              }} />

            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;