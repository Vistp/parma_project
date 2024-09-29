export const normalizeDate = (isoDateString: string) => {
  isoDateString = isoDateString.substring(0, isoDateString.length - 1);
  
  const [year, month, day, hour, minute] = isoDateString.split('T')[0].split('-').concat(isoDateString.split('T')[1].split(':'));
  
  return `${day}.${month}.${year} ${hour}:${minute}`;
}