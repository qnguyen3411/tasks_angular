const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(express.static( __dirname + '/../public/dist/public' ));

console.log( __dirname + '../public/dist/public')
mongoose.connect('mongodb://localhost/task');
mongoose.Promise = global.Promise;

const TaskSchema = new mongoose.Schema({
  title: {type: String, required:true, minlength: 2},
  description: {type: String, default: ""},
  completed: {type: Boolean, default: false}
}, {timestamps: true})

mongoose.model('Task', TaskSchema)
const Task = mongoose.model('Task')

// GET: Retrieve all Tasks
app.get('/tasks', (req, res) => {
  Task.find().then(results => {
    res.json({status: 'success', data: results})
  }).catch(err => {
    res.json({status: 'error', data: err.errors})
  })
  
})
// GET: Retrieve a Task by ID
app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id).then(results => {
    res.json({status: 'success', data: results})
  }).catch(err => {
    res.json({status: 'error', data: err.errors})
  })
})
// POST: Create a Task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save().then(result => {
    res.json({status: 'success', data: result})
  }).catch (err => {
    res.json({status: 'error', data: err.errors })
  })
})
// PUT: Update a Task by ID
app.put('/tasks/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
  .then(result => {
    res.json({status: 'success', data: result})
  }).catch (err => {
    res.json({status: 'error', data: err.errors })
  })
})
// DELETE: Delete a Task by ID
app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
  .then(result => {
    res.json({status: 'success', data: result})
  }).catch (err => {
    res.json({status: 'error', data: err.errors })
  })
})

app.listen(8000, () => {
  console.log("LISTENING AT PORT 8000");
})