const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");

const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const taskController = require('./controllers/taskController');
const boardController = require('./controllers/boardController');
const storyController = require('./controllers/storyController');
const userController = require('./controllers/userController');
const invitesController = require('./controllers/invitesController');

const Router = require('express-promise-router');
// const router = new Router();

// const fetchMongoData = require('./mongo.js');

const app = express();
const port = process.env.PORT || 3000;
// var index = require('./routes/index');
const publicPath = path.join(__dirname, '..', 'public', 'dist');


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(publicPath));


//testing out a time checker
const {EventEmitter} = require('events');
const profiles = new EventEmitter();

profiles.on('route', (req, elapsedNS) =>{

  console.log(req.method, req.url, ` Nanoseconds: ${req.elapsedNS}`)
})

app.use((req, res, next) => {
  const start = process.hrtime();
  const NS_PER_SEC = 1e9;
  console.log('this is start ' ,start);
  res.once('finish', () =>{
    let end = process.hrtime();
    let diff;
    console.log('this is end: ',end);
    if (start[0] === end[0]){
      diff = end[1] - start[1]
    }
    else {
      diff = ((end[0] * NS_PER_SEC) + end[1]) - ( (start[0 * NS_PER_SEC]) + start[1]);
    }
    profiles.emit('route', {method: req.method, url: req.url, elapsedNS: diff })
  });
  next();
})


app.listen(port, () => console.log(`server running on port ${port}`));


/// TASK ROUTES
app.post('/tasksid', taskController.getTasks);
app.post('/tasks', taskController.addTask);
app.post('/updatetasks', taskController.updateTask);
app.delete('/tasks', taskController.deleteTask);
app.get('/alltasks', taskController.getAllTasks);

/// STORY ROUTES
app.post('/storiesid', storyController.getStories);
app.post('/stories', storyController.addStory);
app.post('/updatestories', storyController.updateStory);
app.delete('/stories', storyController.deleteStory);
app.get('/allstories', storyController.getAllStories);

//BOARD ROUTES
app.post('/boardsid', boardController.getBoards);
app.post('/boards', boardController.addBoard);
app.delete('/boards', boardController.deleteBoard);
//app.get('/allboards', boardController.getAllBoards);

//INVITES ROUTES
app.post('/sendInvite', boardController.sendInvite);
app.post('/acceptInvite', boardController.acceptInvite);
app.delete('/rejectInvite', boardController.rejectInvite);
app.post('/getinvites', invitesController.getInvites);

// USER ROUTES
app.post('/authuser', userController.authenticateUser);
app.get('/getusers', (req, res, next) => {
  console.log('got here')
  next()
}, userController.getUsers);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//console.log(app._router.stack);
for (let i = 0; i< app._router.stack.length; i++){
  console.log(app._router.stack[i])
  // if (app._router.stack[i].route){
  //   //console.log(app._router.stack[i].name);
  //   //console.log(`this is middleware name: ${app._router.stack[i].name}`, app._router.stack[i].handle)
  //  // console.log(`this is path: ${app._router.stack[i].route.path}`,app._router.stack[i].route, app._router.stack[i].route);
  // }
}


// USER ROUTES
// app.get('/getusers', fetchMongoData, (req, res) => {
//   SimpleUser.find({}, (err, resMongo) => {
//     res.json(resMongo);
//   });
// });

// app.post('/signup', (req, res) => {
//   SimpleUser.find({ name: req.body.username }, (err, resMongo) => {
//     if (resMongo.length) {
//       res.send({ error: 'user exists' });
//     } else {
//       SimpleUser.create(
//         { name: req.body.username, password: req.body.password, isLoggedIn: true },
//         (err, resMongo) => {
//           res.send(resMongo);
//         }
//       );
//     }
//   });
// });

// app.post('/logout', (req, res) => {
//   SimpleUser.findOneAndUpdate({ _id: req.body._id }, { isLoggedIn: false }, (err, resMongo) => {
//     res.send('logged-out');
//   });
// });

// app.post('/login', (req, res) => {
//   SimpleUser.find({ name: req.body.username, password: req.body.password }, (err, resMongo) => {
//     if (resMongo.length) {
//       const userData = resMongo[0];
//       SimpleUser.update(
//         { name: req.body.username, password: req.body.password },
//         { isLoggedIn: true },
//         (err, resMongo) => {
//           console.log(resMongo);
//           res.send(userData);
//         }
//       );
//     } else {
//       res.send({ error: 'username or password incorrect' });
//     }
//   });
// });


// const uri = 'mongodb://scrum:scrum1@ds229701.mlab.com:29701/scrum';

// mongoose
//   .connect(uri)
//   .then(() => console.log('conencted to mongoose'))
//   .catch(e => {
//     response.locals.error = {
//       error: { message: 'mongoose connection error', e },
//       statusCode: 503,
//     };
//     next();
//   });