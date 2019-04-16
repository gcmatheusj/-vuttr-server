const { connect, disconnect } = require("../config/mongo");
const bcrypt = require("bcrypt");

const User = require("../../src/app/models/User");

describe("User", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async done => {
    await disconnect(done);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Matheus",
      email: "gomes@email.com",
      password: "123456"
    });

    const compareHash = await bcrypt.compare("123456", user.password);

    expect(compareHash).toBe(true);
  });
});
