const request = require("supertest");

const app = require("../../../app");
const db = require("../../db");
const {
  CustomerComplaint,
} = require("../../../models/customerComplaint.model");
// Pass supertest agent for each test
const agent = request.agent(app);
console.log(agent);
// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/customer", () => {
  describe("/Complaints ", () => {
    describe("/ POST", () => {
      it("should return 200 and array of customer complaints objects should be recieved", async () => {
        await agent.post("/customer/complaints").expect(200);
      });
    });
  });

  describe("/Resolve ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid complaint_id send", async () => {
        const customer_id = "6151e07d7d3c03e1a722f047";
        const customer_name = "Hithru De Alwis";
        const customer_email = "hithrudealwis@gmail.com";
        const description = "My Login button doesn't work";
        const isSolved = false;

        const newCustomerComplaint = new CustomerComplaint({
          customer_id,
          customer_name,
          customer_email,
          description,
          isSolved,
        });
        let data;
        await newCustomerComplaint.save().then(() => {
          data = newCustomerComplaint;
        });

        console.log("resend Data", data);
        await agent
          .post("/customer/resolve")
          .send({
            complaint_id: data._id,
          })
          .expect(200);
      });

      it("should return 404 when invalid complaint_id send", async () => {
        await agent
          .post("/customer/resolve")
          .send({
            complaint_id: "6112e07d7d3c03e1a722f047",
          })
          .expect(404);
      });
    });
  });
});
