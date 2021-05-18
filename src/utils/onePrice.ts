import BN from "bn.js";


const weiToOne = (one: number) => one / 1e18
const oneToWei = (wei: number) => wei * 1e18

export {
  weiToOne,
  oneToWei
}