import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Burger from './Burger';
import useClickAwayListener from '../../../hooks/useClickAwayListener';

const LINKS = [
  {
    text: 'home',
    route: '/',
  },
  {
    text: 'news',
    route: '/news',
  },
  {
    text: 'music',
    route: '/music',
  },

  {
    text: 'sign up',
    route: '/signup',
  },
];

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // close nav when user clicks away
  const navRef = useClickAwayListener((e: PointerEvent) => {
    const element: any = e.target;
    const elementId: string = (e.target as HTMLDivElement).id;

    if (elementId === 'burger' || element.parentNode.id === 'burger') {
      // don't close if clicked burger icon, let burger do the closing
      return;
    }

    setIsNavOpen(false);
  });

  return (
    <>
      <Burger isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

      {isNavOpen && <NavBackground className="nav__background" />}

      <StyledNav isOpen={isNavOpen} ref={navRef}>
        <div className="nav__items">
          {LINKS.map((link) => (
            <LinkContainer key={link.text} onClick={() => setIsNavOpen(false)}>
              <Link href={link.route}>{link.text}</Link>
            </LinkContainer>
          ))}
        </div>
      </StyledNav>
    </>
  );
}

interface StyleProps {
  isOpen: boolean;
}

const StyledNav = styled.nav`
  padding-top: 20px;
  padding-bottom: 20px;

  width: ${({ isOpen }: StyleProps) => `${isOpen ? '250px' : '0'}`};

  border-right: ${({ isOpen, theme }) =>
    isOpen ? `1px solid ${theme.colors.primary}` : '0'};

  height: 100%;
  z-index: 9998;

  transition: width 0.3s ease-in-out;

  overflow: hidden;
  position: fixed;

  background: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media (min-width: 640px) {
    padding-left: 38px;
    padding-right: 38px;
    width: auto;
    height: inherit;
    position: unset;
    border-right: 0;
  }

  .nav__items {
    margin-left: 20px;
    margin-top: 40px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(-3000px)'};

    transition: transform 0.3s ease-in-out;

    z-index: 9999;

    @media (min-width: 640px) {
      margin-left: 0;
      margin-top: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transform: unset;
    }
  }
`;

const LinkContainer = styled.div`
  a {
    color: #fff;
    font-family: 'Open Sans';
    font-weight: 600;
    font-style: normal;
    font-size: 1.3rem;
    letter-spacing: 0.06em;
    line-height: 1.3em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0.618em;
    padding: 0.618em 0;
    display: inline-block;
    vertical-align: middle;
    text-decoration: none;
    transition: color 250ms ease-in-out;

    &:hover {
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const NavBackground = styled.div`
  @media (min-width: 640px) {
    display: none;
  }

  display: block;
  position: fixed;
  z-index: 400;

  background-color: rgba(0, 0, 0, 0.6);

  width: 100vw;
  height: 100vh;
`;
