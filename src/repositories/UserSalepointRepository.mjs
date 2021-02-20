export default class UserSalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findByUserId(userId) {
    const salepoints = await this.prisma.userSalepoint.findMany({
      where: {
        userId
      }
    });
    return salepoints;
  }
}
