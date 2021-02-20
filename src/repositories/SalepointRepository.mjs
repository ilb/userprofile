export default class SalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findById(id) {
    const salepoint = await this.prisma.salepoint.findUnique({
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
