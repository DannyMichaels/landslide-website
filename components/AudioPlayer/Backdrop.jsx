import React from 'react';

const Backdrop = ({ isPlaying }) => {
  return <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />;
};

export default Backdrop;
