export default class SalepointRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(name, code) {
    return this.prisma.salepoint.create({
      data: {
        name,
        code
      }
    });
  }

  async findById(id) {
    return this.prisma.salepoint.findUnique({
      where: { id }
    });
  }

  async findByIds(ids) {
    return this.prisma.salepoint.findMany({
      where: { id: { in: ids } }
    });
  }

  async findByCode(code) {
    return this.prisma.salepoint.findFirst({
      where: { code }
    });
  }
}
