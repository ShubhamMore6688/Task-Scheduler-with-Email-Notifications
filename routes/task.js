import express from 'express';
import { deleteTask, historyTasks, myTasks, newTask, upcomingTasks } from '../controller/task.js';
const router = express.Router()


router.post("/newtask", newTask);
router.get("/mytasks", myTasks);
router.get("/delete/:id", deleteTask);
router.get("/upcomingtasks", upcomingTasks);
router.get("/history", historyTasks);


export default router;