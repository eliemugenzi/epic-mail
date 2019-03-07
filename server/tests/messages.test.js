import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);
let should = chai.should();

describe("Message Tests", () => {
  beforeEach(done => {
    chai.request(app);
  });
});

describe("MESSAGE TEST RESULTS", () => {
  it("Should get all the messages", done => {
    chai
      .request(app)
      .get("/api/v1/messages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should be able to get a single message", done => {
    chai
      .request(app)
      .get("/api/v1/messages/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should be able to delete a message", done => {
    chai
      .request(app)
      .delete("/api/v1/messages/2")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it("Should be able to get all unread messages", done => {
    chai
      .request(app)
      .get("/api/v1/messages/unread")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });
  it("Should be able to create a new message", done => {
    let newMessage = {
      id: 5,
      senderId: 2,
      receiverId: 5,
      subject: "You're all set to the bootcamp",
      message: "Welcome to the bootcamp,hope you will gain more from it.",
      parentMessageId: 0
    };
    chai
      .request(app)
      .post("/api/v1/messages")
      .send(newMessage)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
