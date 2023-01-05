function DateFormatterBR(date: Date) {
  const dateLocal = new Date(date);
  const dateStr = dateLocal.toISOString();
  return `${dateStr.substring(8, 10)}/${dateStr.substring(
    5,
    7
  )}/${dateStr.substring(0, 4)}`;
}

function DateFormatterUS(date: Date) {
  const dateLocal = new Date(date);
  const dateStr = dateLocal.toISOString();
  return `${dateStr.substring(0, 4)}-${dateStr.substring(
    5,
    7
  )}-${dateStr.substring(8, 10)}`;
}

export { DateFormatterBR, DateFormatterUS };
