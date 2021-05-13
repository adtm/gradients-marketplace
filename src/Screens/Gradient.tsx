import React, { useState, useEffect } from 'react'
import { shortenAddress } from '../utils/addressShortener'
import { Link, useParams } from 'react-router-dom'

import BN from 'bn.js';
import { useEthereumProvider } from '../hooks/ethereum';
import TransactionTable from '../Gradient/TransactionTable';
import { Gradient, Transaction } from '../types';
import { gradientBackground } from '../utils/gradientBackground';
import { Transition } from '@headlessui/react';
import BuyButton from '../Gradient/BuyButton';
import DisabledBuyButton from '../Gradient/DisabledBuyButton';


const GradientScreen = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [buyLoading, setBuyLoading] = useState<boolean>(false);

  // @ts-ignore
  const [gradient, setGradient] = useState<Gradient>({});
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const gradientBg = gradientBackground({ left: gradient.left, right: gradient.right });

  const { account, contracts: { tokenContract, marketplaceContract } } = useEthereumProvider()

  const getGradient = async () => {
    const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
    const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

    const gradient = { id, left, right, owner, price, forSale }
    setGradient(gradient);
  }

  const getTransactions = async () => {
    const length = await marketplaceContract.methods.getTransactionCount(new BN(id)).call();

    const transactionsFetched = []
    for (let i = 0; i < length; i++) {
      const { buyer, owner, price, date } = await marketplaceContract.methods.getTransaction(new BN(id), i).call();
      transactionsFetched.push({ buyer, owner, price, date })
    }

    setTransactions(transactionsFetched);
  }

  const buyGradient = async () => {
    try {
      setBuyLoading(true);
      await marketplaceContract.methods.buyGradient(id).send({
        from: account,
        value: new BN(gradient.price),
        gas: 1000000
      });
    } catch (err) {
      console.error(err);
    } finally {
      setBuyLoading(false);
      getGradient();
    }
  }

  useEffect(() => {
    getGradient();
    getTransactions();
    setLoading(false);
  }, [])


  return (
    <div>
      <Transition
        show={!loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:flex mt-40">
          <div className="flex flex-grow items-center justify-center">
            <div
              style={gradientBg}
              className="w-96 h-96 rounded-md"
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
              {gradient.forSale ? <BuyButton buyLoading={buyLoading} isOwner={gradient.owner.toLowerCase() === account?.toLowerCase()} price={Number(gradient.price)} buyGradient={buyGradient} /> : <DisabledBuyButton />}
            </div>
          </div>
        </div>
        <div className="mt-20 w-full md:w-2/3 lg:w-1/2 m-auto">
          <p className="text-sm mb-5">Transactions</p>
          <div >
            <TransactionTable transactions={transactions} />
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default GradientScreen;