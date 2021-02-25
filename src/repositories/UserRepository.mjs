export default class UserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async findByCode(code) {
    const user = await this.prisma.user.findUnique({
      where: { code }
    });
    return user;
  }
}
