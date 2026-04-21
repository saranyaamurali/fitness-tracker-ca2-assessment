export const initialState = {
  activities: [],
  loading: true,
  error: "",
};

const ActivityReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: "",
      };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "TOGGLE_GOAL": {
      const { id } = action.payload;
      return {
        ...state,
        activities: state.activities.map((a) => {
          if (String(a.activityId) !== String(id)) return a;
          if (typeof a.goalAchieved !== "boolean") return a;
          const steps = Number(a.steps);
          const newGoal = steps >= 8000 ? true : !a.goalAchieved;
          if (newGoal === a.goalAchieved) return a;
          return { ...a, goalAchieved: newGoal };
        }),
      };
    }

    default:
      return state;
  }
};

export default ActivityReducer;