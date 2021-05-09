export interface Collectible {
  id: string,
  name: string,
  image: string,
  quantity: {
    number: number,
    from: number
  },
  description: string,
  ownerId: string,
  creatorId: string,
  price: {
    one: number
  }
};

export interface CardCollectible {
  id: string,
  name: string,
  image: string,
  quantity: {
    number: number,
    from: number
  },
  ownerId: string,
  price: {
    one: number
  }
}
 
export interface Account {
  id: string,
  name: string,
  profileImage: string
}
 
export interface Gradient {
  id: string;
  left: string;
  right: string;
  owner: string;
  price: string;
  forSale: boolean;
}