import { Button } from "@mui/base";
import { Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classnames from 'classnames';
import { UpdateTaskForm } from "./UpdateTaskForm";
import axios from 'axios';
import { API_URL } from "../utils";
export const Task = ({task,fetchTasks}) =>{
    const {id,name,completed} = task;
    const[isComplete,setIsComplete] = useState(completed);
    const[isDialogOpen,setIsDialogOpen] =  useState(false);

    const handleUpdateTaskCompletion = async() =>{
        try{
            await axios.put(API_URL,{
            id,
            name,
            completed : !isComplete,
        });
        setIsComplete((prev) => !prev)
       
        
    }catch (err){
        console.log(err);
    }
};
    const handleDeleteTask = async () =>{
        try{
            /*{apending the API id in the delete function.}*/
            await axios.delete()
            await fetchTasks()

        }catch (err){
            console.log(err);

        }

    }
    return(
        <div className='task'> 
            <div className={classnames('flex', { done: isComplete })}>
            <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion}/>
            <Typography variant="h4">{name}</Typography>
            </div>
        {/*for updating the task*/}
            <div className="taskButtons">
            <Button variant = "contained" onClick={() => setIsDialogOpen(true)}>
                <EditIcon/>
            </Button>
         {/*for deleting a task*/}
            <Button color="error" variant = "contained" onClick={handleDeleteTask}>
                <DeleteIcon/>
            </Button>
            </div>
            <UpdateTaskForm
            fetchTasks={fetchTasks}
            isDialogOpen = {isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            task={task}
            />
                
            </ div>
        )
}