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
    if (!currentUserSalepoint) {
      return null;
    }
    const currentSalepoint = await this.salepointRepository.findById(
      currentUserSalepoint.salepointId
    );
    return currentSalepoint;
  }

  async changeCurrentSalepoint(salepointCode) {
    const user = await this.userRepository.findByCode(this.currentUser);
    const newSalepoint = await this.salepointRepository.findByCode(salepointCode);
    const currentUserSalepoint = await this.userSalepointRepository.findCurrentByUserId(user.id);

    if (currentUserSalepoint) {
      await this.userSalepointRepository.updateById(currentUserSalepoint.id, {
        endDate: new Date().toISOString()
      });
    }

    await this.userSalepointRepository.create(user, newSalepoint);
  }

  /* eslint-disable no-undef */
  async getSalepointsHistory(user, begDate, endDate, skip, limit) {
    const userSalepoints = await this.userSalepointRepository.getByUserIdInPeriod(
      user.id,
      begDate,
      endDate,
      skip,
      limit
    );
    const salepointIds = [...new Set(userSalepoints.map((usp) => usp.salepointId))];
    const salepoints = await this.salepointRepository.findByIds(salepointIds);
    const salepointsMap = new Map(salepoints.map((sp) => [sp.id, sp]));

    const salepointsHistory = userSalepoints.map(({ begDate, endDate, salepointId }) => ({
      begDate: new Date(begDate).toISOString(),
      endDate: (endDate && new Date(endDate).toISOString()) || null,
      salepointName: salepointsMap.get(salepointId).name
    }));
    return salepointsHistory;
  }

  async getSalepointsHistorySize(user, begDate, endDate) {
    return this.userSalepointRepository.countByUserIdInPeriod(user.id, begDate, endDate);
  }
}
