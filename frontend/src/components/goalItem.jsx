export const GoalItem = ({ goal, deleteGoal}) => {
    // console.log(deleteGoal);
    return(
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <button className="close" onClick={() => deleteGoal(goal._id)}>X</button>
        </div>

    )
}