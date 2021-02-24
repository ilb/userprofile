export default class SalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findById(id) {
    const salepoint = await this.prisma.salepoint.findUnique({
      where: { id }
    });
    return salepoint;
  }

  async findByCode(code) {
    const salepoint = await this.prisma.salepoint.findFirst({
      where: { code }
    });
    return salepoint;
  }
}
