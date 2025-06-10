const Faq = require("../models/faqModel");

const faqController = {
  getAllFaq: (req, res) => {
    Faq.getAll((err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching FAQs"+err });
      res.json({
        data: results,
      });
    });
  },
};

module.exports = faqController;
