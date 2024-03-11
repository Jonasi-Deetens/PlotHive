const { default: ContributionModel } = require("../Models/Contribution");

class ContributionController {
  static async getAllContributions(req, res) {
    console.log("Test getAllContributions");
    try {
      const contributions = await ContributionModel.find();
      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createContribution(req, res) {
    try {
      const newContribution = new ContributionModel(req.body);
      const savedContribution = await newContribution.save();
      res.status(201).json(savedContribution);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getContributionById(req, res) {
    try {
      const contribution = await ContributionModel.findById(req.params.id);
      if (!contribution) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(contribution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateContribution(req, res) {
    try {
      const updatedContribution = await ContributionModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedContribution) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(updatedContribution);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Example method to delete an item by ID
  static async deleteContribution(req, res) {
    try {
      const deletedContribtion = await ContributionModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedContribtion) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContributionController;
