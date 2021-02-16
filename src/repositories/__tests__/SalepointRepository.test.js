import SalepointRepository from '../SalepointRepository';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// console.log(config);

const repository = new SalepointRepository({ prisma });

it('should save salepoint', async () => {
  const data = { code: 'ru.test', name: 'Тестовая ТП' };
  const res = await repository.create(data);
  // console.log({ res });
  expect(res.name).toBe('Тестовая ТП');
});
