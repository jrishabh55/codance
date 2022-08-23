// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const customerAdd: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const invoice = await prisma.invoice.create({ data: JSON.parse(req.body) });
    return res.json(invoice);
  } catch (e: any) {
    res.status(500).json({ message: e?.message });
  }
};

export default customerAdd;
