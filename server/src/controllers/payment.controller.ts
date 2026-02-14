import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Create a new payment
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, memberId, collectorId, notes, date } = req.body;

    if (!amount || !memberId || !collectorId) {
      res.status(400).json({ error: 'Amount, member ID, and collector ID are required' });
      return;
    }

    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        memberId,
        collectorId,
        notes,
        date: date ? new Date(date) : new Date(),
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Get all payments
export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId, collectorId, startDate, endDate } = req.query;

    const where: any = {};
    if (memberId) where.memberId = memberId as string;
    if (collectorId) where.collectorId = collectorId as string;
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        member: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        collector: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id: id as string },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        collector: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.payment.delete({
      where: { id: id as string },
    });

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};
