import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      quantity
      category {
        name
      }
      seller {
        id
      }
    }
  }
`;

export default GET_PRODUCTS;
