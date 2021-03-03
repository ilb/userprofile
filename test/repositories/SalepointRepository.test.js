import SalepointRepository from '../../src/repositories/SalepointRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const repository = new SalepointRepository({ prisma });

it('should save salepoint', async () => {
  const data = { code: 'ru.test', name: 'Тестовая ТП' };
  const res = await repository.save(data);
  // console.log({ res });
  expect(res.name).toBe('Тестовая ТП');
});
