const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Playstore App', () => {
  it('should return an array of apps', () => {
    return request(app)
    .get('/apps')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
    })
  })


  it('should return a 400 when given incorrect sort param', () => {
    return request(app)
    .get('/apps')
    .query({sort: 'MISTAKE'})
    .expect(400, 'Sort must be Rating or App')
  })


  it('should return a 400 when given incorrect genre param', () => {
    return request(app)
    .get('/apps')
    .query({genres: 'MISTAKE'})
    .expect(400, 'Genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card')
  })

  it('should sort by rating', () => {
    return request(app)
    .get('/apps')
    .query({sort: 'rating'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      let i = 0;
      let sorted = true;
      while(sorted && i < res.body.length - 1) {
        sorted = sorted && res.body[i].Rating <= res.body[i+1].Rating;
        i++;
      }
      expect(sorted).to.be.true;
    })
  }) 

  
  it('should sort by app name', () => {
    return request(app)
    .get('/apps')
    .query({sort: 'app'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      let i = 0;
      let sorted = true;
      while(sorted && i < res.body.length - 1) {
        sorted = sorted && res.body[i].App < res.body[i+1].App;
        i++;
      }
      expect(sorted).to.be.true;
    })
  }) 
  

  it('should sort by genre', () => {
    return request(app)
    .get('/apps')
    .query({genres: 'Action'})
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).to.be.an('array');
      let i = 0;
      let genres = true;
      while(genres && i < res.body.length -1) {
        genres = genres && res.body[i].Genres.includes('Action');
        i++
      }
      expect(genres).to.be.true;
    })
  })
})
