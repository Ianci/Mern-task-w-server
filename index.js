const express = require ("express");
 const connectDB = require('./config/config')
 const cors = require('cors');
//Create server
const app = express();
 
//Conectar a la BD
connectDB();

//cors
app.use(cors());
//Habilitar express.json
app.use(express.json({ extended: true}));
//Puerto de la App
const port = process.env.PORT || 4000;

 
//Routes import 

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));
app.use('/api/todo', require('./routes/todo'));

app.get('/', (req, res)=> {
    res.send("Server on")
})
//Arrancando la App
app.listen(port, () => { console.log(`El server está funcionando en el puerto ${port}`)})