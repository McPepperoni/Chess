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
