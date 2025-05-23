// Upcoming events (next 3 days)
export default function upcomingEvents(events) {
  events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    }).sort((a, b) => a.date - b.date);
}

// Get days in month
export default function getDaysInMonth(month, year){
    return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (0 = Sunday, 1 = Monday, etc.)
export default function getFirstDayOfMonth (month, year) {
    return new Date(year, month, 1).getDay();
};

// Format date to time string (e.g., "10:00 AM")
export default function formatTime (date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Format full date (e.g., "Mar 12, 2025")
export default function formatDate (date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};