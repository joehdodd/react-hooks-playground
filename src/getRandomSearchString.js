export default () => {
  const randomNumber = () => Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  const map = {
    0: "tennessee",
    1: "tacos",
    2: "smoky mountains",
    3: "ireland",
    4: "airplanes",
    5: "doge",
    6: "kung fu",
    7: "explosions",
    8: "kazoo kid"
  };
  return map[randomNumber()];
};
