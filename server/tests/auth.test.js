import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import users from "../models/users";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe("Auth Test results___", () => {
    it("User can login", (done) => {
        chai.request(app).post("/api/v2/auth/login").send({
            email: "axelmanzi@gmail.com",
            password: "123456",
        }).end((err, res) => {
            console.log(res.body);
            res.should.have.status(200);
        });
        done();
    });
    it("User can create an account", (done) => {
        const email = "siraxel@gmail.com";
        chai.request(app).post("/api/v2/auth/signup").send({
            firstname: "Axel",
            lastname: "Zubee",
            email,
            password: "123456",
        }).end((err, res) => {
            console.log(res.body);
            res.should.have.status(201);
        });
        done();
    });
});
