import { Handler } from "@netlify/functions";
import { tokenContract, marketplaceContract } from '../../web3';


const handler: Handler = async () => {
  const totalSupply = await tokenContract.methods.totalSupply().call();

  const fetchedGradients = []
  for (let id = 0; id < totalSupply; id++) {
    const { left, right, owner } = await tokenContract.methods.getGradient(id).call();
    const { price, forSale } = await marketplaceContract.methods.sellTransactionByTokenId(id).call();

    const gradient = { id: id.toString(), left, right, owner, price, forSale }
    fetchedGradients.push(gradient)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(fetchedGradients),
  };
};

export { handler };
