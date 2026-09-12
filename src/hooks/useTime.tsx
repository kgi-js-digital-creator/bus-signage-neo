import { useContext } from "react";

import { TimeContext } from "../context/TimeContext";


export default function useTime() {
  const context = useContext(TimeContext);

  if (!context) {
    throw new Error("useTime must be used within TimeProvider");
  }

  return context;
}