import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const renderPriorityStars = (priority) => {
  let stars = 1;
  let color = "green";

  if (priority === "medium") {
    stars = 2;
    color = "orange";
  } else if (priority === "high") {
    stars = 3;
    color = "red";
  }

  return (
    <span className="priority-stars" style={{ color }}>
      {Array.from({ length: stars }).map((_, i) => (
        <FontAwesomeIcon icon={faStar} key={i} />
      ))}
    </span>
  );
};

export default renderPriorityStars;
