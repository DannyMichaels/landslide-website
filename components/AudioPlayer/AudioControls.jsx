import React from 'react';

import {
  FaPlay as Play,
  FaStepBackward as Prev,
  FaForward as Next,
  FaPause as Pause,
} from 'react-icons/fa';

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="audio-controls">
      <button
        type="button"
        className="prev"
        aria-label="Previous"
        onClickCapture={onPrevClick}>
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type="button"
          className="pause"
          onClickCapture={() => onPlayPauseClick(false)}
          aria-label="Pause">
          <Pause />
        </button>
      ) : (
        <button
          type="button"
          className="play"
          onClickCapture={() => onPlayPauseClick(true)}
          aria-label="Play">
          <Play />
        </button>
      )}
      <button
        type="button"
        className="next"
        aria-label="Next"
        onClickCapture={onNextClick}>
        <Next />
      </button>
    </div>
  );
};

export default AudioControls;
