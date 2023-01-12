const { dbConnection } = require('./database/config');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//     res.redirect('/index.html');
// });

app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/modalidades', require('./routes/modalidades'));
app.use('/api/grados', require('./routes/grados'));
app.use('/api/secciones', require('./routes/secciones'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/tipos_activo', require('./routes/tipos_activo'));
app.use('/api/activos', require('./routes/activos'));
app.use('/api/inmobiliarios', require('./routes/inmobiliarios'));
app.use('/api/categoria_uniforme', require('./routes/categoria_uniforme'));
app.use('/api/uniformes', require('./routes/uniformes'));
app.use('/api/padres', require('./routes/padres'));
app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/pagos', require('./routes/pagos'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});