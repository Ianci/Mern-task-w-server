const Task = require('../models/TaskModel')
const { validationResult } = require('express-validator')

//Crear Task
exports.createTask = async (req, res) => {
   
    try {
        const task = new Task(req.body);
        task.author = req.user.id
        
        task.save();
        res.json(task); 

    } catch (error) {
        console.log(error)
        res.status(500).send('There was an error')
    }
}
//Obtener task de la bd que coincidan con el id del author 
exports.getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({ author: req.user.id})
        res.json({ tasks })
    } catch (error) {
        console.log(error)
        res.status(505).send('There was an error')
    }
}

exports.updateTask = async( req, res ) => {
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array()})
    }
    
    const { task } = req.body;
    const newTask = {}

    if( task ) {
        newTask.task = task
    }

    try {
        //Id
        let task = await Task.findById(req.params.id)
        //If task does not exist
        if(!task){
            return res.status(404).json({ msg : 'Task not found'})
        }
        //Task author
        if(task.author.toString() !== req.user.id){
            return res.status(401).json({ msg : 'Not authorized'})
        }

        task = await Task.findByIdAndUpdate({ _id: req.params.id}, {$set : newTask}, { new: true});

        res.json({task})
    } catch (error) {
        res.status(500).send('Error')
    }
}

exports.deleteTask = async (req,res) => {
    try {
        
        let task = await Task.findById(req.params.id);

        
        if(!Task) {
            return res.status(404).json({msg: 'Task not found'})
        }

       
        if(task.author.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'Not allowed'});
        }

        
        await Task.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Task deleted '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }

}