import { Tasks } from "../models/task.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import sendEmail from "../services/emailService.js";

export const newTask = async (req,res) => {
   try {
    const {title, description, dueDate, priority, taskStatus, user} = req.body;
    const {token} = req.cookies;
    
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }
    const decoded = jwt.verify(token, process.env.SECRATE_TOKEN);
    const userid = await User.findById(decoded._id);
    await Tasks.create({
        title,description, dueDate, priority, taskStatus, user: userid._id
    });
    await sendEmail(title, description, 'shubhamdmore6688@gmail.com' );
    res.status(200).json({
        success: true, 
        message: "Task added successfully"
    });
   } catch (error) {
    res.status(500).json({
        error: "Internal server error"
    })
   }
}


export const myTasks = async (req,res) =>{
    try {
        const {token} = req.cookies;
    const {status, sortBy, dueDate } = req.query;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        });
    };

    const decoded = jwt.verify(token, process.env.SECRATE_TOKEN);
    const user = await User.findById(decoded._id);
    // const task= await Tasks.find({user: user._id});
    const query = {};
    if(status){
        query.taskStatus = status;
    }
    

    const sortCriteria = {};
    if(sortBy=='dueDate'){
        sortCriteria.dueDate = 1;
    }
    const task= await Tasks.find(query).sort(sortCriteria);


    res.json({
        success: true,
        task
    });
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
};




export const deleteTask = async(req,res) =>{

    try {
        const{id} = req.params;
    const task = Tasks.findById(id);
    if(!task){
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    };

    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "task deleted successfully"
    });
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }

};



export const upcomingTasks = async (req, res) =>{
   try {
    const {token} = await req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        })
    }

    const decoded = jwt.verify(token, process.env.SECRATE_TOKEN);
    const userid = await User.findById(decoded._id);

    const tasks = await Tasks.find({user: userid, dueDate: {$gte : new Date()}});
    res.status(200).json({
        success: true,
        tasks
    })
   } catch (error) {
    res.status(500).json({error: "Internal server error"})
   }
}


export const historyTasks = async (req,res) =>{
   try {
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "Login first"
        }) 
    }

    const decoded = jwt.verify(token, process.env.SECRATE_TOKEN);
    const userid = await User.findById(decoded._id);

    const tasks = await Tasks.find({
        user: userid,
        $or : [{taskStatus: 'completed' }, {dueDate: {$lt : new Date()}}]
    })

    res.status(200).json({
        success: true, 
        tasks
    })
   } catch (error) {
    res.status(500).json({error: "Internal server error"})
   }
}