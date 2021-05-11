import React, { useState, useEffect } from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link, useParams } from 'react-router-dom'

import BN from 'bn.js';
import { useEthereumProvider } from '../hooks/ethereum';
import TransactionTable from './TransactionTable';
import { Gradient } from '../types';

const CollectibleScreen = () => {

  const { id } = useParams<{ id: string }>();
  // @ts-ignore
  const [gradient, setGradient] = useState<Gradient>({});
  const { account, contracts: { tokenContract, marketplaceContract } } = useEthereumProvider()

  const getGradient = async () => {
    const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
    const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

    const gradient = { id, left, right, owner, price, forSale }
    setGradient(gradient);
  }

  const buyGradient = async () => {
    await marketplaceContract.methods.buyGradient(id).send({
      from: account,
      value: new BN(gradient.price),
      gas: 1000000
    });
    getGradient();
  }

  useEffect(() => {
    getGradient()
  }, [])

  const DisabledBuyButton = () => {
    return <div className=" ">
      <h3 className="text-3xl font-semibold py-1">XXXX{" "}<span className="text-sm">ONE</span></h3>
      <button disabled className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black bg-gray-700">
        Not for sale
      </button>
      <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span></p>
    </div>
  }

  const BuyButton = () => {
    const servicePrice = Number(gradient.price) / 100 * 1.5
    return <div className="">
      <h3 className="text-3xl font-semibold py-1">{Number(gradient.price).toLocaleString()} <span className="text-sm">ONE</span></h3>
      <button onClick={buyGradient} className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
        Buy now
      </button>
      <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span>, {servicePrice.toLocaleString()} ONE</p>
    </div>
  }

  return (
    <div>


      <div className="md:flex mt-40">
        <div className="flex flex-grow items-center justify-center">
          <div
            className={`w-96 h-96 rounded-md`}
            style={{ background: `linear-gradient(135deg, ${gradient.left} 0%, ${gradient.right} 100%)` }}
          />
        </div>
        <div className="md:flex-1">

          <div className="pb-2 pt-5">
            <h1 className="text-4xl font-bold">{gradient.left} - {gradient.right}</h1>
          </div>


          <div className="pb-3">
            <div className="flex items-center">
              <h3 className="font-semibold">of{" "}
                <Link className="text-blue-500" to={`/owner/${gradient.owner}`}>
                  @{shortenAddress(gradient.owner)}
                </Link>
              </h3>
            </div>
          </div>

          <div className="pt-8 md:text-left text-center">
            {gradient.forSale ? BuyButton() : DisabledBuyButton()}
          </div>

        </div>
      </div>
      <div className="mt-20 w-full md:w-2/3 lg:w-1/2 m-auto">
        <p className="text-sm mb-5">Transactions</p>
        <div >
          <TransactionTable id={gradient.id} />
        </div>
      </div>
    </div>
  )
}

export default CollectibleScreen;