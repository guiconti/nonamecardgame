const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const api = supertest(process.env.HOST);

describe('All create room possibilities', function(){
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

    it('Create aux room with name', function(done){
        api
            .post('/game/create')
            .send({
                name: 'Sala de testes auxiliar'
            })
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    expect(res.body.msg.id).to.not.equal(undefined);
                    gameInfo.idAux = res.body.msg.id;
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
                    expect(res.body.msg.id).to.not.equal(undefined);
                    gameInfo.id = res.body.msg.id;
                    done();
                }
            });
    });

    it('Create room with a really long name', function(done){
        api
            .post('/game/create')
            .send({
                name: 'sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`sadjkj2hej`hujhdsuad72197830217dsahcjxzcZXWQU*!@#*(S(DASCJXZC(!@#*SADxzcmkaskjczxnjcko-wqie0-213sda89as7dsa*sd-a*dss6xc4x5zc4*///*""""""/``/`/`/`'
            })
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    expect(res.body.msg.id).to.not.equal(undefined);
                    done();
                }
            });
    });

    it('Create room with special characters', function(done){
        api
            .post('/game/create')
            .send({
                name: 'ñóǹ äŝçíì 汉语/漢語  华语/華語 Huáyǔ; 中文 Zhōngwén 漢字仮名交じり文 Lech Wałęsa æøå'
            })
            .set(players.one.header)
            .end(function(err, res){
                if (err){
                    done(err);
                } else {
                    expect(res.status, 'Status').to.equal(200);
                    expect(res.body.msg.id).to.not.equal(undefined);
                    gameInfo.idAuxTwo = res.body.msg.id;
                    done();
                }
            });
    });
});