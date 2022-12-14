// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const customerAdd: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // SQL FOR Create user
  // INSERT INTO users (name, email) VALUES ('John Doe', '\
  const customer = await prisma.customer.create({ data: JSON.parse(req.body) });
  return res.json(customer);
};

export default customerAdd;
