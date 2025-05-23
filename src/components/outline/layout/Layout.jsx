// import React, { useState } from "react";
// import Main from "../main/Main";
// import Sidebar from "../sidebar/Sidebar";
// import "./Layout.css";
// import Header from "../header/Header";

// const Layout = ({ activeView, onNavigate }) => {
//   return (
//     <>
//       <Header />
//       <div className="container">
//         <Sidebar activeView={activeView} onNavigate={onNavigate} />
//         <div className="main-wrapper">
//           <Main activeView={activeView} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

// Layout.jsx
import React, { useState } from "react";
import Main from "../main/Main";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import "./Layout.css";

const Layout = ({ activeView, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleCloseSidebar = () => setSidebarOpen(false); // helpful on nav click

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="container">
        <Sidebar
          open={sidebarOpen}
          activeView={activeView}
          onNavigate={(view) => {
            onNavigate(view);
            handleCloseSidebar(); // auto‑collapse on navigation (optional)
          }}
        />
        <div className="main-wrapper">
          <Main activeView={activeView} />
        </div>
      </div>
    </>
  );
};

export default Layout;
