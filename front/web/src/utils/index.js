export const colors = [
  "#424242",
  "#37474f",
  "#64dd17",
  "#795548",
  "#f57c00",
  "#00e676",
  "#004d40",
  "#dce775",
  "#18ffff",
  "#03a9f4",
  "#bf360c",
  "#6a1b9a",
  "#aa00ff",
  "#673ab7",
  "#4db6ac",
];

export const randomNum = (m, n) => {
  return Math.floor(Math.random() * (m - n) + n);
};

export const randomColor = () => {
  return colors[randomNum(1, 15)];
};
