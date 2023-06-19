import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.header`
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
`;

export const CustomNavLink = styled(NavLink)`
  color: cornflowerblue;
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: lightgray;
  }

  &.active {
    font-size: 200%;
    font-weight: bold;
    background-image: linear-gradient(to right, #00f260, #f79d00, #0575e6, #64f38c);
    -webkit-background-clip: text;
    color: transparent;
    background-size: 300%;
    background-position: -100%;
    animation: animatedText 5s infinite alternate-reverse;
  }

  @keyframes animatedText {
    to {
      background-position: 100%;
    }
  }
`;

export const CartButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 16px;
  font-weight: bold;

  i {
    z-index: 100;
  }
  p {
    min-width: 20px;
    background-color: white;
    border-radius: 20px;
    margin-top: -15px;
    margin-left: -5px;
  }
`;
