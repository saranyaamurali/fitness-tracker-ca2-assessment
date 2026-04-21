import React from "react";
import { useActivity, isValidActivity } from "../context/ActivityContext";
import ActivityCard from "../components/ActivityCard";

const Activities = () => {
  const { activities, loading, error } = useActivity();

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;

  const validActivities = activities.filter(isValidActivity);

  if (validActivities.length === 0)
    return <p data-testid="no-activities">No activities found.</p>;

  return (
    <div className="app-container">
      <h1 className="main-title">Activities</h1>
      <div className="activity-list">
        {validActivities.map((activity) => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;