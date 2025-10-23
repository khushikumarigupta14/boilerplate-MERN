export const dateUtils = {
  now: () => new Date(),
  format: (date) => date.toISOString().split("T")[0],
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  isExpired: (date) => date.getTime() < Date.now(),
};
