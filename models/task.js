import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    dueDate: Date,

    priority : {
        type: String,
        enum: ['high','medium','low']
    },

    taskStatus: {
        type: String,
        enum: ['notStarted','inProgress','completed','canceled'],
        default: 'notStarted'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


});

export const Tasks = mongoose.model("tasks", taskSchema );