import styled from 'styled-components';
import Nav from './Nav';

export default function Header() {
  return (
    <StyledHeader className="header__container">
      <Nav />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  @media screen and (min-width: 640px) {
    display: block;
  }

  background: ${({ theme }) => theme.colors.secondary};

  display: none;

  -webkit-font-smoothing: antialiased;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;
