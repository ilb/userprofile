import { BadRequestError } from '../../libs/utils/error.mjs';

const HISTORY_RECORDS_LIMIT = 10;

export default class SalepointHistory {
  constructor({ salepointService, userService }) {
    this.salepointService = salepointService;
    this.userService = userService;
  }

  async process(req) {
    const { userCode, begDate, endDate, page } = req;
    if (!(userCode && begDate && endDate)) {
      return null;
    }
    const skippedRecordsCount = (page - 1) * HISTORY_RECORDS_LIMIT || 0;

    const user = await this.userService.getUser(userCode);
    if (!user) {
      throw new BadRequestError('Пользователь с таким userCode не найден');
    }
    const begDateIsoString = new Date(begDate).toISOString();
    const endDateIsoString = new Date(endDate).toISOString();
    const salepointsHistorySize = await this.salepointService.getSalepointsHistorySize(
      user,
      begDateIsoString,
      endDateIsoString
    );
    const salepointsHistory = await this.salepointService.getSalepointsHistory(
      user,
      begDateIsoString,
      endDateIsoString,
      skippedRecordsCount,
      HISTORY_RECORDS_LIMIT
    );
    return { userName: user.name, salepointsHistory, salepointsHistorySize };
  }

  async schema() {
    const users = await this.userService.getAllUsers();

    const schema = {
      type: 'object',
      properties: {
        userCode: {
          title: 'Пользователь',
          type: 'string',
          options: users.map(({ code, name }) => ({ value: code, label: name }))
        },
        begDate: {
          title: 'Начало периода',
          type: 'string',
          format: 'date'
        },
        endDate: {
          title: 'Конец периода',
          type: 'string',
          format: 'date'
        }
      },
      required: ['userCode', 'begDate', 'endDate']
    };
    return schema;
  }
}
