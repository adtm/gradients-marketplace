// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { shortenAddress } from '../utils/addressShortener';
import Card from '../Collectible/Card';
import OwnerCard from '../Collectible/OwnerCard';
import Web3 from 'web3';
import GradientTokenAbi from '../abi/GradientToken';
import GradientMarketplaceAbi from '../abi/GradientMarketplace';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const Artist = () => {
  const { address } = useParams();
  const [gradients, setGradients] = useState([]);

  const TokenContractAddress = '0xDc3167542bfc1870418B21bDF73779193623dDE6'
  const MarketplaceContractAddress = '0x069Fe2C37333b2518f78C67DC3d8ED5b0b0E57BA'
  const ContractDeployerAddress = '0x79B2626a9DD5Cf8015eEd74409D76c6f0268dd24'

  // get current address
  const isOwner = (address == ContractDeployerAddress);

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

    console.log(fetchedGradients);
    setGradients(fetchedGradients);
  }

  const setForSale = async (id, price) => {
    await marketplaceContract.methods.sellGradient(id, price).send({
      from: ContractDeployerAddress,
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
            isOwner ? (<OwnerCard key={gradient.id} gradient={gradient} onCancelButton={cancelSale} onSellButton={setForSale} />) :
              <Link to={`/gradient/${gradient.id}`}>
                <Card gradient={gradient} />
              </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Artist;