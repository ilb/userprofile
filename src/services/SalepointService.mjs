export default class SalepointService {
  constructor({
    salepointProvider,
    userRepository,
    userSalepointRepository,
    salepointRepository,
    currentUser
  }) {
    this.salepointProvider = salepointProvider;
    this.userRepository = userRepository;
    this.userSalepointRepository = userSalepointRepository;
    this.salepointRepository = salepointRepository;
    this.currentUser = currentUser;
  }

  async getCurrentSalepoint() {
    const user = await this.userRepository.findByCode(this.currentUser);
    const currentUserSalepoint = await this.userSalepointRepository.findCurrentByUserId(user.id);
    const currentSalepoint = await this.salepointRepository.findById(
      currentUserSalepoint.salepointId
    );
    return currentSalepoint;
  }

  async changeCurrentSalepoint(salepointCode) {
    const user = await this.userRepository.findByCode(this.currentUser);
    const newSalepoint = await this.salepointRepository.findByCode(salepointCode);
    const currentUserSalepoint = await this.userSalepointRepository.findCurrentByUserId(user.id);

    await this.userSalepointRepository.updateById(currentUserSalepoint.id, {
      endDate: new Date().toISOString()
    });

    await this.userSalepointRepository.create(user, newSalepoint);
  }
}
