export function pageSetter(pageNumber, tableLines) {
    const start = (pageNumber - 1) * tableLines;
    const stop = pageNumber * tableLines;
    return { start, stop };
    }