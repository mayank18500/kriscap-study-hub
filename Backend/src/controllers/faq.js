const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/faqs — list active FAQs (public)
const getFAQs = async (req, res) => {
  try {
    const { category } = req.query;
    const faqs = await prisma.fAQ.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
      },
      orderBy: { sortOrder: "asc" },
    });
    res.json({ success: true, data: faqs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch FAQs" });
  }
};

// Admin: create FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer, sortOrder, category } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Question and answer are required" });
    }
    const faq = await prisma.fAQ.create({
      data: { question, answer, sortOrder: sortOrder || 0, category },
    });
    res.status(201).json({ success: true, message: "FAQ created", data: faq });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create FAQ" });
  }
};

// Admin: update FAQ
const updateFAQ = async (req, res) => {
  try {
    const updated = await prisma.fAQ.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, message: "FAQ updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update FAQ" });
  }
};

// Admin: delete FAQ
const deleteFAQ = async (req, res) => {
  try {
    await prisma.fAQ.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete FAQ" });
  }
};

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
