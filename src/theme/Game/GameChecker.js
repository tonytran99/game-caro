const getCell = (board, x, y) => {
    if (board[x]) return board[x][y];
    return undefined;
};

const horizontalChecker = (board, x, y, type) => {
    return Array.from({ length: 7 }, (_, p) => ((p !== 0 && p !== 6) ?  (getCell(board, x, y + p) === type) : ([type, null].includes(getCell(board, x, y + p))))).find(
        v => !v
    ) === undefined;
};

const verticalChecker = (board, x, y, type) => {
    return Array.from({ length: 7 }, (_, p) => ((p !== 0 && p !== 6) ?  (getCell(board, x + p, y) === type) : ([type, null].includes(getCell(board, x + p, y))))).find(
        v => !v
    ) === undefined;
};

const crossChecker =  (board, x, y, type) => {
    return Array.from({ length: 7 }, (_, p) => ((p !== 0 && p !== 6) ?  (getCell(board, x + p, y + p) === type) : ([type, null].includes(getCell(board, x + p, y + p))))).find(
        v => !v
    ) === undefined;
}

const antiCrossChecker = (board, x, y, type) => {
    return Array.from({ length: 7 }, (_, p) => ((p !== 0 && p !== 6) ?  (getCell(board, x + p, y - p) === type) : ([type, null].includes(getCell(board, x + p, y - p))))).find(
        v => !v
    ) === undefined;
}

const gameSideChecker = (board, size, type) => {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (
                horizontalChecker(board, x, y, type) ||
                verticalChecker(board, x, y, type) ||
                crossChecker(board, x, y, type) ||
                antiCrossChecker(board, x, y, type)
            ) {
                return true;
            }
        }
    }
    return false;
};

export const checkGameFinished = (board, size, chessmanA, chessmanB) => {
    if (gameSideChecker(board, size, chessmanA)) {
        return chessmanA;
    } else if (gameSideChecker(board, size, chessmanB)) {
        return chessmanB;
    }
    return false;
};
