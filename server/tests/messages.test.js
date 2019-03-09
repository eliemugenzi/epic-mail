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

  it("Should be able to get all unread messages by the authorized sender", done => {
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

  it("should be able to get all unread messages", done => {
    chai
      .request(app)
      .get("/api/v1/messages/unread/messages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should be able to get all draft messages", done => {
    chai
      .request(app)
      .get("/api/v1/messages/draft/messages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });
  it("should be able to get all read messages", done => {
    chai
      .request(app)
      .get("/api/v1/messages/read/messages")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should reply to a message", done => {
    let newMessage = {
      id: 5,
      senderId: 2,
      receiverId: 5,
      subject: "You're all set to the bootcamp",
      message: "Welcome to the bootcamp,hope you will gain more from it."
    };
    chai
      .request(app)
      .post("/api/v1/messages/reply/1")
      .send(newMessage)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should get sent messages by an authorized sender", done => {
    chai
      .request(app)
      .get("/api/v1/messages/sent")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });

  it("Should get all saved messages by authorized user", done => {
    chai
      .request(app)
      .get("/api/v1/messages/draft")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
      });
    done();
  });
});
