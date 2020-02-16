// Resolvers are object that is passed to client that lets it know what properties to resolve depending on what queries or mutations are made from the local / client side
import { gql } from "apollo-boost";
import { addItemToCart } from "./cart.utils";

// extend takes whatever is in the graphql server even if there is none
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;
// # @client is a local directive that tells apollo client that the property cartHidden is in the cache
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  Mutation: {
    // params were meant to not be changed that's why they are prefixed with an underscore
    // 3rd argument is _context which is the thing that the Apollo client has access to
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });
      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });
      return newCartItems;
    }
  }
};
