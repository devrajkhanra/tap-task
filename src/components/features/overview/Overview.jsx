import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardCheck,
  faChartLine,
  faClock,
  faCheckCircle,
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import "./Overview.css"; // You can create a separate CSS file for Overview if needed

const Overview = () => {
  // Sample data for dashboard
  const stats = [
    {
      id: 1,
      title: "Total Tasks",
      value: "248",
      icon: faClipboardCheck,
      color: "#3498db",
    },
    {
      id: 2,
      title: "Team Members",
      value: "12",
      icon: faUsers,
      color: "#27ae60",
    },
    {
      id: 3,
      title: "Progress",
      value: "67%",
      icon: faChartLine,
      color: "#f39c12",
    },
    {
      id: 4,
      title: "Hours Tracked",
      value: "164",
      icon: faClock,
      color: "#9b59b6",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Alex Morgan",
      action: "completed",
      task: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Sarah Chen",
      action: "commented on",
      task: "Mobile App Development",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "James Wilson",
      action: "created",
      task: "Client Meeting Notes",
      time: "Yesterday",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "updated",
      task: "Q1 Marketing Strategy",
      time: "Yesterday",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Update user dashboard UI",
      dueDate: "Today",
      status: "completed",
      priority: "High",
    },
    {
      id: 2,
      title: "Fix navigation responsiveness",
      dueDate: "Today",
      status: "in-progress",
      priority: "High",
    },
    {
      id: 3,
      title: "Implement search functionality",
      dueDate: "Mar 15",
      status: "pending",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Create analytics report",
      dueDate: "Mar 20",
      status: "pending",
      priority: "Low",
    },
    {
      id: 5,
      title: "Client presentation",
      dueDate: "Mar 25",
      status: "pending",
      priority: "High",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="status-icon completed"
          />
        );
      case "in-progress":
        return (
          <FontAwesomeIcon
            icon={faSpinner}
            className="status-icon in-progress"
          />
        );
      case "pending":
        return (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="status-icon pending"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="overview">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <div className="dashboard-actions">
          <button className="dashboard-button secondary">Export</button>
          <button className="dashboard-button primary">+ New Task</button>
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.id}>
            <div
              className="stat-icon"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card tasks-overview">
          <div className="card-header">
            <h2 className="card-title">Tasks Overview</h2>
            <a href="#" className="card-link">
              View All
            </a>
          </div>
          <div className="tasks-list">
            {tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div className="task-status">{getStatusIcon(task.status)}</div>
                <div className="task-details">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-meta">
                    Due: <span className="task-due">{task.dueDate}</span> •
                    Priority:{" "}
                    <span
                      className={`task-priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
            <a href="#" className="card-link">
              View All
            </a>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-user">
                  {activity.user.split(" ")[0][0]}
                  {activity.user.split(" ")[1][0]}
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <span className="activity-user-name">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="activity-task">{activity.task}</span>
                  </p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
