export function formatIndianNumbering(price) {
    if (isNaN(price)) {
        throw new Error("Invalid input. Please provide a valid number.");
    }

    const numberFormat = new Intl.NumberFormat("en-IN");
    return numberFormat.format(price);
}
