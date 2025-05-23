import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faClock,
  faUser,
  faMapMarkerAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "./Calender.css";

const Calendar = () => {
  // Current date information
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2025, 4, 9, 10, 0),
      endDate: new Date(2025, 4, 9, 11, 30),
      type: "meeting",
      location: "Conference Room A",
      participants: ["Alex Morgan", "Sarah Chen", "James Wilson"],
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2025, 4, 15, 18, 0),
      type: "deadline",
      reminder: true,
    },
    {
      id: 3,
      title: "Client Call",
      date: new Date(2025, 4, 12, 14, 0),
      endDate: new Date(2025, 4, 12, 15, 0),
      type: "call",
      location: "Zoom",
      participants: ["Emily Davis", "Client Team"],
    },
    {
      id: 4,
      title: "Design Review",
      date: new Date(2025, 4, 18, 13, 0),
      endDate: new Date(2025, 4, 18, 14, 30),
      type: "meeting",
      location: "Design Lab",
      participants: ["Design Team", "Product Manager"],
    },
    {
      id: 5,
      title: "Weekly Status Update",
      date: new Date(2025, 4, 15, 9, 0),
      endDate: new Date(2025, 4, 15, 10, 0),
      type: "meeting",
      recurring: true,
      location: "Main Conference Room",
    },
  ];

  // Upcoming events (next 3 days)
  const upcoming = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const diffTime = eventDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    })
    .sort((a, b) => a.date - b.date);

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date to time string (e.g., "10:00 AM")
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format full date (e.g., "Mar 12, 2025")
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if a date has events
  const hasEvents = (day) => {
    return events.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => a.date - b.date);
  };

  // Get event type class
  const getEventTypeClass = (type) => {
    switch (type) {
      case "meeting":
        return "event-meeting";
      case "call":
        return "event-call";
      case "deadline":
        return "event-deadline";
      default:
        return "";
    }
  };

  // Render calendar days
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const days = [];

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const dayEvents = getEventsForDay(day);
      const hasEventsClass = dayEvents.length > 0 ? "has-events" : "";

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${hasEventsClass}`}
        >
          <div className="day-number">{day}</div>
          {dayEvents.length > 0 && (
            <div className="day-events">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`day-event ${getEventTypeClass(event.type)}`}
                >
                  <span className="event-time">
                    {formatTime(new Date(event.date))}
                  </span>
                  <span className="event-title">{event.title}</span>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="more-events">+{dayEvents.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <main className="main calendar-main">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Calendar</h1>
        <div className="dashboard-actions">
          <button className="dashboard-button primary">
            <FontAwesomeIcon icon={faPlus} className="button-icon" />
            New Event
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-sidebar">
          <div className="month-mini-calendar">
            <div className="mini-calendar-header">
              <h3>{formatDate(today)}</h3>
            </div>
            <div className="upcoming-events">
              <h3 className="upcoming-title">Upcoming Events</h3>
              {upcoming.length > 0 ? (
                <div className="upcoming-list">
                  {upcoming.map((event) => (
                    <div
                      key={event.id}
                      className={`upcoming-event ${getEventTypeClass(
                        event.type
                      )}`}
                    >
                      <div className="upcoming-event-date">
                        <div className="event-day">{event.date.getDate()}</div>
                        <div className="event-month">
                          {monthNames[event.date.getMonth()].substring(0, 3)}
                        </div>
                      </div>
                      <div className="upcoming-event-details">
                        <h4 className="upcoming-event-title">{event.title}</h4>
                        <div className="upcoming-event-time">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="event-icon"
                          />
                          <span>{formatTime(new Date(event.date))}</span>
                          {event.endDate && (
                            <span>
                              {" "}
                              - {formatTime(new Date(event.endDate))}
                            </span>
                          )}
                        </div>
                        {event.location && (
                          <div className="upcoming-event-location">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="event-icon"
                            />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.participants && (
                          <div className="upcoming-event-participants">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="event-icon"
                            />
                            <span>
                              {event.participants.length} participants
                            </span>
                          </div>
                        )}
                        {event.reminder && (
                          <div className="upcoming-event-reminder">
                            <FontAwesomeIcon
                              icon={faBell}
                              className="event-icon"
                            />
                            <span>Reminder set</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">
                  No upcoming events in the next 3 days
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="calendar-main-area">
          <div className="calendar-header">
            <div className="calendar-nav">
              <button className="calendar-nav-btn" onClick={prevMonth}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <h2 className="calendar-title">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button className="calendar-nav-btn" onClick={nextMonth}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              <div className="weekday">Sun</div>
              <div className="weekday">Mon</div>
              <div className="weekday">Tue</div>
              <div className="weekday">Wed</div>
              <div className="weekday">Thu</div>
              <div className="weekday">Fri</div>
              <div className="weekday">Sat</div>
            </div>

            <div className="calendar-days">{renderDays()}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;
