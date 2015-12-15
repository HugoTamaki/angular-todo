var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/todo_app');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// defining models
var Todo = mongoose.model('Todo', {
  text: String
});

// defining routes

// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will be executed.
    if (err)
      res.send(err)

    res.json(todos);
  });
});

// create a todo
app.post('/api/todos', function(req, res) {

  // create a todo
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err)
      res.send(err);

    Todo.find(function(err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });
  })
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    Todo.find(function(err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });
  })
});

// application
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
