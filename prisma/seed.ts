/* eslint-disable no-console */
import { prismaClient } from '../utils/prismaClient';

async function main() {
  await prismaClient.event.create({
    data: {
      event: 'Ввод резервной линии',
      description: 'Закупка и установка резервной линии связи',
      risk: 'Обрыв линии связи',
      riskNum: '2',
      probabilityBefore: 0.1,
      probabilityAfter: 0.05,
      lossesBefore: 10000,
      lossesAfter: 6000,
      riskAssessmentBefore: 1000,
      riskAssessmentAfter: 300,
      startDate: '01.06.2021',
      endDate: '15.09.2021',
      totalCost: '1000',
      responsible: 'Иванов И.И.',
      status: 'Ожидание отчёта',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
