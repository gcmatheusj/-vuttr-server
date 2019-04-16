const request = require("supertest");
const { connect, disconnect } = require("../config/mongo");

const app = function lazyApp() {
  return require("../../src/app");
};

const User = require("../../src/app/models/User");
const Tool = require("../../src/app/models/Tool");

const factory = require("../factories");

describe("Tools", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async done => {
    await disconnect(done);
  });

  beforeEach(async () => {
    await Tool.deleteMany({});
    await User.deleteMany({});
  });

  it("should create a new tool", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app())
      .post("/tools")
      .set("Authorization", `Bearer ${User.generateToken(user)}`)
      .send({
        title: "Notion",
        link: "https://notion.so",
        description:
          "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
        tags: [
          "organization",
          "planning",
          "collaboration",
          "writing",
          "calendar"
        ]
      });
    expect(response.status).toBe(200);
  });

  it("should list tool", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    await Tool.create({
      title: "Notion",
      link: "https://notion.so",
      description:
        "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
      tags: ["organization", "planning", "collaboration", "writing", "calendar"]
    });

    const response = await request(app())
      .get("/tools")
      .set("Authorization", `Bearer ${User.generateToken(user)}`);
    expect(response.status).toBe(200);
  });

  it("should filter tool by tag", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    await Tool.create({
      title: "Notion",
      link: "https://notion.so",
      description:
        "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
      tags: ["organization", "planning", "collaboration", "writing", "calendar"]
    });

    const response = await request(app())
      .get("/tools?tags=planning")
      .set("Authorization", `Bearer ${User.generateToken(user)}`);
    expect(response.status).toBe(200);
  });

  it("should update an tool", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const tool = await Tool.create({
      title: "Notion",
      link: "https://notion.so",
      description:
        "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
      tags: ["organization", "planning", "collaboration", "writing", "calendar"]
    });

    const response = await request(app())
      .put(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${User.generateToken(user)}`)
      .send({
        title: "Notion",
        link: "https://notion.com.br",
        tags: ["organization", "collaboration", "calendar"]
      });

    expect(response.status).toBe(200);
    expect(response.body.tags).toHaveLength(3);
  });

  it("should destroy an tool", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const tool = await Tool.create({
      title: "Notion",
      link: "https://notion.so",
      description:
        "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.",
      tags: ["organization", "planning", "collaboration", "writing", "calendar"]
    });

    const response = await request(app())
      .delete(`/tools/${tool._id}`)
      .set("Authorization", `Bearer ${User.generateToken(user)}`);

    expect(response.status).toBe(200);
  });
});
