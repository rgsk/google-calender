export const getDuration = (startTime, endTime) => {
  const start = startTime.split(':');
  const end = endTime.split(':');
  const hours = end[0] - start[0];
  const minutes = end[1] - start[1];
  return hours * 60 * 60 + minutes * 60;
};
export class Debounce {
  callback;
  delay;
  timeOut;
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
  }
  call(...args) {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => this.callback(...args), this.delay);
  }
}
export const percent = (val, percent) => {
  return (val * percent) / 100;
};
export const truncate = (text, len) => {
  return [...text].splice(0, len).join('') + (text.length > len ? '..' : '');
};
export const range = (min, max) => {
  const arr = [];
  for (let i = min; i < max; i++) {
    arr.push(i);
  }
  return arr;
};
