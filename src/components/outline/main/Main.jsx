import React from "react";
import Overview from "../../features/overview/Overview";
import Calender from "../../features/calender/Calender";
import TodoList from "../../features/todoList/TodoList";
import Settings from "../../features/settings/Settings";

const Main = ({ activeView }) => {
  return (
    <main className="main">
      {activeView === "overview" && <Overview />}
      {activeView === "calendar" && <Calender />}
      {activeView === "todo" && <TodoList />}
      {activeView === "settings" && <Settings />}
      {/* Add more views as needed */}
    </main>
  );
};

export default Main;
