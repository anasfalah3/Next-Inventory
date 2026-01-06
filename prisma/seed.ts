import { update } from './../node_modules/effect/src/Differ';
import { id } from './../node_modules/effect/src/Fiber';
import { prisma } from '../lib/prisma'


async function main() {

      console.log('DATABASE_URL:', process.env.DATABASE_URL)

      const demoUserId = "ed513664-5f1d-4608-81a0-abb49a6df3fd";
      const products = await prisma.product.createMany({
            data: Array.from({length: 25}).map((_, i) => ({
                  id: `prod${i + 1}`,
                  userId: demoUserId,
                  name: `Demo Product ${i + 1}`,
                  price: Math.floor(Math.random() * 20) + 1,
                  lowStockAt:5,
                  createdAt:new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
                  updatedAt:new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
            })),

      });
      console.log({ products })
      console.log("Seed data has been inserted.");
      console.log(`Created 25 demo products for user with ID: ${demoUserId}`);
}

main().catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });