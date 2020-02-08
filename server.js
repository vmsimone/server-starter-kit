'use strict';

// our two dependencies
const express = require('express');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

// avoiding some deprecations
mongoose.set('useNewUrlParser', true );
mongoose.set('useUnifiedTopology', true );
mongoose.set('useFindAndModify', false );

const { PORT, DATABASE_URL } = require('./config');
const { Item } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/', (_req,res) => { 
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/items', (_req, res) => {
  Item
    .find()
    .then(item => {
      res.json({
        items: item.map(
          (item) => item.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/items', (req, res) => {
    //include any additional keys you're expecting
    const requiredKeys = ['title', 'description'];
    for (let i = 0; i < requiredKeys.length; i++) {
        const key = requiredKeys[i];
        if (!(key in req.body)) {
            const message = `Missing \`${key}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

  Item.create({
    title: req.body.title,
    description: req.body.description
  })
  .then(Item => res.status(201).json(Item.serialize()))
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.put('/api/items/:id', (req, res) => {
  if(!(req.body.id)) {
    res.status(400).json({
      error: 'Request body does not contain id'
    });
  }

  if (!(req.params.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableKeys = ['title', 'description'];

  updateableKeys.forEach(key => {
    if (key in req.body) {
      console.log(key);
      updated[key] = req.body[key];
    }
  });

  Item
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.delete('/api/items/:id', (req, res) => {
  Item
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: `${req.params.id} removed` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

app.use('*', function (_req, res) {
  res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
