const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')


//api/task
router.post('/',
auth,
taskController.createTask
)

router.get('/',
    auth,
    taskController.getTasks
)

router.put('/:id',
    auth,
    [
  
        check("task", 'Please fill this input').not().isEmpty(),
        check("task", 'maximum 15 characters allowed').isLength({ max: 15}),
        
    ],

    taskController.updateTask
)


router.delete('/:id', 
    auth,
    taskController.deleteTask
);

module.exports = router