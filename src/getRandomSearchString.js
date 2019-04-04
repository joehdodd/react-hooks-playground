export default () => {
  const randomNumber = () => Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  const map = {
    0: "northern lights",
    1: "stars",
    2: "scotland",
    3: "mountains",
    4: "earth",
    5: "star wars",
    6: "the matrix",
    7: "waterfalls",
    8: "nature"
  };
  return map[randomNumber()];
};
