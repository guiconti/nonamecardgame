const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('All join room possibilities', function(){
    it('Join room without login', function(done){
        api
            .get('/game/' + gameInfo.id + '/join')
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(302);
                    done();
                }
            });
    });

    it('Enter room without name', function(done){
        api
            .get('/game/' + '' + '/join')
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

    it('Enter room with invalid game id', function(done){
        api
            .get('/game/' + 'invalid_game_id' + '/join')
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

    it('Enter room with invalid game id and a really long game id', function(done){
        api
            .get('/game/' + 'sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`'  + '/join')  
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

    it('Enter room with invalid game id and special characters', function(done){
        api
            .get('/game/' + 'ñóǹäŝçíì汉语/漢华语/華語Huá中文Z' + '/join')
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

    it('Enter valid room - Player one', function(done){
        api
            .get('/game/' + gameInfo.id + '/join')
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

    it('Enter valid room - Player two', function(done){
        api
            .get('/game/' + gameInfo.id + '/join')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    done();
                }
            });
    });

    it('Enter valid room - Player three', function(done){
        api
            .get('/game/' + gameInfo.id + '/join')
            .set(players.three.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    done();
                }
            });
    });

    it('Enter room again - Player one', function(done){
        api
            .get('/game/' + gameInfo.id + '/join')
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
});