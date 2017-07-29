const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

const dungeonsType = require('../../../server/controllers/game/dungeon/dungeonsType');

describe('All pick dungeons possibilities', function(){
    it('Pick dungeon without login', function(done){
        api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(302);
                    done();
                }
            });
    });

    it('Pick dungeon without game name', function(done){
        api
            .get('/game/' + '' + '/dungeon/pick')
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

    it('Pick dungeon with invalid game id and a really long game id', function(done){
        api
            .get('/game/' + 'sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`' + '/dungeon/pick')  
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

    it('Pick dungeon with invalid game id and special characters', function(done){
        api
            .get('/game/' + 'ñóǹäŝçíì汉语/漢华语/華語Huá中文Z' + '/dungeon/pick')
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

    it('Pick dungeon in a non started game', function(done){
        api
            .get('/game/' + gameInfo.idAuxTwo + '/dungeon/pick')
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

    it('Pick a dungeon when it`s not your turn - Player two', function(done){
        api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
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

    it('Pick a dungeon in your turn - Player one', function(done){
        api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    gameInfo.lastDungeonType = res.body.type;
                    gameInfo.lastPlayerPick = 1;
                    done();
                }
            });
    });

    it('Pick a dungeon when it`s not your turn after first dungeon picked - Player two', function(done){
        api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
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

    it('Pick a dungeon if last one is a monster - Player one', function(done){
        if (gameInfo.lastDungeonType == dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
        } else {
            this.skip();
        }
    });

    it('Pick a dungeon if last one isn`t a monster - Player one', function(done){
        if (gameInfo.lastDungeonType != dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    gameInfo.lastDungeonType = res.body.type;
                    gameInfo.lastPlayerPick = 1;
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon after second dungeon picked - Player one', function(done){
        api
        .get('/game/' + gameInfo.id + '/dungeon/pick')
        .set(players.one.header)
        .end(function(err, res){
            if (err){
                done(err);
                return;
            } else {
                expect(res.status, 'Status').to.equal(400);
                done();
            }
        });
    });

    it('Pick a dungeon if last one is a monster - Player one', function(done){
        if (gameInfo.lastDungeonType == dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one isn`t a monster - Player two', function(done){
        if (gameInfo.lastDungeonType != dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    gameInfo.lastDungeonType = res.body.type;
                    gameInfo.lastPlayerPick = 2;
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one is a monster - Player two', function(done){
        if (gameInfo.lastDungeonType == dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one isn`t a monster - Player two', function(done){
        if (gameInfo.lastDungeonType != dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    gameInfo.lastDungeonType = res.body.type;
                    gameInfo.lastPlayerPick = 2;
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one is a monster - Player two', function(done){
        if (gameInfo.lastDungeonType == dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.two.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one is a monster - Player three', function(done){
        if (gameInfo.lastDungeonType == dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.three.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(400);
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

    it('Pick a dungeon if last one isn`t a monster - Player three', function(done){
        if (gameInfo.lastDungeonType != dungeonsType.MONSTER){
            api
            .get('/game/' + gameInfo.id + '/dungeon/pick')
            .set(players.three.header)
            .end(function(err, res){
                if (err){
                    done(err);
                    return;
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    gameInfo.lastPlayerPick = 3;
                    done();
                }
            });
        } else {
            this.skip();
        } 
    });

});