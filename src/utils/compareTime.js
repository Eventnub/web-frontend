export function isFutureDate(date) {
  if (typeof date === 'string') date = new Date(date);
  const currentDate = new Date();
  return date > currentDate;
}

export function isToday(date) {
  if (typeof date === 'string') date = new Date(date);
  const currentDate = new Date();
  return date === currentDate;
}
