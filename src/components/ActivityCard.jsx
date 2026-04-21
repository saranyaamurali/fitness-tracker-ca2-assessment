import React from "react";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();
  const { toggleGoal } = useActivity();

  const steps = Number(activity.steps);
  const autoGoal = steps >= 8000;

  return (
    <div className="activity-card" data-testid="activity-item">
      <h3>{activity.name || "Unknown"}</h3>
      <p>Date: {activity.date || "No Date"}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
      <div className="card-actions">
        <button
          onClick={() => navigate(`/activities/${activity.activityId}`)}
          className="btn-link"
        >
          View Details
        </button>
        {!activity.goalAchieved && (
          <button
            onClick={() => toggleGoal(activity.activityId)}
            className="btn-action"
          >
            {autoGoal ? "Auto Achieve" : "Mark Achieved"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;