import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../../app";

chai.should();
chai.use(chaiHttp);
describe('App results', () => {
  beforeEach((done) => {
    chai.request(app);
  });
});

describe('Contacts test results', () => {
  it('Should get all the contacts', (done) => {
    chai
      .request(app)
      .get('/api/v1/contacts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should get a single contact', (done) => {
    chai
      .request(app)
      .get('/api/v1/contacts/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should create a new contact', (done) => {
    chai
      .request(app)
      .post('/api/v1/contacts')
      .send({
        firstname: 'Ineza',
        lastname: 'Alphonsine',
        email: 'inezairwanda@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
      });
    done();
  });
});
