export function NumToString(x, y) {
  return (
    Math.abs(x).toString().padStart(2, "0") +
    " " +
    Math.abs(y).toString().padStart(2, "0")
  );
}

export function StringToNum(Cord) {
  return { x: parseInt(Cord.slice(0, 3)), y: parseInt(Cord.slice(3)) };
}

export function UpdateMap(map, pos, newPos, to = -1) {
  const id = map[pos.x * 8 + pos.y][0];
  const side = map[pos.x * 8 + pos.y][1];

  map[pos.x * 8 + pos.y][0] = -1;
  map[newPos.x * 8 + newPos.y] = [to !== -1 ? id : to, side, true];

  return map;
}
