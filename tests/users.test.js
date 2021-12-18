const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Character = require("../models/Character");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/users", () => {
  before((done) => {
    Character.deleteMany({}, (err) => {
      User.deleteMany({}, (err) => {
        done();
      });
    });
  });
  describe("POST /register", () => {
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
    it("it should NOT create a new user (name already exists)", (done) => {
      let user = {
        name: "tesT",
        email: "test2@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.name).to.eq("Name already exists");
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
  describe("POST /login", () => {
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
        expect(res.body.token.startsWith("Bearer ")).to.be.true;
        const user = jwt.verify(res.body.token.split(" ")[1], process.env.secret);
        expect(user.name).to.eq("Test");
        done();
      });
    });
  });
});
