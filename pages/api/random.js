import { spicedData } from '@/lib/spicedData';

function getRandomItem(items) {
  const randomNumber = Math.floor(Math.random() * items.length);
  return items[randomNumber];
}

export default async function handler(req, res) {
  const image = getRandomItem(spicedData.artPieces);
  const joke = getRandomItem(spicedData.jokes);
  const emoji = getRandomItem(spicedData.weather);
  const randomData = {image, joke, emoji};
  return res.status(200).json(randomData);
}
