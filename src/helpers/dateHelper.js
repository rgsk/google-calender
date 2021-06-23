export const getWeeks = (year) => {
  const arr = [];
  let currentWeek = [];
  const jan1 = new Date(year, 0, 1);
  const day = jan1.getDay();
  // console.log(jan1.getDay());
  if (day > 0) {
    const start = 31 - day + 1;
    for (let i = start; i <= 31; i++) {
      currentWeek.push(new Date(year - 1, 11, i));
    }
  }
  const daysMonthWise = getNumDaysMonthWise(year);
  for (let i = 0; i < 12; i++) {
    const daysInMonth = daysMonthWise[i];
    for (let j = 1; j <= daysInMonth; j++) {
      currentWeek.push(new Date(year, i, j));
      if (currentWeek.length === 7) {
        arr.push([...currentWeek]);
        currentWeek = [];
      }
    }
  }
  if (currentWeek.length !== 0) {
    let j = 1;
    while (currentWeek.length < 7) {
      currentWeek.push(new Date(year + 1, 0, j));
      j++;
    }
    arr.push(currentWeek);
  }
  return arr;
};

export const checkLeapYear = (year) => {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }
  return false;
};
export const getNumDaysMonthWise = (year) => {
  return [
    31,
    checkLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
};
