import { dayNames, monthNames } from './names';
export const getDuration = (startTime, endTime) => {
  const start = startTime.split(':');
  const end = endTime.split(':');
  const hours = end[0] - start[0];
  const minutes = end[1] - start[1];
  return hours * 60 * 60 + minutes * 60;
};
export const addDuration = (startTime, seconds) => {
  return new Date(startTime.getTime() + seconds * 1000);
};
export const getDateForServer = (dateObj) => {
  return `${dateObj.getFullYear()}-${
    dateObj.getMonth() + 1
  }-${dateObj.getDate()}`;
};
export const getDateTimeForServer = (dateObj) => {
  const justDate = getDateForServer(dateObj);
  const justTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  return justDate + ' ' + justTime;
};
export const getWeeks = (year, cols = 7) => {
  // console.log('get weeks ran');
  const arr = [];
  let currentWeek = [];
  const jan1 = new Date(year, 0, 1);
  const day = jan1.getDay();
  // console.log(jan1.getDay());
  if (day > 7 - cols) {
    const start = 31 - day + 1 + 7 - cols;
    for (let i = start; i <= 31; i++) {
      currentWeek.push(new Date(year - 1, 11, i));
    }
  }
  const daysMonthWise = getNumDaysMonthWise(year);
  for (let i = 0; i < 12; i++) {
    const daysInMonth = daysMonthWise[i];
    for (let j = 1; j <= daysInMonth; j++) {
      currentWeek.push(new Date(year, i, j));
      if (currentWeek.length === cols) {
        arr.push([...currentWeek]);
        currentWeek = [];
      }
    }
  }
  if (currentWeek.length !== 0) {
    let j = 1;
    while (currentWeek.length < cols) {
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
export function getWeekIndexFromDate(weeks, date) {
  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];
    for (let day of week) {
      if (
        date.getMonth() === day.getMonth() &&
        date.getDate() === day.getDate()
      )
        return i;
    }
  }
}
export function getAssociatedMonthsAndYearForGivenWeek(week) {
  if (!week) return;
  const arr = [];
  let currentMonth = -1;
  for (let date of week) {
    let month = date.getMonth();
    if (month !== currentMonth) {
      arr.push([month, date.getFullYear()]);
      currentMonth = month;
    }
  }
  return arr;
}

export const getTime12Hour = (time24Hour) => {
  if (time24Hour <= 11) {
    return time24Hour + ' AM';
  } else if (time24Hour === 12) {
    return time24Hour + ' PM';
  } else {
    return time24Hour - 12 + ' PM';
  }
};
export const getNumDaysMonthYearOfRelativeMonth = (
  currentMonth,
  offset,
  year
) => {
  const currentYear = getNumDaysMonthWise(year);
  if (offset === 0) {
    return {
      days: currentYear[currentMonth],
      month: currentMonth,
      year,
    };
  } else {
    const relativeMonth = currentMonth + offset;
    if (relativeMonth > 11) {
      const nextYear = getNumDaysMonthWise(year + 1);
      const nextMonth = relativeMonth % 12;
      return {
        days: nextYear[nextMonth],
        month: nextMonth,
        year: year + 1,
      };
    } else if (relativeMonth < 0) {
      const prevYear = getNumDaysMonthWise(year - 1);
      const prevMonth = relativeMonth + 12;
      return {
        days: prevYear[prevMonth],
        month: prevMonth,
        year: year - 1,
      };
    } else {
      return {
        days: currentYear[relativeMonth],
        month: relativeMonth,
        year,
      };
    }
  }
};
export const getMonths = (year) => {
  const arr = [];
  for (let month = 0; month < 12; month++) {
    let currentMonthDates = [];
    const firstDay = new Date(year, month, 1).getDay();
    if (firstDay > 0) {
      // it is not sunday
      const prevMonthDetails = getNumDaysMonthYearOfRelativeMonth(
        month,
        -1,
        year
      );
      const start = prevMonthDetails.days - firstDay + 1;
      for (let i = start; i <= prevMonthDetails.days; i++) {
        currentMonthDates.push(
          new Date(prevMonthDetails.year, prevMonthDetails.month, i)
        );
      }
    }
    const currentMonthDetails = getNumDaysMonthYearOfRelativeMonth(
      month,
      0,
      year
    );
    for (let i = 1; i <= currentMonthDetails.days; i++) {
      currentMonthDates.push(new Date(year, month, i));
    }
    let remaining = currentMonthDates.length <= 35 ? 35 : 42;
    const nextMonthDetails = getNumDaysMonthYearOfRelativeMonth(month, 1, year);
    let i = 1;
    while (currentMonthDates.length < remaining) {
      currentMonthDates.push(
        new Date(nextMonthDetails.year, nextMonthDetails.month, i)
      );
      i++;
    }
    arr.push(currentMonthDates);
  }

  return arr;
};
export const getDayAndDate = (date) => {
  // Sunday, June 20
  return `${dayNames[date.getDay()]}, ${
    monthNames[date.getMonth()]
  } ${date.getDate()}`;
};
export const getTime12HourWithMinutes = (date) => {
  //  2:00pm
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, 0);
  if (hours <= 11) {
    return `${hours}:${minutes}am`;
  } else if (hours === 12) {
    return `${hours}:${minutes}pm`;
  } else {
    return `${hours - 12}:${minutes}pm`;
  }
};
export const constructDateForKeysWithISOFormat = (obj, keys = []) => {
  for (let key of keys) {
    obj[key] = new Date(obj[key]);
  }
  return obj;
};
