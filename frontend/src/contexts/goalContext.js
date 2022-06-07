import { useState, createContext, useContext } from "react";

const GoalContext = createContext(null);

export const GoalContextProvider = ({ children }) => {

    const [goals, setGoals] = useState(
        JSON.parse(localStorage.getItem('goals')) || null
    )

    return (
        <GoalContext.Provider value={{ goals, setGoals }} >
            {children}
        </GoalContext.Provider>
    )

}

export const useGoalContext = () => useContext(GoalContext)