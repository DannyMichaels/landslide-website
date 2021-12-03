/**
 * @method calculateSongTime
 * @desc takes seconds and retruns them in MIN:SEC format (example: 04:15), used for getting current time for active song.
 * @param {Number} secs
 * @returns {String} minutes : seconds
 */
export const calculateSongTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};
