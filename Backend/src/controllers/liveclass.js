const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/classes — list upcoming live classes (public)
const getUpcomingClasses = async (req, res) => {
  try {
    const classes = await prisma.liveClass.findMany({
      where: {
        isCompleted: false,
        scheduledAt: { gte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 10,
    });
    res.json({ success: true, data: classes });
  } catch (err) {
    console.error("getUpcomingClasses error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch classes" });
  }
};

// GET /api/classes/all — all classes (admin)
const getAllClasses = async (req, res) => {
  try {
    const classes = await prisma.liveClass.findMany({
      orderBy: { scheduledAt: "desc" },
      include: { _count: { select: { registrations: true } } },
    });
    res.json({ success: true, data: classes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch classes" });
  }
};

// POST /api/classes — admin create a live class
const createClass = async (req, res) => {
  try {
    const {
      title, description, teacherName, subject,
      meetingUrl, thumbnailUrl, scheduledAt, duration,
      isFree, maxSeats,
    } = req.body;

    if (!title || !scheduledAt) {
      return res.status(400).json({ success: false, message: "Title and scheduledAt are required" });
    }

    const newClass = await prisma.liveClass.create({
      data: {
        title, description, teacherName, subject,
        meetingUrl, thumbnailUrl,
        scheduledAt: new Date(scheduledAt),
        duration: duration || 60,
        isFree: isFree !== undefined ? isFree : true,
        maxSeats,
      },
    });
    res.status(201).json({ success: true, message: "Class created", data: newClass });
  } catch (err) {
    console.error("createClass error:", err);
    res.status(500).json({ success: false, message: "Failed to create class" });
  }
};

// PATCH /api/classes/:id — admin update class
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.liveClass.update({
      where: { id },
      data: req.body,
    });
    res.json({ success: true, message: "Class updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update class" });
  }
};

// DELETE /api/classes/:id — admin delete class
const deleteClass = async (req, res) => {
  try {
    await prisma.liveClass.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete class" });
  }
};

// POST /api/classes/:id/register — user register for a class
const registerForClass = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: liveClassId } = req.params;

    const liveClass = await prisma.liveClass.findUnique({ where: { id: liveClassId } });
    if (!liveClass) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    const registration = await prisma.classRegistration.upsert({
      where: { userId_liveClassId: { userId, liveClassId } },
      update: {},
      create: { userId, liveClassId },
    });

    res.json({ success: true, message: "Registered for class", data: registration });
  } catch (err) {
    console.error("registerForClass error:", err);
    res.status(500).json({ success: false, message: "Failed to register for class" });
  }
};

// GET /api/classes/:id/registrations — admin view registrations
const getRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.classRegistration.findMany({
      where: { liveClassId: req.params.id },
      include: {
        user: { select: { id: true, name: true, email: true, phoneNumber: true } },
      },
    });
    res.json({ success: true, data: registrations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch registrations" });
  }
};

module.exports = {
  getUpcomingClasses, getAllClasses, createClass, updateClass,
  deleteClass, registerForClass, getRegistrations,
};
