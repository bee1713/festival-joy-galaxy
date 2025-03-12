
const holiWishes = [
  "May your life always be filled with vibrant colors!",
  "Let's celebrate the triumph of good over evil!",
  "Wishing you a Holi filled with sweet moments!",
  "May your Holi be as colorful as your dreams!",
  "Let the colors of Holi spread happiness in your life!",
  "May this Holi bring the brightest colors to your life!",
  "Let's drench in colors and wash away the sorrows!",
  "May the spirit of Holi bring joy to your heart!",
  "Let the colors of Holi fill your life with happiness!",
  "Wishing you a rainbow of good times on Holi!"
];

export const getRandomWish = (): string => {
  const randomIndex = Math.floor(Math.random() * holiWishes.length);
  return holiWishes[randomIndex];
};

export default holiWishes;
