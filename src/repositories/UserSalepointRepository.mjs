export default class UserSalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(user, salepoint) {
    return this.prisma.userSalepoint.create({
      data: {
        userId: user.id,
        salepointId: salepoint.id,
        begDate: new Date().toISOString()
      }
    });
  }

  async getByUserIdInPeriod(userId, begDate, endDate, skip, limit) {
    return this.prisma.userSalepoint.findMany({
      where: {
        userId,
        begDate: {
          gte: begDate,
          lte: endDate
        }
      },
      orderBy: {
        begDate: 'desc'
      },
      include: {
        salepoint: true
      },
      skip: skip,
      take: limit
    });
  }
  async countByUserIdInPeriod(userId, begDate, endDate) {
    return this.prisma.userSalepoint.count({
      where: {
        userId,
        begDate: {
          gte: begDate,
          lte: endDate
        }
      }
    });
  }

  async findCurrentByUserId(userId) {
    return this.prisma.userSalepoint.findFirst({
      where: { userId, endDate: null }
    });
  }

  async updateById(id, data) {
    return this.prisma.userSalepoint.update({
      where: { id },
      data
    });
  }
}
