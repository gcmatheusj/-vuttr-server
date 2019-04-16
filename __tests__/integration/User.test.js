const request = require("supertest");
const { connect, disconnect } = require("../config/mongo");

const app = function lazyApp() {
  return require("../../src/app");
};

const User = require("../../src/app/models/User");

describe("Signup", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async done => {
    await disconnect(done);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create new user", async () => {
    const response = await request(app())
      .post("/users")
      .send({
        name: "Matheus Castro",
        email: "matheus@email.com",
        password: "123123"
      });
    expect(response.status).toBe(200);
  });
});
