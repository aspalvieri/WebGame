const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const User = require("../models/User")

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach

describe("Users", () => {
  before((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/api/users/register", () => {
    it("it should create a new user (test@test.com)", (done) => {
      let user = {
        name: "Test",
        email: "test@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should NOT create a new user (email already exists)", (done) => {
      let user = {
        name: "Test 2",
        email: "test@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.email).to.eq("Email already exists");
        done();
      });
    });
    it("it should NOT create a new user (password too short)", (done) => {
      let user = {
        name: "Test 2",
        email: "test@test.com",
        password: "12345",
        password2: "12345"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.password).to.eq("Password must be at least 6 characters");
        done();
      });
    });
  });
  describe("/api/users/login", () => {
    it("it should NOT login user (password incorrect)", (done) => {
      let user = {
        email: "test@test.com",
        password: "abcdef"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.passwordincorrect).to.eq("Password incorrect");
        done();
      });
    });
    it("it should NOT login user (email not found)", (done) => {
      let user = {
        email: "test2@test.com",
        password: "123456"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.emailnotfound).to.eq("Email not found");
        done();
      });
    });
    it("it should login user (test@test.com)", (done) => {
      let user = {
        email: "test@test.com",
        password: "123456"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.be.true;
        done();
      });
    });
  });
});