const fs = require('fs');

module.exports = (app, path) => {
  const jsonChannels = fs.readFileSync(path.resolve(__dirname, '../data/channels.json'));
  const channels = JSON.parse(jsonChannels);
  
    app.get('/api/channels',(req,res) =>{
        res.send(channel);
    });

};
