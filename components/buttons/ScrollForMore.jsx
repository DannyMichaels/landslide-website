import styled from 'styled-components';

export default function ScrollForMore() {
  return (
    <ItemContainer>
      <p className="title">Scroll For More</p>
      <div className="mouse__wrapper">
        <div className="mouse__border"></div>
        <div className="mouse__wheel"></div>
      </div>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  z-index: 9998;

  transition: transform 250ms ease-in;

  .mouse__wrapper {
    height: 36px;
    margin-left: 16px;
    position: relative;
  }

  .mouse__border {
    background-color: transparent;
    border-radius: 11px;
    height: 36px;
    width: 22px;
    border: 2px solid rgba(255, 255, 255, 1);
  }

  .mouse__wheel {
    background-color: white;
    border-radius: 1px;
    height: 6px;
    left: 10px;
    position: absolute;
    top: 10px;
    width: 2px;
  }

  .title {
    text-align: left;
    color: white;
    font-family: 'Helvetica', Helvetica, Arial, serif;
    font-size: 18px;
    line-height: 22px;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 250ms ease-in;
    cursor: pointer;
  }
`;
