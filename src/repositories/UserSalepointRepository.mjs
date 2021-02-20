export default class UserSalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findCurrentByUserId(userId) {
    const salepoint = await this.prisma.userSalepoint.findFirst({
      where: {
        userId,
        endDate: null
      }
    });
    return salepoint;
  }
}
