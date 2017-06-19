const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('Test Game Creation', function(){
  it('Create game', function(done){
    api
      .post('/game/create')
      .send({
        name: 'New game',
        password: 'test12345'
      })
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(200);
          expect(res.body.msg.id, 'Id exists').to.any;
          done();
        }
      });
  });

  it('Create game with no name', function(done){
    api
      .post('/game/create')
      .send({
        password: 'test12345'
      })
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('Create game with invalid name', function(done){
    api
      .post('/game/create')
      .send({
        name: function(){return creditcard;},
        password: 'test12345'
      })
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('Create game with no password', function(done){
    api
      .post('/game/create')
      .send({
        name: 'New game'
      })
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(200);
          done();
        }
      });
  });

  it('Create game with invalid password', function(done){
    api
      .post('/game/create')
      .send({
        name: 'New game',
        password: 12631263712673612637123
      })
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });
});