import { createContext, useContext, useEffect, useReducer } from "react";
import { getToken, getDataset } from "../api/api";
import ActivityReducer, { initialState } from "../reducer/ActivityReducer";

export const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const tokenRes = await getToken("E0323005", "570562", "setB");
        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);

        if (!isMounted) return;
        dispatch({ type: "FETCH_SUCCESS", payload: dataset });
      } catch (error) {
        if (!isMounted) return;
        dispatch({ type: "FETCH_ERROR", payload: error?.message || "Unable to fetch activities." });
      }
    };

    fetchActivities();
    return () => { isMounted = false; };
  }, []);

  return (
    <ActivityContext.Provider value={{
      activities: state.activities,
      loading: state.loading,
      error: state.error,
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) throw new Error("useActivity must be used within ActivityProvider");
  return context;
};