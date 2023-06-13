import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
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

export const GET_SELLERS = gql`
  query {
    sellers {
      id
      phoneNumber
      companyName
      description
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
  }
`;
