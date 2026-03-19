export const formatSuspensionDateTime = (message = '') =>
  String(message).replace(
    /(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?/g,
    (_, date, hour, minute) => `${date} ${Number(hour)}:${Number(minute)}`
  );
