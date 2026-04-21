import { createContext, useContext, useReducer, useEffect } from "react";
import ActivityReducer from "../reducer/ActivityReducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
  activities: [],
  loading: true,
};

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tokenRes = await getToken("e0323005", "570562", "setB");
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);
        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchActivities();
  }, []);

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);