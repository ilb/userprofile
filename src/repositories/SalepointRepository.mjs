export default class SalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async find(id) {
    const salepoint = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    return salepoint;
  }

  async save(data) {
    const res = await this.prisma.salepoint.create({
      data
    });
    return res;
  }
}
