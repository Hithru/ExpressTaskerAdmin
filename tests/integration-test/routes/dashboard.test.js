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

describe("/dashboard", () => {
  describe("/Info", () => {
    describe("/ POST", () => {
      it("should return 200 and array of data about system", async () => {
        await agent.post("/dashboard/info").expect(200);
      });
    });
  });
});
