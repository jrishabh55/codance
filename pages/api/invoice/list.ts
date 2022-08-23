import { PrismaClient } from '@prisma/client';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

const invoiceList: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    const invoices = await prisma.invoice.findMany();
    res.status(200).json(invoices);
  } catch (e: any) {
    res.status(500).json({ message: e?.message });
  }
};

export default invoiceList;
