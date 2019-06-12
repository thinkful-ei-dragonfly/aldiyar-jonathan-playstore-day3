const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

const apps = require('./db');

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let filteredApps = apps;

  if (sort) {
    if (!['Rating', 'App', 'rating', 'app'].includes(sort)) {
      res.status(400);
      res.send('Sort must be Rating or App')
    }
  }

  if (sort === 'Rating' || sort === 'rating') {
    filteredApps
      .sort((a, b) => {
        return a.Rating > b.Rating ? 1 : -1
      }
      )
  };

  if (sort === 'App' || sort === 'app') {
    filteredApps
      .sort((a, b) => {
        return a.App > b.App ? 1 : -1
      }
      )
  }

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      res.status(400);
      res.send('Genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card');
    }

    filteredApps = filteredApps.filter(app => {
      return app.Genres.includes(genres);
    })


  
  }

  
  res.json(filteredApps)
  
})

module.exports = app;


