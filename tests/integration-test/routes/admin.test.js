const request = require("supertest");
const app = require("../../../app");
const db = require("../../db");

// Pass supertest agent for each test
const agent = request.agent(app);
console.log(agent);
// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/admin", () => {
  describe("/Signup ", () => {
    describe("/ POST", () => {
      it("should return 200 when admins signup Correctly", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);
      });

      it("should return 400 when admins data is invalid", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hit",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(400);
      });

      it("should return 400 when email adress of already registered users send ", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent
          .post("/admin/signup")
          .send({
            username: "Janith",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(400);
      });
    });
  });

  describe("/Login ", () => {
    describe("/ POST", () => {
      it("should return 200 when correct login credintals set", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent
          .post("/admin/login")
          .send({
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);
      });

      it("should return 400 when invalid login credintals send", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent
          .post("/admin/login")
          .send({
            email: "hithrualwis",
            password: "123456",
          })
          .expect(400);
      });

      it("should return 400 when email not in database send", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent
          .post("/admin/login")
          .send({
            email: "hithru@gmail.com",
            password: "123456",
          })
          .expect(400);
      });

      it("should return 400 when wrong password send", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent
          .post("/admin/login")
          .send({
            email: "hithrualwis@gmail.com",
            password: "1234567",
          })
          .expect(400);
      });
    });
  });

  describe("/Admins ", () => {
    describe("/ POST", () => {
      it("should return 200 and array of admins objects should be recieved", async () => {
        await agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);

        await agent.post("/admin/admins").expect(200);
      });
    });
  });
});
