// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { shortenAddress } from '../utils/addressShortener';
import Card from '../Collectible/OwnerCard';
import Web3 from 'web3';
import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const Artist = () => {
  const { address } = useParams();
  const [gradients, setGradients] = useState([]);

  const TokenContractAddress = '0xD16ad33F448D282bf3C024DDA259984A501b7e84'
  const MarketplaceContractAddress = '0x4818979e6e9cc5c792449b5fcAB2526669343906'
  const ContractDeployerAddress = '0x608C4624b803eD47aCd8A745Da391604b28e9613'

  const tokenContract = new web3.eth.Contract(GradientTokenAbi, TokenContractAddress, {
    from: ContractDeployerAddress,
  });

  const marketplaceContract = new web3.eth.Contract(GradientMarketplaceAbi, MarketplaceContractAddress, {
    from: ContractDeployerAddress,
  });

  const getGradients = async () => {
    const ownerSupply = await tokenContract.methods.balanceOf(address).call();

    const fetchedGradients = []
    for (let count = 0; count < ownerSupply; count++) {
      const id = await tokenContract.methods.tokenOfOwnerByIndex(address, count).call();
      const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
      const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

      const gradient = { id, left, right, owner, price, forSale }
      fetchedGradients.push(gradient)
    }

    setGradients(fetchedGradients);
  }

  const setForSale = async (id, price) => {
    await marketplaceContract.methods.sellGradient(id, price).send({
      from: ContractDeployerAddress ,
      gas: 200000
    });
    await getGradients()
  }

  const cancelSale = async (id) => {
    await marketplaceContract.methods.cancelSellGradient(id).send({
      from: ContractDeployerAddress,
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
          {gradients.map(gradient => (
            <>
            <Link to={`/gradient/${gradient.id}`}>
              <Card gradient={gradient} />
              
            </Link>
            <button onClick={() => setForSale(gradient.id, 20000)}>set sale</button>
            <p>|</p>
            <button onClick={() => cancelSale(gradient.id)}>cancel sale</button>
            </>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default Artist;