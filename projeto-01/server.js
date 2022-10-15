// Export nescessary dependencies
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const parser = require('body-parser');

// Configure Express
const application = express();
application.engine('html', ejs.renderFile);
application.set('view engine', 'html');
application.use('/public', express.static(path.join(__dirname, 'public')));
application.set('views', path.join(__dirname, 'views'));

// Configurando `Body-Parser`
application.use(parser.json());
application.use(parser.urlencoded({ extended: true }))

// Configurando Lista de tarefas
let tasks = ['Tarefa 01', 'Tarefa 02', 'Tarefa 03'];

// Criando primeira rota
application.get('/', (request, response) => {
    const object = { list: tasks }
    response.render('index', object);
});

application.post('/', (request, response) => {
    tasks.push(request.body.tarefa);
    response.render('index', { list: tasks });
})

application.get('/deletar/:id', (request, response) => {
    const id = request.params.id
    tasks = tasks.filter((task, index) => {
        if (index != id) { return task;  }
    })
    const object = { list: tasks }
    response.render('index', object)
})

// Ouvindo a porta 8080
application.listen(8080, () => {
    console.log('Server is ON!')
});