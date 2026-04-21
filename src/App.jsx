import React from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { ActivityProvider } from "./context/ActivityContext";

const App = () => {
  return (
    <ActivityProvider>
      <AppRouter />
    </ActivityProvider>
  );
};

export default App;