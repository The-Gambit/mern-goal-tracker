import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import { useGoalContext } from "../contexts/goalContext";
import { GoalItem } from "./goalItem";
import axios from "../api/axios";

//get the goals from the api and set them to the goals state

export const GoalsList = () => {

    const { goals, setGoals } = useGoalContext();
    const { auth } = useUserContext();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteGoal = async (id) => {
        try {
            setIsLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
            const response = await axios.delete(`/goals/${id}`, config);
            if (response.status === 200) {
                setGoals(goals.filter(goal => goal.id !== id));

                console.log(response.data)

                console.log("deleted")

                localStorage.setItem("goals", JSON.stringify(goals));
                setIsLoading(false);

            }

        } catch (err) {
            console.log(err);
            setIsLoading(false);

            setIsError(true);
        }

    }

    const getGoals = async () => {
        try {
            // setIsLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            }
            const response = await axios.get('/goals', config);


            setGoals(response.data);
            localStorage.setItem('goals', JSON.stringify(response.data));
            console.log(goals)
            setIsLoading(false);

        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsError(true);
        }

    };

    useEffect(() => {
        if (!isLoading) {
            getGoals();
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            isLoading ?
                <div className="loadingSpinnerContainer">
                    <div className="loadingSpinner"></div>
                </div> : null
        )
    }

    return (
        <div className="goals" >

            <section className="content">
                {goals?.length > 0 ? goals.map(goal => <GoalItem key={goal._id} goal={goal} deleteGoal={deleteGoal} />) :
                    <h3>You have not set any goals</h3>}
            </section>

        </div>

    )
}
