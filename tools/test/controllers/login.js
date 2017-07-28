const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('All login possibilities', function(){
  it('Open home', function(done){
    api
      .get('/')
      .end(function(err, res){
        if (err){
          done(err);
        } else {
          expect(res.status, 'Status').to.equal(200);
          done();
        }
      });
  });

  it('Login without a name', function(done){
    api
      .post('/login')
      .send({
        name: ''
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

  it('Login with a name', function(done){
    api
      .post('/login')
      .send({
        name: 'Testezao'
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
});