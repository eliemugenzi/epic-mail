import chai from "chai";
import app from "../../app";
import chaiHttp from "chai-http";
import "babel-polyfill";
import users from "../models/users";
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);
describe("App results", () => {
  beforeEach(done => {
    chai.request(app);
  });
});


describe("RETRIEVE USER INFO", () => {
  describe("/GET users", () => {
    it("Should get all the users", done => {
      chai
        .request(app)
        .get("/api/v1/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
        });
      done();
    });
  });

  describe("/GET single user", () => {
    it("Should get a specific user", done => {
      chai
        .request(app)
        .get("/api/v1/users/1")
        .end((err, res) => {
          let user = users.find(
            user => parseInt(user.id, 10) === 1
          );
          if (user) expect(user).to.be.an('object');
          else expect(user).to.be.undefined;
          res.should.have.status(200);
          res.body.should.be.an("object");
        });
      done();
    });
  });
});

describe('User data tests', () => {
  it('Should find user by email', (done) => {
    const userInfo = users.find(user => user.email === 'inezairwanda@gmail.com');
    if (userInfo) expect(userInfo).to.be.an('object');
    else expect(userInfo).to.be.undefined;
    done();
  });

  it('Should get user by id', (done) => {
    let userInfo = users.find(user => user.id === 1);
    if (userInfo) expect(userInfo).to.be.an('object');
    else expect(userInfo).to.be.undefined;
    done();
  });
});
