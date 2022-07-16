const Black = -1;

const Pawn = [
  [0, 0, 2, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const PawnMoved = [
  [0, 0, 0, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const Rook = [[1, 0, 1, 0, 1, 0, 1, 0], [-1]];

const Knight = [
  [0, 3, 0, 3, 0],
  [3, 0, 0, 0, 3],
  [0, 0, 0, 0, 0],
  [3, 0, 0, 0, 3],
  [0, 3, 0, 3, 0],
];

const Bishop = [[0, 1, 0, 1, 0, 1, 0, 1], [-1]];

const Queen = [[1, 1, 1, 1, 1, 1, 1, 1], [-1]];

const King = [
  [0,0,0,0,0],
  [0,3,3,3,0],
  [0,3,0,3,0],
  [0,3,3,3,0],
  [0,0,0,0,0],
];

function dirVector(from, to) {
  const length = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2))
  const vec = {x: (to.x - from.x) / length, y: (to.y - from.y) / length}

  if(vec.x === -1 || vec.y === 0) return [0, length];
  if(vec.x === -1 || vec.y === 1) return [1, length];
  if(vec.x === 0 || vec.y === 1) return [2, length];
  if(vec.x === 1 || vec.y === 1) return [3, length];
  if(vec.x === 1 || vec.y === 0) return [4, length];
  if(vec.x === 1 || vec.y === -1) return [5, length];
  if(vec.x === 0 || vec.y === -1) return [6, length];
  if(vec.x === -1 || vec.y === -1) return [7, length];

  return -1
}

function PossibleMove(pattern, pos, board, side, moved = false) {
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
    var step = 0;

    while (!checkedDir.every((item) => item === 1)) {
      step++;
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
              : step * dir[i][0] + pos.x,
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
          ValidMove.push({ x: newPos.x, y: newPos.y, type: 3 });
          checkedDir[i] = 1;
          continue;
        }

        if (board[newPos.x * 8 + newPos.y][0] === -1) {
          ValidMove.push({ x: newPos.x, y: newPos.y, type: 2 });
        }
      }
      if (pattern[1][0] === -1) continue;
    }
  } else {
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern.length; j++) {
        if (pattern[i][j] < 1) {
          continue;
        }
        const newPos = {
          x: side === 2 ? (i - 2) * Black + pos.x : i - 2 + pos.x,
          y: j - 2 + pos.y,
        };

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
          if (pattern[i][j] === 1 || pattern[i][j] === 3) {
            ValidMove.push({ x: newPos.x, y: newPos.y, type: 3 });
          }
        }

        if (board[newPos.x * 8 + newPos.y][0] === -1 && pattern[i][j] > 1) {
          ValidMove.push({ x: newPos.x, y: newPos.y, type: 2 });
        }
      }
    }
  }

  return ValidMove;
}

export default function LegalMoves(pos, id, board) {
  var moves = [];
  switch (id) {
    case 0:
      moves = PossibleMove(
        board[pos.x * 8 + pos.y][2] === false ? Pawn : PawnMoved,
        pos,
        board,
        board[pos.x * 8 + pos.y][1],
        board[pos.x * 8 + pos.y][2]
      );
      break;
    case 1:
      moves = PossibleMove(Rook, pos, board, board[pos.x * 8 + pos.y][1]);
      break;
    case 2:
      moves = PossibleMove(Knight, pos, board, board[pos.x * 8 + pos.y][1]);
      break;
    case 3:
      moves = PossibleMove(Bishop, pos, board, board[pos.x * 8 + pos.y][1]);
      break;
    case 4:
      moves = PossibleMove(Queen, pos, board, board[pos.x * 8 + pos.y][1]);
      break;
    default:
      moves = PossibleMove(King, pos, board, board[pos.x * 8 + pos.y][1]);
      break;
  }

  var valids = new Array(64).fill(0);

  moves.forEach((item) => (valids[item.x * 8 + item.y] = item.type));
  return valids;
}

LegalMoves.IsLegal = function LegalMovesIsLegal(pos, board) {
  var opposites = []
  board.forEach((item, i) => {
    if(item[0] !== -1 && item[1] !== board[pos.x * 8 + pos.y][1]) {
      opposites.push([i, item[0]]);
    }
  })
  
  var i = 0;
  while (true) {
    var pattern = [];
    switch (opposites[0]) {
      case 0:
        pattern = board[pos.x * 8 + pos.y][2] === true ? PawnMoved : Pawn
        break;
      case 1:
        pattern = Rook;
        break;
      case 2:
        pattern = Knight;
        break;
      case 3:
        pattern = Bishop;
        break;
      case 4:
        pattern = Queen;
        break;
      default:
        pattern = King;
        break;
      }
    
      const dir = dirVector(pos, {x: Math.floor(opposites[i][0] / 8), y: opposites[i][0] % 8})

      if(dir === -1) {
        opposites.splice(i, 1);
        continue;
      }

      if(pattern[dir[0]] === 0) {
        opposites.splice(i, 1);
        continue;
      }
  }

}