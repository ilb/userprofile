export default class SalepointService {
  constructor({
    salepointProvider,
    userRepository,
    userSalepointRepository,
    salepointRepository,
    userService
  }) {
    this.salepointProvider = salepointProvider;
    this.userRepository = userRepository;
    this.userSalepointRepository = userSalepointRepository;
    this.salepointRepository = salepointRepository;
    this.userService = userService;
  }

  async createSalepoint(name, code) {
    return this.salepointRepository.create(name, code);
  }

  async getSalepoint(code) {
    return this.salepointRepository.findByCode(code);
  }

  async getCurrentSalepoint(userCode) {
    let user;
    if (userCode) {
      user = await this.userService.getOrCreateUser(userCode);
    } else {
      user = await this.userService.getOrCreateCurrentUser();
    }
    const currentUserSalepoint = await this.userSalepointRepository.findCurrentByUserId(user.id);
    if (!currentUserSalepoint) {
      return null;
    }
    const currentSalepoint = await this.salepointRepository.findById(
      currentUserSalepoint.salepointId
    );
    return currentSalepoint;
  }

  async changeCurrentSalepoint(salepointCode) {
    const user = await this.userService.getOrCreateCurrentUser();
    const newSalepoint = await this.salepointRepository.findByCode(salepointCode);
    console.log(newSalepoint);
    const currentUserSalepoint = await this.userSalepointRepository.findCurrentByUserId(user.id);

    if (currentUserSalepoint) {
      await this.userSalepointRepository.updateById(currentUserSalepoint.id, {
        endDate: new Date().toISOString()
      });
    }

    await this.userSalepointRepository.create(user, newSalepoint);
  }

  async getSalepointsHistory(user, begDate, endDate, skip, limit) {
    const userSalepoints = await this.userSalepointRepository.getByUserIdInPeriod(
      user.id,
      begDate,
      endDate,
      skip,
      limit
    );
    const salepointsHistory = userSalepoints.map(({ begDate, endDate, salepoint }) => ({
      begDate: new Date(begDate).toISOString(),
      endDate: (endDate && new Date(endDate).toISOString()) || null,
      salepointName: salepoint.name
    }));
    return salepointsHistory;
  }

  async getSalepointsHistorySize(user, begDate, endDate) {
    return this.userSalepointRepository.countByUserIdInPeriod(user.id, begDate, endDate);
  }
}
