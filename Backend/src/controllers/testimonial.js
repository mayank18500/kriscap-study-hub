const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/testimonials — list approved testimonials (public)
const getTestimonials = async (req, res) => {
  try {
    const featured = req.query.featured === "true";
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true,
        ...(featured ? { featured: true } : {}),
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 12,
    });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// POST /api/testimonials — submit a testimonial (authenticated)
const submitTestimonial = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, course, message, rating, avatarUrl } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        userId,
        name: name || "Anonymous",
        course,
        message,
        rating: rating ? parseInt(rating) : 5,
        avatarUrl,
        approved: false, // requires admin approval
      },
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your testimonial has been submitted for review.",
      data: testimonial,
    });
  } catch (err) {
    console.error("submitTestimonial error:", err);
    res.status(500).json({ success: false, message: "Failed to submit testimonial" });
  }
};

// Admin: GET all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// Admin: PATCH approve/feature
const updateTestimonial = async (req, res) => {
  try {
    const updated = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, message: "Testimonial updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update testimonial" });
  }
};

// Admin: DELETE
const deleteTestimonial = async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete testimonial" });
  }
};

module.exports = {
  getTestimonials, submitTestimonial, getAllTestimonials,
  updateTestimonial, deleteTestimonial,
};
