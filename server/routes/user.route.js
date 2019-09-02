const fs = require('fs');

module.exports = (app,path) => {

    const jsonUser = fs.readFileSync(path.resolve(__dirname, '../data/User.json'));
    const users = JSON.parse(jsonUser);


const initUser = {
    username: '',
    password: '',
    email: '',
    valid: false,
    isActivated: false,
    ofGroupAdminRole: false,
    ofGroupAdminInRole: false,
    ofGroupAssisInRole: false,
    groupList: [],
    channelList: [],
    adminGroupList: [],
};

app.get('/api/users',(req,res) => {
    res.send(users);
});

app.post('/api/auth',(req,res) => {
    if (!req.body){
        return res.sendStatus(400);
    }

    const username = req.body.username;
    const password = req.body.password;

    const result = users.find(user => user.username === username && user.password === password);
    if (!result) return res.status(404).send('can not login, username or password is wrong.');
    result.valid = true;
    res.send(result);
});

//create new user
app.post('/api/user',(req,res) =>{
    console.log('new:api - user');
    console.log({body: req.body});
    if (!req.body){
        return res.status(400).semd('Bad request');
    }

    const username = req.body.username;
    if(!username
    || users.filter(user => user.username === username).length > 0){
        return res.status(400).send({
            sucess: 'false',
            message: 'username is missing or duplicated'
        });
    }
    
    const newUser = {
        ...initUser,
        ...req.body,
    };

    users.push({
        ...newUser,
    });

    fs.writeFileSync(path.resolve(__dirname, '../data/users.json'),JSON.stringify(users));
    res.send(newUser);
});

//retrieve an user by username
app.get('/api/user/:username',(req,res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) return res.status(404).send('Not Found.');

    return res.send(user);
});

//delete user
app.delete('/api/user/:username',(req,res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);

    if (!user) return res.status(404).send('Not Found.');

    console.log({user});
    const index = users.indexOf(user);
    console.log({index});
    console.log({users});
    users.splice(index,1);

    fs.writeFileSync(path.resolve(__dirname, '../data/users.json'),JSON.stringify(users));

    return res.send(user);
});

//update user
app.put('/api/user/:username', (req, res) => {
    if (!req.body) {
      return res.status(400).send('Bad request.');
    }
    const username = req.params.username;
    let index = users.findIndex(user => user.username === username);

    if ( index === -1 ) return res.status(404).send('not found');

    //use data from req.body to overwrite exsiting user
    const newUser = {
        ...users[index],
        ...req.body,
      };
    users[index] = newUser;

    fs.writeFileSync(path.resolve(__dirname,'../data/users.json'), JSON.stringify(users));

    return res.send(newUser);
  });

}
