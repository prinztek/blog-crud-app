export default function formatDate(date: string) {
  const daysMapping = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  const dateObject = new Date(date);
  const month = dateObject.getMonth();
  const number = dateObject.getDate();
  const currentDay = daysMapping[dateObject.getDay()];
  const hours = dateObject.getHours();
  const seconds = dateObject.getMinutes();

  return `${month}/${number}(${currentDay}) ${hours}:${seconds}`;
}
