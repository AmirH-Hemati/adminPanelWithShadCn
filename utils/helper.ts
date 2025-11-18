export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fa-IR");
}
export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان ";
}
