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
export const objectsAreSame = (obj1, obj2) => {
  // works only if there same number of keys
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};
