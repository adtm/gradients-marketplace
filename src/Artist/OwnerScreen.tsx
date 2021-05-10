import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { shortenAddress } from '../utils/addressShortener';
import Card from '../Collectible/Card';
import OwnerCard from '../Collectible/OwnerCard';

import { useEthereumProvider } from '../hooks/ethereum';
import { Gradient } from '../types';
 
const Artist = () => {
  const { address } = useParams<{address: string}>();
  
  const { web3, account, contracts: { tokenContract, marketplaceContract }, addresses: {MarketplaceContractAddress} } = useEthereumProvider()
  const isOwner = (address.toLowerCase() == (account || "").toLowerCase());
  
  const [loading, setLoading] = useState(true);
  const [gradients, setGradients] = useState<Gradient[]>([]);
  

  const getGradients = async () => {
    try {
      const fetchedGradients = []
      const isValidAddress = web3.utils.isAddress(address);

      if (isValidAddress) {
        const ownerSupply = await tokenContract.methods.balanceOf(address).call();

        for (let count = 0; count < ownerSupply; count++) {
          const id = await tokenContract.methods.tokenOfOwnerByIndex(address, count).call();
          const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
          const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

          const gradient = { id, left, right, owner, price, forSale }
          fetchedGradients.push(gradient)
        }
      }

      setGradients(fetchedGradients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const setForSale = async (id: string, price: string) => {
    await tokenContract.methods.approve(MarketplaceContractAddress, id).send({
      from: address,
    });
    await marketplaceContract.methods.sellGradient(id, price).send({
      from: address,
      gas: 200000
    });
    await getGradients()
  }

  const cancelSale = async (id: string) => {
    await marketplaceContract.methods.cancelSellGradient(id).send({
      from: address,
      gas: 200000
    });
    await getGradients()
  }

  useEffect(() => {
    getGradients()
  }, [])

  return (
    <div >
      <h1 className="text-xl text-center p-5 font-semibold">{shortenAddress(address)} </h1>
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-auto justify-center">

          {
            !loading ? (gradients.length == 0 ?
              <div className="m-5 text-center">
                <p>No gradients yet 🖼</p>
                <Link to="/">
                <button
                  type="button"
                  className="m-4 px-5 py-3 border rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Acquire Gradients
        </button>
                </Link>
                
              </div>

              :

              gradients.map(gradient => (
                isOwner ? (<OwnerCard key={gradient.id} gradient={gradient} onCancelButton={cancelSale} onSellButton={setForSale} />) :
                  <Link to={`/gradient/${gradient.id}`}>
                    <Card gradient={gradient} />
                  </Link>
              ))) : null
          }

        </div>
      </div>
    </div>
  )
}

export default Artist;