function formatDateToISO8601(date: Date): string {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
  const timezoneOffset = -date.getTimezoneOffset(); // Décalage par rapport à UTC en minutes
  const offsetHours = Math.floor(timezoneOffset / 60)
    .toString()
    .padStart(2, '0');
  const offsetMinutes = (timezoneOffset % 60).toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+${offsetHours}:${offsetMinutes}`;
  return formattedDate;
}

export { formatDateToISO8601 };
