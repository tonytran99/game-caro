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
    return [...Array(size)].map(x => Array(size).fill(CHESSMAN_NONE))
}