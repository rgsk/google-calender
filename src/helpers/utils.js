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
export const largestCommonCharacters = (s1, s2) => {
  // string to array
  s1 = s1.toLowerCase();
  // console.log(s1);
  s2 = s2.toLowerCase();
  const arr1 = [...new Set(s1)];
  const arr2 = [...new Set(s2)];

  // define n x m sized array filled with 0's
  let matrix = [...Array(arr1.length + 1)].map((e) =>
    Array(arr2.length + 1).fill(0)
  );

  // fill the matrix
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j] + 1;
      } else matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
  }

  // return the max which is at the right bottom corner of the matrix
  return matrix[matrix.length - 1][matrix[0].length - 1];
};
export const revertObj = (obj) => {
  const result = {};
  for (let key in obj) {
    result[obj[key]] = key;
  }
  return result;
};
