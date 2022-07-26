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
  [0, 0, 0, 0, 0],
  [0, 3, 3, 3, 0],
  [0, 3, 0, 3, 0],
  [0, 3, 3, 3, 0],
  [0, 0, 0, 0, 0],
];

function dirVector(from, to) {
  const length = Math.sqrt(
    Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
  );
  const vec = { x: to.x - from.x, y: to.y - from.y };

  if (vec.y === 0 && vec.x < 0) return [0, length];
  if (vec.x / vec.y === -1 && vec.x < 0) return [1, length];
  if (vec.x === 0 && vec.y > 0) return [2, length];
  if (vec.x / vec.y === 1 && vec.x > 0) return [3, length];
  if (vec.y === 0 && vec.x > 0) return [4, length];
  if (vec.x / vec.y === -1 && vec.x > 0) return [5, length];
  if (vec.x === 0 && vec.y < 0) return [6, length];
  if (vec.x / vec.y === 1 && vec.x < 1) return [7, length];

  return -1;
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
  var valids = LegalMoves(pos, 5, board);
  var tempValids = [...valids];
  var alters = [];
  var poses = [];

  while (true) {
    var i = tempValids.indexOf(2);
    if (i === -1) {
      i = tempValids.indexOf(3);
      if (i === -1) break;
    }
    var temp = board.map((item) => item.slice());

    temp[pos.x * 8 + pos.y][0] = -1;
    temp[i][0] = 5;
    temp[i][1] = board[pos.x * 8 + pos.y][1];

    tempValids[i] = 0;
    poses.push({ x: Math.floor(i / 8), y: i % 8 });
    alters.push(temp);
  }

  var opposites = [];
  alters.forEach((alter, j) => {
    var opposite = [];

    alter.forEach((item, i) => {
      if (item[0] !== -1 && item[1] !== alter[poses[j].x * 8 + poses[j].y][1]) {
        opposite.push([i, item[0]]);
      }
    });

    i = 0;
    while (true) {
      if (i === opposite.length) break;
      if (
        opposite[i][1] !== 0 &&
        opposite[i][1] !== 5 &&
        opposite[i][1] !== 2
      ) {
        var pattern = [];
        switch (opposite[i][1]) {
          case 0:
            pattern = alter[pos.x * 8 + pos.y][2] === true ? PawnMoved : Pawn;
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

        if (opposite[i][1] === 4) {
          console.log("hi");
        }

        const dir = dirVector(poses[j], {
          x: Math.floor(opposite[i][0] / 8),
          y: opposite[i][0] % 8,
        });

        if (dir === -1) {
          opposite.splice(i, 1);
          continue;
        }

        if (pattern[0][dir[0]] === 0) {
          opposite.splice(i, 1);
          continue;
        }
      }

      i++;
    }
    if (opposite.length > 0) opposites.push(opposite);
  });

  opposites.forEach((opposite, i) =>
    opposite.forEach((item) => {
      const moves = LegalMoves(
        { x: Math.floor(item[0] / 8), y: item[0] % 8 },
        item[1],
        alters[i]
      );

      moves.forEach((m, j) => {
        if (m === 3 && valids[j] !== 0) {
          console.log(item);
          valids[j] = 0;
        }
      });
    })
  );

  return valids;
};

LegalMoves.King = function LegalMovesKing(pos, board) {
  var castling = [];
  if (board[pos.x * 8 + pos.y][2] === true) return castling;

  if (board[pos.x * 8 + pos.y][1] === 2) {
    if (
      board[0][2] === false &&
      board[1][0] === -1 &&
      board[2][0] === -1 &&
      board[3][0] === -1
    ) {
      castling.push([
        [2, 2],
        [0, 3, 1, -1],
      ]);
    }

    if (board[7][2] === false && board[6][0] === -1 && board[5][0] === -1) {
      castling.push([
        [6, 2],
        [7, 5, 1, -1],
      ]);
    }
  }

  if (board[pos.x * 8 + pos.y][1] === 1) {
    if (
      board[56][2] === false &&
      board[57][0] === -1 &&
      board[58][0] === -1 &&
      board[59][0] === -1
    ) {
      castling.push([
        [58, 2],
        [56, 59, 1, -1],
      ]);
    }

    if (board[63][2] === false && board[62][0] === -1 && board[61][0] === -1) {
      castling.push([
        [62, 2],
        [63, 61, 1, -1],
      ]);
    }
  }
  return castling;
};

LegalMoves.Pawn = function LegalMovesPawn(pos, enPassant, board) {
  var en = [];

  if (board[pos.x * 8 + pos.y][1] === 2) {
    const left = pos.y - 1;
    const right = pos.y + 1;

    if (pos.x === 4) {
      if (left > 0) {
        if (
          board[pos.x * 8 + left][0] === 0 &&
          board[pos.x * 8 + left][1] === 1 &&
          enPassant[pos.x * 8 + left] === false
        ) {
          en.push([
            [pos.x * 8 + left + 8, 3],
            [pos.x * 8 + left, pos.x * 8 + left, -1, -1],
          ]);
        }
      }

      if (right < 7) {
        if (
          board[pos.x * 8 + right][0] === 0 &&
          board[pos.x * 8 + right][1] === 1 &&
          enPassant[pos.x * 8 + right] === false
        ) {
          en.push([
            [pos.x * 8 + right + 8, 3],
            [pos.x * 8 + right, pos.x * 8 + right, -1, -1],
          ]);
        }
      }
    }
  }
  if (board[pos.x * 8 + pos.y][1] === 1) {
    const left = pos.y - 1;
    const right = pos.y + 1;

    if (pos.x === 3) {
      if (left > 0) {
        if (
          board[pos.x * 8 + left][0] === 0 &&
          board[pos.x * 8 + left][1] === 2 &&
          enPassant[pos.x * 8 + left] === false
        ) {
          en.push([
            [pos.x * 8 + left - 8, 3],
            [pos.x * 8 + left, pos.x * 8 + left, -1, -1],
          ]);
        }
      }

      if (right < 7) {
        if (
          board[pos.x * 8 + right][0] === 0 &&
          board[pos.x * 8 + right][1] === 2 &&
          enPassant[pos.x * 8 + right] === false
        ) {
          en.push([
            [pos.x * 8 + right - 8, 3],
            [pos.x * 8 + right, pos.x * 8 + right, -1, -1],
          ]);
        }
      }
    }
  }

  return en;
};
