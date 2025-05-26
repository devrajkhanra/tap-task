// Upcoming events (next 3 days)
export function upcomingEvents(events) {
  events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    })
    .sort((a, b) => a.date - b.date);
}

// Get days in month
export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
export function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

// Format date to time string (e.g., "10:00 AM")
export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Format full date (e.g., "Mar 12, 2025")
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Get remaining time until due date
export function getRemainingTime(dueDate) {
  const now = new Date();
  const diff = new Date(dueDate) - now;

  if (diff <= 0) return "Completed";

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  return `${minutes} minutes`;
}
