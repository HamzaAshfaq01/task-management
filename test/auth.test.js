import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../server/index.js";
import User from "../server/models/user.model.js";
import Task from "../server/models/task.model.js";
import { encryptData, decryptData } from "../server/utils/crypto.util.js";

const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe("Login Route", function () {
  this.timeout(5000);
  let testUser;
  it("should return an error if user does not exist", async () => {
    const res = await chai
      .request(app)
      .post("/api/login")
      .send({
        email: encryptData("testwrong@gmail.com"),
        password: encryptData("TestUser@123"),
      });
    expect(res.status).to.equal(404);
    expect(res.body.error).include(
      "User with that email does not exist. Please signup"
    );
  });
  it("should log in an existing user", async () => {
    const res = await chai
      .request(app)
      .post("/api/login")
      .send({
        email: encryptData("test@gmail.com"),
        password: encryptData("TestUser@123"),
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(res.body.message).include("Login Succesfull");
  });
  it("should return an error if password is incorrect", async () => {
    const res = await chai
      .request(app)
      .post("/api/login")
      .send({
        email: encryptData("test@gmail.com"),
        password: encryptData("WrongPassword"),
      });
    expect(res.status).to.equal(400);
    expect(res.body.error).include("Email and password do not match");
  });
});

describe("Register Route", function () {
  this.timeout(5000);
  let testUser;
  it("should return an error if username already exists", async () => {
    const res = await chai
      .request(app)
      .post("/api/register")
      .send({
        name: encryptData("Test2"),
        email: encryptData("test@gmail.com"),
        password: encryptData("TestUser@123"),
      });
    expect(res.status).to.equal(400);
    expect(res.body.error).include("Email is already taken.");
  });
});
describe("Task Route", function () {
  const token = jwt.sign(
    {
      _id: "6409f8244ee89b73db14eb6d",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  this.timeout(5000);
  let taskId;
  it("should create a task successfully", async () => {
    const res = await chai
      .request(app)
      .post("/api/create/task")
      .send({
        title: encryptData("My First Task"),
        description: encryptData("My First Task"),
        due_date: encryptData("2023-5-10"),
        priority: encryptData("LOW"),
      })
      .set("Authorization", "Bearer " + token);
    taskId = res.body.task._id;
    expect(res.status).to.equal(200);
    expect(res.body.message).include("Task Successfull created");
  });
  it("should delete an task using their Task ID", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/task/${taskId}`)
      .set("Authorization", "Bearer " + token);
    console.log(res.message);
    expect(res.status).to.equal(200);
    expect(res.body.message).include("Task Deleted");
  });
});
