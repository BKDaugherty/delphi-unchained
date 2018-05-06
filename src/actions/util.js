// Creates an object that holds the nested types.
// This makes it easy to create action types
export const addSuffix = (prefix, suffixes) => {
    let obj = {}
    for (let key in suffixes) {
        obj[key] = prefix + suffixes[key]
    }
    return obj
}
