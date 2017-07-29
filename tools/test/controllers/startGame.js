const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('All start game possibilities', function(){
    it('Start game without login', function(done){
        api
            .get('/game/' + gameInfo.id + '/start')
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(302);
                    done();
                }
            });
    });

    it('Start game without name', function(done){
        api
            .get('/game/' + '' + '/start')
            .set(players.one.header)
                .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(404);
                    done();
                }
            });
    });

    it('Start game with invalid game id and a really long game id', function(done){
        api
            .get('/game/' + 'sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`' + '/start')  
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

    it('Start game with invalid game id and special characters', function(done){
        api
            .get('/game/' + 'ñóǹäŝçíì汉语/漢华语/華語Huá中文Z' + '/start')
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(404);
                    done();
                }
            });
    });

    it('Start game without minimal players amount', function(done){
        api
            .get('/game/' + gameInfo.idAuxTwo + '/start')
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

    it('Start game without being an owner - Player two', function(done){
        api
            .get('/game/' + gameInfo.id + '/start')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
    });

    it('Start game being an owner - Player one', function(done){
        api
            .get('/game/' + gameInfo.id + '/start')
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    done();
                }
            });
    });

    it('Start game without joining', function(done){
        api
            .get('/game/' + gameInfo.idAux + '/start')
            .set(players.one.header)
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