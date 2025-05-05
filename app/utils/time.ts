type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export const timeFormate = (
  language: string,
  date: Date,
  options?: DateTimeFormatOptions,
) => new Intl.DateTimeFormat(language, options).format(date);

export const getTodayInfo = () => {
  const today = new Date();
  // Get day name (e.g., "Monday")
  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    today,
  );

  // Get day of the month (e.g., "21")
  const dayDate = today.getDate();

  // Get abbreviated month (e.g., "Jan")
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today,
  );

  // Get full year (e.g., "2025")
  const year = today.getFullYear();

  return { dayName, dayDate, month, year };
};
