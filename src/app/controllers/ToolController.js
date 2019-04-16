const Tool = require("../models/Tool");

class ToolController {
  async index(req, res) {
    const { tags } = req.query;

    if (tags) {
      const tool = await Tool.find({ tags });
      return res.send({ tool });
    }

    const tool = await Tool.find();

    return res.json(tool);
  }

  async store(req, res) {
    const tool = await Tool.create(req.body);

    return res.json(tool);
  }

  async update(req, res) {
    const { id } = req.params;

    const tool = await Tool.findByIdAndUpdate(id, req.body, {
      new: true
    });

    return res.json(tool);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Tool.findByIdAndDelete(id);

    return res.send();
  }
}

module.exports = new ToolController();
