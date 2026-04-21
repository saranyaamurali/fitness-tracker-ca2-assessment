import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const { activities, loading, error } = useActivity();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!id) return <p>Activity not found.</p>;

  const activity = activities.find(
    (a) => String(a.activityId) === String(id)
  );

  if (!activity) return <p>Activity not found.</p>;

  const calories = Number(activity.caloriesBurned);
  const minutes = Number(activity.workoutMinutes);

  const efficiencyScore =
    minutes > 0
      ? (calories / minutes).toFixed(2)
      : "N/A (division by zero)";

  return (
    <div className="app-container">
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      <h1 className="main-title">{activity.name || "Unknown"}</h1>
      <div className="detail-card">
        <p><strong>Date:</strong> {activity.date || "No Date"}</p>
        <p><strong>Steps:</strong> {activity.steps ?? "N/A"}</p>
        <p><strong>Calories Burned:</strong> {activity.caloriesBurned ?? "N/A"}</p>
        <p><strong>Workout Minutes:</strong> {activity.workoutMinutes ?? "N/A"}</p>
        <p><strong>Goal Achieved:</strong> {activity.goalAchieved ? "Yes" : "No"}</p>
        <p><strong>Efficiency Score:</strong> {efficiencyScore} cal/min</p>
      </div>
    </div>
  );
};

export default ActivityDetail;