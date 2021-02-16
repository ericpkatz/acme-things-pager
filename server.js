const { syncAndSeed, models: { Thing } } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html'))); 

app.get('/api/things', async(req, res, next)=> {
  try {
    const idx = req.query.idx ? req.query.idx*1 : 0; 
    const [things, count] = await Promise.all([
      Thing.findAll({
        limit: 200,
        offset: idx*200,
        order: [['name']]
      }),
      Thing.count()
    ]);
    res.send({ count, things });
  }
  catch(ex){
    next(ex);
  }
});


const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
    if(process.env.SYNC === 'true'){
      console.log('syncing data');
      await syncAndSeed();
    }

  }
  catch(ex){
    console.log(ex);
  }
};


init();
