const Todo = require('../models/TodoModel')
const Task = require('../models/TaskModel')

const { validationResult } = require('express-validator')

exports.createTodo = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        
        //Task is equal to id of task
        //Ex. body 
        //"todo": "Learn react",
        //"task": "5fcf816c2dfeb43614b32c79"

        const { task } = req.body;

        //Is there a task ?
        const filteredTask = await Task.findById(task)
        if(!filteredTask){
            return res.status(404).json({ msg: 'No task found'})
        }

        //Auth user
        if(filteredTask.author.toString() !== req.user.id){
            return res.status(401).json({ msg : 'Not authorized'})
        }

        //Create todo
        const todo = new Todo(req.body)
        await todo.save()
        res.json({ todo })

    } catch (error) {
        console.log(error)
        res.status(500).send('There was an error')
    }
}

exports.getTodos = async (req, res) => {
    try {
        //Va query en vez de body porque lo estamos pasando como params
        //Task es la id del task, no su nombre
        const { task } = req.query;
        
        //Is there a task ?
        const filteredTask = await Task.findById(task)
        if(!filteredTask){
            return res.status(404).json({ msg: 'No task found'})
        }

        //Auth user
        if(filteredTask.author.toString() !== req.user.id){
            return res.status(401).json({ msg : 'Not authorized'})
        }

        const todos = await Todo.find({ task})
        res.json({ todos })
    } catch (error) {
        console.log(error)
        res.status(505).send('There was an error')
    }
}

 

exports.updateTodo = async (req, res ) => {
    try {
        const { task, todo, state } = req.body;
        
        // Todo exist ? 
        //Req.params sale de router.put('/:id',
        let todoUpdated = await Todo.findById(req.params.id);
        if(!todoUpdated){
            return res.status(404).json({ msg : 'Error. Todo not found'})
        }
        //Is there a task ?
        const filteredTask = await Task.findById(task)
       
        //Auth user
        if(filteredTask.author.toString() !== req.user.id){
            return res.status(401).json({ msg : 'Not authorized'})
        }

        
        const newTodo = {}
        if(todo) newTodo.todo = todo
        newTodo.state = state

        //Save new todo 
        todoUpdated = await Todo.findOneAndUpdate({ _id: req.params.id}, newTodo, { new: true });
        res.json({ todoUpdated })
       
    } catch (error) {
        
    }
}

exports.deleteTodo = async ( req, res ) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.send(404).json({ msg : "The todo does not exist"})
        }
         // Eliminar
         await Todo.findOneAndRemove({_id: req.params.id});
         res.json({msg: 'Todo deleted'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error')
    }
}