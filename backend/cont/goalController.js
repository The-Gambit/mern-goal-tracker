const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id});
   
    res.status(200).json(goals); 
})

const setGoal = asyncHandler(async (req, res) => {
    
    if (!req.body.text){
        res.status(400);
        throw new Error("Please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(goal); 
})

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal){
        res.status(400);
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id);   
    if (!user){
        req.status(401);
        throw new Error("User not found")
    }

    if(goal.user.toString() !== user.id.toString()){ //make sure only the user who created the goal can update it
        res.status(401);
        throw new Error("Not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({message : `Updated goal ${req.params.id}`});
})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal){
        req.status(400);
        throw new Error("Goal not found")
    }
    
    const user = await User.findById(req.user.id);   
    if (!user){
        req.status(401);
        throw new Error("User not found")
    }

    if(goal.user.toString() !== user.id.toString()){ //make sure only the user who created the goal can update it
        res.status(401);
        throw new Error("Not authorized")
    }

    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({message : `Deleted goal ${req.params.id}`});
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}