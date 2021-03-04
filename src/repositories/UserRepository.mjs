export default class UserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(code) {
    return await this.prisma.user.create({
      data: {
        name: code,
        code
      }
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async findByCode(code) {
    return await this.prisma.user.findUnique({
      where: { code }
    });
  }
}
