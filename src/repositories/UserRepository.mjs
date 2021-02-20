export default class UserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findByCode(code) {
    const user = await this.prisma.user.findUnique({
      where: {
        code
      }
    });
    return user;
  }
}
