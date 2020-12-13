
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const todoController = require('../controllers/todoController')
const auth = require('../middlewares/auth')

//api/todos
router.post('/',
[
  
    check("todo", 'Please fill this input').not().isEmpty(),
    check("todo", 'maximum 45 characters allowed').isLength({ max: 45}),
    
],
auth,
todoController.createTodo
)

router.get('/',
auth,
todoController.getTodos

)

router.put('/:id',
    auth,
    [
  
        check("todo", 'Please fill this input').not().isEmpty(),
        check("todo", 'maximum 45 characters allowed').isLength({ max: 45}),
        
    ],

    todoController.updateTodo
)

router.delete('/:id',
    auth,
    todoController.deleteTodo
)
module.exports = router