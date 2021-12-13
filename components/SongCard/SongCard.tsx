import { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/state';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import TSong from './../../types/_Song';

export default function SongCard({ song = null }: { song: TSong }) {
  const { audioPlayer, dispatch } = useAppContext();

  const isPlaying = useMemo(
    () => audioPlayer.isPlaying === song?._id,
    [audioPlayer.isPlaying, song?._id]
  );

  const handleClick = useCallback(() => {
    if (!isPlaying) {
      dispatch({
        type: 'SET_SONG_PLAYING',
        payload: song,
      });
    } else {
      dispatch({
        type: 'SET_AUDIO_PLAYER',
        payload: { key: 'isPlaying', value: false },
      });
    }
  }, [isPlaying, song]);

  return (
    <Container
      imgUrl={song.imgUrl}
      // onClick plays the song (dispatches in state)
      onClick={handleClick}
      className={'songCard' + (isPlaying ? '--playing' : '')}>
      <h2 className="song__title">{song.title}</h2>
      {isPlaying && <h3 className="song__status">Currently playing...</h3>}
      <div className="song__play-btn">
        {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  align-self: center;
  height: 250px;
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  position: relative;

  background-image: ${({ imgUrl }: { imgUrl: string }) =>
    `url(${imgUrl}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: overlay;

  max-height: 240px;

  @media screen and (min-width: 651px) {
    width: 250px;
    max-height: 250px;
  }

  .song__title {
    font-size: 1.2rem;
    word-break: break-word;
    letter-spacing: 2px;
  }

  .song__status {
    filter: drop-shadow(30px 10px 4px #4444dd);
  }

  .song__play-btn {
    display: none;

    position: absolute;
    left: 50%;
    top: 58%;
    transform: translate(-50%, -50%);
    font-size: 60px;
  }

  &.songCard--playing {
    .song__play-btn {
      display: block;
    }
  }

  &:hover {
    .song__play-btn {
      display: block;
    }
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
