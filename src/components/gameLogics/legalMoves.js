const Black = -1;

const Pawn = [[1, 0, 0, 0, 0, 0, 0, 0], [2]];

const Rook = [[1, 0, 1, 0, 1, 0, 1, 0], [-1]];

const Knight = [
  [0, 2, 0, 2, 0],
  [2, 0, 0, 0, 2],
  [0, 0, 1, 0, 0],
  [2, 0, 0, 0, 2],
  [0, 2, 0, 2, 0],
];

const Bishop = [[0, 1, 0, 1, 0, 1, 0, 1], [-1]];

const Queen = [[1, 1, 1, 1, 1, 1, 1, 1], [-1]];

const King = [[1, 1, 1, 1, 1, 1, 1, 1], [1]];

function PossibleMove(pattern, pos, board, side) {
  const dir = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  var ValidMove = [];

  if (pattern.length === 2) {
    var checkedDir = [0, 0, 0, 0, 0, 0, 0, 0];
    var step = 1;

    while (checkedDir.find((e) => e === 1) < 8) {
      for (let i = 0; i < 8; i++) {
        if (pattern[0][i] === 0) {
          checkedDir[i] = 1;
          continue;
        }

        if (checkedDir[i] === 1) {
          continue;
        }

        const newPos = {
          x:
            side === 2
              ? step * dir[i][0] * Black + pos.x
              : step * dir[i][1] + pos.x,
          y: step * dir[i][1] + pos.y,
        };

        if (newPos.x < 0 || newPos.x > 7 || newPos.y < 0 || newPos.y > 7) {
          checkedDir[i] = 1;
          continue;
        }

        if (
          board[newPos.x * 8 + newPos.y][0] > -1 &&
          board[newPos.x * 8 + newPos.y][1] === side
        ) {
          checkedDir[i] = 1;
          continue;
        }

        if (
          board[newPos.x * 8 + newPos.y][0] > -1 &&
          board[newPos.x * 8 + newPos.y][1] !== side
        ) {
          ValidMove.push(newPos);
        }

        if (board[newPos.x * 8 + newPos.y][0] === -1) {
          ValidMove.push(newPos);
        }
      }

      step++;

      if (pattern[1][0] === -1) continue;
      if (pattern === step) break;
    }
  } else {
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern.length; j++) {
        if (pattern[i][j] !== 2) {
          continue;
        }
        const newPos = { x: i - 2 + pos.x, y: j - 2 + pos.y };

        if (newPos.x < 0 || newPos.x > 7 || newPos.y < 0 || newPos.y > 7) {
          continue;
        }
        if (
          board[newPos.x * 8 + newPos.y][0] > -1 &&
          board[newPos.x * 8 + newPos.y][1] === side
        ) {
          continue;
        }

        if (
          board[newPos.x * 8 + newPos.y][0] > -1 &&
          board[newPos.x * 8 + newPos.y][1] !== side
        ) {
          ValidMove.push(newPos);
        }

        if (board[newPos.x * 8 + newPos.y][0] === -1) {
          ValidMove.push(newPos);
        }
      }
    }
  }

  return ValidMove;
}

export default function LegalMoves(pos, id, board) {
  console.log(board);
  switch (id) {
    case 0:
      return PossibleMove(Pawn, pos, board, board[pos.x * 8 + pos.y][1]);
    case 1:
      return PossibleMove(Rook, pos, board, board[pos.x * 8 + pos.y][1]);
    case 2:
      return PossibleMove(Knight, pos, board, board[pos.x * 8 + pos.y][1]);
    case 3:
      return PossibleMove(Bishop, pos, board, board[pos.x * 8 + pos.y][1]);
    case 4:
      return PossibleMove(Queen, pos, board, board[pos.x * 8 + pos.y][1]);
    default:
      return PossibleMove(King, pos, board, board[pos.x * 8 + pos.y][1]);
  }
}
