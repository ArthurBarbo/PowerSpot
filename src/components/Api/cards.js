export async function getFavoriteCards(token) {
  // por enquanto retorna um array vazio ou alguns cards mock
  return [
    {
      id: 1,
      title: 'Carregador A',
      description: 'Rápido e confiável',
      image: '/images/charger1.jpg',
      distance: 0.5,
    },
    {
      id: 2,
      title: 'Carregador B',
      description: 'Local agradável',
      image: '/images/charger2.jpg',
      distance: 1.2,
    },
  ];
}
