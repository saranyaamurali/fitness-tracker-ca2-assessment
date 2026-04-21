import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

const Stats = () => {
  const { activities, loading } = useActivity();

  const total = activities.length;
  const goalAchieved = activities.filter((a) => a.goalAchieved === true).length;
  const goalNotAchieved = activities.filter((a) => a.goalAchieved !== true).length;

  useEffect(() => {
    window.appState = {
      totalActivities: total,
      goalAchieved: goalAchieved,
      goalNotAchieved: goalNotAchieved,
    };
  }, [activities]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container" data-testid="stats-page">
      <h1 className="main-title">Stats</h1>
      <p data-testid="total-activities">Total Activities: {total}</p>
      <p data-testid="goal-achieved">Goal Achieved: {goalAchieved}</p>
      <p data-testid="goal-not-achieved">Goal Not Achieved: {goalNotAchieved}</p>
    </div>
  );
};

export default Stats;