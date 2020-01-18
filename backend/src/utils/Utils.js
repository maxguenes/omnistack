const splitStringAsArray = (str) => {
    return str.split(',').map(item =>
        item.trim()
    );
}

module.exports = { splitStringAsArray }