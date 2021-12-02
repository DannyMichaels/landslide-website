import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useAppContext } from '../../context/state';
import AudioControls from './AudioControls';
import Backdrop from './Backdrop';
import styled from 'styled-components';
import { getAllSongs } from '../../services/songs.services';
import dbConnect from '../../lib/dbConnect';

const AudioPlayer = () => {
  const [allSongs, setAllSongs] = useState(null);

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
    audioRef.current = new Audio(audioSrc);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
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
      <Container className="audio-player">
        <div className="track-info">
          <img
            className="artwork"
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <h2 className="title">{title}</h2>
          <h3 className="artist">{artist}</h3>
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
        <Backdrop isPlaying={isPlaying} />
      </Container>
    )
  );
};

const Container = styled.div`
  max-width: 350px;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 28px 28px rgba(0, 0, 0, 0.2);
  margin: auto;
  color: #fff;
  border: 1px solid #fff;
  background: #000;
  position: fixed;
  bottom: 0;
  right: 0;

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
    border-radius: 120px;
    display: block;
    margin: auto;
    height: 200px;
    width: 200px;
  }

  .track-info {
    text-align: center;
    z-index: 1;
    position: relative;
  }

  .title {
    font-weight: 700;
    margin-bottom: 4px;
  }

  .artist {
    font-weight: 300;
    margin-top: 0;
  }

  .audio-controls {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 0 auto 15px;
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
`;

export default AudioPlayer;
