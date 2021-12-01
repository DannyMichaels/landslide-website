import styled from 'styled-components';
import Link from 'next/link';

const LINKS = [
  {
    text: 'home',
    route: '/',
  },
  {
    text: 'news',
    route: '/news',
  },
];

export default function Nav() {
  return (
    <StyledNav>
      {LINKS.map((link) => (
        <LinkContainer key={link.text}>
          <Link href={link.route}>{link.text}</Link>
        </LinkContainer>
      ))}
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 38px;
  padding-right: 38px;
  padding-top: 20px;
  padding-bottom: 20px;
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
  }

  &:hover > a {
    color: rgba(255, 255, 255, 0.4);
  }
`;
