export function formatDate(dateString: string) {
  const d = new Date(dateString);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString();
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
