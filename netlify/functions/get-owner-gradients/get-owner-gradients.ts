import { Handler } from "@netlify/functions";
import { web3, tokenContract, marketplaceContract } from '../../web3';


const handler: Handler = async ({ body }) => {
  const address = JSON.parse(body).address;
  const isValidAddress = web3.utils.isAddress(address);

  const fetchedGradients = [];
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

  return {
    statusCode: 200,
    body: JSON.stringify(fetchedGradients),
  };
};

export { handler };
