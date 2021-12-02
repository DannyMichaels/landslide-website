import React, { useState } from 'react';
import styled from 'styled-components';

export default function Tooltip({
  children,
  content,
  delay,
  direction = 'top',
  position = 'relative',
}) {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <Wrapper
      className="tooltip__wrapper"
      position={position}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}>
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`tooltip__tip ${direction}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* Wrapping */

  display: inline-block;

  position: ${({ position }) => position};

  top: 0;
  left: 0;

  /* Custom properties */
  :root {
    --tooltip-margin: 30px;
    --tooltip-arrow-size: 6px;
  }

  /* Absolute positioning */
  .tooltip__tip {
    position: absolute;
    border-radius: 4px;
    /* left: 50%; */
    transform: translateX(-50%);
    padding: 6px;
    color: #000;
    background: #fff;
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;
  }

  /* CSS border triangles */
  .tooltip__tip::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }

  /* Absolute positioning */
  .tooltip__tip.top {
    top: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  .tooltip__tip.top::before {
    top: 100%;
    border-top-color: #fff;
  }

  /* Absolute positioning */
  .tooltip__tip.right {
    left: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .tooltip__tip.right::before {
    left: calc(var(--tooltip-arrow-size) * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: #fff;
  }

  /* Absolute positioning */
  .tooltip__tip.bottom {
    bottom: calc(var(--tooltip-margin) * -1);
  }
  /* CSS border triangles */
  .tooltip__tip.bottom::before {
    bottom: 100%;
    border-bottom-color: #fff;
  }

  /* Absolute positioning */
  .tooltip__tip.left {
    left: auto;
    right: calc(100% + var(--tooltip-margin));
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
  /* CSS border triangles */
  .tooltip__tip.left::before {
    left: auto;
    right: calc(var(--tooltip-arrow-size) * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: #fff;
  }
`;
