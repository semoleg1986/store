import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser(
  $email: String!
  $password: String!
  $username: String!
) {
  createUser(
    email: $email
    password: $password
    username: $username
  ) {
    user {
      id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!, 
    $password: String!
  ) {
    loginUser(
      username: $username, 
      password: $password
    ) {
      token
      user {
        id
        username
        buyerProfile {
          id
          name
          surname
        }
      }
    }
  }
`;

export const CREATE_BUYER = gql`
mutation createBuyer(
  $name: String!
  $surname: String!
  $phoneNumber: String!
  $address: String!
  $userId: ID!
) {
  createBuyer(
    name: $name
    surname: $surname
    phoneNumber: $phoneNumber
    address: $address
    userId: $userId
  ) {
    buyer {
      id
      user {
        username
      }
    }
  }
}
`;
