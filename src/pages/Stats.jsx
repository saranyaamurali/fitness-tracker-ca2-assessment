import React, { useEffect } from "react";
import { useActivity, isValidActivity } from "../context/ActivityContext";

const Stats = () => {
  const { activities, loading, error } = useActivity();

  const stats = activities
    .filter(isValidActivity)
    .reduce(
      (acc, a) => {
        acc.total += 1;
        if (a.goalAchieved === true) acc.goalAchieved += 1;
        if (a.goalAchieved === false) acc.goalNotAchieved += 1;
        return acc;
      },
      { total: 0, goalAchieved: 0, goalNotAchieved: 0 }
    );

  useEffect(() => {
    window.appState = {
      totalActivities: stats.total,
      goalAchieved: stats.goalAchieved,
      goalNotAchieved: stats.goalNotAchieved,
    };
  }, [activities]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app-container" data-testid="stats-page">
      <h1 className="main-title">Stats</h1>
      <p data-testid="total-activities">Total Activities: {stats.total}</p>
      <p data-testid="goal-achieved">Goal Achieved: {stats.goalAchieved}</p>
      <p data-testid="goal-not-achieved">Goal Not Achieved: {stats.goalNotAchieved}</p>
    </div>
  );
};

export default Stats;