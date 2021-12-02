import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useAppContext } from '../../context/state';
import AudioControls from './AudioControls';
import Backdrop from './Backdrop';
import styled from 'styled-components';
import { getAllSongs } from '../../services/songs.services';
import { FaArrowUp as ArrowUp } from 'react-icons/fa';
import Tooltip from '../shared/Tooltip/Tooltip';

const AudioPlayer = () => {
  const [allSongs, setAllSongs] = useState(null);
  const [isMoreShowing, setIsMoreShowing] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchSongs = async () => {
      const allSongs = await getAllSongs();
      setAllSongs(allSongs);
    };
    fetchSongs();
  }, []);

  const { audioPlayer, dispatch } = useAppContext();

  const setIsPlaying = useCallback((value) => {
    dispatch({
      type: 'SET_AUDIO_PLAYER',
      payload: { key: 'isPlaying', value },
    });
  }, []);

  const setTrackProgress = useCallback((value) => {
    dispatch({
      type: 'SET_AUDIO_PLAYER',
      payload: { key: 'trackProgress', value },
    });
  }, []);

  const setSong = useCallback((value) => {
    dispatch({ type: 'SET_SONG_PLAYING', payload: value });
  });

  const { isPlaying, song, trackProgress } = audioPlayer;

  const {
    title = '',
    artist = '',
    imgUrl: image = '',
    audioSrc = '',
  } = song || {};

  // Refs
  const audioRef = useRef();
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration = 0 } = audioRef.current || {};

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    const currentSongIndex = allSongs.findIndex((s) => s.audioSrc === audioSrc);

    if (currentSongIndex - 1 < 0) {
      // if index - 1 is less than zero, that means it's the first song, so go to the last song in the list.
      setSong(allSongs[allSongs.length - 1]);
    } else {
      // else go to the previous song
      setSong(allSongs[currentSongIndex - 1]);
    }
  };

  const toNextTrack = () => {
    const currentSongIndex = allSongs.findIndex((s) => s.audioSrc === audioSrc);

    if (currentSongIndex < allSongs.length - 1) {
      // if index is less than allsongs length -1, then that means it's not the last song so we can keep going
      setSong(allSongs[currentSongIndex + 1]);
    } else {
      // if it is the last song, go back to the first song
      setSong(allSongs[0]);
    }
  };

  useEffect(() => {
    // set audioRef on mount
    audioRef.current = new Audio(audioSrc);
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      // pause when isPlaying is false.
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [song]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    song &&
    audioRef.current && (
      <Container
        className="audio-player"
        isPlaying={isPlaying}
        isMoreShowing={isMoreShowing}>
        <Tooltip
          content="Tooltip text!"
          direction="top"
          delay={100}
          position="absolute">
          <ArrowUp
            className="arrow"
            onClick={() => setIsMoreShowing((prevState) => !prevState)}
          />
        </Tooltip>

        {isMoreShowing && (
          <div className="track-info">
            <img
              className="artwork"
              src={image}
              alt={`track artwork for ${title} by ${artist}`}
            />
            <h2 className="title">{title}</h2>
            {/* <h3 className="artist">{artist}</h3> */}
            <AudioControls
              isPlaying={isPlaying}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={setIsPlaying}
            />
            <input
              type="range"
              value={trackProgress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="progress"
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: trackStyling }}
            />
          </div>
        )}
        <Backdrop isPlaying={isPlaying} />
      </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  bottom: 0;
  right: 0;

  font-family: 'Montserrat';
  max-width: 350px;

  padding: 16px;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 28px 28px rgba(0, 0, 0, 0.2);
  color: #fff;
  border: 1px solid #fff;
  background: #000;
  transition: all 250ms ease-in-out;
  min-height: 6px;
  min-width: 3px;

  @media screen and (max-width: 500px) {
    max-width: ${({ isMoreShowing }) => (isMoreShowing ? '100%' : '37px')};
    padding: 0;
    margin: 0;
    left: 0;
    min-height: 36px;
  }

  .arrow {
    z-index: 2;
    position: ${({ isMoreShowing }) => (isMoreShowing ? 'absolute' : 'static')};

    top: ${({ isMoreShowing }) => (isMoreShowing ? '10px' : 'inherit')};
    left: ${({ isMoreShowing }) => (isMoreShowing ? '10px' : 'inherit')};

    cursor: pointer;

    transform: ${({ isMoreShowing }) =>
      isMoreShowing ? 'rotate(180deg)' : '0'};

    transition: transform 250ms ease-in-out;
    font-size: 24px;
    padding: ${({ isMoreShowing }) => (!isMoreShowing ? '6px' : '0')};
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  input[type='range'] {
    height: 5px;
    -webkit-appearance: none;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #3b7677;
    transition: background 0.2s ease;
    cursor: pointer;
  }

  .artwork {
    border-radius: 50%;
    /* display: block; */
    margin: auto;
    height: 100px;
    width: 100px;

    animation-name: spin;
    animation-duration: ${({ isPlaying }) => `${isPlaying ? '3000ms' : '0ms'}`};
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .track-info {
    text-align: center;
    z-index: 1;
    position: relative;
    /* display: flex;
    align-items: center; */
  }

  .title {
    font-weight: 700;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .artist {
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 0;
  }

  .audio-controls {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 0 auto 0;
  }

  .audio-controls .prev svg,
  .audio-controls .next svg {
    width: 35px;
    height: 35px;
  }

  .audio-controls .play svg,
  .audio-controls .pause svg {
    height: 40px;
    width: 40px;
  }

  .audio-controls path {
    fill: #fff;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default AudioPlayer;
