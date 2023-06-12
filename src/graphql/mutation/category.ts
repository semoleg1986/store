import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export default GET_CATEGORIES;
