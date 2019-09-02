const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const{ User } = require('./models/User');
const{ Group } = require('./models/group');
const{ Channel } = require('./models/channel');

const initUsers = [
  new User('super','super','super@ass.com',false,true,false,false,false,[],[],[]),
  new User('groupassist','password','groupassist@ass.com',false,true,false,false,false,[],[],[]),
  new User('groupadmin','password','groupadmin@ass.com',false,true,false,false,false,[],[],[]),
  new User('user1','password','user1@ass.com',false,true,false,false,false,[],[],[]),
  new User('user2','password','user2@ass.com',false,true,false,false,false,[],[],[]),
  new User('user3','password','user3@ass.com',false,true,false,false,false,[],[],[]),
  new User('user4','password','user4@ass.com',false,true,false,false,false,[],[],[]),
]

// TODO: create channels array and convert them to json file
const initChannels = [
  new Channel('ch1', 'channel 1', []),
];

// TODO: create groups array and convert them to json file
const initGroups = [
  new Group('group1', 'group 1', []),
  new Group('group2', 'group 2', []),
];


fs.writeFileSync(path.resolve(__dirname,'./data/User.json'),JSON.stringify(initUsers));
fs.writeFileSync(path.resolve(__dirname,'./data/Groups.json'),JSON.stringify(initGroups));
fs.writeFileSync(path.resolve(__dirname,'./data/Channels.json'),JSON.stringify(initChannels));



const app = express();


// app.use(bodyParser.urlencoded({extended: true}));
// require('./routes/index')(app);
// require('./routes/auth')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/assignment1/')))

app.get('/', (req, res) => {
  const filePath = path.resolve('../dist/assignment1/index.html')
  res.sendFile(filePath);
});

require('./routes/user.route')(app, path);
require('./routes/group.route')(app, path);
require('./routes/channel.route')(app, path);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listening ${port}...`);
});


