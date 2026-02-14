import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Get dashboard summary
export const getDashboardSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collectorId } = req.query;

    if (!collectorId) {
      res.status(400).json({ error: 'Collector ID is required' });
      return;
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Today's total collection
    const todayPayments = await prisma.payment.aggregate({
      where: {
        collectorId: collectorId as string,
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    // Monthly total collection
    const monthlyPayments = await prisma.payment.aggregate({
      where: {
        collectorId: collectorId as string,
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    // Total members
    const totalMembers = await prisma.member.count({
      where: {
        collectorId: collectorId as string,
        active: true,
      },
    });

    // Active members (members who paid today)
    const activeMembersToday = await prisma.payment.groupBy({
      by: ['memberId'],
      where: {
        collectorId: collectorId as string,
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // Get member total contributions
    const memberContributions = await prisma.payment.groupBy({
      by: ['memberId'],
      where: {
        collectorId: collectorId as string,
      },
      _sum: {
        amount: true,
      },
      _count: true,
    });

    // Get member details for top contributors
    const topContributors = await Promise.all(
      memberContributions
        .sort((a: any, b: any) => (b._sum.amount || 0) - (a._sum.amount || 0))
        .slice(0, 5)
        .map(async (contribution: any) => {
          const member = await prisma.member.findUnique({
            where: { id: contribution.memberId },
            select: {
              id: true,
              name: true,
            },
          });
          return {
            ...member,
            totalContributions: contribution._sum.amount || 0,
            paymentCount: contribution._count,
          };
        })
    );

    const summary = {
      today: {
        totalCollection: todayPayments._sum.amount || 0,
        paymentCount: todayPayments._count,
        activeMembersCount: activeMembersToday.length,
      },
      monthly: {
        totalCollection: monthlyPayments._sum.amount || 0,
        paymentCount: monthlyPayments._count,
      },
      members: {
        total: totalMembers,
        topContributors,
      },
      period: {
        today: todayStart.toISOString(),
        monthStart: monthStart.toISOString(),
        monthEnd: monthEnd.toISOString(),
      },
    };

    res.json(summary);
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
};
