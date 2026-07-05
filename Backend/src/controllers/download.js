const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /api/downloads — list all downloads for logged-in user
const getUserDownloads = async (req, res) => {
  try {
    const userId = req.userId;
    const downloads = await prisma.download.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            thumbnailUrl: true,
            previewUrl: true,
            type: true,
            deliveryType: true,
            class: true,
            subject: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: downloads });
  } catch (err) {
    console.error("getUserDownloads error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch downloads" });
  }
};

// GET /api/downloads/:productId — get download URL for a product user owns
const getDownloadUrl = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    // Verify user owns this product via a paid order
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
          paymentStatus: "Paid",
        },
      },
      include: { product: true },
    });

    if (!orderItem) {
      return res.status(403).json({
        success: false,
        message: "You do not own this product. Please purchase it first.",
      });
    }

    const product = orderItem.product;
    if (!product.fileUrl) {
      return res.status(404).json({
        success: false,
        message: "File not available for this product yet.",
      });
    }

    // Upsert download record and increment count
    await prisma.download.upsert({
      where: { userId_productId: { userId, productId } },
      update: {
        downloadCount: { increment: 1 },
        lastDownloadedAt: new Date(),
      },
      create: {
        userId,
        productId,
        orderId: orderItem.orderId,
        downloadCount: 1,
        lastDownloadedAt: new Date(),
      },
    });

    // Increment product download counter
    await prisma.product.update({
      where: { id: productId },
      data: { downloadCount: { increment: 1 } },
    });

    res.json({
      success: true,
      message: "Download access granted",
      data: {
        fileUrl: product.fileUrl,
        productName: product.name,
        productId: product.id,
      },
    });
  } catch (err) {
    console.error("getDownloadUrl error:", err);
    res.status(500).json({ success: false, message: "Failed to process download" });
  }
};

module.exports = { getUserDownloads, getDownloadUrl };
