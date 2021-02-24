export default class UserSalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findCurrentByUserId(userId) {
    const salepoint = await this.prisma.userSalepoint.findFirst({
      where: { userId, endDate: null }
    });
    return salepoint;
  }

  async updateById(id, data) {
    const res = await this.prisma.userSalepoint.update({
      where: { id },
      data
    });
    return res;
  }

  async create(user, salepoint) {
    return await this.prisma.userSalepoint.create({
      data: {
        // user,
        userId: user.id,
        // salepoint,
        salepointId: salepoint.id,
        begDate: new Date().toISOString()
      }
    });
  }
}
