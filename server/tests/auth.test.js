import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();
chai.use(chaiHttp);

describe('Auth Test results___', () => {
    it('User can login', (done) => {
        chai.request(app).post('/api/v1/auth/login').send({
            email: 'axelmanzi@gmail.com',
            password: '123456',
        }).end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);

            })
        done();
    })
    it('User can create an account', (done) => {
        chai.request(app).post('/api/v1/auth/signup').send({
            firstname: 'Axel',
            lastname: 'Zubee',
            email: 'siraxel@epicmail.com',
            password: '123456'
        }).end((err, res) => {
            console.log(res.body);
            res.should.have.status(201);
           
            });
        done();
    })
    
})