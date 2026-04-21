import React, { useState } from "react";
import { useActivity, isValidActivity } from "../context/ActivityContext";
import ActivityCard from "../components/ActivityCard";

const Filter = () => {
  const { activities, loading, error } = useActivity();
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [inputError, setInputError] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleFilter = () => {
    if (input.trim() === "") {
      setInputError("Please enter a step value.");
      setSubmitted(null);
      return;
    }
    const parsed = Number(input);
    if (isNaN(parsed) || parsed < 0) {
      setInputError("Please enter a valid positive number.");
      setSubmitted(null);
      return;
    }
    setInputError("");
    setSubmitted(parsed);
  };

  const validActivities = activities.filter(isValidActivity);

  const filtered =
    submitted !== null
      ? validActivities.filter((a) => Number(a.steps) >= submitted)
      : [];

  return (
    <div className="app-container">
      <h1 className="main-title">Filter Activities</h1>
      <div className="filter-row">
        <input
          type="number"
          placeholder="Minimum steps..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          data-testid="filter-input"
          className="filter-input"
        />
        <button onClick={handleFilter} className="btn-action">Apply Filter</button>
      </div>

      {inputError && <p className="error-text">{inputError}</p>}

      {submitted !== null && filtered.length === 0 && !inputError && (
        <p>No activities match that step count.</p>
      )}

      <div className="activity-list">
        {filtered.map((activity) => (
          <ActivityCard key={activity.activityId} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Filter;