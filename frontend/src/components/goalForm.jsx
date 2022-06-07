import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useGoalContext } from "../contexts/goalContext";
import axios from "../api/axios";

export const GoalForm = () => {

    const [text, setText] = useState('');
    const { goals, setGoals } = useGoalContext();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = useUserContext();

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        //send an axios request with json token as bearer
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            }

            const response = await axios.post('/goals', JSON.stringify({ text: text }), config);
            setText('');

            if (response.status === 200) {
                console.log("success");
            }

            setGoals([...goals, response.data]);

            setIsLoading(false);

        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsError(true);
        }

    }
    
    if (isLoading) {
        return (
            isLoading ?
                <div className="loadingSpinnerContainer">
                    <div className="loadingSpinner"></div>
                </div> : null
        )
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" value={text} onChange={onChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Goal</button>
                </div>
            </form>
        </section>
    )

}