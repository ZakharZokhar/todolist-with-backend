const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

app.use(cors());
//To run locally "mongodb://localhost:27017/todoListDatabase"
mongoose.connect("mongodb://mongodb:27017/todoListDatabase", {useNewUrlParser: true});

const todoSchema = {
  todo: String
};

const TODO = mongoose.model("Todo", todoSchema);

app.get('/todos', function(req, res){
  TODO.find(function(err, foundTodos){
    if (!err) {
      res.send(foundTodos);
    } else {
      res.send(err);
    }
  });
})

app.post('/todos', function(req, res){
  const newTodo = new TODO({
    todo: req.body.todo,
  });

  newTodo.save(function(err){
    if (!err){
      res.send(newTodo._id);
    } else{
      res.send(err);
    }
  });
});


app.route('/todos/:todoId')

.get(function(req, res){
  TODO.findById(req.params.todoId, function(err, foundTodo){
    if (foundTodo) {
      res.send(foundTodo);
    } else {
      res.send('No such todos');
    }
  })
})

.delete(function(req, res){
  TODO.deleteOne(
    {_id: req.params.todoId},
    function(err){
      if (!err){
        res.send('Success');
      } else {
        res.send(err);
      }
    }
  )
});

app.listen(3001, function() {
  console.log('Server started on port 3001');
})
