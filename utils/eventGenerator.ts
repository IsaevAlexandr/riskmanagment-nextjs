interface GeneratedEvent {
  picture: string;
  message: string;
}

// images serves from "public" folder
export const eventGenerator = (): GeneratedEvent => {
  // случайное число от 0 до 100
  const random = Math.random() * 100;
  /**
   * Вероятности показа картинок:
   * - всё хорошо - 65%
   * - проблема со спутником - 18%
   * - проблема с одним геологическим ПО - 10%
   * - проблема со всем геологическим ПО - 7%
   **/
  if (random >= 0 && random < 65) return { picture: '/all-green.jpg', message: '' };

  if (random >= 65 && random < 83)
    return {
      picture: '/sputnik-problem.jpg',
      message: 'Потеряна связь со спутником. Ведутся работы по восстановлению',
    };

  if (random >= 83 && random < 93)
    return {
      picture: '/PO-geolog-model-problem.jpg',
      message:
        'ПО для геологического моделирования временно недоступно. Ведутся работы по восстановлению доступности.',
    };

  return {
    picture: '/PO-geolog-problem.jpg',
    message:
      'ПО для геологического моделирования и ПО для геонавигации временно недоступно. Ведутся работы по восстановлению доступности.',
  };
};
