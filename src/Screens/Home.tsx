import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

import { Gradient } from '../types';
import Loader from '../Loaders/Loader';
import DisplayCard from '../Cards/DisplayCard';
import { useEthereumProvider } from '../hooks/ethereum';

const Home = () => {

  const navigate = useNavigate();
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [loading, setLoading] = useState(true);
  const { account, ethereum, contracts: { tokenContract } } = useEthereumProvider()

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
      const url = `/.netlify/functions/get-all-gradients`;
      const response = await fetch(url);
      const result = await response.json();

      setGradients(result);
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
                <a className="cursor-pointer" key={gradient.id} onClick={() => navigate(`/gradient/${gradient.id}`)}>
                  <DisplayCard gradient={gradient} />
                </a>
              ))}
            </div>
          </Transition>
        )
      }
    </div>
  )
}

export default Home;
