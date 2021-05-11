import React, { useState, useEffect } from 'react'
import Card from '../Collectible/Card';
import { Link } from 'react-router-dom';
import { useEthereumProvider } from '../hooks/ethereum';
import { Gradient } from '../types';

const Home = () => {

  const [gradients, setGradients] = useState<Gradient[]>([]);
  const { account, contracts: { tokenContract, marketplaceContract } } = useEthereumProvider()

  const getGradients = async () => {
    // console.log(account)
    // await tokenContract.methods.createGradient("#F5799B", "#FF78EA").send({
    //   from: account,
    //   gas: 1000000
    // });

    const totalSupply = await tokenContract.methods.totalSupply().call();

    const fetchedGradients = []
    for (let id = 0; id < totalSupply; id++) {
      const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
      const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

      console.log(owner)
      const gradient: Gradient = { id: id.toString(), left, right, owner, price, forSale }
      fetchedGradients.push(gradient)
    }

    setGradients(fetchedGradients);
  }

  useEffect(() => {
    getGradients()
  }, [])


  return (

    <div className="container mx-auto">
      <div className="flex flex-wrap flex-auto justify-center">
        {gradients.map(gradient => (
          <Link to={`/gradient/${gradient.id}`}>
            <Card gradient={gradient} />
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Home;


// const response = await tokenContract.methods.createGradient("#FCE38A", "#F38181").send({
//   from: ContractDeployerAddress,
//   gas: 1000000
// });
// console.log(response);

// { tokenId: 1, left:"#FCE38A", right: "#F38181", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 2, left:"#F54EA2", right: "#FF7676", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 3, left:"#17EAD9", right: "#6078EA", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 4, left:"#622774", right: "#C53364", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 5, left:"#7117EA", right: "#EA6060", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 6, left:"#42E695", right: "#3BB2B8", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 7, left:"#F02FC2", right: "#6094EA", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 8, left:"#65799B", right: "#5E2563", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 9, left:"#184E68", right: "#57CA85", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
// { tokenId: 10, left:"#58247A", right: "#1BCEDF", ownerAddress: "0xe591a38f0822AC1b386f0273A47Da32e4155fD99"},
