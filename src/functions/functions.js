import {CHESSMAN_NONE} from "../constants/constants";

export const paramsToObject = (entries) => {
    let result = {}
    for(let entry of entries) { // each 'entry' is a [key, value] tupple
        const [key, value] = entry;
        result[key] = value;
    }
    return result;
}
export const initBoard = (size) => {
    let dataBoard = [];
    for (let index = 0; index < size; index ++) {
        let itemRow = [];
        for (let indexCell = 0; indexCell < size; indexCell ++) {
            itemRow.push(CHESSMAN_NONE);
        }
        dataBoard.push(itemRow);
    }
    return  dataBoard;
}

export const fillEmptyMap = (array, width, height) => {
    for (var x = 0; x < width; x++) {
        array[x] = [];
        for (var y = 0; y < height; y++) {

            array[x][y] = [0];
        }
    }
}