// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faChartBar } from "@fortawesome/free-regular-svg-icons";
// import { faGear, faInfo, faList } from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-section">
//         <h2 className="section-title">Features</h2>
//         <nav className="sidebar-nav">
//           <a href="#" className="nav-link active">
//             <FontAwesomeIcon icon={faChartBar} className="nav-icon" />
//             <span className="nav-text">Overview</span>
//           </a>
//           <a href="#" className="nav-link">
//             <FontAwesomeIcon icon={faCalendar} className="nav-icon" />
//             <span className="nav-text">Calendar</span>
//           </a>
//           <a href="#" className="nav-link">
//             <FontAwesomeIcon icon={faList} className="nav-icon" />
//             <span className="nav-text">To-Do List</span>
//           </a>
//         </nav>
//       </div>
//       <div className="sidebar-divider"></div>
//       <div className="sidebar-section">
//         <h2 className="section-title">Settings</h2>
//         <nav className="sidebar-nav">
//           <a href="#" className="nav-link">
//             <FontAwesomeIcon icon={faGear} className="nav-icon" />
//             <span className="nav-text">Settings</span>
//           </a>
//           <a href="#" className="nav-link">
//             <FontAwesomeIcon icon={faInfo} className="nav-icon" />
//             <span className="nav-text">Help Center</span>
//           </a>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faGear, faInfo, faList } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ open, onNavigate, activeView }) => {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-section">
        <h2 className="section-title">Features</h2>
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-link ${activeView === "overview" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("overview");
            }}
          >
            <FontAwesomeIcon icon={faChartBar} className="nav-icon" />
            <span className="nav-text">Overview</span>
          </a>
          <a
            href="#"
            className={`nav-link ${activeView === "calendar" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("calendar");
            }}
          >
            <FontAwesomeIcon icon={faCalendar} className="nav-icon" />
            <span className="nav-text">Calendar</span>
          </a>
          <a
            href="#"
            className={`nav-link ${activeView === "todo" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("todo");
            }}
          >
            <FontAwesomeIcon icon={faList} className="nav-icon" />
            <span className="nav-text">To-Do List</span>
          </a>
        </nav>
      </div>
      <div className="sidebar-divider"></div>
      <div className="sidebar-section">
        <h2 className="section-title">Settings</h2>
        <nav className="sidebar-nav">
          <a
            href="#"
            className={`nav-link ${activeView === "settings" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("settings");
            }}
          >
            <FontAwesomeIcon icon={faGear} className="nav-icon" />
            <span className="nav-text">Settings</span>
          </a>
          <a
            href="#"
            className={`nav-link ${activeView === "help" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("help");
            }}
          >
            <FontAwesomeIcon icon={faInfo} className="nav-icon" />
            <span className="nav-text">Help Center</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
