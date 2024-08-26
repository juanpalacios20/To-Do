// utils.js

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;

    if (removedIndex !== null && addedIndex === null) {
        // remove
        arr.splice(removedIndex, 1);
    } else if (addedIndex !== null && removedIndex === null) {
        // add
        arr.splice(addedIndex, 0, payload);
    } else if (removedIndex !== null && addedIndex !== null) {
        // move
        const item = arr.splice(removedIndex, 1)[0];
        arr.splice(addedIndex, 0, item);
    }

    return arr;
};
