import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $name: String!
    $surname: String!
    $phoneNumber: String!
    $address: String!
    $email: String!
    $sellerId: ID!
    $buyerId: ID!
    $productIds: [ID]!
    $quantities: [Int]!
  ) {
    createOrder(
      name: $name
      surname: $surname
      phoneNumber: $phoneNumber
      address: $address
      email: $email
      sellerId: $sellerId
      buyerId: $buyerId
      productIds: $productIds
      quantities: $quantities
    ) {
      order {
        name
        surname
        phoneNumber
        products {
          id
          name
          price
          quantity
        }
      }
    }
  }
`;

export const GET_ORDER = gql`
  query {
    orders {
      receiptNumber
      name
      surname
      phoneNumber
      address
      email
      status
      orderitemSet {
        product {
          name
          price
        }
      }
    }
  }
`;

export const ORDER_BY_BUYER_ID = gql`
  query ($buyerId: ID!) {
    ordersByBuyerId(buyerId: $buyerId) {
      id
      receiptNumber
      name
      surname
      phoneNumber
      address
      status
      updateDate
    }
  }
`;
