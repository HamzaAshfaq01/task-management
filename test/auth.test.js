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

describe("Task Route", function () {
  let token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjUyOUJ6T2xuaE5YVFdGa0tUeEFWMCJ9.eyJpc3MiOiJodHRwczovL3Rhc2ttYW5hZ2VtZW50NjkudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExNDExMzIyOTg1OTA5NjgxMzY3IiwiYXVkIjpbImh0dHBzOi8vdGFza21hbmFnZW1lbnQ2OS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vdGFza21hbmFnZW1lbnQ2OS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5MzI5ODc3LCJleHAiOjE2Nzk0MTYyNzcsImF6cCI6IlpWeFFxdm5wMkhCQUxTNUVwblhEdFJwdENlOFRLS1c5Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.RmzP3oJIA9gCfk4Z5E8QEpaZwVrJXgUb5VT5CNkZ1cftx8-hAnpV9yVL19bTZOnOX6lPv_SRajIWy8_HKRdHjTRx2Yq9U6t3Iy1G7G89gks7rXDCTM7qYXb5X7YSOsNj7YKZyK_wFCoGWABdWjncSXG9fEasCPzQ3GkIjFkKp8iF9NkF3Pr9VoClD8JjnGL0W3DvCq3eVonEWQaSfgEn974D8d5cWxXNG482PTq5hfLTf6FVhuWLBIbgz09H3iLwYVuDNVZFgZIG3gj8R-2oFZllW0ndQHdYSLHNj_SH1VSOihyVbiumwTc0UqsqcNkfY9IwQATju8mPaPxHIE21Mg";
  this.timeout(5000);
  let taskId;
  it("should get all a task of login users successfully", async () => {
    const res = await chai
      .request(app)
      .get(`/api/tasks`)
      .set("Authorization", "Bearer " + token);
    expect(res.status).to.equal(200);
  });
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
  it("should update a task successfully", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/task/${taskId}`)
      .send({
        title: encryptData("My updated Task"),
        priority: encryptData("HIGH"),
      })
      .set("Authorization", "Bearer " + token);
    taskId = res.body.task._id;
    expect(res.status).to.equal(200);
    expect(res.body.message).include("Task Updated");
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
