import styled from 'styled-components';

export default function NavSpacer() {
  return <Div className="nav__spacer" />;
}

const Div = styled.div`
  min-height: 56px;
  display: flex;
  flex-grow: 1;

  @media (min-width: 600px) {
    min-height: 64px;
  }
`;
