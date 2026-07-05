const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding mock products...");
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  // Seed TMA PDF
  const tma1 = await prisma.product.create({
    data: {
      name: "Class 12 Physics TMA (English Medium)",
      description: "Complete solved TMA for Class 12 Physics. 100% accurate answers.",
      price: 199,
      offerPrice: 99,
      type: "TMA",
      class: "12",
      subject: "Physics",
      medium: "English",
      fileUrl: "https://example.com/mock_file.pdf",
      previewUrl: "https://example.com/mock_preview.pdf",
      category: "TEXT",
      stock: 1000,
      isPhysical: false,
      active: true,
      rating: 4.8,
      reviews: 42
    }
  });

  // Seed Project File PDF (Non-Copyright)
  const projDigital = await prisma.product.create({
    data: {
      name: "Computer Science Project PDF (Data Science)",
      description: "Downloadable PDF project file. Non-copyright content.",
      price: 299,
      offerPrice: 149,
      type: "PROJECT",
      class: "12",
      subject: "Computer Science",
      medium: "English",
      fileUrl: "https://example.com/mock_project.pdf",
      category: "HANDWRITTEN",
      copyrightStatus: "NON_COPYRIGHT",
      stock: 500,
      isPhysical: false,
      active: true,
      rating: 4.5,
      reviews: 15
    }
  });

  // Seed Project File Physical (Home Delivery, Copyright)
  const projPhysical = await prisma.product.create({
    data: {
      name: "Chemistry Practical File (Home Delivery)",
      description: "Physical handmade practical file delivered to your address.",
      price: 999,
      offerPrice: 799,
      type: "PROJECT",
      class: "12",
      subject: "Chemistry",
      medium: "English",
      category: "HANDWRITTEN",
      copyrightStatus: "COPYRIGHT",
      stock: 50,
      isPhysical: true,
      active: true,
      rating: 4.9,
      reviews: 88
    }
  });

  console.log("Mock data seeded successfully.");
  console.log("Products added:", [tma1.id, projDigital.id, projPhysical.id]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
