export default class UserService {
  constructor({ userRepository, currentUser }) {
    this.userRepository = userRepository;
    this.currentUser = currentUser;
  }

  async getAllUsers() {
    return this.userRepository.getAll();
  }

  async getUser(code) {
    return this.userRepository.findByCode(code);
  }

  async createUser(code) {
    return this.userRepository.create(code);
  }

  async getOrCreateUser(code) {
    let user = await this.getUser(code);
    if (!user) {
      user = await this.createUser(code);
    }
    return user;
  }

  async getOrCreateCurrentUser() {
    return this.getOrCreateUser(this.currentUser);
  }
}
