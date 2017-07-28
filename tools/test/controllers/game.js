const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('All create room', function(){
  it('Create room without login', function(done){
    api
        .post('/game/create')
        .send({
            name: 'Sala sem logar'
        })
        .end(function(err, res){
        if (err){
            done(err);
        } else {
            expect(res.status, 'Status').to.equal(302);
            done();
        }
        });
  });

  it('Create room without name', function(done){
    api
        .post('/game/create')
        .send({
            name: ''
        })
        .set(players.one.header)
        .end(function(err, res){
        if (err){
            done(err);
        } else {
            expect(res.status, 'Status').to.equal(400);
            done();
        }
        });
  });

  it('Create room with name', function(done){
    api
        .post('/game/create')
        .send({
            name: 'Sala de testes'
        })
        .set(players.one.header)
        .end(function(err, res){
        if (err){
            done(err);
        } else {
            expect(res.status, 'Status').to.equal(200);
            expect(res.body.msg.id).to.exist();
            gameInfo.id = res.body.msg.id;
            done();
        }
        });
  });
});