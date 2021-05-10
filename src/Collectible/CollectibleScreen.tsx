
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link, useParams } from 'react-router-dom'

import Web3 from 'web3';
import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';
import BN from 'bn.js';


const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


const CollectibleScreen = () => {

  const { id } = useParams();
  const [gradient, setGradient] = useState({})

  const TokenContractAddress = '0x457cb2fAFEa75651865E771E310D26d9860b581B'
  const MarketplaceContractAddress = '0x710c720311db1d40A4d6ccE8cf7dB06A4b027aAa'
  const ContractDeployerAddress = '0x9D584097794D87ca8Fe59e7f378C0AfFe79038B9'

  // @ts-ignore
  const tokenContract = new web3.eth.Contract(GradientTokenAbi, TokenContractAddress, {
    from: ContractDeployerAddress,
  });

  // @ts-ignore
  const marketplaceContract = new web3.eth.Contract(GradientMarketplaceAbi, MarketplaceContractAddress, {
    from: ContractDeployerAddress,
  });

  const getGradient = async () => {
    const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
    const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

    const gradient = { id, left, right, owner, price, forSale }
    setGradient(gradient);
  }

  const buyGradient = async () => {
    await tokenContract.methods.approve(MarketplaceContractAddress, id).send({
      from: ContractDeployerAddress,
    });

    console.log("approved--")
    await marketplaceContract.methods.buyGradient(id).send({
      from: "0x97705A004CB59be931Eee87776Aa69A139805d6E",
      value: new BN(1000000),
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

  const BuyButton = (price: number) => {
    const servicePrice = price / 100 * 1.5
    return <div className="">
      <h3 className="text-3xl font-semibold py-1">{Number(gradient.price).toLocaleString()} <span className="text-sm">ONE</span></h3>
      <button onClick={buyGradient} className="md:w-auto w-full my-3 px-20 py-3 font-semibold rounded-lg shadow-md text-white bg-black hover:bg-gray-700">
        Buy now
      </button>
      <p className="text-xs text-gray-500">Service fee <span className="text-gray-700 font-semibold">1.5%</span>, {servicePrice.toLocaleString()} ONE</p>
    </div>
  }

  return (
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
          {gradient.forSale ? BuyButton(gradient.price) : DisabledBuyButton()}
        </div>

      </div>
    </div>
  )
}

export default CollectibleScreen;