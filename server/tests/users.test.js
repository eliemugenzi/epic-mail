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
  it("Should get a token ", done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "inezairwanda@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        res.body.should.have.property("token");
      });
    done();
  });
  it("Should have status 200", done => {
    let message = {
      id: 2,
      subject: "Welcome to Andela Bootcamp",
      body: "Welcome all to the bootcamp,hope you will be enjoying this.",
      senderId: 8,
      receiverId: 9,
      parentMessageId: 20,
      createdOn: Date.now()
    };
    chai
      .request(app)
      .post("/api/v1/messages")
      .send(message)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
      });
    done();
  });

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
