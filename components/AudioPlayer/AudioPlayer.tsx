import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useAppContext } from '../../context/state';

// components
import ReactPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// utils
import styled from 'styled-components';

// services
import { getAllSongs } from '../../services/songs.services';
import { FaWindowClose } from 'react-icons/fa';

// types
import TSong from '../../types/_Song';

const AudioPlayer = () => {
  const [allSongs, setAllSongs] = useState<Array<TSong>>([]);
  const player = useRef<any>();

  useEffect(() => {
    const fetchSongs = async () => {
      const allSongs = await getAllSongs('/api/mailingListUsers/');
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

  const setSong = useCallback((value) => {
    dispatch({ type: 'SET_SONG_PLAYING', payload: value });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE_AUDIO_PLAYER' });
  }, []);

  const { song, isPlaying } = audioPlayer;

  const { title = '', artist = '', imgUrl = '', audioSrc = '' } = song || {};

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
    // if is being paused from other sources accessing global state (for example: SongCard)
    if (!isPlaying && song?._id) {
      player.current?.audio?.current?.pause();
      console.log(player.current?.audio?.current.paused);
    } else if (
      // if user re-clicked the songcard and the audio is paused, unpause it
      isPlaying &&
      song?._id &&
      player.current?.audio?.current.paused
    ) {
      player.current?.audio?.current?.play();
    }
  }, [isPlaying, player.current?.audio?.current]);

  return (
    song && (
      <Container>
        <FaWindowClose className="audio-player__close" onClick={handleClose} />
        <ReactPlayer
          ref={player}
          autoPlay
          src={audioSrc}
          onPlay={() => setIsPlaying(song?._id)}
          onEnded={toNextTrack}
          onClickNext={toNextTrack}
          onClickPrevious={toPrevTrack}
          onPause={() => setIsPlaying(false)}
          showSkipControls
          className="audio-player"
        />
      </Container>
    )
  );
};

const Container = styled.div`
  /* TODO: make it look more like soundcloud player (thinner, uses less space, but still same functionality.) */
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;

  font-family: 'Montserrat';

  .audio-player__close {
    cursor: pointer;
    z-index: 999;
    color: red;
    position: absolute;
    font-size: 30px;
    top: -2px;
    right: 0;
  }

  * > .rhap_progress-section {
    margin-top: 20px;
  }
`;

export default AudioPlayer;
