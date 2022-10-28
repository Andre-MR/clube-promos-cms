export default function DateFormatter(date: Date) {
  const dateLocal = new Date(date);
  dateLocal.setMinutes(dateLocal.getMinutes() - dateLocal.getTimezoneOffset());
  const dateStr = dateLocal.toISOString();

  return `${dateStr.substring(8, 10)}/${dateStr.substring(
    5,
    7
  )}/${dateStr.substring(0, 4)}`;
}
