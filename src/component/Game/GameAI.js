import {CHESSMAN_AI_ID, CHESSMAN_ANONYMOUS_ID, CHESSMAN_NONE, CHESSMAN_PLAYER} from "../../constants/constants";
const STRATEGY_POWER__1 = -1;
const STRATEGY_POWER_0 = 0;
const STRATEGY_POWER_1 = 1;
const STRATEGY_POWER_2 = 2;
const STRATEGY_POWER_3 = 3;
const STRATEGY_POWER_4 = 4;


const getCell = (board, x, y) => {
    if (board[x]) return board[x][y];
    return undefined;
};

const horizontalCheck = (board, x, y, power, size, type) => {
    let check =
        y + power < size &&
        Array.from(
            { length: power },
            (_, p) => getCell(board, x, y + p) === type
        ).find(v => !v) === undefined;

    if (check) {
        if (getCell(board, x, y - 1) === CHESSMAN_NONE) {
            return {
                power,
                x,
                y: y - 1
            };
        }
        if (getCell(board, x, y + power) === CHESSMAN_NONE) {
            return {
                power,
                x,
                y: y + power
            };
        }
    }
};

const verticalCheck = (board, x, y, power, size, type) => {
    let check =
        x + power < size &&
        Array.from(
            { length: power },
            (_, p) => getCell(board, x + p, y) === type
        ).find(v => !v) === undefined;

    if (check) {
        if (getCell(board, x - 1, y) === CHESSMAN_NONE) {
            return {
                power,
                x: x - 1,
                y
            };
        }
        if (getCell(board, x + power, y) === CHESSMAN_NONE) {
            return {
                power,
                x: x + power,
                y
            };
        }
    }
};

const crossCheck =(board, x, y, power, size, type) => {
    let check =
        x + power < size &&
        y + power < size &&
        Array.from(
            { length: power },
            (_, p) => getCell(board, x + p, y + p) === type
        ).find(v => !v) === undefined;

    if (check) {
        if (getCell(board, x - 1, y - 1) === CHESSMAN_NONE) {
            return {
                power,
                x: x - 1,
                y: y - 1
            };
        }
        if (getCell(board, x + power, y + power) === CHESSMAN_NONE) {
            return {
                power,
                x: x + power,
                y: y + power
            };
        }
    }
};

const antiCrossCheck = (board, x, y, power, size, type) => {
    let check =
        Array.from(
            { length: power },
            (_, p) => getCell(board, x + p, y - p) === type
        ).find(v => !v) === undefined;

    if (check) {
        if (getCell(board, x - 1, y + 1) === CHESSMAN_NONE) {
            return {
                power,
                x: x - 1,
                y: y + 1
            };
        }
        if (getCell(board, x + power, y - power) === CHESSMAN_NONE) {
            return {
                power,
                x: x + power,
                y: y - power
            };
        }
    }
};

const getRandomEmptyCell = (board, size) => {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (getCell(board, x, y) !== CHESSMAN_NONE) {
        x = Math.floor(Math.random() * size);
        y = Math.floor(Math.random() * size);
    }

    return { x, y, power: -1 };
};

const findBestStrategy = (board, size, type) => {
    for (let power = STRATEGY_POWER_4; power > 0; power--) {
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const hCheck = horizontalCheck(board, x, y, power, size, type);
                if (hCheck !== undefined) return hCheck;
                const vCheck = verticalCheck(board, x, y, power, size, type);
                if (vCheck !== undefined) return vCheck;
                // check cross matching
                const cCheck = crossCheck(board, x, y, power, size, type);
                if (cCheck !== undefined) return cCheck;
                // check anti cross matching
                const acCheck = antiCrossCheck(board, x, y, power, size, type);
                if (acCheck !== undefined) return acCheck;
            }
        }
    }
    return getRandomEmptyCell(board, size);
};

export const nextMoveAI = (board, size) => {
    const [defensive, offensive] = [
        findBestStrategy(board, size, CHESSMAN_PLAYER),
        findBestStrategy(board, size, CHESSMAN_AI_ID)
    ];

    const strategy = offensive.power > defensive.power ? offensive : defensive;

    // board[strategy.x][strategy.y] = CHESSMAN_AI_ID;
    return {
        x: strategy.x,
        y: strategy.y
    };
};

