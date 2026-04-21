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

    default:
      return state;
  }
};

export default ActivityReducer;