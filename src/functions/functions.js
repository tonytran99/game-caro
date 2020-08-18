export const paramsToObject = (entries) => {
    let result = {}
    for(let entry of entries) { // each 'entry' is a [key, value] tupple
        const [key, value] = entry;
        result[key] = value;
    }
    return result;
}
