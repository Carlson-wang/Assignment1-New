const fs = require('fs');

module.exports = (app, path) => {
  const jsonGroups = fs.readFileSync(path.resolve(__dirname, '../data/groups.json'));
  const groups = JSON.parse(jsonGroups);

  app.get('/api/groups', (req, res) => {
    res.send(groups);
  });

  app.delete('/api/group/:id', (req, res) => {
    const groupName = req.params.id;

    const jsonUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'));
    const users = JSON.parse(jsonUsers);

    const newGroups = groups.filter(group => group.groupName !== groupName);
    fs.writeFileSync(path.resolve(__dirname, '../data/groups.json'), JSON.stringify(newGroups));

    const newUsers = users.map(user => {
      return {
        ...user,
        groupList: user.groupList.filter(group => group !== groupName),
        adminGroupList: user.adminGroupList.filter(group => group !== groupName),
      };
    });
    fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), JSON.stringify(newUsers));

    return res.send(groupName);
  });

};