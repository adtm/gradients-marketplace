import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

import { Gradient } from '../types';
import Loader from '../Loaders/Loader';
import DisplayCard from '../Cards/DisplayCard';
import { useEthereumProvider } from '../hooks/ethereum';

const Home = () => {

  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [loading, setLoading] = useState(true);
  const { account, ethereum, contracts: { tokenContract, marketplaceContract } } = useEthereumProvider()

  // @NOTE: only for development purposes
  const mintTokens = async () => {
    const gradients = [
      { left: "#FCE38A", right: "#F38181" },
      { left: "#F54EA2", right: "#FF7676" },
      { left: "#17EAD9", right: "#6078EA" },
      { left: "#622774", right: "#C53364" },
      { left: "#7117EA", right: "#EA6060" },
      { left: "#42E695", right: "#3BB2B8" },
      { left: "#F02FC2", right: "#6094EA" },
      { left: "#65799B", right: "#5E2563" },
      { left: "#184E68", right: "#57CA85" },
      { left: "#58247A", right: "#1BCEDF" },
    ];

    for (let i = 0; i < gradients.length; i++) {
      try {
        await tokenContract.methods.createGradient(gradients[i].left, gradients[i].right).send({
          from: account,
          gas: 1000000
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  const getGradients = async () => {
    try {
      const totalSupply = await tokenContract.methods.totalSupply().call();

      const fetchedGradients = []
      for (let id = 0; id < totalSupply; id++) {
        const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
        const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

        const gradient: Gradient = { id: id.toString(), left, right, owner, price, forSale }
        fetchedGradients.push(gradient)
      }

      setGradients(fetchedGradients);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // mintTokens()
    getGradients()
  }, [])

  const renderNotConnectedMetamaskOrComponent = (component: React.ReactNode) => {
    if (loading) return <Loader />
    if (!ethereum) return (
      <div className="text-center">
        <div
          className="inline-block h-10 w-10 rounded-full mb-5"
          style={{ background: `linear-gradient(135deg, #17EAD9 0%, #6078EA 100%)` }}
        />
        <p className="font-semibold text-md">You will need Metamask to use the website </p>
      </div>
    )

    return component;
  }

  return (
    <div className="container mx-auto">
      {
        renderNotConnectedMetamaskOrComponent(
          <Transition
            show={!loading}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-wrap flex-auto justify-center">
              {gradients.map(gradient => (
                <Link key={gradient.id} to={`/gradient/${gradient.id}`}>
                  <DisplayCard gradient={gradient} />
                </Link>
              ))}
            </div>
          </Transition>
        )
      }
    </div>
  )
}

export default Home;
