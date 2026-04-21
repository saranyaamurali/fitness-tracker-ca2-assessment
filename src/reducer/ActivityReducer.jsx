const ActivityReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default ActivityReducer;