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
    console.log(currentUserSalepoint, 'asdfasfd');
    const currentSalepoint = await this.salepointRepository.findById(
      currentUserSalepoint.salepointId
    );
    return currentSalepoint;
  }
}
