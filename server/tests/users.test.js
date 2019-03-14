import chai from 'chai';
import chaiHttp from 'chai-http';
import users from '../models/users';
import app from '../../app';

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe('App results', () => {
  beforeEach((done) => {
    chai.request(app);
  });
});


describe('RETRIEVE USER INFO', () => {
  describe('/GET users', () => {
    it('Should get all the users', (done) => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });

  describe('/GET single user', () => {
    it('Should get a specific user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          const userInfo = users.find(
            user => parseInt(user.id, 10) === 1
          );
          if (userInfo) expect(userInfo).to.be.an('object');

          res.should.have.status(200);
          res.body.should.be.an('object');
        });
      done();
    });
  });
});

describe('User data tests', () => {
  it('Should find user by email', (done) => {
    const userInfo = users.find(user => user.email === 'inezairwanda@gmail.com');
    if (userInfo) expect(userInfo).to.be.an('object');
    done();
  });

  it('Should get user by id', (done) => {
    const userInfo = users.find(user => user.id === 1);
    if (userInfo) expect(userInfo).to.be.an('object');
    done();
  });
});
