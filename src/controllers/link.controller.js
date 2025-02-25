import LinkService from "../services/link.service.js";
import CustomError from "../utils/customError.js";

class LinkController {
  async create(req, res) {
    try {
      const post = await LinkService.create(req.body.url);
      res.json(post);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json(error);
    }
  }

  async getAll(req, res) {}

  async getOne(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

export default new LinkController();
