export interface Gradient {
  id: string
  left: string
  right: string
  owner: string
  price: string
  forSale: boolean
}

export interface Transaction {
  buyer: string
  owner: string
  price: string
  date: string
}
