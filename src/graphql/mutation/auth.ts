import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($password: String!, $username: String!) {
    createUser(password: $password, username: $username) {
      user {
        id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
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
  mutation createBuyer($name: String!, $surname: String!, $phoneNumber: String!, $userId: ID!) {
    createBuyer(name: $name, surname: $surname, phoneNumber: $phoneNumber, userId: $userId) {
      buyer {
        id
        user {
          username
        }
      }
    }
  }
`;

export const GET_BUYER_BY_ID = gql`
  query ($buyerId: ID!) {
    buyerById(buyerId: $buyerId) {
      id
      user {
        id
        username
        email
      }
      phoneNumber
      name
      surname
      address
    }
  }
`;
