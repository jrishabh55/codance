import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedTransactionCategories = async () => {
  const transactionCategories = [
    'Food',
    'Rent',
    'Utilities',
    'Transport',
    'Clothes',
    'Health',
    'Education',
    'Gifts',
    'Other',
    'Un-Categorized',
  ];

  return prisma.transactionCategory.createMany({
    data: transactionCategories.map((name) => ({ name })),
    skipDuplicates: true,
  });
};

const seedUser = async () => {
  return prisma.user.create({
    data: {
      email: 'rishabh@codation.io',
      name: 'Rishabh Jain',
      passwordHash: '$2a$10$MBRO9ejazF1w3aw2Ze4h3.sE2fhAMOsU4T9sYyB4GlP4rZf19NWmO',
      username: 'rishabh',
    },
  });
};

seedTransactionCategories();
seedUser();
