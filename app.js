const express = require('express');
const app = express();
const port = 3000;


const globalhandler = (req, res, next) => {
    console.log(`${req.method} requeston on ${req.url}`);
    next();
}

app.use(globalhandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const tasks = [
    {
        id: 1,
        title: "Write project proposal",
        description: "Draft the initial project proposal and share with the team",
        completed: false,
        priority: "high",          // low | medium | high
    },
    {
        id: 2,
        title: "Create a new project",
        description: "Create a new project using Magic",
        completed: false,
        priority: "medium",          // low | medium | high

    },
    {
        id: 3,
        title: "Fix login bug",
        description: "Debug and fix the issue where users can't log in",
        completed: true,
        priority: "low",          // low | medium | high

    }
];

const validateTask = (req, res, next) => {
    const { title, description, completed } = req.body;
    if (!title || !description) {
        console.error("404 error  title and description are required");
        return res.status(404).send("title and description are required");
    }
    if (completed != undefined && typeof completed !== "boolean") {
        console.error("404 error  completed must be boolean value");
        return res.status(404).send("completed must be boolean value");
    }
    next();
}



app.get('/', (req, res, next) => {
    res.send('Helloworld project 1 crud operations');
})
//get all tasks
app.get('/api/v1/tasks', (req, res, next) => {
    let result_tasks = tasks;
    //?completed =true;
    if (req.query.completed != undefined) {
        const completed = req.query.completed === "true";
        result_tasks = result_tasks.filter(c => c.completed === completed)
    }

    if (req.query.sort) {
        const order = req.query.sort === "desc" ? -1 : 1;
        result_tasks = result_tasks.sort((a, b) => (a.id > b.id ? order : -order));
    }

    req.data = result_tasks;
    next();
})
//get task based on priority level
app.get('/api/v1/tasks/priority/:level', (req, res, next) => {
    const level = req.params.level;
    const validatelevels = ['low', 'medium', 'high'];
    if (!validatelevels.includes(level)) {
        return res.status(404).send('Invalid priority level');
    }
    const result_tasks = tasks.filter(c => c.priority == level);
    req.data = result_tasks;
    next();
})

//get task with specific id
app.get('/api/v1/tasks/:id', (req, res, next) => {
    const task_Id = req.params.id;
    const task = tasks.find(c => c.id == task_Id);
    if (!task) {
        return res.status(404).send({ message: 'Task not found' });
    }

    req.data = task
    next();
})

// post->create new task details
app.post('/api/v1/tasks', validateTask, (req, res, next) => {
    console.log("onpostrequired:", req.body);
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    req.data = tasks;
    next();
});
// put->update the task detials
app.put('/api/v1/tasks/:id', validateTask, (req, res, next) => {
    const task_id = req.params.id;
    const newtask = req.body;
    const task = tasks.find(c => c.id == task_id);

    if (!task) {
        return res.status(404).send({ message: "task not found" });
    }
    task.completed = newtask.completed;
    task.description = newtask.description;
    task.title = newtask.title;
    task.priority = newtask.priority;
    req.data = tasks;
    next();
})

//delete task details 
app.delete('/api/v1/tasks/:id', (req, res, next) => {
    const task_id = req.params.id;
    const index = tasks.findIndex(c => c.id == task_id);
    if (index == -1) {
        return res.status(404).send({ message: "task not found" })
    }

    const updatedtasks = tasks.splice(index, 1);
    console.log('deletedtasks', updatedtasks);
    req.data = tasks;
    next();
})


const formatresponser = (req, res, next) => {
    res.send({
        status: "success",
        data: req.data
    })
    return;
}

app.use(formatresponser);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;