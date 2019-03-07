import chai from "chai";
import app from "../../app";
import chaiHttp from "chai-http";
import "babel-polyfill";

let should = chai.should();
chai.use(chaiHttp);
describe("App results", () => {
  beforeEach(done => {
    chai.request(app);
  });
});

describe("USER LOGIN TESTS", () => {
  it("Should have an object", done => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({
        email: "inezairwanda@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        res.body.should.be.an("object");
      });
    done();
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
          res.should.have.status(200);
          res.body.should.be.an("object");
        });
      done();
    });
  });
});
