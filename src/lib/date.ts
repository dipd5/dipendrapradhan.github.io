export const gardenDateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

export function formatGardenDate(date: Date | string) {
  return gardenDateFormat.format(new Date(date));
}

export function toDateInput(date: Date | string) {
  return new Date(date).toISOString().slice(0, 10);
}
