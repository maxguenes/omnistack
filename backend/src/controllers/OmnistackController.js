const packageJson = require('../../package.json');

const getVersion = (req, res) => {
    return res.send(packageJson.version);
}

const getHomeMessage = (req, res) => {
    return res.json({
        message: 'Hello OmniStack'
    });
}

module.exports = { getVersion, getHomeMessage };