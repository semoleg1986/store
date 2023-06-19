import styled from 'styled-components';

const CardsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  animation: fade-in 1s;
  margin: 10px;
`;

export default CardsStyle;
