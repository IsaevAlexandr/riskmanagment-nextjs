/* eslint-disable no-console */
import { prismaClient } from './prismaClient';

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

  await prismaClient.risk.createMany({
    data: [
      {
        name: 'Обрыв линии связи',
        description: 'asd',
        category: 'Технологические (оборудование)',
        reason: 'Пожар',
        probability_before: 0.1,
        time_recovery_before: 7.44,
        costs_recovery_after: 1440,
        costs_recovery_before: 1440,
        measure_probability_presence: 'Организация системы пожаротушения',
        probability_after: 0.01,
        time_recovery_after: 7.44,
        business_process: 'Мониторинг процесса бурения',
        risk_owner: 'Иванов Иван Иванович',
      },
      {
        name: 'Отказ работы сервера',
        description: 'asd',
        category: 'Технологические (оборудование)',
        reason: 'Перегрев',
        probability_before: 0.01,
        time_recovery_before: 720,
        costs_recovery_after: 4.72,
        costs_recovery_before: 4.72,
        measure_probability_presence: 'Охлаждение сервера',
        probability_after: 0.005,
        time_recovery_after: 720,
        business_process: 'Мониторинг процесса бурения',
        risk_owner: 'Петров Петр Петрович ',
      },
      {
        name: 'Прекращение подачи электроэнергии',
        description: 'asds',
        category: 'Технологические (оборудование)',
        reason: 'Короткое замыкание',
        probability_before: 0.06,
        time_recovery_before: 1440,
        costs_recovery_after: 25,
        costs_recovery_before: 31.44,
        measure_probability_presence: 'Хранение на складе запасной серверной станции',
        probability_after: 0.06,
        time_recovery_after: 0,
        business_process: 'Мониторинг процесса бурения',
        risk_owner: 'Иванов Иван Иванович',
      },
      {
        name: 'Отказ от предоставления лицензий ввиду санкций',
        description: 'sdasd',
        category: 'Политические',
        reason: 'Введение новых санкций',
        probability_before: 0.04,
        time_recovery_before: 144000,
        costs_recovery_after: 100,
        costs_recovery_before: 294,
        measure_probability_presence: '',
        probability_after: 0.04,
        time_recovery_after: 0,
        business_process: 'Мониторинг процесса бурения',
        risk_owner: 'Иванов Иван Иванович',
      },
    ],
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
