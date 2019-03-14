import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import messages from '../models/messages';
import users from '../models/users';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYXhlbG1hbnppQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2In0sImlhdCI6MTU1MjU0NzIyMSwiZXhwIjoxNTUyNzIwMDIxfQ.UVQZDfGq75gC2oprAhThpVcnLZLoZD4WTHmg6MqG7zY';
chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('Message Tests', () => {
  beforeEach((done) => {
    chai.request(app);
  });
});

describe('MESSAGE TEST RESULTS', () => {
  it('Should get all the messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should be able to get a single message', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/2')
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        const userInfo = users.find(
          user => user.email === 'eliemugenzi@gmail.com'
        );
        if (userInfo) expect(userInfo).to.be.an('object');

        const newMessage = messages.filter((message) => {
          if (
            parseInt(message.senderId, 10) === 1 &&
            2 === parseInt(message.id, 10)
          ) {
            return message;
          }
        });
        console.log(newMessage);
        if (newMessage) expect(newMessage).to.be.an('array');
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should be able to delete a message', (done) => {
    chai
      .request(app)
      .delete('/api/v1/messages/2')
      .end((err, res) => {
        const filteredMessages = messages.filter((message) => {
          if (
            !(
              parseInt(message.id, 10) === 2 &&
              parseInt(message.senderId, 10) === 1
            )
          ) {
            return message;
          }
        });

        expect(filteredMessages).to.be.an('array');
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  

  it('Should be able to get all unread messages by the authorized sender', (done) => {
    
    chai
      .request(app)
      .get('/api/v1/messages/unread')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {        
        console.log(res.body);
        if (res.body.status === 403) {
          res.body.have.property('error').eql('Forbidden');
        }
        else {
          const userInfo = users.find(user => user.email === 'inezairwanda@gmail.com');
          if (userInfo) expect(userInfo).to.be.an('object');

          const unreadMessages = messages.filter(
            message =>
              (message.status === 'sent' && parseInt(message.receiverId, 10) === 1)
          );
          expect(unreadMessages).to.be.an('array');
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });
  it('Should be able to create a new message', (done) => {
    const newMessage = {
      receiverId: 3,
      subject: 'You\'re all set to the bootcamp',
      message: 'Welcome to the bootcamp,hope you will gain more from it.',
    };
    chai
      .request(app)
      .post('/api/v1/messages')
      .send(newMessage)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (res.body.status === 403) {
          res.body.should.have.property('error').eql('Forbidden');
        }
        else {
          const userInfo = users.find(user => user.email === 'eliemugenzi@gmail.com');
          const receiverInfo = users.find(
            user => parseInt(user.id, 10) === 1
          );
          if (userInfo) expect(userInfo).to.be.an('object');
          if (receiverInfo) expect(receiverInfo).to.be.an('object');
          console.log(res.body)
          res.should.have.status(201);
        }
        
      });
    done();
  });

  it('should be able to get all unread messages', (done) => {
    
    chai
      .request(app)
      .get('/api/v1/messages/unread/messages')
      .end((err, res) => {
        const unreadMessages = messages.filter((message) => {
      if (message.status === 'sent') return message;
    });
    expect(unreadMessages).to.be.an('array');
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should be able to get all draft messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/draft/messages')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        const allDrafts = messages.filter(
          message => message.status === 'draft'
        );
        expect(allDrafts).to.be.an('array');
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });
  it('should be able to get all read messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/read/messages')
      .end((err, res) => {
        let read = messages.filter(
          message => message.status === 'read'
        );
        if (read) expect(read).to.be.an('array');
        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should reply to a message', (done) => {
    const newMessage = {
      id: 5,
      senderId: 2,
      receiverId: 3,
      subject: 'You are all set to the bootcamp',
      message: 'Welcome to the bootcamp,hope you will gain more from it.',
    };
    chai
      .request(app)
      .post('/api/v1/messages/reply/1')
      .send(newMessage)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should get sent messages by an authorized sender', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/sent')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {

        const userInfo = users.find(
          (user => user.email === 'eliemugenzi@gmail.com'
          )
        );

        if (userInfo) expect(userInfo).to.be.an('object');
  
        
        const receiverInfo = users.find(
          user => parseInt(user.id, 10) === 2
        );
        if (receiverInfo) expect(receiverInfo).to.be.an('object');
  

        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });

  it('Should get all saved messages by authorized user', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/draft')
      .set('Authorization',`Bearer ${token}`)
      .end((err, res) => {
        
        const allDrafts = messages.filter(message => message.senderId === 1 && message.status === 'draft');
        expect(allDrafts).to.be.an('array');
        
        const userInfo = users.find(user => user.email === 'inezairwanda@gmail.com');
        if (userInfo) expect(userInfo).to.be.a('object');
    
        

        res.should.have.status(200);
        res.body.should.be.an('object');
      });
    done();
  });
});

describe('Message data testing', () => {
  it('Message by id must return an object of a single message', (done) => {
    const messageById = messages.find(message => message.id === 1);
    if (messageById) expect(messageById).to.be.an('object');
    done();
  });

  it('Should filter messages by deleting the specific message', (done) => {
    const messageId = 1;
    const senderId = 1;
    const filteredMessages = messages.filter((message) => {
      if (!(parseInt(message.id, 10) === parseInt(messageId, 10) && parseInt(message.senderId, 10) === parseInt(senderId, 10))) return message;
    });
    expect(filteredMessages).to.be.an('array');
    done();
  });

  it('Should update a specific message status to draft', (done) => {
    const draftMessages = messages.map((message) => {
      if (message.id === 1) message.status = 'draft';
      return message;
    });
    expect(draftMessages).to.be.an('array');
    done();
  });

  it('Should get unread messages by a specific user', (done) => {
    const unreadMessages = messages.filter((message) => {
      if (message.receiverId === 1 && message.status === 'sent') return message;
    });

    expect(unreadMessages).to.be.an('array');
    done();
  });

  it('Should get a message sent by a specific sender', (done) => {
    const sentMessages = messages.filter((message) => {
      if (message.id === 1 && 1 === message.senderId) return message;
    });

    expect(sentMessages).to.be.an('array');
    done();
  });
});
