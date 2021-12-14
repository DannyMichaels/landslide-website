import React from 'react';
import styled from 'styled-components';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  left: ${({ isOpen }) => (isOpen ? '200px' : '20px')};
  transition: all 320ms ease-in-out;

  z-index: 9999;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;

  @media all and (min-width: 640px) {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    box-shadow: 0px 0.1px 1.5px 0.5px #999999;
    background-color: white;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ isOpen }) =>
        isOpen ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <>
      <StyledBurger
        id="burger"
        isOpen={isNavOpen}
        onClick={() => setIsNavOpen((prevState) => !prevState)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </>
  );
};
export default Burger;
