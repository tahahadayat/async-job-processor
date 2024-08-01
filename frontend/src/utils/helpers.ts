export const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }
  return Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(date));
};
