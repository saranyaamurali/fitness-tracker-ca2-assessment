import React from "react";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <div
      className="activity-card"
      data-testid="activity-item"
      onClick={() => navigate(`/activities/${activity.activityId}`)}
    >
      <h3>{activity.name || "Unnamed Activity"}</h3>
      <p>Date: {activity.date || "N/A"}</p>
      <p>Steps: {activity.steps ?? "N/A"}</p>
      <p>Calories Burned: {activity.caloriesBurned ?? "N/A"}</p>
      <p>Workout Minutes: {activity.workoutMinutes ?? "N/A"}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
    </div>
  );
};

export default ActivityCard;