const request = require("supertest");

const app = require("../../../app");
const db = require("../../db");
const {
  ServiceProviderComplaint,
} = require("../../../models/serviceProviderComplaint.model");

const SkillVerification = require("../../../models/skillVerification.model");
const { ServiceProvider } = require("../../../models/serviceprovider.model");
// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/serviceProvider", () => {
  describe("/Complaints ", () => {
    describe("/ POST", () => {
      it("should return 200 and array of service Provider Complaints objects should be recieved", async () => {
        await agent.post("/serviceProvider/complaints").expect(200);
      });
    });
  });

  describe("/Resolve ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid complaint_id send", async () => {
        const serviceProvider_id = "6151e07d7d3c03e1a722f047";
        const serviceProvider_name = "Hithru De Alwis";
        const serviceProvider_email = "hithrudealwis@gmail.com";
        const description = "My Login button doesn't work";
        const isSolved = false;

        const newServiceProviderComplaint = new ServiceProviderComplaint({
          serviceProvider_id,
          serviceProvider_name,
          serviceProvider_email,
          description,
          isSolved,
        });
        let data;
        await newServiceProviderComplaint.save().then(() => {
          data = newServiceProviderComplaint;
        });

        await agent
          .post("/serviceProvider/resolve")
          .send({
            complaint_id: data._id,
          })
          .expect(200);
      });

      it("should return 404 when invalid complaint_id send", async () => {
        await agent
          .post("/serviceProvider/resolve")
          .send({
            complaint_id: "6112e07d7d3c03e1a722f047",
          })
          .expect(404);
      });
    });
  });

  describe("/Requests ", () => {
    describe("/ POST", () => {
      it("should return 200 and array of Verification Requests should be recieved", async () => {
        await agent.post("/serviceProvider/requests").expect(200);
      });
    });
  });

  describe("/Decline ", () => {
    describe("/ POST", () => {
      it("should return 200 when valid request_id send", async () => {
        const serviceProviderId = "6151e07d7d3c03e1a722f047";
        const serviceProviderName = "Hithru De Alwis";
        const email = "hithrudealwis@gmail.com";
        const description = "NVQ level 3 certificate";
        const isSolved = false;
        const isaccepted = false;
        const attachments = "None";

        const newVerificationRequest = new SkillVerification({
          serviceProviderId,
          serviceProviderName,
          email,
          description,
          isSolved,
          isaccepted,
          attachments,
        });
        let data;
        await newVerificationRequest.save().then(() => {
          data = newVerificationRequest;
        });

        await agent
          .post("/serviceProvider/decline")
          .send({
            request_id: data._id,
            serviceProviderId: serviceProviderId,
          })
          .expect(200);
      });

      it("should return 404 when invalid request_id send", async () => {
        await agent
          .post("/serviceProvider/decline")
          .send({
            request_id: "6112e07d7d3c03e1a722f047",
          })
          .expect(404);
      });
    });
  });

  describe("/Accept", () => {
    describe("/ POST", () => {
      it("should return 200 when valid request_id and serviceProvider_id send", async () => {
        const serviceProviderId = "6151e07d7d3c03e1a722f047";
        const serviceProviderName = "Hithru De Alwis";
        const email = "hithrudealwis@gmail.com";
        const description = "NVQ level 3 certificate";
        const isSolved = false;
        const isaccepted = false;
        const attachments = "None";

        const newServiceProvider = new ServiceProvider({
          username: serviceProviderName,
          skills: [],
          location: "Ampara",
          description: "I am a very good seller",
          review: "very good",
          rating: 5,
          contactNumber: "0716452576",
          merchantId: "Nothing Special",
          profilePicture: "No Photo",
          email: email,
          password: "123456",
          isVerified: false,
        });
        let providerData;
        await newServiceProvider.save().then(() => {
          providerData = newServiceProvider;
        });
        const newVerificationRequest = new SkillVerification({
          serviceProviderId: providerData._id,
          serviceProviderName,
          email,
          description,
          isSolved,
          isaccepted,
          attachments,
        });
        let data;
        await newVerificationRequest.save().then(() => {
          data = newVerificationRequest;
        });

        await agent
          .post("/serviceProvider/accept")
          .send({
            request_id: data._id,
            serviceProviderId: providerData._id,
          })
          .expect(200);
      });

      it("should return 404 when invalid request_id send", async () => {
        const serviceProviderId = "6151e07d7d3c03e1a722f047";
        const serviceProviderName = "Hithru De Alwis";
        const email = "hithrudealwis@gmail.com";
        const description = "NVQ level 3 certificate";
        const isSolved = false;
        const isaccepted = false;
        const attachments = "None";

        const newServiceProvider = new ServiceProvider({
          username: serviceProviderName,
          skills: [],
          location: "Ampara",
          description: "I am a very good seller",
          review: "very good",
          rating: 5,
          contactNumber: "0716452576",
          merchantId: "Nothing Special",
          profilePicture: "No Photo",
          email: email,
          password: "123456",
          isVerified: false,
        });
        let providerData;
        await newServiceProvider.save().then(() => {
          providerData = newServiceProvider;
        });
        const newVerificationRequest = new SkillVerification({
          serviceProviderId: providerData._id,
          serviceProviderName,
          email,
          description,
          isSolved,
          isaccepted,
          attachments,
        });
        let data;
        await newVerificationRequest.save().then(() => {
          data = newVerificationRequest;
        });

        await agent
          .post("/serviceProvider/accept")
          .send({
            request_id: "6151e07d7d3c03e1a722f047",
            serviceProviderId: providerData._id,
          })
          .expect(404);
      });
    });

    it("should return 404 when valid request_id and invalid service_id send", async () => {
      const serviceProviderId = "6151e07d7d3c03e1a722f047";
      const serviceProviderName = "Hithru De Alwis";
      const email = "hithrudealwis@gmail.com";
      const description = "NVQ level 3 certificate";
      const isSolved = false;
      const isaccepted = false;
      const attachments = "None";

      const newServiceProvider = new ServiceProvider({
        username: serviceProviderName,
        skills: [],
        location: "Ampara",
        description: "I am a very good seller",
        review: "very good",
        rating: 5,
        contactNumber: "0716452576",
        merchantId: "Nothing Special",
        profilePicture: "No Photo",
        email: email,
        password: "123456",
        isVerified: false,
      });
      let providerData;
      await newServiceProvider.save().then(() => {
        providerData = newServiceProvider;
      });
      const newVerificationRequest = new SkillVerification({
        serviceProviderId: "6151e07d7d3c03e1a722f047",
        serviceProviderName,
        email,
        description,
        isSolved,
        isaccepted,
        attachments,
      });
      let data;
      await newVerificationRequest.save().then(() => {
        data = newVerificationRequest;
      });

      await agent
        .post("/serviceProvider/accept")
        .send({
          request_id: data._id,
          serviceProviderId: "6151e07d7d3c03e1a722f047",
        })
        .expect(404);
    });
  });
});
