import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Create a new member
export const createMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, dailyContribution, collectorId } = req.body;

    if (!name || !dailyContribution || !collectorId) {
      res.status(400).json({ error: 'Name, daily contribution, and collector ID are required' });
      return;
    }

    const member = await prisma.member.create({
      data: {
        name,
        phone,
        dailyContribution: parseFloat(dailyContribution),
        collectorId,
      },
    });

    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
};

// Get all members
export const getMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collectorId, active } = req.query;

    const where: any = {};
    if (collectorId) where.collectorId = collectorId as string;
    if (active !== undefined) where.active = active === 'true';

    const members = await prisma.member.findMany({
      where,
      include: {
        collector: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            date: true,
          },
          orderBy: {
            date: 'desc',
          },
          take: 5,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// Get member by ID
export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        collector: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        payments: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    });

    if (!member) {
      res.status(404).json({ error: 'Member not found' });
      return;
    }

    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ error: 'Failed to fetch member' });
  }
};

// Update member
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, phone, dailyContribution, active } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (phone !== undefined) data.phone = phone;
    if (dailyContribution !== undefined) data.dailyContribution = parseFloat(dailyContribution);
    if (active !== undefined) data.active = active;

    const member = await prisma.member.update({
      where: { id },
      data,
    });

    res.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
};

// Delete member
export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.member.delete({
      where: { id },
    });

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
};
