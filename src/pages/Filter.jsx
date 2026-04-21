import React, { useState } from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityCard from "../components/ActivityCard";

const Filter = () => {
  const { activities, loading } = useActivity();
  const [query, setQuery] = useState("");

  if (loading) return <p>Loading...</p>;

  const filtered = activities.filter((a) =>
    (a.name || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="main-title">Filter Activities</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="filter-input"
        className="filter-input"
      />
      <div className="activity-list">
        {filtered.length === 0 ? (
          <p>No matching activities.</p>
        ) : (
          filtered.map((activity) => (
            <ActivityCard key={activity.activityId} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Filter;