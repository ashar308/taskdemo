/*{const express = require('express') we are replacing with the import statements}*/
import express from 'express';
import { fetchTasks, createTasks, deleteTasks } from './task';
import serverless from 'serverless-http';
import cors from 'cors';


const app = express()
const port = 3001;

app.use(express.json());
/*{If we didnt do that and we run out server locally we will always get a coors error}*/
if (process.env.DEVELOPMENT){
  app.use(cors());
}

/*{get is there to fetch the data}*/

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/task', async(req, res) => {
    try {
      const tasks = await fetchTasks();
      res.send(tasks.Items)
    }catch (err){
      res.status(400).send(`Error fetching tasks: ${err}`)
    }
      

  });
/*{app.post will create our data}*/

app.post('/task', async(req, res) => {
  try {
    const task = req.body;
    const response = await createTasks(tasks);

  }catch(err){
    res.status(400).send(`Error creating tasks ${err}`);

  }

  });
/*{app.put will update our data}*/
app.put('/task', async(req, res) => {
  try {
    const task = req.body;
    const response = await updateTasks(tasks);
    res.send(response);

  }catch(err){
    res.status(400).send(`Error Updating tasks ${err}`);

  }
  });
/*{app.put will delete our data and the function uses a parameter}*/
app.delete('/task/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const response = await deleteTasks(id);
    res.send(response);

  }catch(err){
    res.status(400).send(`Error deleting tasks ${err}`);

  }
  });
/*{When we are running the server locally we can use this method and when we run the npm run dev locally rather than starting the server using npm start}*/
if (process.env.DEVELOPMENT){
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}
/*{we are just exporting the serverlss}*/
export const handler = serverless(app);