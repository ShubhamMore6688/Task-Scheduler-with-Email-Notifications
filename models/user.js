import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});


export const User = mongoose.model("user", Schema);

