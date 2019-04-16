const request = require("supertest");
const { connect, disconnect } = require("../config/mongo");

const app = function lazyApp() {
  return require("../../src/app");
};

const User = require("../../src/app/models/User");

const factory = require("../factories");

describe("Authentication", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async done => {
    await disconnect(done);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should authenticate with valid credentials", async () => {
    const user = await User.create({
      name: "Eduardo",
      email: "edu@email.com",
      password: "123123"
    });

    const response = await request(app())
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123"
      });
    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app())
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app())
      .post("/sessions")
      .send({
        email: user.email,
        password: "123123"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app())
      .get("/dashboard")
      .set("Authorization", `Bearer ${User.generateToken(user)}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app()).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app())
      .get("/dashboard")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
