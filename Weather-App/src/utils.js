// we make this little function apart then export it to be used in another component (Weather.jsx)
export function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);
  return `${hours} h, ${minutes} m, ${remainingSeconds} s`;
}
