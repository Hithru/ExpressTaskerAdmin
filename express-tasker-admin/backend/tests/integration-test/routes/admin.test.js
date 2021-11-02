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
  describe("/admins ", () => {
    describe("/ POST", () => {
      it("should return 200 when admins signup Correctly", async () => {
        agent
          .post("/admin/signup")
          .send({
            username: "Hithru De Alwis",
            email: "hithrualwis@gmail.com",
            password: "123456",
          })
          .expect(200);
      });
    });
  });
});
