const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/api/characters", () => {
  //Create and log the user into a test account
  let user, token;
  before((done) => {
    User.deleteMany({}, (err) => {
      chai.request(app).post("/api/users/register")
      .send({
        name: "User",
        email: "user@test.com",
        password: "123456",
        password2: "123456"
      })
      .end((err, res) => {
        chai.request(app).post("/api/users/login")
        .send({
          email: "user@test.com",
          password: "123456"
        })
        .end((err, res) => {
          token = res.body.token.split(" ")[1];
          user = jwt.verify(token, process.env.secret);
          done();
        });
      });
    });
  });
  describe("/index", () => {
    it("it should NOT return the character for user (invalid token)", (done) => {
      chai.request(app).get("/api/characters")
      .auth("Invalid.JWT.Token", { type: "bearer" })
      .send()
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.text).to.eq("Invalid Token");
        done();
      });
    });
    it("it should return the character for user (user@test.com)", (done) => {
      chai.request(app).get("/api/characters")
      .auth(token, { type: "bearer" })
      .send()
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.character.inBattle).to.be.false;
        done();
      });
    });
  });
});
