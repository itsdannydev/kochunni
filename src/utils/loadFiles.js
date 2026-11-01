const fs = require('fs');
const path = require('path');

// require() every .js file in a folder and return the exports as an array
module.exports = (dir) =>
    fs.readdirSync(dir)
        .filter((file) => file.endsWith('.js'))
        .map((file) => require(path.join(dir, file)));
